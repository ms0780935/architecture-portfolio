/**
 * ARCH/FOLIO - Main Application Controller
 * Handles Grid Rendering, Divisare-style Reader Modal, Pagination,
 * Local Device Image Replacer, Search, Filter, and Bilingual i18n
 */

class ArchApp {
  constructor() {
    this.currentLang = localStorage.getItem("arch_lang") || "zh";
    this.activeCategory = "all";
    this.activeYear = "all";
    this.searchQuery = "";
    this.currentProjectIndex = 0;
    this.filteredProjects = [...ARCH_PROJECTS];
    this.customImages = {};

    this.init();
  }

  async init() {
    // Load custom images from IndexedDB
    try {
      this.customImages = await window.archStorage.getAllCustomImages();
    } catch (e) {
      console.warn("Storage load error:", e);
      this.customImages = {};
    }

    this.bindEvents();
    this.updateLanguageUI();
    this.filterAndRender();

    // Check URL hash for direct project link e.g. #proj-5
    if (window.location.hash) {
      const pid = window.location.hash.substring(1);
      this.openProjectById(pid);
    }
  }

  bindEvents() {
    // Language Switcher
    const langBtn = document.getElementById("btn-toggle-lang");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        this.currentLang = this.currentLang === "zh" ? "en" : "zh";
        localStorage.setItem("arch_lang", this.currentLang);
        this.updateLanguageUI();
        this.filterAndRender();
        if (this.isReaderOpen()) {
          this.renderReaderModal(this.filteredProjects[this.currentProjectIndex]);
        }
      });
    }

    // Category Tabs
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.activeCategory = e.currentTarget.dataset.category;
        this.filterAndRender();
      });
    });

    // Timeline Year Buttons
    document.querySelectorAll(".year-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".year-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.activeYear = e.currentTarget.dataset.year;
        this.filterAndRender();
      });
    });

    // Search Input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.filterAndRender();
      });
    }

    // Modals Close buttons & Outside Clicks
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.closeAllModals();
        }
      });
    });

    document.querySelectorAll(".btn-close-modal").forEach(btn => {
      btn.addEventListener("click", () => this.closeAllModals());
    });

    // Reader Pagination
    document.getElementById("btn-prev-proj").addEventListener("click", () => this.navigateProject(-1));
    document.getElementById("btn-next-proj").addEventListener("click", () => this.navigateProject(1));

    // Keyboard Shortcuts (Left/Right arrow, Esc)
    window.addEventListener("keydown", (e) => {
      if (!this.isReaderOpen()) return;
      if (e.key === "ArrowLeft") this.navigateProject(-1);
      if (e.key === "ArrowRight") this.navigateProject(1);
      if (e.key === "Escape") this.closeAllModals();
    });

    // Asset Manager Modal Trigger
    const btnAssetManager = document.getElementById("btn-open-asset-manager");
    if (btnAssetManager) {
      btnAssetManager.addEventListener("click", () => this.openAssetManagerModal());
    }

    // Presentation & Rubric Modal Trigger
    const btnPresentation = document.getElementById("btn-open-presentation");
    if (btnPresentation) {
      btnPresentation.addEventListener("click", () => this.openPresentationModal());
    }

    // Export / Import / Reset in Asset Manager
    document.getElementById("btn-export-backup").addEventListener("click", () => this.handleExportBackup());
    document.getElementById("input-import-backup").addEventListener("change", (e) => this.handleImportBackup(e));
    document.getElementById("btn-reset-all").addEventListener("click", () => this.handleResetAll());

    // Add More Images Button trigger inside Reader Modal
    const btnAddMoreTrigger = document.getElementById("btn-add-more-trigger");
    if (btnAddMoreTrigger) {
      btnAddMoreTrigger.addEventListener("click", () => {
        const input = document.getElementById("reader-image-input");
        if (input) input.click();
      });
    }

    // Multiple Project Images Input inside Reader Modal (Top trigger)
    const readerImageInput = document.getElementById("reader-image-input");
    if (readerImageInput) {
      readerImageInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
          const currentProj = this.filteredProjects[this.currentProjectIndex];
          this.processMultipleImageUpload(currentProj.id, files);
          e.target.value = "";
        }
      });
    }

    // Add Photo Button directly below the last image (在最後一張圖片下方新增照片按鈕)
    const btnBottomAdd = document.getElementById("btn-bottom-add-image");
    const bottomImageInput = document.getElementById("bottom-image-input");
    if (btnBottomAdd && bottomImageInput) {
      btnBottomAdd.addEventListener("click", () => {
        bottomImageInput.click();
      });
      bottomImageInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
          const currentProj = this.filteredProjects[this.currentProjectIndex];
          this.processMultipleImageUpload(currentProj.id, files);
          e.target.value = "";
        }
      });
    }

    // Drag and Drop Zone in Reader Modal
    const dropzone = document.getElementById("reader-dropzone");
    if (dropzone) {
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("drag-over");
      });
      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("drag-over");
      });
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("drag-over");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          const currentProj = this.filteredProjects[this.currentProjectIndex];
          this.processMultipleImageUpload(currentProj.id, Array.from(e.dataTransfer.files));
        }
      });
      dropzone.addEventListener("click", () => {
        readerImageInput.click();
      });
    }

    // Reset Single Project Image in Reader Modal
    const btnResetSingle = document.getElementById("btn-reset-single-image");
    if (btnResetSingle) {
      btnResetSingle.addEventListener("click", () => {
        const currentProj = this.filteredProjects[this.currentProjectIndex];
        this.resetProjectImage(currentProj.id);
      });
    }
  }

  isReaderOpen() {
    const modal = document.getElementById("project-reader-modal");
    return modal && modal.classList.contains("active");
  }

  closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
    history.replaceState(null, "", window.location.pathname);
  }

  updateLanguageUI() {
    const t = I18N[this.currentLang];
    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.dataset.i18n;
      if (t[key]) {
        elem.textContent = t[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(elem => {
      const key = elem.dataset.i18nPlaceholder;
      if (t[key]) {
        elem.placeholder = t[key];
      }
    });

    const langToggleBtn = document.getElementById("btn-toggle-lang");
    if (langToggleBtn) {
      langToggleBtn.textContent = this.currentLang === "zh" ? "ENGLISH" : "繁體中文";
    }

    document.documentElement.lang = this.currentLang === "zh" ? "zh-Hant-TW" : "en";
  }

  filterAndRender() {
    const q = this.searchQuery;
    const cat = this.activeCategory;
    const yr = this.activeYear;

    this.filteredProjects = ARCH_PROJECTS.filter(proj => {
      // Category match
      if (cat !== "all" && proj.category !== cat) return false;

      // Year match
      if (yr !== "all" && proj.yearNumber.toString() !== yr) return false;

      // Search match
      if (q) {
        const titleZh = proj.title.zh.toLowerCase();
        const titleEn = proj.title.en.toLowerCase();
        const summary = proj.summary[this.currentLang].toLowerCase();
        const code = proj.code.toLowerCase();
        const typology = proj.typology[this.currentLang].toLowerCase();
        const tags = proj.tags.join(" ").toLowerCase();

        const match = titleZh.includes(q) || titleEn.includes(q) ||
                      summary.includes(q) || code.includes(q) ||
                      typology.includes(q) || tags.includes(q);
        if (!match) return false;
      }
      return true;
    });

    this.renderGrid();
    this.updateCuratorStatus();
  }

  updateCuratorStatus() {
    const statusElem = document.getElementById("curator-status-text");
    const countElem = document.getElementById("project-count-badge");
    const t = I18N[this.currentLang];

    if (countElem) {
      countElem.textContent = `${this.filteredProjects.length} ${t.totalProjects}`;
    }
    if (statusElem) {
      statusElem.textContent = `${this.filteredProjects.length} / ${ARCH_PROJECTS.length} EXHIBITS`;
    }
  }

  renderGrid() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const t = I18N[this.currentLang];

    if (this.filteredProjects.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem 1rem; text-align: center; color: var(--text-muted); font-family: var(--font-mono);">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">[ NO ARCHITECTURAL WORKS FOUND ]</p>
          <p style="font-size: 0.82rem;">請嘗試調整篩選條件或搜尋關鍵字</p>
        </div>
      `;
      return;
    }

    this.filteredProjects.forEach((proj, idx) => {
      const customList = this.customImages[proj.id];
      const isCustom = Array.isArray(customList) && customList.length > 0;
      const imgSrc = isCustom ? customList[0].src : proj.defaultImage;
      const imgCount = isCustom ? customList.length : (proj.drawings ? proj.drawings.length : 1);

      const card = document.createElement("article");
      card.className = "project-card";
      card.dataset.id = proj.id;
      card.dataset.index = idx;

      card.innerHTML = `
        <div class="card-image-wrap" data-action="view">
          <img src="${imgSrc}" alt="${proj.title[this.currentLang]}" class="card-img" loading="lazy">
          <div class="card-badges">
            <span class="badge-year">${proj.period} · ${proj.yearLabel[this.currentLang]}</span>
            <span class="${isCustom ? 'badge-custom' : 'badge-default'}">
              ${isCustom ? `● ${imgCount} ${t.imgSeqBadge || '圖紙'}` : `○ ${imgCount} ${t.imgSeqBadge || '圖紙'}`}
            </span>
          </div>
          <div class="card-quick-actions">
            <button class="btn-card-action" data-action="view">
              <span>📖 ${t.viewDetails}</span>
            </button>
            <button class="btn-card-action" data-action="quick-upload">
              <span>📷 ${t.quickReplace}</span>
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="card-meta-top">
            <span class="card-code">${proj.code}</span>
            <span class="card-category">${proj.categoryLabel[this.currentLang]}</span>
          </div>
          <h2 class="card-title" data-action="view">${proj.title[this.currentLang]}</h2>
          <div class="card-typology">${proj.typology[this.currentLang]} · ${proj.location[this.currentLang]}</div>
          <p class="card-summary">${proj.summary[this.currentLang]}</p>
          <div class="card-footer-tags">
            ${proj.tags.map(tag => `<span class="tag-pill">#${tag}</span>`).join("")}
          </div>
        </div>
      `;

      // Event handlers
      card.querySelectorAll('[data-action="view"]').forEach(el => {
        el.addEventListener("click", () => this.openReaderModal(idx));
      });

      const btnQuickUpload = card.querySelector('[data-action="quick-upload"]');
      if (btnQuickUpload) {
        btnQuickUpload.addEventListener("click", (e) => {
          e.stopPropagation();
          this.triggerQuickUpload(proj.id);
        });
      }

      grid.appendChild(card);
    });
  }

  openProjectById(id) {
    const idx = this.filteredProjects.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.openReaderModal(idx);
    } else {
      const allIdx = ARCH_PROJECTS.findIndex(p => p.id === id);
      if (allIdx !== -1) {
        this.activeCategory = "all";
        this.activeYear = "all";
        this.searchQuery = "";
        this.filterAndRender();
        const newIdx = this.filteredProjects.findIndex(p => p.id === id);
        if (newIdx !== -1) this.openReaderModal(newIdx);
      }
    }
  }

  openReaderModal(index) {
    this.currentProjectIndex = index;
    const proj = this.filteredProjects[index];
    if (!proj) return;

    this.renderReaderModal(proj);
    const modal = document.getElementById("project-reader-modal");
    modal.classList.add("active");
    window.location.hash = proj.id;
  }

  renderReaderModal(proj) {
    const t = I18N[this.currentLang];
    const customList = this.customImages[proj.id];
    const isCustom = Array.isArray(customList) && customList.length > 0;

    // Build the ordered list of images (from top to bottom)
    let activeImages = [];
    if (isCustom) {
      activeImages = customList.map((item, i) => ({
        id: item.id || `custom-${i}`,
        src: item.src,
        name: item.name || `Custom Image ${i + 1}`,
        isCustom: true
      }));
    } else if (proj.drawings && proj.drawings.length > 0) {
      activeImages = proj.drawings.map((d, i) => ({
        id: `def-${i}`,
        src: d.src,
        name: (d.label && d.label[this.currentLang]) ? d.label[this.currentLang] : (d.type || `Drawing ${i + 1}`),
        isCustom: false
      }));
    } else {
      activeImages = [{
        id: 'def-0',
        src: proj.defaultImage,
        name: proj.title[this.currentLang],
        isCustom: false
      }];
    }

    // Counter & Nav states
    const counter = document.getElementById("reader-counter");
    counter.textContent = `${String(this.currentProjectIndex + 1).padStart(2, '0')} / ${String(this.filteredProjects.length).padStart(2, '0')}`;

    document.getElementById("btn-prev-proj").disabled = this.currentProjectIndex === 0;
    document.getElementById("btn-next-proj").disabled = this.currentProjectIndex === this.filteredProjects.length - 1;

    // Meta & Titles
    document.getElementById("reader-code").textContent = proj.code;
    document.getElementById("reader-period").textContent = `${proj.period} · ${proj.yearLabel[this.currentLang]}`;
    document.getElementById("reader-category").textContent = proj.categoryLabel[this.currentLang];
    document.getElementById("reader-title").textContent = proj.title[this.currentLang];
    document.getElementById("reader-title-alt").textContent = this.currentLang === "zh" ? proj.title.en : proj.title.zh;

    // Info Grid
    document.getElementById("reader-info-grid").innerHTML = `
      <div class="info-item">
        <dt>${this.currentLang === 'zh' ? '建築類型' : 'TYPOLOGY'}</dt>
        <dd>${proj.typology[this.currentLang]}</dd>
      </div>
      <div class="info-item">
        <dt>${this.currentLang === 'zh' ? '基地位置' : 'SITE LOCATION'}</dt>
        <dd>${proj.location[this.currentLang]}</dd>
      </div>
      <div class="info-item">
        <dt>${this.currentLang === 'zh' ? '指導教授／建築師' : 'STUDIO ADVISOR'}</dt>
        <dd>${proj.advisor[this.currentLang]}</dd>
      </div>
      <div class="info-item">
        <dt>${this.currentLang === 'zh' ? '修習學期' : 'ACADEMIC SEMESTER'}</dt>
        <dd>${proj.semester[this.currentLang]}</dd>
      </div>
    `;

    // Update Stream Images Count Badge
    const countBadge = document.getElementById("reader-images-count-badge");
    if (countBadge) {
      countBadge.textContent = `${activeImages.length} ${t.imgSeqBadge || '圖紙'} · ${this.currentLang === 'zh' ? '依序由上至下展示' : 'Ordered Vertically'}`;
    }

    // Reset button visibility
    const btnReset = document.getElementById("btn-reset-single-image");
    if (btnReset) {
      btnReset.style.display = isCustom ? "inline-flex" : "none";
    }

    // Render Sequential Vertical Images Stream (依序由上至下排列)
    const streamContainer = document.getElementById("reader-images-stream");
    if (streamContainer) {
      streamContainer.innerHTML = activeImages.map((imgItem, idx) => `
        <div class="stream-image-block" data-img-index="${idx}">
          <div class="stream-img-top-meta">
            <span style="font-weight: 700; color: var(--text-main);">
              ${t.imgSeqBadge || 'FIG.'} ${String(idx + 1).padStart(2, '0')} / ${String(activeImages.length).padStart(2, '0')}
              <span style="margin-left: 0.5rem; font-weight: normal; font-size: 0.72rem; color: var(--text-light); text-transform: uppercase;">
                ${imgItem.name || ''}
              </span>
            </span>
            <div class="stream-img-actions">
              <button class="btn-order-img" data-action="move-up" data-index="${idx}" ${idx === 0 ? 'disabled' : ''} title="${t.moveUp || '上移'}">
                ${t.moveUp || '▲ 上移'}
              </button>
              <button class="btn-order-img" data-action="move-down" data-index="${idx}" ${idx === activeImages.length - 1 ? 'disabled' : ''} title="${t.moveDown || '下移'}">
                ${t.moveDown || '▼ 下移'}
              </button>
            </div>
          </div>
          <div class="stream-image-frame">
            <img src="${imgItem.src}" class="stream-img" alt="${imgItem.name || proj.title[this.currentLang]}" loading="lazy">
          </div>
          <div class="stream-img-caption-bar">
            <span>
              ${imgItem.isCustom ? `<strong style="color: #145a54;">[ ${t.customBadge} ]</strong>` : `<span style="color: var(--text-light);">[ ${t.defaultBadge} ]</span>`}
              ${imgItem.name || ''}
            </span>
            ${imgItem.isCustom ? `
              <button class="btn-delete-img" data-action="delete-stream-img" data-index="${idx}" title="${t.deleteSingleImg || '移除此圖'}">
                ✕ ${t.deleteSingleImg || '移除此圖'}
              </button>
            ` : ''}
          </div>
        </div>
      `).join("");

      // Bind reordering (Move Up / Move Down)
      streamContainer.querySelectorAll('[data-action="move-up"]').forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const targetIdx = parseInt(btn.dataset.index, 10);
          if (targetIdx > 0) {
            await this.moveImageInStream(proj.id, targetIdx, targetIdx - 1, activeImages);
          }
        });
      });

      streamContainer.querySelectorAll('[data-action="move-down"]').forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const targetIdx = parseInt(btn.dataset.index, 10);
          if (targetIdx < activeImages.length - 1) {
            await this.moveImageInStream(proj.id, targetIdx, targetIdx + 1, activeImages);
          }
        });
      });

      // Bind delete single image buttons
      streamContainer.querySelectorAll('[data-action="delete-stream-img"]').forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const targetIdx = parseInt(btn.dataset.index, 10);
          await this.deleteImageFromStream(proj.id, targetIdx);
        });
      });
    }

    // Architectural Essay
    document.getElementById("reader-concept-body").textContent = proj.concept[this.currentLang];

    // Tags
    document.getElementById("reader-tags").innerHTML = proj.tags.map(tg => `<span class="tag-pill">#${tg}</span>`).join("");
  }

  navigateProject(direction) {
    const nextIdx = this.currentProjectIndex + direction;
    if (nextIdx >= 0 && nextIdx < this.filteredProjects.length) {
      this.openReaderModal(nextIdx);
    }
  }

  // Device Image Handling (Multi-image upload & sequential append)
  triggerQuickUpload(projectId) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        this.processMultipleImageUpload(projectId, files);
      }
    };
    fileInput.click();
  }

  async processMultipleImageUpload(projectId, files) {
    const validFiles = files.filter(f => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      alert("請選擇有效的圖形檔案（.jpg, .png, .webp, .svg）");
      return;
    }

    let loadedCount = 0;
    for (const file of validFiles) {
      try {
        const dataUrl = await this.readFileAsDataURL(file);
        await window.archStorage.addImageToProject(projectId, dataUrl, {
          name: file.name,
          size: file.size
        });
        loadedCount++;
      } catch (err) {
        console.error("Failed to add image:", file.name, err);
      }
    }

    // Refresh custom images cache
    this.customImages = await window.archStorage.getAllCustomImages();

    // Feedback
    const t = I18N[this.currentLang];
    alert(`✓ ${t.uploadSuccess} (已新增 ${loadedCount} 張圖片，依序排列於本作品中)`);

    this.filterAndRender();

    if (this.isReaderOpen()) {
      const currentProj = this.filteredProjects[this.currentProjectIndex];
      if (currentProj && currentProj.id === projectId) {
        this.renderReaderModal(currentProj);
      }
    }
  }

  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  async deleteImageFromStream(projectId, index) {
    await window.archStorage.removeImageAt(projectId, index);
    this.customImages = await window.archStorage.getAllCustomImages();
    this.filterAndRender();

    if (this.isReaderOpen()) {
      const currentProj = this.filteredProjects[this.currentProjectIndex];
      if (currentProj && currentProj.id === projectId) {
        this.renderReaderModal(currentProj);
      }
    }
  }

  async moveImageInStream(projectId, fromIndex, toIndex, currentImages) {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= currentImages.length || toIndex >= currentImages.length) return;

    // Create normalized copy of current images array
    const newList = currentImages.map(item => ({
      id: item.id || ("img-" + Math.random().toString(36).substr(2, 7)),
      src: item.src,
      name: item.name,
      isCustom: true
    }));

    // Swap elements
    const [moved] = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, moved);

    // Save to local storage
    await window.archStorage.saveProjectImages(projectId, newList);
    this.customImages = await window.archStorage.getAllCustomImages();

    // Re-render
    this.filterAndRender();
    if (this.isReaderOpen()) {
      const currentProj = this.filteredProjects[this.currentProjectIndex];
      if (currentProj && currentProj.id === projectId) {
        this.renderReaderModal(currentProj);
      }
    }
  }

  async resetProjectImage(projectId) {
    await window.archStorage.resetProjectImages(projectId);
    delete this.customImages[projectId];
    this.filterAndRender();

    if (this.isReaderOpen()) {
      const currentProj = this.filteredProjects[this.currentProjectIndex];
      if (currentProj && currentProj.id === projectId) {
        this.renderReaderModal(currentProj);
      }
    }
  }

  // Asset Manager Modal
  openAssetManagerModal() {
    const modal = document.getElementById("asset-manager-modal");
    const list = document.getElementById("manager-project-list");
    list.innerHTML = "";

    const t = I18N[this.currentLang];

    ARCH_PROJECTS.forEach(proj => {
      const customList = this.customImages[proj.id];
      const isCustom = Array.isArray(customList) && customList.length > 0;
      const imgSrc = isCustom ? customList[0].src : proj.defaultImage;
      const count = isCustom ? customList.length : (proj.drawings ? proj.drawings.length : 1);

      const row = document.createElement("div");
      row.className = "manager-item";
      row.innerHTML = `
        <div class="manager-item-info">
          <img src="${imgSrc}" class="manager-thumb" alt="${proj.code}">
          <div style="min-width: 0;">
            <div class="manager-item-title">${proj.code} · ${proj.title[this.currentLang]}</div>
            <div class="manager-item-meta">
              ${proj.period} · ${isCustom ? `<span style="color: #145a54; font-weight: 700;">● ${count} ${t.imgSeqBadge || '圖紙'} (${t.customBadge})</span>` : `<span style="color: #888;">○ ${count} ${t.imgSeqBadge || '圖紙'} (${t.defaultBadge})</span>`}
            </div>
          </div>
        </div>
        <div class="manager-actions">
          <button class="btn-editorial" data-action="upload-single" data-id="${proj.id}">
            ➕ ${t.btnAddImage || '新增圖片'}
          </button>
          ${isCustom ? `<button class="btn-editorial" style="color: var(--accent-terra);" data-action="reset-single" data-id="${proj.id}">✕ ${t.resetDefaults}</button>` : ''}
        </div>
      `;

      row.querySelector('[data-action="upload-single"]').addEventListener("click", () => {
        this.triggerQuickUpload(proj.id);
      });

      const btnReset = row.querySelector('[data-action="reset-single"]');
      if (btnReset) {
        btnReset.addEventListener("click", async () => {
          await this.resetProjectImage(proj.id);
          this.openAssetManagerModal(); // refresh manager
        });
      }

      list.appendChild(row);
    });

    modal.classList.add("active");
  }

  async handleExportBackup() {
    const jsonStr = await window.archStorage.exportBackup();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `arch_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  handleImportBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        await window.archStorage.importBackup(e.target.result);
        this.customImages = await window.archStorage.getAllCustomImages();
        alert("備份資料已順利還原！");
        this.filterAndRender();
        this.openAssetManagerModal();
      } catch (err) {
        alert("匯入失敗，請確認檔案格式是否正確。");
      }
    };
    reader.readAsText(file);
  }

  async handleResetAll() {
    const t = I18N[this.currentLang];
    if (confirm(t.resetConfirm)) {
      await window.archStorage.clearAll();
      this.customImages = {};
      this.filterAndRender();
      this.openAssetManagerModal();
    }
  }

  openPresentationModal() {
    const modal = document.getElementById("presentation-modal");
    modal.classList.add("active");
  }
}

// Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.archApp = new ArchApp();
});
