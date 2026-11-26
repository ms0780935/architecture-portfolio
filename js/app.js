/**
 * ARCH/FOLIO - Main Application Controller
 * Handles Grid Rendering, Divisare-style Reader Modal, Pagination,
 * Local Device Image Replacer, Search, Filter, and Bilingual i18n
 */

class ArchApp {
  constructor() {
    this.currentLang = localStorage.getItem("arch_lang") || "zh";
    this.themeMode = localStorage.getItem("arch_theme_preference") || "auto";
    this.activeCategory = "all";
    this.activeYear = "all";
    this.searchQuery = "";
    this.currentProjectIndex = 0;
    this.filteredProjects = [...ARCH_PROJECTS];
    this.customImages = {};

    // Divisare Atlas Taxonomy State
    this.activeAtlasCategory = "elements";
    this.activeAtlasTagId = null;
    this.activeAtlasTag = null;
    this.isAtlasOpen = false;

    this.init();
  }

  async init() {
    // Initialize Theme (Divisare-style Light / Dark / Auto)
    this.initTheme();

    // Load custom images from IndexedDB
    try {
      this.customImages = await window.archStorage.getAllCustomImages();
    } catch (e) {
      console.warn("Storage load error:", e);
      this.customImages = {};
    }

    this.initAtlas();
    this.bindEvents();
    this.updateLanguageUI();
    this.filterAndRender();

    // Check URL hash for direct project link e.g. #proj-5
    if (window.location.hash) {
      const pid = window.location.hash.substring(1);
      this.openProjectById(pid);
    }
  }

