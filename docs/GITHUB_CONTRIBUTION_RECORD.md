# 自然科學與人工智慧 · GitHub 貢獻紀錄 (GitHub Contribution Record)

- **學生姓名**：謝易廷（學號：11231167）
- **修課組別**：CD000A 第 2 組（個人組）
- **GitHub 使用者帳號**：[@ms0780935](https://github.com/ms0780935)
- **專案 GitHub 儲存庫**：[https://github.com/ms0780935/architecture-portfolio](https://github.com/ms0780935/architecture-portfolio)
- **主要工作分支**：`main`
- **提交歷史完整連結**：[https://github.com/ms0780935/architecture-portfolio/commits/main](https://github.com/ms0780935/architecture-portfolio/commits/main)

---

## 一、個人貢獻工作說明 (Individual Contribution & Work)

作為本專案主要開發者與決策者，負責統籌整體系統規格並與 Google DeepMind Antigravity AI Agent 進行 26 輪、848 步驟之深度協作：

1. **架構規劃與風格決策**：
   - 提出以國際指標建築平台 [Divisare.com](https://divisare.com/) 為典範的純粹排版風格，設計大一至大五歷年時間軸與「建築設計／選修課程／研究專題」雙向檢索維度。
2. **本機裝置圖片持久化與非破壞性管理**：
   - 指導設計並驗證瀏覽器原生 IndexedDB v2 非同步儲存引擎，支援拖曳抽換個人圖紙，並實作「非破壞性追加（保留原圖紙並向後擴充）」與「完整多層級圖片刪除（單張刪除、首圖刪除、清空與空狀態）」。
3. **分頁垂直串流與互動手動排序**：
   - 開立多圖直式由上至下展示（Vertical Stream）需求，實作 `▲ 上移`、`▼ 下移` 手動微調按鈕，以及底端一次多選批次新增功能。
4. **高階金屬視覺與三模式主題實踐**：
   - 提供頂部 Aptos 字體金屬銀色 `PORTFOLIO` 標誌之參考圖片樣式，並導入白底日間、黑底夜間、跟隨系統個人模式的三態切換開關。
5. **圖紙高解析度檢視與極簡符號優化**：
   - 提出圖片點擊新分頁開啟原尺寸大圖預覽（`zoom-in`），並將分頁導覽精簡為純幾何箭頭（`←` / `→`）與純符號關閉（`✕`）。
6. **Divisare PROJECTS 建築本體論分類索引抽屜**：
   - 提出雙欄分類抽屜架構，整合 8 大建築領域分類（構件、材料、類型、微氣候、概念、基地、尺度、專案）與 60+ 個關鍵字篩選標籤。
7. **專業文本提煉與多模態圖紙生成**：
   - 指導提煉兩份 Google Docs 國宅研究報告，擴充大四選修專案 ELE-440；精確對齊 RES-501 微氣候 CFD 題目；並調用 Nano Banana 繪製出版級建築工程圖紙。
8. **12 頁現代主義編輯風簡報與自動化交件**：
   - 依據手繪塗鴉風格確立 12 頁 16:9 簡報，產出網頁版（`presentation.html`）、PowerPoint（`.pptx`）與 PDF，並成功透過課程 API 完成上傳與交件驗證。
9. **雙模式架構（編輯者模式 vs. 外部瀏覽模式）與安全隔離**：
   - 提出雙模式設計理念，預設外部訪客為純粹畫廊檢視（徹底隱藏所有刪除、上傳、排序控制項），學生本人可一鍵切換或透過鍵盤 <kbd>E</kbd> 鍵解鎖完整管理面板。
10. **首頁介面極簡純粹化**：
   - 決策移除首頁頂部簡報外部連結與評量自評彈窗，使首頁展現國際頂級建築畫廊之優雅沉浸體驗，同時在雲端維持獨立簡報路由。

---

## 二、Git Commit 提交歷程總表 (Commit Log)

| Commit Hash | 提交說明 (Commit Message) | 核心異動檔案 |
| :--- | :--- | :--- |
| **`ca75197`** | feat: Remove 12-slide presentation and rubric modal from main portfolio page | `index.html` |
| **`4a6a9c5`** | fix: Ensure stream-img-actions and bottom add bar are hidden in viewer mode and fix dark theme active pill | `css/style.css` |
| **`574c08e`** | feat: Implement Dual-Mode Architecture (Viewer Mode vs. Editor Mode with hotkey E) | `index.html`, `css/style.css`, `js/app.js`, `js/data.js` |
| **`07c9a93`** | docs: Update AI usage screenshot to 134.0M tokens and 2285 agent steps | `docs/ai_usage_screenshot.png` |
| **`7d27529`** | docs: Update AI development log, GitHub contribution record, and README with full project evolution | `docs/*`, `README.md` |
| **`35918d1`** | feat: Add direct PPTX and PDF download buttons to presentation deck header | `presentation.html`, `ppt.pdf` |
| **`81ab7c0`** | style: Set project-1-drawing.svg as primary default image for ARC-101 | `js/data.js` |
| **`104eb62`** | feat: Non-destructive image addition that preserves default drawings and appends new photos | `js/app.js` |
| **`0c5495c`** | fix: Resolve null reference in addImageToProject and enhance mobile/desktop file upload pipeline | `js/storage.js`, `js/app.js` |
| **`0da3a2d`** | feat: Implement comprehensive image deletion in dossier reader, cards, and asset manager | `index.html`, `css/style.css`, `js/app.js`, `js/storage.js` |
| **`29e809d`** | feat: Translate 12-slide presentation into 16:9 editable PowerPoint (.pptx) with speaker notes | `build_presentation_pptx.py`, `architecture_portfolio_presentation.pptx` |
| **`5f15b5e`** | style: Optimize proportional scaling and typography in grid contact sheet mode | `presentation.html` |
| **`7a1fcef`** | feat: Add 12-slide interactive presentation web deck based on user reference style | `presentation.html` |
| **`7415e38`** | style: Refine typography spacing in project-11.svg placeholder drawing | `assets/project-11.svg` |
| **`2d77f4c`** | feat: Add ELE-440 Taiwan 1970-1980s Public Housing Spatial Prototype & Superblock Study to Year 4 Elective | `js/data.js`, `assets/project-11.svg` |
| **`aa88b9b`** | feat: Update RES-501 title to 低密度迎季風面的微氣候與通風風廊 CFD 數值模擬 and align descriptions | `js/data.js`, `assets/project-10.svg` |
| **`d3a458d`** | fix: Use var(--text-main) for essay-body to ensure crisp contrast in night mode | `css/style.css` |
| **`f040cea`** | feat: Add Nano Banana original architectural drawings and comprehensive narratives for ARC-302, ARC-500, ELE-430, and RES-402 | `assets/*.jpg`, `js/data.js` |
| **`a70d4b1`** | refactor: Enhance atlas tag clear hit target, scroll margin, and cache-busting asset versions | `index.html`, `css/style.css`, `js/app.js` |
| **`8ea8ad1`** | feat: Add Divisare-style PROJECTS architectural atlas taxonomy and tag classification system | `index.html`, `css/style.css`, `js/app.js` |
| **`926484b`** | docs: Add AI development log, contribution record, and usage metrics | `docs/*` |
| **`d60adbe`** | style: Update reader modal navigation to pure arrows and close to pure cross symbol | `index.html`, `css/style.css` |
| **`6a0c265`** | feat: Add click-to-preview full-size image in new tab for stream images and project cards | `index.html`, `css/style.css`, `js/app.js`, `js/data.js` |
| **`b80f450`** | feat: Add 3 architectural images (drawing, physical model, spatial atmosphere) for Project 1 ARC-101 | `assets/*`, `js/data.js` |
| **`75b7978`** | feat: Add Divisare-style 3-mode theme switcher (Day light white, Night dark black, System auto) | `index.html`, `css/style.css`, `js/app.js`, `js/data.js` |
| **`757479f`** | style: Update top-left header logo to pure text metallic silver PORTFOLIO in Aptos font | `index.html`, `css/style.css` |
| **`c9006cf`** | feat: Add manual photo reordering (move up/down) and bottom add button in reader stream | `index.html`, `css/style.css`, `js/app.js` |
| **`a3b8b05`** | feat: Add 3 field survey photos and 3 measured drawings for Dadaocheng shophouses (Project 7) | `assets/*`, `js/data.js` |
| **`68bca17`** | feat: Add multi-image support with sequential vertical layout across all project dossiers | `index.html`, `css/style.css`, `js/app.js` |
| **`52858ce`** | feat: Add Gemini-generated parametric shading facade render and update project 6 | `assets/*`, `js/data.js` |
| **`491d900`** | feat: Add 10 comprehensive architectural dossiers spanning 5 years with bilingual content | `js/data.js` |
| **`272b145`** | feat: Initialize architectural portfolio in Divisare editorial style with keyboard modal reader | `index.html`, `css/style.css`, `js/app.js` |
