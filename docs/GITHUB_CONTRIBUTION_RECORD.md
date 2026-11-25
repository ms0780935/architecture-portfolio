# 自然科學與人工智慧 · GitHub 貢獻紀錄 (GitHub Contribution Record)

- **學生姓名**：謝易廷（學號：11231167）
- **修課組別**：CD000A 第 2 組（單人組）
- **GitHub 使用者帳號**：[@ms0780935](https://github.com/ms0780935)
- **專案 GitHub 儲存庫**：[https://github.com/ms0780935/architecture-portfolio](https://github.com/ms0780935/architecture-portfolio)
- **主要工作分支**：`main`
- **提交歷史完整連結**：[https://github.com/ms0780935/architecture-portfolio/commits/main](https://github.com/ms0780935/architecture-portfolio/commits/main)

---

## 一、個人貢獻工作說明 (Individual Contribution & Work)

作為本專案主要開發者，負責統籌整體系統規格並與 Google DeepMind Antigravity AI Agent 進行 26 輪、848 步驟之深度協作：

1. **架構規劃與風格決策**：
   - 提出以國際指標建築平台 [Divisare.com](https://divisare.com/) 為典範的純粹排版風格，設計大一至大五歷年時間軸與「建築設計／選修課程／研究專題」雙向檢索維度。
2. **本機裝置圖片抽換機制設計**：
   - 指導設計並驗證瀏覽器原生 IndexedDB v2 非同步儲存引擎，讓建築系學生能隨時從電腦拖曳、抽換個人圖紙，並在離線或重新整理時完整保留。
3. **分頁垂直串流與互動手動排序**：
   - 開立多圖直式由上至下展示（Vertical Stream）需求，實作 `▲ 上移`、`▼ 下移` 手動微調按鈕，以及底端一次多選批次新增功能。
4. **高階金屬視覺與三模式主題實踐**：
   - 提供頂部 Aptos 字體金屬銀色 `PORTFOLIO` 標誌之參考圖片樣式，並導入白底日間、黑底夜間、跟隨系統個人模式的三態切換開關。
5. **圖紙高解析度檢視與極簡符號優化**：
   - 提出圖片點擊新分頁開啟原尺寸大圖預覽（`zoom-in`），並將分頁導覽精簡為純幾何箭頭（`←` / `→`）與純符號關閉（`✕`）。
6. **專題成果提交與雲端同步**：
   - 維護 Git Commit 歷程、產出 12 頁專業期末簡報（.pptx），並成功對接課程期末專題 API。

---

## 二、Git Commit 提交歷程總表 (Commit Log)

| Commit Hash | 提交說明 (Commit Message) | 核心異動檔案 |
| :--- | :--- | :--- |
| **`d60adbe`** | Update reader modal navigation to pure arrows and close to pure cross symbol | `index.html`, `css/style.css` |
| **`6a0c265`** | Add click-to-preview full-size image in new tab for stream images and project cards | `index.html`, `css/style.css`, `js/app.js`, `js/data.js` |
| **`b80f450`** | Add 3 architectural images (drawing, physical model, spatial atmosphere) for Project 1 ARC-101 | `assets/project-1-drawing.svg`, `assets/project-1-model.jpg`, `assets/project-1-space.jpg`, `js/data.js` |
| **`75b7978`** | Add Divisare-style 3-mode theme switcher (Day light white, Night dark black, System auto) | `index.html`, `css/style.css`, `js/app.js`, `js/data.js` |
| **`757479f`** | Update top-left header logo to pure text metallic silver PORTFOLIO in Aptos font | `assets/fonts/Aptos_*.ttf`, `index.html`, `css/style.css`, `js/data.js` |
| **`c9006cf`** | Add manual photo reordering (move up/down) and bottom add button in reader stream | `index.html`, `css/style.css`, `js/app.js`, `js/data.js` |
| **`a3b8b05`** | Add 3 field survey photos and 3 measured drawings for Dadaocheng shophouses (Project 7) | `assets/dadaocheng-*.jpg`, `assets/dadaocheng-*.svg`, `js/data.js` |
| **`68bca17`** | Add multi-image support with sequential vertical layout across all project dossiers | `index.html`, `css/style.css`, `js/app.js`, `js/storage.js` |
| **`52858ce`** | Add Gemini-generated parametric shading facade render and update project 6 | `assets/project-6-parametric.jpg`, `js/data.js` |
| **`43bf77f`** | Update advisor to 周榮敬 建築師 for Year 4 Studio | `js/data.js` |
| **`aa53bb0`** | Initial commit: ARCH/FOLIO architecture portfolio with divisare layout, device image replacer, i18n, rwd, and presentation | `index.html`, `css/style.css`, `js/app.js`, `js/storage.js`, `js/data.js`, `architecture_portfolio_presentation.pptx` |

---

## 三、GitHub 貢獻直接證明連結
- **最新版本 Commit 頁面**：[https://github.com/ms0780935/architecture-portfolio/commit/d60adbe](https://github.com/ms0780935/architecture-portfolio/commit/d60adbe)
- **提交者驗證**：GitHub 認證作者 `ms0780935`