  initTheme() {
    this.applyTheme();

    // Listen to OS prefers-color-scheme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.themeMode === 'auto') {
          this.applyTheme();
        }
      });
    }
  }

  setThemeMode(mode) {
    this.themeMode = mode;
    localStorage.setItem("arch_theme_preference", mode);
    this.applyTheme();
  }

  applyTheme() {
    let effective = this.themeMode;
    if (effective === "auto") {
      effective = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light";
    }

    document.documentElement.setAttribute("data-theme", effective);
    document.documentElement.setAttribute("data-theme-mode", this.themeMode);

    // Update switcher buttons UI
    document.querySelectorAll(".btn-theme-opt").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === this.themeMode);
    });
  }

  bindEvents() {
    // Theme Switcher Buttons (Tri-mode: Light, Dark, Auto)
    document.querySelectorAll(".btn-theme-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.theme;
        this.setThemeMode(mode);
      });
    });

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

    // Category Tabs & Projects Atlas Trigger
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        if (e.currentTarget.id === "btn-projects-atlas") {
          // Handled specifically in initAtlas() to toggle drawer
          return;
        }
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.activeCategory = e.currentTarget.dataset.category;
        
        // Reset any active atlas tag when switching specific curriculum category
        this.activeAtlasTagId = null;
        this.activeAtlasTag = null;
        const badge = document.getElementById("active-tag-badge");
        if (badge) badge.style.display = "none";
        this.closeAtlas();

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

  // ==========================================
  // Divisare Atlas Architectural Taxonomy Methods
  // ==========================================
  initAtlas() {
    this.renderAtlasCategories();
    this.renderAtlasKeywords();

    // Toggle button in filter nav (replacing standalone '全部作品')
    const btnAtlas = document.getElementById("btn-projects-atlas");
    if (btnAtlas) {
      btnAtlas.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleAtlas();
      });
    }

    // Close button
    const btnCloseAtlas = document.getElementById("btn-close-atlas");
    if (btnCloseAtlas) {
      btnCloseAtlas.addEventListener("click", () => this.closeAtlas());
    }

    // Reset All button inside Atlas
    const btnResetAll = document.getElementById("btn-atlas-reset-all");
    if (btnResetAll) {
      btnResetAll.addEventListener("click", () => this.resetAtlasFilter());
    }

    // Clear active tag pill
    const btnClearActiveTag = document.getElementById("btn-clear-active-tag");
    if (btnClearActiveTag) {
      btnClearActiveTag.addEventListener("click", () => this.resetAtlasFilter());
    }

    // Esc key closes atlas panel
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isAtlasOpen) {
        this.closeAtlas();
      }
    });
  }

  renderAtlasCategories() {
    const nav = document.getElementById("atlas-categories-nav");
    if (!nav || typeof DIVISARE_ATLAS_TAXONOMY === "undefined") return;

    nav.innerHTML = DIVISARE_ATLAS_TAXONOMY.map(cat => `
      <button class="atlas-cat-item ${cat.id === this.activeAtlasCategory ? 'active' : ''}" data-cat-id="${cat.id}">
        <span class="cat-name-group">
          <span class="cat-icon">${cat.icon || '⊞'}</span>
          <span class="cat-name">${cat.name}</span>
        </span>
        <span class="cat-chevron">›</span>
      </button>
    `).join("");

    nav.querySelectorAll(".atlas-cat-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const catId = btn.dataset.catId;
        const cat = DIVISARE_ATLAS_TAXONOMY.find(c => c.id === catId);
        if (cat && cat.isReset) {
          this.resetAtlasFilter();
          return;
        }
        this.activeAtlasCategory = catId;
        nav.querySelectorAll(".atlas-cat-item").forEach(b => b.classList.toggle("active", b.dataset.catId === catId));
        this.renderAtlasKeywords();
      });
    });
  }

  renderAtlasKeywords() {
    const grid = document.getElementById("atlas-keywords-grid");
    const titleElem = document.getElementById("atlas-active-category-title");
    const descElem = document.getElementById("atlas-active-category-desc");
    const countElem = document.getElementById("atlas-tag-count-indicator");
    if (!grid || typeof DIVISARE_ATLAS_TAXONOMY === "undefined") return;

    const cat = DIVISARE_ATLAS_TAXONOMY.find(c => c.id === this.activeAtlasCategory) || DIVISARE_ATLAS_TAXONOMY[0];
    if (!cat) return;

    if (titleElem) titleElem.textContent = cat.name;
    if (descElem) descElem.textContent = this.currentLang === "zh" ? cat.labelZh : cat.name;
    if (countElem) countElem.textContent = `${cat.tags.length} ${this.currentLang === "zh" ? "標籤項目" : "keywords"}`;

    grid.innerHTML = cat.tags.map(tag => {
      const matchCount = tag.projectIds ? tag.projectIds.length : 0;
      const isSelected = this.activeAtlasTagId === tag.id;
      return `
        <button class="atlas-tag-link ${isSelected ? 'selected' : ''}" data-tag-id="${tag.id}" title="${tag.labelZh}">
          <div class="atlas-tag-info">
            <span class="atlas-tag-name">${tag.name}</span>
            <span class="atlas-tag-zh">${tag.labelZh}</span>
          </div>
          <span class="atlas-tag-count">(${matchCount})</span>
        </button>
      `;
    }).join("");

    grid.querySelectorAll(".atlas-tag-link").forEach(btn => {
      btn.addEventListener("click", () => {
        const tagId = btn.dataset.tagId;
        const tag = cat.tags.find(t => t.id === tagId);
        if (tag) {
          this.selectAtlasTag(tag);
        }
      });
    });
  }

  selectAtlasTag(tag) {
    if (tag.id === "view-all-projects" || tag.isReset) {
      this.resetAtlasFilter();
      return;
    }

    this.activeAtlasTagId = tag.id;
    this.activeAtlasTag = tag;

    // Set atlas tab button active
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    const atlasBtn = document.getElementById("btn-projects-atlas");
    if (atlasBtn) atlasBtn.classList.add("active");
    this.activeCategory = "all";

    // Show active tag pill
    const badge = document.getElementById("active-tag-badge");
    const nameElem = document.getElementById("active-tag-name");
    if (badge && nameElem) {
      nameElem.textContent = `#${tag.name}`;
      badge.style.display = "inline-flex";
    }

    this.closeAtlas();
    this.filterAndRender();

    // Ensure filter row and top of grid are cleanly visible
    const filterSec = document.querySelector(".filter-section");
    if (filterSec) {
      filterSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  resetAtlasFilter() {
    this.activeAtlasTagId = null;
    this.activeAtlasTag = null;

    const badge = document.getElementById("active-tag-badge");
    if (badge) badge.style.display = "none";

    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    const atlasBtn = document.getElementById("btn-projects-atlas");
    if (atlasBtn) atlasBtn.classList.add("active");
    this.activeCategory = "all";

    this.closeAtlas();
    this.filterAndRender();
  }

  toggleAtlas() {
    this.isAtlasOpen = !this.isAtlasOpen;
    const panel = document.getElementById("divisare-atlas-panel");
    const btn = document.getElementById("btn-projects-atlas");
    if (panel) panel.classList.toggle("active", this.isAtlasOpen);
    if (btn) {
      btn.setAttribute("aria-expanded", this.isAtlasOpen);
      const sub = btn.querySelector(".atlas-sub-text");
      if (sub) {
        sub.textContent = this.isAtlasOpen ? (this.currentLang === "zh" ? "全部作品 · 分類標籤 ▴" : "All Exhibits · Taxonomy ▴")
                                           : (this.currentLang === "zh" ? "全部作品 · 分類標籤 ▾" : "All Exhibits · Taxonomy ▾");
      }
    }
    if (this.isAtlasOpen) {
      this.renderAtlasKeywords();
    }
  }

  closeAtlas() {
    this.isAtlasOpen = false;
    const panel = document.getElementById("divisare-atlas-panel");
    const btn = document.getElementById("btn-projects-atlas");
    if (panel) panel.classList.remove("active");
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      const sub = btn.querySelector(".atlas-sub-text");
      if (sub) {
        sub.textContent = this.currentLang === "zh" ? "全部作品 · 分類標籤 ▾" : "All Exhibits · Taxonomy ▾";
      }
    }
  }

  filterByKeywordOrTag(tagName) {
    const clean = tagName.replace(/^#/, "").toLowerCase();
    let found = null;
    if (typeof DIVISARE_ATLAS_TAXONOMY !== "undefined") {
      for (const cat of DIVISARE_ATLAS_TAXONOMY) {
        for (const t of cat.tags) {
          if (t.name.toLowerCase().includes(clean) || clean.includes(t.name.toLowerCase()) || (t.labelZh && t.labelZh.includes(clean))) {
            found = t;
            break;
          }
        }
        if (found) break;
      }
    }

    if (found) {
      this.selectAtlasTag(found);
    } else {
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.value = clean;
        this.searchQuery = clean;
        this.filterAndRender();
      }
    }
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

    // Update Atlas language rendering
    this.renderAtlasCategories();
    this.renderAtlasKeywords();
  }

  filterAndRender() {
    const q = this.searchQuery;
    const cat = this.activeCategory;
    const yr = this.activeYear;
    const atlasTag = this.activeAtlasTag;

    this.filteredProjects = ARCH_PROJECTS.filter(proj => {
      // Atlas Tag Match
      if (atlasTag && Array.isArray(atlasTag.projectIds)) {
        if (!atlasTag.projectIds.includes(proj.id)) return false;
      }

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

  getActiveImagesForProject(proj) {
    if (proj.id in this.customImages) {
      const customList = this.customImages[proj.id];
      if (Array.isArray(customList)) {
        return customList.map((item, i) => ({
          id: item.id || `custom-${i}`,
          src: item.src,
          name: item.name || `Custom Image ${i + 1}`,
          isCustom: true
        }));
      }
    }
    if (proj.drawings && proj.drawings.length > 0) {
      return proj.drawings.map((d, i) => ({
        id: `def-${i}`,
        src: d.src,
        name: (d.label && d.label[this.currentLang]) ? d.label[this.currentLang] : (d.type || `Drawing ${i + 1}`),
        isCustom: false
      }));
    }
    return [{
      id: 'def-0',
      src: proj.defaultImage,
      name: proj.title[this.currentLang],
      isCustom: false
    }];
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
      const activeImages = this.getActiveImagesForProject(proj);
      const isCustom = proj.id in this.customImages;
      const hasImages = activeImages.length > 0;
      const imgSrc = hasImages ? activeImages[0].src : "assets/placeholder-empty.svg";
      const imgCount = activeImages.length;

      const card = document.createElement("article");
      card.className = "project-card";
      card.dataset.id = proj.id;
      card.dataset.index = idx;

      card.innerHTML = `
        <div class="card-image-wrap" data-action="view">
          <img src="${imgSrc}" alt="${proj.title[this.currentLang]}" class="card-img" loading="lazy">
          <div class="card-badges">
            <span class="badge-year">${proj.period} · ${proj.yearLabel[this.currentLang]}</span>
            ${!hasImages ? `
              <span class="badge-custom" style="background: rgba(184, 80, 66, 0.15); color: var(--accent-terra);">
                ● 0 ${t.emptyStateBadge || '尚無圖紙'}
              </span>
            ` : `
              <span class="${isCustom ? 'badge-custom' : 'badge-default'}">
                ${isCustom ? `● ${imgCount} ${t.imgSeqBadge || '圖紙'}` : `○ ${imgCount} ${t.imgSeqBadge || '圖紙'}`}
              </span>
            `}
          </div>
          <div class="card-quick-actions">
            <button class="btn-card-action" data-action="view">
              <span>📖 ${t.viewDetails}</span>
            </button>
            <button class="btn-card-action" data-action="quick-upload" title="${t.quickReplace}">
              <span>📷 ${t.quickReplace}</span>
            </button>
            ${hasImages ? `
              <button class="btn-card-action btn-card-delete" data-action="quick-delete" title="${t.deleteCardImg || '刪除首圖'}">
                <span>🗑 ${t.deleteCardImg || '刪除首圖'}</span>
              </button>
            ` : ''}
            ${isCustom ? `
              <button class="btn-card-action" data-action="quick-reset" title="${t.resetDefaults}">
                <span>↺ ${t.restoreDefault || '恢復預設'}</span>
              </button>
            ` : ''}
            ${hasImages ? `
              <button class="btn-card-action" data-action="open-full" data-src="${imgSrc}" title="${t.zoomHint || '原尺寸預覽'}">
                <span>🔍 ${t.openFullSize || '原尺寸'} ↗</span>
              </button>
            ` : ''}
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
            ${proj.tags.map(tag => `<span class="tag-pill" data-tag="${tag}">#${tag}</span>`).join("")}
          </div>
        </div>
      `;

      // Event handlers
      card.querySelectorAll('[data-action="view"]').forEach(el => {
        el.addEventListener("click", () => this.openReaderModal(idx));
      });

      card.querySelectorAll('.tag-pill').forEach(el => {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          const tName = el.dataset.tag;
          if (tName) this.filterByKeywordOrTag(tName);
        });
      });

      const btnQuickUpload = card.querySelector('[data-action="quick-upload"]');
      if (btnQuickUpload) {
        btnQuickUpload.addEventListener("click", (e) => {
          e.stopPropagation();
          this.triggerQuickUpload(proj.id);
        });
      }

      const btnQuickDelete = card.querySelector('[data-action="quick-delete"]');
      if (btnQuickDelete) {
        btnQuickDelete.addEventListener("click", async (e) => {
          e.stopPropagation();
          await this.quickDeleteProjectImage(proj);
        });
      }

      const btnQuickReset = card.querySelector('[data-action="quick-reset"]');
      if (btnQuickReset) {
        btnQuickReset.addEventListener("click", async (e) => {
          e.stopPropagation();
          await this.resetProjectImage(proj.id);
        });
      }

      const btnOpenFull = card.querySelector('[data-action="open-full"]');
      if (btnOpenFull) {
        btnOpenFull.addEventListener("click", (e) => {
          e.stopPropagation();
          this.openFullSizePreview(btnOpenFull.dataset.src);
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
    const activeImages = this.getActiveImagesForProject(proj);
    const isCustom = proj.id in this.customImages;

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

    // Reset button visibility (shown whenever images have been customized or modified)
    const btnReset = document.getElementById("btn-reset-single-image");
    if (btnReset) {
      btnReset.style.display = isCustom ? "inline-flex" : "none";
    }

    // Render Sequential Vertical Images Stream (依序由上至下排列)
    const streamContainer = document.getElementById("reader-images-stream");
    if (streamContainer) {
      if (activeImages.length === 0) {
        streamContainer.innerHTML = `
          <div class="stream-empty-state">
            <div class="stream-empty-icon">⊘</div>
            <h3 class="stream-empty-title">[ ${t.noDrawingsTitle || '此作品圖紙已全數刪除'} ]</h3>
            <p class="stream-empty-desc">${t.noDrawingsDesc || '目前此作品檔案庫中沒有圖紙。您可以點擊下方按鈕上傳個人新圖紙，或隨時點擊「恢復預設圖紙」還原。'}</p>
            <div class="stream-empty-actions">
              <button class="btn-editorial btn-accent" id="btn-empty-add-img">
                ➕ ${t.btnAddImage || '新增圖片 (由本機選取)'}
              </button>
              <button class="btn-editorial" id="btn-empty-reset-img" style="color: var(--accent-terra);">
                ↺ ${t.resetDefaults || '恢復預設圖紙'}
              </button>
            </div>
          </div>
        `;
        const btnEmptyAdd = streamContainer.querySelector("#btn-empty-add-img");
        if (btnEmptyAdd) {
          btnEmptyAdd.addEventListener("click", () => {
            const input = document.getElementById("reader-image-input");
            if (input) input.click();
          });
        }
        const btnEmptyReset = streamContainer.querySelector("#btn-empty-reset-img");
        if (btnEmptyReset) {
          btnEmptyReset.addEventListener("click", () => this.resetProjectImage(proj.id));
        }
      } else {
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
                <button class="btn-delete-img" data-action="delete-stream-img" data-index="${idx}" title="${t.deleteSingleImg || '刪除此圖'}">
                  🗑 ${t.deleteSingleImg || '刪除此圖'}
                </button>
              </div>
            </div>
            <div class="stream-image-frame" data-action="open-full" data-src="${imgItem.src}" title="${t.zoomHint || '點擊於新分頁開啟原尺寸大圖預覽'}">
              <img src="${imgItem.src}" class="stream-img" alt="${imgItem.name || proj.title[this.currentLang]}" loading="lazy">
              <span class="stream-zoom-badge">🔍 ${t.openFullSize || '原尺寸預覽'} ↗</span>
            </div>
            <div class="stream-img-caption-bar">
              <span>
                ${imgItem.isCustom ? `<strong style="color: #145a54;">[ ${t.customBadge} ]</strong>` : `<span style="color: var(--text-light);">[ ${t.defaultBadge} ]</span>`}
                ${imgItem.name || ''}
              </span>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem;">
                <button class="btn-preview-full" data-action="open-full" data-src="${imgItem.src}" title="${t.zoomHint || '點擊於新分頁開啟原尺寸大圖預覽'}">
                  ↗ ${t.openFullSize || '原尺寸預覽'}
                </button>
                <button class="btn-delete-img" data-action="delete-stream-img" data-index="${idx}" title="${t.deleteSingleImg || '刪除此圖'}">
                  🗑 ${t.deleteSingleImg || '刪除此圖'}
                </button>
              </div>
            </div>
          </div>
        `).join("");

        // Bind Full-Size Image Preview (點擊開啟新分頁原尺寸預覽)
        streamContainer.querySelectorAll('[data-action="open-full"]').forEach(el => {
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            this.openFullSizePreview(el.dataset.src);
          });
        });

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
            await this.deleteImageFromStream(proj.id, targetIdx, activeImages);
          });
        });
      }
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

  // Open Full-Size Image Preview in New Tab (新分頁開啟原尺寸預覽)
  openFullSizePreview(src) {
    if (!src) return;
    if (src.startsWith("data:")) {
      try {
        const parts = src.split(",");
        const mime = parts[0].match(/:(.*?);/)[1];
        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank", "noopener,noreferrer");
        return;
      } catch (e) {
        console.warn("Fallback opening data URL:", e);
      }
    }
    window.open(src, "_blank", "noopener,noreferrer");
  }

  async deleteImageFromStream(projectId, index, currentImages) {
    const t = I18N[this.currentLang];
    const images = currentImages || this.getActiveImagesForProject(ARCH_PROJECTS.find(p => p.id === projectId));
    if (!images || images.length === 0 || index < 0 || index >= images.length) return;

    const itemToDelete = images[index];
    const itemName = itemToDelete ? (itemToDelete.name || `第 ${index + 1} 張`) : `第 ${index + 1} 張`;
    const confirmMsg = this.currentLang === 'zh'
      ? `確定要刪除圖紙「${itemName}」嗎？\n\n（刪除後變更將自動儲存於本機 IndexedDB，若需還原可隨時點擊「恢復預設圖紙」）`
      : `Are you sure you want to delete "${itemName}"?\n\n(Saved locally to IndexedDB. You can restore default drawings anytime.)`;

    if (!confirm(confirmMsg)) return;

    // Filter out the image at index
    const remaining = images.filter((_, i) => i !== index).map(item => ({
      id: item.id || ("img-" + Math.random().toString(36).substr(2, 7)),
      src: item.src,
      name: item.name,
      isCustom: true
    }));

    // Save to storage
    await window.archStorage.saveProjectImages(projectId, remaining);
    this.customImages = await window.archStorage.getAllCustomImages();
    this.filterAndRender();

    if (this.isReaderOpen()) {
      const currentProj = this.filteredProjects[this.currentProjectIndex];
      if (currentProj && currentProj.id === projectId) {
        this.renderReaderModal(currentProj);
      }
    }
  }

  async quickDeleteProjectImage(proj) {
    const t = I18N[this.currentLang];
    const activeImages = this.getActiveImagesForProject(proj);
    if (!activeImages || activeImages.length === 0) {
      alert(this.currentLang === 'zh' ? '此作品目前已無圖紙可刪除。' : 'No drawings available to delete.');
      return;
    }

    const confirmMsg = activeImages.length === 1
      ? (this.currentLang === 'zh'
          ? `確定要刪除「${proj.code} · ${proj.title[this.currentLang]}」的唯一圖紙嗎？\n（隨時可點擊「恢復預設」還原原創圖紙）`
          : `Delete the only drawing from "${proj.code}"? (You can restore default drawings anytime)`)
      : (this.currentLang === 'zh'
          ? `確定要刪除「${proj.code}」目前的封面首圖嗎？\n（目前共有 ${activeImages.length} 張圖紙，刪除後將自動由第 2 張遞補為封面）`
          : `Delete current cover image from "${proj.code}"? (Next image will become cover)`);

    if (!confirm(confirmMsg)) return;

    await this.deleteImageFromStream(proj.id, 0, activeImages);
  }

  async clearAllProjectImages(projectId) {
    const t = I18N[this.currentLang];
    const proj = ARCH_PROJECTS.find(p => p.id === projectId);
    const pTitle = proj ? `${proj.code} · ${proj.title[this.currentLang]}` : projectId;
    const confirmMsg = this.currentLang === 'zh'
      ? `確定要清空「${pTitle}」的所有圖紙嗎？\n（清空後作品將顯示為無圖紙狀態，隨時可按「恢復預設」還原）`
      : `Are you sure you want to remove all drawings from "${pTitle}"?`;

    if (!confirm(confirmMsg)) return;

    await window.archStorage.saveProjectImages(projectId, []);
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
      const activeImages = this.getActiveImagesForProject(proj);
      const isCustom = proj.id in this.customImages;
      const count = activeImages.length;
      const primaryThumb = count > 0 ? activeImages[0].src : "assets/placeholder-empty.svg";

      const row = document.createElement("div");
      row.className = "manager-item";
      row.innerHTML = `
        <div class="manager-header-row">
          <div class="manager-item-info">
            <img src="${primaryThumb}" class="manager-thumb" alt="${proj.code}">
            <div style="min-width: 0;">
              <div class="manager-item-title">${proj.code} · ${proj.title[this.currentLang]}</div>
              <div class="manager-item-meta">
                ${proj.period} · ${isCustom
                  ? `<span style="color: #145a54; font-weight: 700;">● ${count} ${t.imgSeqBadge || '圖紙'} (${t.customBadge})</span>`
                  : `<span style="color: #888;">○ ${count} ${t.imgSeqBadge || '圖紙'} (${t.defaultBadge})</span>`}
              </div>
            </div>
          </div>
          <div class="manager-actions">
            <button class="btn-editorial" data-action="upload-single" data-id="${proj.id}" title="${t.btnAddImage}">
              ➕ ${t.btnAddImage || '新增圖片'}
            </button>
            ${count > 0 ? `
              <button class="btn-editorial" style="color: var(--accent-terra);" data-action="clear-all-proj" data-id="${proj.id}" title="${t.clearAllImages || '清空圖紙'}">
                🗑 ${t.clearAllImages || '清空圖紙'}
              </button>
            ` : ''}
            ${isCustom ? `
              <button class="btn-editorial" data-action="reset-single" data-id="${proj.id}" title="${t.resetDefaults}">
                ↺ ${t.restoreDefault || '恢復預設'}
              </button>
            ` : ''}
          </div>
        </div>

        ${count > 0 ? `
          <div class="manager-thumbs-strip" title="所有圖紙縮圖列表，滑鼠移至圖上可點選 ✕ 刪除特定圖紙">
            ${activeImages.map((img, imgIdx) => `
              <div class="manager-thumb-box" title="${img.name || `圖紙 ${imgIdx + 1}`}">
                <img src="${img.src}" class="manager-thumb-img" alt="${img.name}">
                <button class="btn-thumb-delete" data-action="delete-thumb" data-proj-id="${proj.id}" data-index="${imgIdx}" title="${t.deleteSingleImg || '刪除此圖'}">✕</button>
                <span class="thumb-index-num">${imgIdx + 1}</span>
              </div>
            `).join("")}
          </div>
        ` : `
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-terra); padding-top: 0.2rem;">
            [ 尚無圖紙 · 請點擊「新增圖片」上傳或「恢復預設」還原 ]
          </div>
        `}
      `;

      // Upload button
      row.querySelector('[data-action="upload-single"]').addEventListener("click", () => {
        this.triggerQuickUpload(proj.id);
      });

      // Clear all images button
      const btnClear = row.querySelector('[data-action="clear-all-proj"]');
      if (btnClear) {
        btnClear.addEventListener("click", async () => {
          await this.clearAllProjectImages(proj.id);
          this.openAssetManagerModal(); // refresh manager
        });
      }

      // Reset default button
      const btnReset = row.querySelector('[data-action="reset-single"]');
      if (btnReset) {
        btnReset.addEventListener("click", async () => {
          await this.resetProjectImage(proj.id);
          this.openAssetManagerModal(); // refresh manager
        });
      }

      // Individual thumbnail delete buttons
      row.querySelectorAll('[data-action="delete-thumb"]').forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const targetIdx = parseInt(btn.dataset.index, 10);
          await this.deleteImageFromStream(proj.id, targetIdx, activeImages);
          this.openAssetManagerModal(); // refresh manager
        });
      });

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
