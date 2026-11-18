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

    // Single Project Image Input inside Reader Modal
    const readerImageInput = document.getElementById("reader-image-input");
    if (readerImageInput) {
      readerImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const currentProj = this.filteredProjects[this.currentProjectIndex];
          this.processImageUpload(currentProj.id, file);
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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const currentProj = this.filteredProjects[this.currentProjectIndex];
          this.processImageUpload(currentProj.id, e.dataTransfer.files[0]);
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
      const isCustom = !!this.customImages[proj.id];
      const imgSrc = isCustom ? this.customImages[proj.id] : proj.defaultImage;

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
              ${isCustom ? t.customBadge : t.defaultBadge}
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
    const isCustom = !!this.customImages[proj.id];
    const currentImgSrc = isCustom ? this.customImages[proj.id] : proj.defaultImage;

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

    // Visual Frame
    const mainImg = document.getElementById("reader-main-img");
    mainImg.src = currentImgSrc;
    mainImg.alt = proj.title[this.currentLang];

    // Image Caption / Badge
    const caption = document.getElementById("reader-img-caption");
    caption.textContent = isCustom
      ? `[ ${t.customBadge} ] ${proj.drawings[0].label[this.currentLang]}`
      : `[ ${t.defaultBadge} ] ${proj.drawings[0].label[this.currentLang]}`;

    // Reset button visibility
    const btnReset = document.getElementById("btn-reset-single-image");
    btnReset.style.display = isCustom ? "inline-block" : "none";

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

  // Device Image Handling
  triggerQuickUpload(projectId) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        this.processImageUpload(projectId, file);
      }
    };
    fileInput.click();
  }

  async processImageUpload(projectId, file) {
    if (!file.type.startsWith("image/")) {
      alert("請選擇有效的圖形檔案（.jpg, .png, .webp, .svg）");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      try {
        await window.archStorage.saveImage(projectId, dataUrl, {
          name: file.name,
          size: file.size
        });
        this.customImages[projectId] = dataUrl;

        // Visual feedback
        const t = I18N[this.currentLang];
        alert(`${t.uploadSuccess} (${file.name})`);

        this.filterAndRender();

        if (this.isReaderOpen()) {
          const currentProj = this.filteredProjects[this.currentProjectIndex];
          if (currentProj && currentProj.id === projectId) {
            this.renderReaderModal(currentProj);
          }
        }
      } catch (err) {
        alert("儲存檔案失敗：" + err.message);
      }
    };
    reader.readAsDataURL(file);
  }

  async resetProjectImage(projectId) {
    await window.archStorage.removeImage(projectId);
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
      const isCustom = !!this.customImages[proj.id];
      const imgSrc = isCustom ? this.customImages[proj.id] : proj.defaultImage;

      const row = document.createElement("div");
      row.className = "manager-item";
      row.innerHTML = `
        <div class="manager-item-info">
          <img src="${imgSrc}" class="manager-thumb" alt="${proj.code}">
          <div style="min-width: 0;">
            <div class="manager-item-title">${proj.code} · ${proj.title[this.currentLang]}</div>
            <div class="manager-item-meta">
              ${proj.period} · ${isCustom ? `<span style="color: #145a54; font-weight: 700;">● ${t.customBadge}</span>` : `<span style="color: #888;">○ ${t.defaultBadge}</span>`}
            </div>
          </div>
        </div>
        <div class="manager-actions">
          <button class="btn-editorial" data-action="upload-single" data-id="${proj.id}">
            📷 ${t.replaceFromDevice}
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
