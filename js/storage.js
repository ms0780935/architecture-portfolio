/**
 * ARCH/FOLIO - Local Device Storage Engine
 * Persists user-uploaded project images using IndexedDB (with fallback to localStorage)
 * Supports multiple images per project arranged sequentially.
 */

class ArchStorage {
  constructor() {
    this.dbName = "ArchPortfolioDB";
    this.storeName = "projectImages";
    this.dbVersion = 2; // bumped for multi-image support
    this.db = null;
    this.isReady = this.init();
  }

  async init() {
    if (!window.indexedDB) {
      console.warn("IndexedDB not supported, falling back to localStorage");
      return null;
    }

    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "projectId" });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error("IndexedDB open error:", event.target.error);
        resolve(null);
      };
    });
  }

  // Get all images for a given project (returns Array of image objects: [{ src, name, size, isCustom, id }])
  async getProjectImages(projectId) {
    await this.isReady;
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction([this.storeName], "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.get(projectId);
        req.onsuccess = () => {
          if (!req.result) return resolve([]);
          // Support both legacy single dataUrl and new images array
          if (Array.isArray(req.result.images)) {
            resolve(req.result.images);
          } else if (req.result.dataUrl) {
            resolve([{
              id: "img-legacy-1",
              src: req.result.dataUrl,
              name: req.result.fileName || "custom_image.jpg",
              isCustom: true
            }]);
          } else {
            resolve([]);
          }
        };
        req.onerror = () => resolve([]);
      });
    } else {
      const item = localStorage.getItem(`arch_imgs_${projectId}`) || localStorage.getItem(`arch_img_${projectId}`);
      if (item) {
        try {
          const parsed = JSON.parse(item);
          if (Array.isArray(parsed.images)) return parsed.images;
          if (parsed.dataUrl) return [{ id: "img-1", src: parsed.dataUrl, name: parsed.fileName || "custom.jpg", isCustom: true }];
        } catch {
          return [];
        }
      }
      return [];
    }
  }

  // Save full image list for a project
  async saveProjectImages(projectId, imagesList) {
    await this.isReady;
    const record = {
      projectId,
      images: imagesList,
      dataUrl: imagesList.length > 0 ? imagesList[0].src : null, // legacy compatibility
      updatedAt: new Date().toISOString()
    };

    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], "readwrite");
        const store = tx.objectStore(this.storeName);
        const req = store.put(record);
        req.onsuccess = () => resolve(record);
        req.onerror = () => reject(req.error);
      });
    } else {
      try {
        localStorage.setItem(`arch_imgs_${projectId}`, JSON.stringify(record));
        return record;
      } catch (e) {
        console.error("Storage quota reached:", e);
        throw e;
      }
    }
  }

  // Append a single new image to a project's sequence
  async addImageToProject(projectId, dataUrl, meta = {}) {
    const existing = await this.getProjectImages(projectId);
    const newImage = {
      id: "img-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
      src: dataUrl,
      name: meta.name || `Image_${existing.length + 1}.jpg`,
      size: meta.size || 0,
      isCustom: true,
      addedAt: new Date().toISOString()
    };
    const updated = [...existing, newImage];
    await this.saveProjectImages(projectId, updated);
    return newImage;
  }

  // Remove one image at specific index
  async removeImageAt(projectId, index) {
    const existing = await this.getProjectImages(projectId);
    if (index >= 0 && index < existing.length) {
      existing.splice(index, 1);
      await this.saveProjectImages(projectId, existing);
      return true;
    }
    return false;
  }

  // Reset/Remove all custom images for a project
  async resetProjectImages(projectId) {
    await this.isReady;
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction([this.storeName], "readwrite");
        const store = tx.objectStore(this.storeName);
        const req = store.delete(projectId);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      });
    } else {
      localStorage.removeItem(`arch_imgs_${projectId}`);
      localStorage.removeItem(`arch_img_${projectId}`);
      return true;
    }
  }

  // Legacy single image compatibility
  async saveImage(projectId, dataUrl, meta = {}) {
    return this.addImageToProject(projectId, dataUrl, meta);
  }

  async getImage(projectId) {
    const list = await this.getProjectImages(projectId);
    return list.length > 0 ? list[0].src : null;
  }

  async removeImage(projectId) {
    return this.resetProjectImages(projectId);
  }

  // Get map of { [projectId]: Array of images }
  async getAllCustomImages() {
    await this.isReady;
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction([this.storeName], "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();
        req.onsuccess = () => {
          const map = {};
          (req.result || []).forEach(item => {
            if (Array.isArray(item.images) && item.images.length > 0) {
              map[item.projectId] = item.images;
            } else if (item.dataUrl) {
              map[item.projectId] = [{ id: "img-legacy", src: item.dataUrl, isCustom: true }];
            }
          });
          resolve(map);
        };
        req.onerror = () => resolve({});
      });
    } else {
      const map = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("arch_imgs_") || key.startsWith("arch_img_"))) {
          const pid = key.replace("arch_imgs_", "").replace("arch_img_", "");
          try {
            const data = JSON.parse(localStorage.getItem(key));
            if (Array.isArray(data.images)) map[pid] = data.images;
            else if (data.dataUrl) map[pid] = [{ src: data.dataUrl, isCustom: true }];
          } catch {}
        }
      }
      return map;
    }
  }

  async clearAll() {
    await this.isReady;
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction([this.storeName], "readwrite");
        const store = tx.objectStore(this.storeName);
        const req = store.clear();
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      });
    } else {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith("arch_imgs_") || k.startsWith("arch_img_"))) keys.push(k);
      }
      keys.forEach(k => localStorage.removeItem(k));
      return true;
    }
  }

  async exportBackup() {
    const all = await this.getAllCustomImages();
    return JSON.stringify({
      schema: "ARCH_FOLIO_MULTI_IMAGE_V2",
      exportedAt: new Date().toISOString(),
      images: all
    }, null, 2);
  }

  async importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data.images) throw new Error("Invalid backup format");
      for (const [pid, imgs] of Object.entries(data.images)) {
        if (Array.isArray(imgs)) {
          await this.saveProjectImages(pid, imgs);
        } else if (typeof imgs === "string") {
          await this.saveProjectImages(pid, [{ id: "imp-1", src: imgs, isCustom: true }]);
        }
      }
      return true;
    } catch (e) {
      console.error("Import failed:", e);
      throw e;
    }
  }
}

window.archStorage = new ArchStorage();
