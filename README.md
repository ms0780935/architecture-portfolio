# ARCH / FOLIO — 建築系學生五年學習歷程與設計作品集

> **期末專案作品** · 自然科學與人工智慧課程  
> **風格典範**：參考 [Divisare.com](https://divisare.com/) 極簡編輯排版與直覺式分頁閱讀  
> **核心特色**：11 件作品收錄、雙模式架構（外部瀏覽模式 vs. 編輯者模式）、PROJECTS 建築分類抽屜（60+ 標籤）、IndexedDB 本機圖紙持久化抽換與刪除、Aptos 金屬銀字 LOGO、三模式外觀主題、RWD 響應式排版、全站中英雙語系（i18n）、12 頁現代主義編輯風簡報（HTML / PPTX / PDF）

---

## 🏛️ 專案簡介與設計構想

本專案旨在解決建築系學生在整理五年龐大學習圖紙時，面臨的「更新繁瑣」、「檔案分散」與「國際化展示不易」等痛點。
透過借鑒國際當代建築指標媒體 **Divisare** 的極簡編輯美學，打造一個聚焦於建築圖紙本質、具備優雅排版、沉浸式閱讀體驗的高效作品集檔案庫。

### 📚 作品分類架構（收錄 11 件作品）
1. **時間軸向度 (Timeline)**：五個年級（Year 1 到 Year 5 / 2021 ~ 2025）循序展開
2. **課程向度 (Curriculum Classification)**：
   - **建築設計 (一到五年級)**：從大一基本設計木構感知、大二斜坡集合住宅、大三八斗子潮汐圖書館、大四萬華垂直生態農園，至大五基隆港東岸都市地景縫合畢業設計。
   - **選修科目**：包含參數化微氣候立面（Grasshopper）、歷史街屋測繪（大稻埕）、膠合木折板結構原型，以及依據兩份國宅研究報告提煉新增之「台灣 1970-1980 年代國宅空間原型與大街廓社區批判研究（ELE-440）」。
   - **研究專題**：低密度迎季風面的微氣候與通風風廊 CFD 數值模擬（RES-501）、西門町空間句法（Space Syntax）拓樸分析（RES-402）。
3. **Divisare PROJECTS 建築分類抽屜**：
   - 劃分 8 大本體論領域（ELEMENTS 構件、MATERIALITY 材料工法、TYPES 類型、TOPICS 微氣候、IDEAS 概念、CITIES 基地、PLANS 尺度、SELECTED PROJECTS 專案目錄）。
   - 收錄 60+ 個英文字母排序標籤與展品數量徽章，支援即時交互篩選。

---

## ⚙️ 核心技術與功能實踐

### 1. 本機裝置圖片持久化與非破壞性抽換管理（落實資料管理加分項目 +10分）
- **IndexedDB v2 離線持久化**：整合瀏覽器原生非同步儲存引擎，支援從本機直接拖曳或選取 JPG、PNG、WEBP、SVG 圖紙，重新整理頁面永不丟失。
- **非破壞性追加（Non-Destructive Append）**：上傳新圖紙時自動保留現有預設圖說並追加於底端，並內建 HTML5 Canvas 大圖自動採樣防止配額耗盡。
- **多層級完整刪除機制**：
  * 閱讀器頂端與底端操作列提供「🗑 刪除此圖」與「▲ 上移 / ▼ 下移」即時手動微調。
  * 圖紙全數刪除後顯示極簡空狀態面板「[ 尚無圖紙 · NO ARCHITECTURAL DRAWINGS ]」與「➕ 上傳新圖紙」、「↺ 恢復預設圖紙」。
  * 首頁專案卡片 Hover 提供「🗑 刪除首圖」與「↺ 恢復預設」快捷按鈕。
  * 圖片管理中心提供橫向縮圖條（Thumbnails Strip）與個別刪除按鈕。
- **資料備份與還原**：提供「匯出備份 JSON」與「匯入備份」功能，支援跨裝置移轉。

### 2. 品牌工藝與無障礙感官體驗
- **Aptos 金屬銀字純 CSS 標誌**：本地封裝微軟原廠 Aptos ExtraBold 字型，以負字距（`-0.052em`）、多重金屬銀白光影漸層與實體陰影呈現立體銘牌。
- **三模式主題切換**：支援「☼ 日間」（#fcfbf9 紙本白底）、「☾ 夜間」（#0c0c0c 展覽館深黑）與「🖥 系統」（跟隨 OS 設定），具備預載防閃爍機制。
- **原尺寸新分頁全景預覽**：圖片具備 `cursor: zoom-in`，並提供 Blob URL 技術實現新分頁 100% 原始解析度檢視。

### 3. 12 頁現代主義編輯風簡報系統（16:9 Widescreen）
- **線上簡報網頁**：[https://architecture-portfolio-drab.vercel.app/presentation.html](https://architecture-portfolio-drab.vercel.app/presentation.html)，支援鍵盤方向鍵換頁、九宮格總覽與演講備忘稿。
- **一鍵下載功能**：導覽列直接提供「📥 下載 PPTX」與「📄 下載 PDF」按鈕。
- **可編輯 PPTX 產生器**：使用 Python 自動生成純向量 16:9 PowerPoint 簡報檔。

---

## 🔗 線上部署與成果存取

- **雲端正式網站**：[https://architecture-portfolio-drab.vercel.app/](https://architecture-portfolio-drab.vercel.app/)
- **線上簡報系統**：[https://architecture-portfolio-drab.vercel.app/presentation.html](https://architecture-portfolio-drab.vercel.app/presentation.html)
- **簡報 PDF 檔案**：[https://architecture-portfolio-drab.vercel.app/ppt.pdf](https://architecture-portfolio-drab.vercel.app/ppt.pdf)
- **AI 開發歷程全紀錄**：[docs/AI_DEVELOPMENT_LOG.md](docs/AI_DEVELOPMENT_LOG.md)
- **GitHub 貢獻提交紀錄**：[docs/GITHUB_CONTRIBUTION_RECORD.md](docs/GITHUB_CONTRIBUTION_RECORD.md)
- **課程期末專題認證**：[https://yinchen.tw/zh-TW/courses/ai/final-project](https://yinchen.tw/zh-TW/courses/ai/final-project?member=2725c9bf-67ab-49c3-b3f4-768fdcca503c&lang=zh-Hant-TW#key=kL_jn8jN0gj9fwI0-nMtk4A2Tx7CB74AOlR1Pv79HBA)
