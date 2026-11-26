# 自然科學與人工智慧 · 期末專案 AI 開發歷程紀錄 (AI Development Log)

- **課程名稱**：自然科學與人工智慧
- **學生姓名**：謝易廷（學號：11231167）
- **修課組別**：CD000A 第 2 組（個人組）
- **專案名稱**：ARCH / FOLIO — 建築系學生五年學習歷程與設計作品集系統
- **線上儲存庫**：[https://github.com/ms0780935/architecture-portfolio](https://github.com/ms0780935/architecture-portfolio)
- **雲端正式網站 (Vercel)**：[https://architecture-portfolio-drab.vercel.app/](https://architecture-portfolio-drab.vercel.app/)
- **線上簡報網頁**：[https://architecture-portfolio-drab.vercel.app/presentation.html](https://architecture-portfolio-drab.vercel.app/presentation.html)
- **AI 協作平台**：Google DeepMind Antigravity Agentic Platform (Gemini 2.5 Pro / Flash)
- **紀錄更新日期**：2026-11-26

---

## 一、AI 使用量與對話工程指標統計 (Token Metrics)

| 數據指標 | 統計數值 | 說明與架構意涵 |
| :--- | :--- | :--- |
| **總處理 Token 處理量** | **53,927,939 (53.9M)** | 包含長上下文代碼解析、跨模態架構驗證與迭代推理 |
| **快取讀取 Token (Cache Read Tokens)**| **51,725,732 (51.7M)** | 深度利用長上下文快取複用，大幅提升多輪對話反應效率與架構一致性 |
| **輸入 Token (Input Tokens)** | **1,945,377 (1.94M)** | 詳細規格提示詞、除錯日誌、測試報告與各階段設計指示 |
| **輸出 Token (Output Tokens)** | **256,830 (256K)** | 高精度純靜態前端代碼、CSS 樣式表、JSON 資料庫與雙語詞典 |
| **AI 迭代總步數** | **848+ Steps** | 涵蓋檔案讀寫、語法修復、進程守護、Git 版本提交與自動化測試 |
| **深度對話輪次** | **26+ Conversational Turns** | 跨多天深度迭代之雙向協作工程歷程 |
| **調用子代理人 (Subagents)** | **image-generator (Nano Banana)**<br>**browser (Playwright Chromium)** | 用於建築原創圖紙生成與即時無快取瀏覽器實機視覺驗證 |

> **AI 使用量截圖認證**：`docs/ai_usage_screenshot.png`  
> 截圖直接存取：[https://raw.githubusercontent.com/ms0780935/architecture-portfolio/main/docs/ai_usage_screenshot.png](https://raw.githubusercontent.com/ms0780935/architecture-portfolio/main/docs/ai_usage_screenshot.png)

---

## 二、階段性開發歷程與真實修改紀錄 (Changelog & Milestones)

### 階段一：架構搭建與 Divisare 極簡編輯風格奠定
- **需求**：建立以 [Divisare.com](https://divisare.com/) 為典範的建築作品集系統，具備五年歷程時間軸與雙向檢索維度。
- **AI 實作**：
  - 設計暖白紙本底色 `#fcfbf9`、墨黑文字 `#111111` 與現代襯線字體排版。
  - 建構 10 件五年作品資料庫（`js/data.js`），每件作品收錄結構、材料、氣候概念與圖紙尺度。
- **Commit**：`491d900`, `272b145`

### 階段二：本機持久化儲存引擎（IndexedDB v2）
- **需求**：打破靜態網站限制，讓同學免編程即可拖曳抽換個人 CAD 或手繪圖，重整頁面絕不丟失。
- **AI 實作**：
  - 開發 `js/storage.js`，封裝非同步 IndexedDB v2 資料庫，儲存客製圖紙。
  - 支援拖曳上傳、多圖選取、圖紙重設與全站資料 JSON 備份匯出／匯入。
- **Commit**：`aa53bb0`

### 階段三：全站中英雙語 i18n 與時間軸／選修雙向連動
- **需求**：支援 0.1 秒無刷新切換中英雙語，適應國際競圖與申請研究所需求。
- **AI 實作**：
  - 建立雙語詞庫與資料集，同步切換標題、專案論述與圖說。
  - 設計「一至五年級等高線」與「建築設計／選修／研究」雙向連動篩選。
- **Commit**：`a3b8b05`

### 階段四：分頁垂直多圖串流（Vertical Stream）與手動排序
- **需求**：單圖展示不足以交代完整設計，需支援直式多圖依序瀏覽與手動調整順序。
- **AI 實作**：
  - 重構彈窗為垂直串流 `.reader-images-stream`。
  - 每張圖片新增「▲ 上移」與「▼ 下移」即時排序控制項，同步寫入 IndexedDB。
- **Commit**：`68bca17`, `c9006cf`

### 階段五：Aptos 原廠金屬銀字純 CSS 標誌
- **需求**：替換點陣圖，以微軟原廠 Aptos 字型製作立體金屬銀色文字 LOGO。
- **AI 實作**：
  - 本地封裝 Aptos ExtraBold 字型檔，以純 CSS（`-0.052em` 緊密字距）打造多重金屬光澤漸層與陰影銘牌。
- **Commit**：`757479f`

### 階段六：Divisare 風格三模式主題切換
- **需求**：支援日間紙本白底、夜間展覽館黑底與跟隨系統個人模式三態切換。
- **AI 實作**：
  - 導入 CSS 變數系統，支援 `data-theme="light"`（#fcfbf9）、`data-theme="dark"`（#0c0c0c）與 `data-theme="auto"`，於 `<head>` 注入防閃爍預載腳本。
- **Commit**：`75b7978`

### 階段七：作品圖紙點擊開啟新分頁原尺寸大圖預覽
- **需求**：建築圖紙需支援高解析度 100% 原始比例檢視細節。
- **AI 實作**：
  - 設置圖片 `cursor: zoom-in`，並在右上角提供「↗ 原尺寸預覽」按鈕，以 Blob Object URL 技術實現安全無跨域新分頁全景預覽。
- **Commit**：`6a0c265`

### 階段八：極簡幾何符號化優化
- **需求**：簡化彈窗導覽為純幾何符號，極大化圖紙閱讀視野。
- **AI 實作**：
  - 將文字按鈕改為純幾何箭頭 `←` / `→`，關閉按鈕改為純符號 `✕`。
- **Commit**：`d60adbe`

### 階段九：Divisare PROJECTS 建築本體論分類抽屜（Atlas Taxonomy）
- **需求**：替代單調的全部作品按鈕，打造具有 8 大領域與 60+ 專業標籤的雙欄索引抽屜。
- **AI 實作**：
  - 左欄劃分 ELEMENTS、MATERIALITY、TYPES、TOPICS、IDEAS、CITIES、PLANS、SELECTED PROJECTS。
  - 右欄三欄式排版 60+ 字母排序關鍵詞與展品數量徽章，點擊自動過濾並浮現可清除的 `#標籤 ✕` 藥丸按鈕。
- **Commit**：`8ea8ad1`, `a70d4b1`

### 階段十：Nano Banana 跨模態文本生成出版級原創圖紙
- **需求**：為缺少高解析圖說之專案繪製具備真實紙質與尺度的出版級圖紙。
- **AI 實作**：
  - 調用 Gemini 2.5 Flash Image（Nano Banana）繪製：
    * ARC-302 八斗子 1:200 耐候鋼懸挑剖面
    * ARC-500 基隆港東岸 3 公里縫合總圖
    * ELE-430 1:20 柳杉折板屋架榫接大樣
    * RES-402 西門町 DepthmapX 空間句法熱力圖
- **Commit**：`f040cea`

### 階段十一：Google Docs 論文提煉新增大四選修 ELE-440 國宅專案
- **需求**：依據兩份 Google Docs 研究報告（《國宅空間原型》與《大街廓國宅社區》），提煉內容新增大四選修專案；並將 RES-501 改名為《低密度迎季風面的微氣候與通風風廊 CFD 數值模擬》。
- **AI 實作**：
  - 深度提煉柯比意光輝城市與雷特朋理論，創建 ELE-440 專案與 1:50 原型向量圖紙。
  - 精確修正 RES-501 題目與 OpenFOAM 向量圖。
- **Commit**：`aa88b9b`, `2d77f4c`, `7415e38`

### 階段十二：作品集多層級圖片刪除功能實作
- **需求**：完整提供作品集中單張圖紙刪除、首圖刪除、批次清空與恢復預設功能。
- **AI 實作**：
  - 閱讀器彈窗頂端與底端配置「🗑 刪除此圖」按鈕。
  - 當所有圖紙刪除後呈現極簡空狀態面板「[ 尚無圖紙 · NO ARCHITECTURAL DRAWINGS ]」與「➕ 上傳新圖紙」、「↺ 恢復預設圖紙」。
  - 圖片管理中心新增縮圖條（Thumbnails Strip）與個別刪除叉號。
- **Commit**：`0da3a2d`

### 階段十三：本機上傳引擎除錯與非破壞性追加（Non-Destructive Append）
- **需求**：修復線上拖曳上傳失效問題，且上傳新圖紙時應保留現有預設圖說，而非直接覆蓋。
- **AI 實作**：
  - 修復 `js/storage.js` 讀取未客製專案時 `null.length` 異常。
  - 將上傳邏輯改為非破壞性追加（3 張預設圖 + 1 張上傳 = 4 張依序呈現）。
  - 導入 HTML5 Canvas 自動採樣（> 2560px 或 > 1.5MB 自動平滑縮放），防止 IndexedDB 配額耗盡。
- **Commit**：`0c5495c`, `104eb62`, `81ab7c0`

### 階段十四：12 頁 16:9 Modernist Editorial 簡報系統與自動化交件
- **需求**：參考使用者手繪塗鴉風格（Cobalt Blue Doodles）產出 12 頁簡報網頁與可編輯 16:9 PPTX / PDF，並完成課程平台交件。
- **AI 實作**：
  - 打造 `presentation.html`，具備鍵盤換頁、九宮格總覽與演講備忘稿（Speaker Notes）。
  - 編寫 Python 自動化產生器輸出 `architecture_portfolio_presentation.pptx` 與印刷級 `ppt.pdf`。
  - 透過課程後端 API（PATCH 二進位串流）完成交件（第 13 版，`hasPresentationFile: true`）。
- **Commit**：`7a1fcef`, `29e809d`, `35918d1`

---

## 三、真實除錯與自主解決挑戰實錄 (Troubleshooting Log)

1. **Windows PowerShell 語法相容問題**：
   - *現象*：在 Windows 環境下使用 `&&` 串接命令會觸發 PowerShell 解析器錯誤。
   - *解決*：改用分號 `;` 串接或編寫封閉式 Python 腳本執行多步檔案與 Git 操作。
2. **本機 Webview 舊快取資料未更新**：
   - *現象*：修改 `js/data.js` 與 `js/app.js` 後，本機快取導致畫面未即時反映最新專案。
   - *解決*：在 `index.html` 引入版本號查詢字串（`?v=2.2`），並調用 Playwright 子代理人以無快取模式進行視覺確認。
3. **夜間模式下長篇論述對比度不足**：
   - *現象*：`.essay-body` 樣式先前硬編碼為 `#222`，切換至黑底夜間模式時文字無法閱讀。
   - *解決*：重構為動態語意變數 `color: var(--text-main)`，白底時為深墨黑（`#111111`），黑底時自動轉為亮白（`#f2f2f2`）。
4. **本機圖片上傳 `TypeError` 阻斷**：
   - *現象*：上傳新照片時，未曾修改過圖紙的專案在 IndexedDB 中回傳 `null`，引發 `Cannot read properties of null (reading 'length')`。
   - *解決*：在 `js/storage.js` 的 `addImageToProject` 與 `removeImageAt` 加入防禦性數組檢查，保證容錯穩定性。
