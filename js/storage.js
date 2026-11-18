/**
 * ARCH/FOLIO - Local Device Storage Engine
 * Persists user-uploaded project images using IndexedDB
 * (with fallback to localStorage)
 */

class ArchStorage {
  constructor() {
    this.dbName = "ArchPortfolioDB";
    this.storeName = "projectImages";
    this.dbVersion = 1;
    this.db = null;
    this.isReady = this.init();
  }

  async init() {
    if (!window.indexedDB) {
      console.warn("IndexedDB not supported, falling back to localStorage");
      return null;
    }

    return new Promise((resolve, reject) => {
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

  async saveImage(projectId, dataUrl, meta = {}) {
    await this.isReady;
    const record = {
      projectId,
      dataUrl,
      updatedAt: new Date().toISOString(),
      fileName: meta.name || "custom_image.jpg",
      fileSize: meta.size || 0
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
      // Fallback
      try {
        localStorage.setItem(`arch_img_${projectId}`, JSON.stringify(record));
        return record;
      } catch (e) {
        console.error("Storage limit reached:", e);
        throw e;
      }
    }
  }

  async getImage(projectId) {
    await this.isReady;
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction([this.storeName], "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.get(projectId);
        req.onsuccess = () => resolve(req.result ? req.result.dataUrl : null);
        req.onerror = () => resolve(null);
      });
    } else {
      const item = localStorage.getItem(`arch_img_${projectId}`);
      if (item) {
        try {
          return JSON.parse(item).dataUrl;
        } catch {
          return null;
        }
      }
      return null;
    }
  }

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
            map[item.projectId] = item.dataUrl;
          });
          resolve(map);
        };
        req.onerror = () => resolve({});
      });
    } else {
      const map = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("arch_img_")) {
          const pid = key.replace("arch_img_", "");
          try {
            map[pid] = JSON.parse(localStorage.getItem(key)).dataUrl;
          } catch {}
        }
      }
      return map;
    }
  }

  async removeImage(projectId) {
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
      localStorage.removeItem(`arch_img_${projectId}`);
      return true;
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
        if (k && k.startsWith("arch_img_")) keys.push(k);
      }
      keys.forEach(k => localStorage.removeItem(k));
      return true;
    }
  }

  async exportBackup() {
    const all = await this.getAllCustomImages();
    return JSON.stringify({
      schema: "ARCH_FOLIO_BACKUP_V1",
      exportedAt: new Date().toISOString(),
      images: all
    }, null, 2);
  }

  async importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data.images) throw new Error("Invalid backup format");
      for (const [pid, dataUrl] of Object.entries(data.images)) {
        await this.saveImage(pid, dataUrl, { name: "restored_backup.jpg" });
      }
      return true;
    } catch (e) {
      console.error("Import failed:", e);
      throw e;
    }
  }
}

window.archStorage = new ArchStorage();
