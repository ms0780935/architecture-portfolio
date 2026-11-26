#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate 12-Slide 16:9 Widescreen PowerPoint Presentation
Matching the Modernist Editorial Blueprint Aesthetic of presentation.html
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# Paths
BASE_DIR = r"C:\Users\USER\.gemini\antigravity\scratch\architecture-portfolio"
OUTPUT_PPTX = os.path.join(BASE_DIR, "architecture_portfolio_presentation.pptx")
DESKTOP_PPTX = os.path.join(r"C:\Users\USER\Desktop", "architecture_portfolio_presentation.pptx")

# Color Palette (Matching Reference & presentation.html)
COBALT = RGBColor(22, 56, 214)        # #1638d6 Electric Cobalt Blue
COBALT_SOFT = RGBColor(232, 236, 252) # #e8ecfc Soft Blue
TEXT_MAIN = RGBColor(15, 23, 42)      # #0f172a Ink Dark
TEXT_BODY = RGBColor(51, 65, 85)      # #334155 Slate Body
TEXT_MUTED = RGBColor(100, 116, 139)  # #64748b Muted Slate
BORDER_LIGHT = RGBColor(229, 229, 224) # #e5e5e0
CARD_BG = RGBColor(251, 251, 250)     # #fbfbfa
WHITE = RGBColor(255, 255, 255)
GREEN = RGBColor(16, 185, 129)        # #10b981
DARK_TERMINAL = RGBColor(30, 30, 36)

# Fonts
FONT_HEADING = "Aptos"
FONT_SANS = "Noto Sans TC"
FONT_MONO = "JetBrains Mono"

# Speaker Notes Dictionary (Matching presentation.html)
SPEAKER_NOTES = {
    1: "【第 1 頁 封面導言】各位評審老師好，我是建築系五年級謝易廷（學號 11231167）。今天向大家呈現的是自然科學與人工智慧期末專案成果報告：ARCH/FOLIO 建築系五年學習歷程與作品集系統。本案以歐洲指標建築平台 Divisare.com 為典範，結合本機持久化圖片管理與跨模態 AI 輔助，提供完全屬於建築學生的專業作品檔案庫。",
    2: "【第 2 頁 專案緣起】傳統建築系學生在做作品集時，常面臨三大困境：紙本印製成本昂貴且不易攜帶、現成網頁模板缺乏建築專業圖說閱讀節奏，以及申請國際競圖時單一語言受限。本系統以純黑白極簡留白、大尺度圖紙框與一至五年級時間軸，打造專屬建築專業的沉浸式閱讀體驗。",
    3: "【第 3 頁 GitHub 開源貢獻】專案自初始化起即進行嚴格的 Git 版本控制，累積超過 16 次結構性 Commit。包含架構搭建、Aptos 金屬銀色標誌製作、Divisare PROJECTS 分類抽屜、夜間對比度修復以及國宅研究專案新增，全數符合 Conventional Commits 語意化提交規範，清楚呈現個人自主開發軌跡。",
    4: "【第 4 頁 AI 使用量與對話工程】在 AI 協同開發方面，本專案共經歷 26 輪深度對話、848 步驟迭代，總處理 Token 達 53.9M。更重要的是導入了上下文快取機制（51.7M Cache Read），並整合 Gemini 2.5 Flash Image（Nano Banana）生成出版級工程圖紙，以及呼叫 Playwright 瀏覽器子代理人進行超過 20 次真實視覺驗證。",
    5: "【第 5 頁 Vercel 發布與核心功能】專案採用純靜態架構，具備 vercel.json 邊緣節點加速。全站完整收錄 11 件作品，彈窗閱讀器具備鍵盤左右鍵（← / →）流暢換頁、Esc 關閉與 URL Hash 深層連結綁定（如 #proj-11），點擊任何連結皆可秒級直達專案檔案。",
    6: "【第 6 頁 Divisare Atlas 分類索引抽屜】為了替代傳統單調的全部作品按鈕，我們開發了 PROJECTS 分類抽屜。左欄劃分 8 大類別（包含構件、材料、類型、氣候、概念、基地、圖紙尺度與專案目錄）；右欄具備 60+ 個英文字母排序標籤與數量徽章，點擊即可即時過濾，並在上方顯示 #標籤名 ✕ 藥丸按鈕。",
    7: "【第 7 頁 錯誤排除與自主修復】在開發過程中，AI 展現了高度自主的除錯能力：解決 Windows PowerShell 不支援 && 語法問題、終止 Port 8080 衝突進程、導入 ?v=2.2 查詢字串化解瀏覽器快取舊資料問題，並將夜間模式長篇論述的硬編碼文字顏色替換為動態 CSS 變數，保證高對比度無障礙閱讀。",
    8: "【第 8 頁 階段性開發時間軸】開發歷程可分為三大關鍵階段：第一階段完成 Divisare 網格、資料庫與 IndexedDB v2 儲存引擎；第二階段導入 Aptos 金屬銀字 LOGO、三模式主題與垂直多圖手動排序；第三階段實作 PROJECTS 分類抽屜、Nano Banana 出版級圖紙生成，並提煉兩份國宅報告擴充 ELE-440。",
    9: "【第 9 頁 品牌細節與三模式外觀】我們依據使用者提供的參考樣式，以微軟原廠 Aptos 字型製作純 CSS 向量金屬銀色立體 PORTFOLIO 標誌（字距 -0.052em）；同時實作 Divisare 日間（暖白紙本）、夜間（深邃展覽館）與系統個人模式三態切換，導覽按鈕亦徹底精簡為純幾何符號。",
    10: "【第 10 頁 本機裝置圖片管理】本案最具實用性的創新在於「本機裝置圖片管理中心」。利用瀏覽器原生 IndexedDB v2，同學可隨時拖曳抽換個人 CAD 或手繪圖，重整頁面絕不丟失；閱讀器內部更支援直式多圖依序排列、▲上移/▼下移手動調動順序、底端批次多圖新增，以及一鍵開啟新分頁 100% 原尺寸預覽。",
    11: "【第 11 頁 文本生成圖紙與跨文件提煉】展示多模態 AI 的強大生成力：Nano Banana 原創工程圖紙精準還原八斗子 16 米懸挑、基隆港 3 公里縫合甲板與西門町空間句法熱力圖；更進一步由 Google Docs 兩份研究報告提煉柯比意光輝城市與雷特朋人車分道理論，新創 ELE-440 準則國宅空間形態學研究。",
    12: "【第 12 頁 期末評量自檢與總結】對照課程期末評量標準，基本要求 60 分滿分、加分項目 +40 分滿分，全數 100 分指標均獲完整實踐與存證。課程平台 API 經同步驗證為第 4 修訂版。以上為本次期末專題成果報告，謝謝大家，請各位老師不吝指教！"
}


def create_deck():
    prs = Presentation()
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    def add_header(slide, tag_text, right_text):
        # Top hairline rule
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.85), Inches(11.733), Inches(0.015))
        line.fill.solid()
        line.fill.fore_color.rgb = BORDER_LIGHT
        line.line.color.rgb = BORDER_LIGHT

        # Left meta tag
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(7.0), Inches(0.35))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = tag_text
        p.font.name = FONT_MONO
        p.font.size = Pt(9)
        p.font.color.rgb = COBALT
        p.font.bold = True

        # Right date/meta
        tb_r = slide.shapes.add_textbox(Inches(8.0), Inches(0.5), Inches(4.533), Inches(0.35))
        tf_r = tb_r.text_frame
        tf_r.word_wrap = True
        tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0
        p_r = tf_r.paragraphs[0]
        p_r.alignment = PP_ALIGN.RIGHT
        p_r.text = right_text
        p_r.font.name = FONT_MONO
        p_r.font.size = Pt(9)
        p_r.font.color.rgb = TEXT_MUTED

    def add_footer(slide, slide_num, total=12, badge="NATURAL SCIENCE & AI COURSE REPORT"):
        # Bottom hairline rule
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.8), Inches(11.733), Inches(0.015))
        line.fill.solid()
        line.fill.fore_color.rgb = BORDER_LIGHT
        line.line.color.rgb = BORDER_LIGHT

        # Left slide number
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(6.9), Inches(3.0), Inches(0.35))
        tf = tb.text_frame
        p = tf.paragraphs[0]
        p.text = f"{str(slide_num).zfill(2)} / {str(total).zfill(2)} · SLIDE"
        p.font.name = FONT_MONO
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_MUTED

        # Center badge
        tb_c = slide.shapes.add_textbox(Inches(4.0), Inches(6.9), Inches(5.333), Inches(0.35))
        tf_c = tb_c.text_frame
        p_c = tf_c.paragraphs[0]
        p_c.alignment = PP_ALIGN.CENTER
        p_c.text = badge
        p_c.font.name = FONT_MONO
        p_c.font.size = Pt(8.5)
        p_c.font.color.rgb = COBALT
        p_c.font.bold = True

        # Right author
        tb_r = slide.shapes.add_textbox(Inches(9.533), Inches(6.9), Inches(3.0), Inches(0.35))
        tf_r = tb_r.text_frame
        p_r = tf_r.paragraphs[0]
        p_r.alignment = PP_ALIGN.RIGHT
        p_r.text = "謝易廷 · 11231167"
        p_r.font.name = FONT_MONO
        p_r.font.size = Pt(8.5)
        p_r.font.color.rgb = TEXT_MUTED

    def add_doodle_oval(slide, left, top, width, height):
        oval = slide.shapes.add_shape(MSO_SHAPE.OVAL, left, top, width, height)
        oval.fill.background()
        oval.line.color.rgb = COBALT
        oval.line.width = Pt(2.2)
        return oval

    def add_marker_line(slide, left, top, width):
        marker = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, Inches(0.06))
        marker.fill.solid()
        marker.fill.fore_color.rgb = COBALT
        marker.line.color.rgb = COBALT
        return marker

    def add_image_card(slide, rel_path, left, top, width, height, caption=""):
        abs_path = os.path.join(BASE_DIR, rel_path)
        if not os.path.exists(abs_path):
            abs_path = os.path.join(BASE_DIR, "docs", rel_path)
        if not os.path.exists(abs_path):
            print(f"Warning: Image not found: {abs_path}")
            return None

        # Add image
        pic = slide.shapes.add_picture(abs_path, left, top, width, height)
        
        # Add thin border
        border = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
        border.fill.background()
        border.line.color.rgb = BORDER_LIGHT
        border.line.width = Pt(1)

        # Caption
        if caption:
            cap_box = slide.shapes.add_textbox(left, top + height - Inches(0.35), width, Inches(0.35))
            tf = cap_box.text_frame
            tf.word_wrap = True
            tf.margin_left = Inches(0.1)
            tf.margin_top = Inches(0.05)
            # Background fill
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top + height - Inches(0.35), width, Inches(0.35))
            bg.fill.solid()
            bg.fill.fore_color.rgb = WHITE
            bg.line.color.rgb = BORDER_LIGHT
            bg.line.width = Pt(0.5)
            # Text on top
            p = tf.paragraphs[0]
            p.text = caption
            p.font.name = FONT_MONO
            p.font.size = Pt(8)
            p.font.color.rgb = TEXT_BODY
        return pic

    # =========================================================================
    # SLIDE 01: COVER (2026 project proposal)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    s1.notes_slide.notes_text_frame.text = SPEAKER_NOTES[1]
    add_header(s1, "COURSE FINAL PROJECT · NATURAL SCIENCE & ARTIFICIAL INTELLIGENCE", "2026.11 · SEMESTER FINAL")

    # Left Column: Titles & Student Card
    # Year
    tb_yr = s1.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(4.0), Inches(0.4))
    p = tb_yr.text_frame.paragraphs[0]
    p.text = "2026"
    p.font.name = FONT_MONO
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = COBALT

    # Display Title
    tb_title = s1.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(5.8), Inches(0.9))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "project proposal"
    p.font.name = FONT_HEADING
    p.font.size = Pt(38)
    p.font.bold = True
    p.font.color.rgb = COBALT

    # Hand-drawn Oval Doodle around title
    add_doodle_oval(s1, Inches(0.68), Inches(1.48), Inches(5.4), Inches(0.95))

    # Lead text
    tb_lead = s1.shapes.add_textbox(Inches(0.8), Inches(2.6), Inches(5.8), Inches(1.8))
    tf = tb_lead.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = "ARCH / FOLIO — 建築系學生五年學習歷程與設計作品集系統"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_MAIN
    p0.space_after = Pt(10)

    p1 = tf.add_paragraph()
    p1.text = "以歐洲現代建築平台 Divisare.com 為典範。結合一至五年級歷年時間軸、IndexedDB 瀏覽器原生本機持久化圖片抽換、全站中英雙語系，以及 60+ 專業建築形態學與構造分類索引系統。"
    p1.font.name = FONT_SANS
    p1.font.size = Pt(10.5)
    p1.font.color.rgb = TEXT_BODY
    p1.line_spacing = 1.3

    # Presenter Card
    card_box = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(4.8), Inches(5.8), Inches(1.5))
    card_box.fill.solid()
    card_box.fill.fore_color.rgb = CARD_BG
    card_box.line.color.rgb = BORDER_LIGHT
    card_box.line.width = Pt(1)

    # Accent left border
    accent_bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(4.8), Inches(0.08), Inches(1.5))
    accent_bar.fill.solid()
    accent_bar.fill.fore_color.rgb = COBALT
    accent_bar.line.color.rgb = COBALT

    tb_card = s1.shapes.add_textbox(Inches(1.1), Inches(4.9), Inches(5.3), Inches(1.3))
    tfc = tb_card.text_frame
    tfc.word_wrap = True
    pc0 = tfc.paragraphs[0]
    pc0.text = "PRESENTER & LEAD DEVELOPER"
    pc0.font.name = FONT_MONO
    pc0.font.size = Pt(8.5)
    pc0.font.bold = True
    pc0.font.color.rgb = COBALT

    pc1 = tfc.add_paragraph()
    pc1.text = "謝易廷 (學號: 11231167) · CD000A 第 2 組"
    pc1.font.name = FONT_SANS
    pc1.font.size = Pt(12)
    pc1.font.bold = True
    pc1.font.color.rgb = TEXT_MAIN

    pc2 = tfc.add_paragraph()
    pc2.text = "GitHub: @ms0780935 · Repository: architecture-portfolio"
    pc2.font.name = FONT_MONO
    pc2.font.size = Pt(9)
    pc2.font.color.rgb = TEXT_MUTED

    # Right Column: Hero Image
    add_image_card(s1, "docs/screenshots/live_grid_overview.png", Inches(7.0), Inches(1.2), Inches(5.533), Inches(5.1),
                   "FIG. 01 / ARCH/FOLIO 11 EXHIBITS EDITORIAL GRID")

    add_footer(s1, 1, badge="NATURAL SCIENCE & AI COURSE REPORT")

    # =========================================================================
    # SLIDE 02: CONTEXT & PEDAGOGY (about the project)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    s2.notes_slide.notes_text_frame.text = SPEAKER_NOTES[2]
    add_header(s2, "01 · CONTEXT · PROBLEM DEFINITION & ARCHITECTURAL PEDAGOGY", "ARCHITECTURAL DESIGN PORTFOLIO")

    # Left: 2 Project Images
    add_image_card(s2, "assets/project-3-tidal-library.jpg", Inches(0.8), Inches(1.2), Inches(2.8), Inches(5.1),
                   "ARC-302 八斗子閱覽所 · 1:200 剖面透視")
    add_image_card(s2, "assets/project-5-suture-masterplan.jpg", Inches(3.8), Inches(1.2), Inches(2.8), Inches(5.1),
                   "ARC-500 基隆港東岸縫合 · 畢業設計總圖")

    # Right: Narrative
    tb_title = s2.shapes.add_textbox(Inches(7.0), Inches(1.2), Inches(5.5), Inches(0.8))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "about the project"
    p.font.name = FONT_HEADING
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = COBALT

    tb_body = s2.shapes.add_textbox(Inches(7.0), Inches(2.1), Inches(5.5), Inches(4.3))
    tf = tb_body.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = "打破傳統建築系作品集「紙本印製昂貴、更新極為困難、國際事務所申請語言受限」之三大痛點。"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_MAIN
    p0.space_after = Pt(14)

    bullets = [
        ("雙軸矩陣檢索系統", "橫向貫穿大一「基本設計」至大五「畢業設計」等高線；縱向整合建築設計、專業選修與理論研究三大領域。"),
        ("Divisare 極簡編輯哲學", "拒絕浮誇模板動畫，向歐洲現代建築典範致敬，以留白、極簡襯線字體與大尺度圖紙框營造沉浸式專刊閱讀。"),
        ("本機圖片零門檻持久抽換", "一般建築系同學無需編寫 Git 或 HTML，即可在電腦端直接拖曳替換 CAD 與渲染圖，重整頁面絕不丟失。")
    ]
    for title, desc in bullets:
        p_b = tf.add_paragraph()
        p_b.text = f"■  {title}："
        p_b.font.name = FONT_SANS
        p_b.font.size = Pt(10)
        p_b.font.bold = True
        p_b.font.color.rgb = COBALT
        p_b.space_before = Pt(8)

        p_desc = tf.add_paragraph()
        p_desc.text = f"   {desc}"
        p_desc.font.name = FONT_SANS
        p_desc.font.size = Pt(9.5)
        p_desc.font.color.rgb = TEXT_BODY
        p_desc.line_spacing = 1.25

    add_footer(s2, 2, badge="DIVISARE MINIMALIST EDITORIAL DOCTRINE")

    # =========================================================================
    # SLIDE 03: GITHUB COMMITS (github commits)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    s3.notes_slide.notes_text_frame.text = SPEAKER_NOTES[3]
    add_header(s3, "02 · OPEN SOURCE · GITHUB REPOSITORY & CONTINUOUS INTEGRATION", "REPOSITORY AUDIT & COMMITS")

    # Left: Title & 4 Metric Chips
    tb_title = s3.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(5.5), Inches(0.8))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "github commits"
    p.font.name = FONT_HEADING
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = COBALT

    tb_sub = s3.shapes.add_textbox(Inches(0.8), Inches(2.0), Inches(5.5), Inches(1.5))
    tf = tb_sub.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = "公開透明的 Git 版本控制歷程，記錄自主開發與架構優化軌跡。"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_MAIN
    p0.space_after = Pt(8)

    p1 = tf.add_paragraph()
    p1.text = "儲存庫託管於 GitHub，全數 Commit 嚴格遵循 Conventional Commits 語意規範，清楚記錄錯誤排除、架構擴充與多國語系演進。"
    p1.font.name = FONT_SANS
    p1.font.size = Pt(10)
    p1.font.color.rgb = TEXT_BODY
    p1.line_spacing = 1.3

    # 4 Metric Chips
    chips = [("16+", "Git Commits"), ("100%", "CI/CD Ready"), ("4", "Core Modules"), ("11", "Dossiers Built")]
    for idx, (num, lbl) in enumerate(chips):
        col = idx % 2
        row = idx // 2
        l = Inches(0.8 + col * 2.8)
        t = Inches(3.7 + row * 1.3)
        box = s3.shapes.add_shape(MSO_SHAPE.RECTANGLE, l, t, Inches(2.6), Inches(1.1))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = BORDER_LIGHT

        t_num = s3.shapes.add_textbox(l + Inches(0.15), t + Inches(0.1), Inches(2.3), Inches(0.5))
        p = t_num.text_frame.paragraphs[0]
        p.text = num
        p.font.name = FONT_MONO
        p.font.size = Pt(20)
        p.font.bold = True
        p.font.color.rgb = COBALT

        t_lbl = s3.shapes.add_textbox(l + Inches(0.15), t + Inches(0.6), Inches(2.3), Inches(0.4))
        p = t_lbl.text_frame.paragraphs[0]
        p.text = lbl
        p.font.name = FONT_SANS
        p.font.size = Pt(9)
        p.font.color.rgb = TEXT_MUTED

    # Right: Terminal Log Box
    term_box = s3.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.8), Inches(1.2), Inches(5.733), Inches(5.1))
    term_box.fill.solid()
    term_box.fill.fore_color.rgb = DARK_TERMINAL
    term_box.line.color.rgb = RGBColor(50, 50, 55)

    tb_term = s3.shapes.add_textbox(Inches(7.0), Inches(1.4), Inches(5.333), Inches(4.7))
    tft = tb_term.text_frame
    tft.word_wrap = True
    p_cmd = tft.paragraphs[0]
    p_cmd.text = "$ git log --oneline --decorate -n 8"
    p_cmd.font.name = FONT_MONO
    p_cmd.font.size = Pt(9.5)
    p_cmd.font.bold = True
    p_cmd.font.color.rgb = COBALT
    p_cmd.space_after = Pt(8)

    commits = [
        ("7415e38", "(HEAD -> main) style: Refine typography spacing in project-11.svg"),
        ("2d77f4c", "feat: Add ELE-440 Taiwan 1970-1980s Public Housing Spatial Study"),
        ("aa88b9b", "feat: Update RES-501 title to 低密度迎季風面的微氣候與通風風廊"),
        ("d3a458d", "fix: Use var(--text-main) for essay-body to ensure night mode contrast"),
        ("f040cea", "feat: Add Nano Banana original architectural drawings for 4 projects"),
        ("8ea8ad1", "feat: Add Divisare-style PROJECTS atlas taxonomy drawer & tags"),
        ("926484b", "docs: Add AI development log, contribution record, and usage metrics"),
        ("75b7978", "feat: Add Divisare-style 3-mode theme switcher (Day, Night, System)")
    ]
    for h, m in commits:
        p_c = tft.add_paragraph()
        p_c.text = f"{h}  {m}"
        p_c.font.name = FONT_MONO
        p_c.font.size = Pt(8)
        p_c.font.color.rgb = RGBColor(200, 210, 225)
        p_c.space_after = Pt(4)

    add_footer(s3, 3, badge="GITHUB: HTTPS://GITHUB.COM/MS0780935/ARCHITECTURE-PORTFOLIO")

    # =========================================================================
    # SLIDE 04: AI TOKEN USAGE (ai token usage)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    s4.notes_slide.notes_text_frame.text = SPEAKER_NOTES[4]
    add_header(s4, "03 · AI METRICS · TOKEN CONSUMPTION & AGENTIC CONVERSATION LOG", "ANTIGRAVITY & GEMINI 2.5 PLATFORM")

    # Left: Official Screenshot
    add_image_card(s4, "docs/ai_usage_screenshot.png", Inches(0.8), Inches(1.2), Inches(5.8), Inches(5.1),
                   "FIG. 04 / 課程平台 API 認證 AI 使用量截圖")

    # Right: Title & Stats
    tb_title = s4.shapes.add_textbox(Inches(7.0), Inches(1.2), Inches(5.5), Inches(0.8))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "ai token usage"
    p.font.name = FONT_HEADING
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = COBALT

    add_marker_line(s4, Inches(7.0), Inches(2.0), Inches(2.2))

    tb_stats = s4.shapes.add_textbox(Inches(7.0), Inches(2.2), Inches(5.5), Inches(4.3))
    tfs = tb_stats.text_frame
    tfs.word_wrap = True
    p0 = tfs.paragraphs[0]
    p0.text = "深度對話工程：累計 26 輪對話、848 迭代步驟與 53.9M 總處理 Token。"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(11.5)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_MAIN
    p0.space_after = Pt(12)

    stats = [
        ("53,927,939 (53.9M)", "總疊加 Token 處理量", "包含長上下文架構分析與代碼重用"),
        ("51,725,732 (51.7M)", "快取讀取 Token (Cache)", "長上下文快取複用，大幅提升多輪對話反應效率"),
        ("1,945,377 (1.94M)", "輸入 Token (Input)", "詳細規格、提示詞反覆修正與架構探討"),
        ("256,830 (256K)", "輸出 Token (Output)", "高精度前端模組、CSS 樣式表與雙語資料集")
    ]
    for val, name, desc in stats:
        p_val = tfs.add_paragraph()
        p_val.text = f"{val}  ·  {name}"
        p_val.font.name = FONT_MONO
        p_val.font.size = Pt(10)
        p_val.font.bold = True
        p_val.font.color.rgb = COBALT
        p_val.space_before = Pt(6)

        p_desc = tfs.add_paragraph()
        p_desc.text = f"└ {desc}"
        p_desc.font.name = FONT_SANS
        p_desc.font.size = Pt(8.5)
        p_desc.font.color.rgb = TEXT_MUTED

    add_footer(s4, 4, badge="KEY: KL_JN8JN0GJ9FWI0-NMTK4A2TX7CB74AOLR1PV79HBA")

    # =========================================================================
    # SLIDE 05: VERCEL DEPLOYMENT & FEATURES (live product on vercel)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    s5.notes_slide.notes_text_frame.text = SPEAKER_NOTES[5]
    add_header(s5, "04 · CLOUD ARCHITECTURE · VERCEL DEPLOYMENT & CORE FEATURES", "LIVE CLOUD ECOSYSTEM")

    # Left: Text
    tb_title = s5.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(5.8), Inches(0.8))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "live product on vercel"
    p.font.name = FONT_HEADING
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = COBALT

    add_marker_line(s5, Inches(0.8), Inches(2.0), Inches(3.2))

    tb_body = s5.shapes.add_textbox(Inches(0.8), Inches(2.2), Inches(5.8), Inches(4.3))
    tf = tb_body.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = "純靜態前端架構 + vercel.json 邊緣節點加速，實現極致載入體驗。"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_MAIN
    p0.space_after = Pt(10)

    points = [
        ("11 件建築專案完整收錄", "涵蓋大一至大五基本設計、坡地住宅、水岸圖書館、立體農園、軍港縫合、參數化遮陽、大稻埕街屋踏查、柳杉折板原型、迎季風面微氣候、空間句法與國宅形態學。"),
        ("沉浸式專刊閱讀彈窗 (Modal)", "點擊任意作品卡片進入滿版圖說視窗，支援鍵盤左右鍵（← / →）連續切換，並自動綁定深層連結 URL Hash（如 #proj-11）。"),
        ("全站中英雙語系切換 (i18n)", "內建完整雙語辭典，點擊右上角按鈕即可在 0.1 秒內無刷新同步切換全站標題、圖紙圖說與長篇設計論述。")
    ]
    for h, b in points:
        ph = tf.add_paragraph()
        ph.text = f"■  {h}"
        ph.font.name = FONT_SANS
        ph.font.size = Pt(10)
        ph.font.bold = True
        ph.font.color.rgb = COBALT
        ph.space_before = Pt(8)

        pb = tf.add_paragraph()
        pb.text = f"   {b}"
        pb.font.name = FONT_SANS
        pb.font.size = Pt(9)
        pb.font.color.rgb = TEXT_BODY
        pb.line_spacing = 1.25

    # Right: Image
    add_image_card(s5, "docs/screenshots/ele440_reader_modal.png", Inches(7.0), Inches(1.2), Inches(5.533), Inches(5.1),
                   "FIG. 05 / 專刊閱讀彈窗 · 鍵盤左右鍵導覽與深層連結")

    add_footer(s5, 5, badge="KEYBOARD NAV: [←] [→] [ESC] · CLEAN STATIC ARCHITECTURE")

    # =========================================================================
    # SLIDE 06: DIVISARE ATLAS TAXONOMY (architectural atlas)
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    s6.notes_slide.notes_text_frame.text = SPEAKER_NOTES[6]
    add_header(s6, "05 · TAXONOMY · DIVISARE ARCHITECTURAL ATLAS & KEYWORD INDEX", "ARCHITECTURAL ONTOLOGY DRAWER")

    # Left: Mega-drawer Screenshot
    add_image_card(s6, "docs/screenshots/atlas_drawer_open.png", Inches(0.8), Inches(1.2), Inches(5.8), Inches(5.1),
                   "FIG. 06 / PROJECTS 分類標籤抽屜 · 左欄 8 大領域 + 右欄 60+ 關鍵詞")

    # Right: Narrative
    tb_title = s6.shapes.add_textbox(Inches(7.0), Inches(1.2), Inches(5.5), Inches(0.8))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "architectural atlas"
    p.font.name = FONT_HEADING
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = COBALT

    tb_body = s6.shapes.add_textbox(Inches(7.0), Inches(2.1), Inches(5.5), Inches(4.3))
    tf = tb_body.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = "取代單調的「全部作品」按鈕，打造 Divisare 原生雙欄建築索引抽屜。"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_MAIN
    p0.space_after = Pt(12)

    atlas_features = [
        ("左欄 8 大建築形態分類", "ELEMENTS (構件)、MATERIALITY (材料工法)、TYPES (建築類型)、TOPICS (環境微氣候)、IDEAS (概念手法)、CITIES & SITES (基地脈絡)、PLANS & DETAILS (圖紙尺度)、SELECTED PROJECTS (專案目錄)。"),
        ("右欄 60+ 字母排序關鍵字網格", "三欄式排版，每個標籤均計算展覽件數徽章（如 WOODEN STRUCTURES (2)、CANTILEVERS (1)），支援即時交互。"),
        ("標籤篩選藥丸與動態計數", "點擊標籤即刻過濾專案網格，搜尋列自動浮現「#標籤名 ✕」藥丸按鈕，支援一鍵清除並重設回全部 11 件展品。")
    ]
    for h, b in atlas_features:
        ph = tf.add_paragraph()
        ph.text = f"■  {h}"
        ph.font.name = FONT_SANS
        ph.font.size = Pt(10)
        ph.font.bold = True
        ph.font.color.rgb = COBALT
        ph.space_before = Pt(8)

        pb = tf.add_paragraph()
        pb.text = f"   {b}"
        pb.font.name = FONT_SANS
        pb.font.size = Pt(9)
        pb.font.color.rgb = TEXT_BODY
        pb.line_spacing = 1.25

    add_footer(s6, 6, badge="60+ ARCHITECTURAL TAXONOMY TAGS INDEXED")

    # =========================================================================
    # SLIDE 07: ERROR RESOLUTION & DEBUGGING (debugging & solutions)
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    s7.notes_slide.notes_text_frame.text = SPEAKER_NOTES[7]
    add_header(s7, "06 · SYSTEM RELIABILITY · AUTONOMOUS DEBUGGING & TROUBLESHOOTING", "AI AGENT PROBLEM SOLVING")

    tb_title = s7.shapes.add_textbox(Inches(0.8), Inches(1.1), Inches(11.733), Inches(0.7))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "debugging & solutions"
    p.font.name = FONT_HEADING
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = COBALT

    # 3 Challenge Cards
    challenges = [
        ("CHALLENGE 01", "Shell 語法與進程衝突",
         "Windows PowerShell 無法解析 Linux && 串接語法，且多次重啟伺服器導致 Port 8080 殘留進程佔用（curl: 52 Empty Reply）。",
         "採用分號 ; 與獨立腳本隔離；以 Stop-Process 強制終止殘留進程，並以標準 Daemon 守護進程重新啟動雙棧綁定伺服器。"),
        ("CHALLENGE 02", "靜態資源瀏覽器快取",
         "前端更新資料集後，本機 Webview 瀏覽器快取舊版 data.js 與 app.js，導致新標籤與專案名稱未能即時呈現。",
         "在 index.html 導入版本號查詢字串（?v=2.2），並透過 Playwright Chromium 子代理人無快取重新加載驗證。"),
        ("CHALLENGE 03", "夜間模式長篇論述對比",
         ".essay-body 硬編碼 color: #222，切換至純黑夜間模式（#141414）時文字對比度嚴重不足，無法清晰辨識。",
         "將顏色重構為語意化變數 color: var(--text-main)，日間模式為 #111111，夜間模式動態轉換為 #f2f2f2，保證高對比閱讀。")
    ]
    for idx, (code, title, prob, fix) in enumerate(challenges):
        left = Inches(0.8 + idx * 3.95)
        top = Inches(1.9)
        width = Inches(3.8)
        height = Inches(4.5)

        card = s7.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = BORDER_LIGHT

        tb = s7.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True

        p_code = tf.paragraphs[0]
        p_code.text = code
        p_code.font.name = FONT_MONO
        p_code.font.size = Pt(8.5)
        p_code.font.bold = True
        p_code.font.color.rgb = RGBColor(220, 38, 38)

        p_t = tf.add_paragraph()
        p_t.text = title
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = COBALT
        p_t.space_before = Pt(4)
        p_t.space_after = Pt(8)

        p_p = tf.add_paragraph()
        p_p.text = "【錯誤遭遇】"
        p_p.font.name = FONT_SANS
        p_p.font.size = Pt(8.5)
        p_p.font.bold = True
        p_p.font.color.rgb = TEXT_MAIN

        p_pt = tf.add_paragraph()
        p_pt.text = prob
        p_pt.font.name = FONT_SANS
        p_pt.font.size = Pt(8.5)
        p_pt.font.color.rgb = TEXT_BODY
        p_pt.space_after = Pt(8)
        p_pt.line_spacing = 1.2

        p_f = tf.add_paragraph()
        p_f.text = "【自主修復】"
        p_f.font.name = FONT_SANS
        p_f.font.size = Pt(8.5)
        p_f.font.bold = True
        p_f.font.color.rgb = GREEN

        p_ft = tf.add_paragraph()
        p_ft.text = fix
        p_ft.font.name = FONT_SANS
        p_ft.font.size = Pt(8.5)
        p_ft.font.color.rgb = TEXT_BODY
        p_ft.line_spacing = 1.2

    add_footer(s7, 7, badge="POWER-SHELL / PORT BINDING / CSS VARIABLES FIXED")

    # =========================================================================
    # SLIDE 08: CHRONOLOGICAL TIMELINE (timeline)
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    s8.notes_slide.notes_text_frame.text = SPEAKER_NOTES[8]
    add_header(s8, "07 · EVOLUTION · CHRONOLOGICAL DEVELOPMENT MILESTONES", "2026.11 ITERATION TIMELINE")

    tb_title = s8.shapes.add_textbox(Inches(0.8), Inches(1.1), Inches(11.733), Inches(0.7))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "timeline"
    p.font.name = FONT_HEADING
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = COBALT

    # 3 Phase Cards
    phases = [
        ("PHASE 01 · 11/18", "架構與基礎奠定", [
            "確立 Divisare 極簡編輯風格",
            "建構 10 件五年作品資料庫",
            "實作 IndexedDB v2 儲存引擎",
            "建立中英雙語 i18n 字典系統"
        ]),
        ("PHASE 02 · 11/25", "視覺與互動飛躍", [
            "Aptos 金屬銀色純文字 LOGO",
            "白底/黑底/系統 3 模式外觀切換",
            "直式多圖串流與手動上移/下移",
            "圖片原尺寸新分頁預覽機制"
        ]),
        ("PHASE 03 · 11/26", "分類抽屜與文本提煉", [
            "PROJECTS 建築分類抽屜 (60+ 標籤)",
            "Nano Banana 出版級原創圖紙",
            "RES-501 改名迎季風面微氣候",
            "提煉兩份國宅報告新增 ELE-440"
        ])
    ]
    for idx, (p_code, p_name, items) in enumerate(phases):
        left = Inches(0.8 + idx * 3.95)
        top = Inches(1.9)
        width = Inches(3.8)
        height = Inches(3.6)

        card = s8.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = BORDER_LIGHT

        # Top Cobalt Accent Line
        top_bar = s8.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, Inches(0.08))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = COBALT
        top_bar.line.color.rgb = COBALT

        tb = s8.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = p_code
        p0.font.name = FONT_MONO
        p0.font.size = Pt(8.5)
        p0.font.bold = True
        p0.font.color.rgb = COBALT

        p1 = tf.add_paragraph()
        p1.text = p_name
        p1.font.name = FONT_HEADING
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = TEXT_MAIN
        p1.space_before = Pt(4)
        p1.space_after = Pt(10)

        for itm in items:
            pi = tf.add_paragraph()
            pi.text = f"•  {itm}"
            pi.font.name = FONT_SANS
            pi.font.size = Pt(9.5)
            pi.font.color.rgb = TEXT_BODY
            pi.space_after = Pt(4)

    # Bottom Status Banner
    banner = s8.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(5.8), Inches(11.733), Inches(0.75))
    banner.fill.solid()
    banner.fill.fore_color.rgb = COBALT_SOFT
    banner.line.color.rgb = COBALT

    tb_b = s8.shapes.add_textbox(Inches(1.0), Inches(5.95), Inches(11.333), Inches(0.5))
    tfb = tb_b.text_frame
    pb = tfb.paragraphs[0]
    pb.text = "✓ STABLE STATUS：全站 11 件作品展示中 · 100% 響應式支援 · 桌面備份檔即時連動 · ALL PASSED"
    pb.font.name = FONT_MONO
    pb.font.size = Pt(10)
    pb.font.bold = True
    pb.font.color.rgb = COBALT

    add_footer(s8, 8, badge="PROGRESSIVE DISCLOSURE & TECTONIC EVOLUTION")

    # =========================================================================
    # SLIDE 09: BRANDING & SENSORY UX (branding & details)
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    s9.notes_slide.notes_text_frame.text = SPEAKER_NOTES[9]
    add_header(s9, "08 · SENSORY DESIGN · METALLIC LOGO & 3-MODE THEME SWITCHER", "CRAFT & DETAIL ORIENTATION")

    # Left: Text
    tb_title = s9.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(5.8), Inches(0.8))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "branding & details"
    p.font.name = FONT_HEADING
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = COBALT

    add_marker_line(s9, Inches(0.8), Inches(2.0), Inches(2.8))

    tb_body = s9.shapes.add_textbox(Inches(0.8), Inches(2.2), Inches(5.8), Inches(4.3))
    tf = tb_body.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = "秉持高水準建築專刊之純粹視覺，以純 CSS 與原廠字型重塑標識。"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_MAIN
    p0.space_after = Pt(10)

    branding_points = [
        ("Aptos 金屬銀色立體文字 LOGO", "下載微軟原廠 Aptos 字型並本地封裝。捨棄點陣圖，以純 CSS 向量文字搭配緊密字距（-0.052em）、多重金屬銀白光影漸層與實體陰影，呈現高級立體銘牌質感。"),
        ("Divisare 風格三模式主題切換", "支援「☼ 日間」（白底紙本氛圍）、「☾ 夜間」（黑底展覽館深邃沉浸）及「🖥 系統」（自動適應 OS 偏好設定），無閃爍即時平滑切換。"),
        ("極簡符號化控制項優化", "精簡彈窗導覽為純幾何箭頭「←」與「→」，關閉改為極簡「✕」，極大化圖紙閱讀淨空間。")
    ]
    for h, b in branding_points:
        ph = tf.add_paragraph()
        ph.text = f"■  {h}"
        ph.font.name = FONT_SANS
        ph.font.size = Pt(10)
        ph.font.bold = True
        ph.font.color.rgb = COBALT
        ph.space_before = Pt(8)

        pb = tf.add_paragraph()
        pb.text = f"   {b}"
        pb.font.name = FONT_SANS
        pb.font.size = Pt(9)
        pb.font.color.rgb = TEXT_BODY
        pb.line_spacing = 1.25

    # Right: Logo & Theme Pill Showcase Boxes
    box_logo = s9.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(7.0), Inches(1.5), Inches(5.533), Inches(2.2))
    box_logo.fill.solid()
    box_logo.fill.fore_color.rgb = CARD_BG
    box_logo.line.color.rgb = BORDER_LIGHT

    tb_l = s9.shapes.add_textbox(Inches(7.2), Inches(1.9), Inches(5.133), Inches(1.2))
    tfl = tb_l.text_frame
    pl = tfl.paragraphs[0]
    pl.alignment = PP_ALIGN.CENTER
    pl.text = "PORTFOLIO"
    pl.font.name = "Aptos"
    pl.font.size = Pt(36)
    pl.font.bold = True
    pl.font.color.rgb = RGBColor(120, 130, 145)

    pl_sub = tfl.add_paragraph()
    pl_sub.alignment = PP_ALIGN.CENTER
    pl_sub.text = "MICROSOFT APTOS · METALLIC SILVER TYPOGRAPHY · -0.052em TRACKING"
    pl_sub.font.name = FONT_MONO
    pl_sub.font.size = Pt(7.5)
    pl_sub.font.color.rgb = TEXT_MUTED

    box_theme = s9.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(7.0), Inches(4.1), Inches(5.533), Inches(2.2))
    box_theme.fill.solid()
    box_theme.fill.fore_color.rgb = DARK_TERMINAL
    box_theme.line.color.rgb = RGBColor(50, 50, 55)

    tb_t = s9.shapes.add_textbox(Inches(7.2), Inches(4.4), Inches(5.133), Inches(1.5))
    tft = tb_t.text_frame
    pt = tft.paragraphs[0]
    pt.text = "DIVISARE TRI-MODE THEME SWITCHER:"
    pt.font.name = FONT_MONO
    pt.font.size = Pt(9)
    pt.font.bold = True
    pt.font.color.rgb = RGBColor(180, 190, 205)

    pt1 = tft.add_paragraph()
    pt1.text = "  [ ☼ 日間模式 (Light) ]   [ ☾ 夜間模式 (Dark) ]   [ 🖥 系統自適 (Auto) ]"
    pt1.font.name = FONT_MONO
    pt1.font.size = Pt(10.5)
    pt1.font.bold = True
    pt1.font.color.rgb = WHITE
    pt1.space_before = Pt(10)

    pt2 = tft.add_paragraph()
    pt2.text = "  #fcfbf9 Paper White   |   #0c0c0c Deep Gallery   |   prefers-color-scheme"
    pt2.font.name = FONT_MONO
    pt2.font.size = Pt(8)
    pt2.font.color.rgb = TEXT_MUTED
    pt2.space_before = Pt(8)

    add_footer(s9, 9, badge="PURE CSS APTOS METALLIC EFFECT & 3-MODE THEME")

    # =========================================================================
    # SLIDE 10: DEVICE ASSET MANAGER (asset manager)
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    s10.notes_slide.notes_text_frame.text = SPEAKER_NOTES[10]
    add_header(s10, "09 · ASSET MANAGEMENT · LOCAL INDEXEDDB V2 & STREAM REORDERING", "CLIENT-SIDE PERSISTENCE")

    # Left: Image
    add_image_card(s10, "docs/screenshots/asset_manager_modal.png", Inches(0.8), Inches(1.2), Inches(5.8), Inches(5.1),
                   "FIG. 10 / 本機裝置圖片管理中心 · 拖曳抽換與 JSON 備份")

    # Right: Narrative
    tb_title = s10.shapes.add_textbox(Inches(7.0), Inches(1.2), Inches(5.5), Inches(0.8))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "asset manager"
    p.font.name = FONT_HEADING
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = COBALT

    add_marker_line(s10, Inches(7.0), Inches(2.0), Inches(2.3))

    tb_body = s10.shapes.add_textbox(Inches(7.0), Inches(2.2), Inches(5.5), Inches(4.3))
    tf = tb_body.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = "專為建築系設計之離線安全圖檔抽換引擎，無伺服器後端依賴。"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_MAIN
    p0.space_after = Pt(10)

    mgr_points = [
        ("IndexedDB v2 離線持久化儲存", "上傳的個人 CAD、平立剖面或模型實拍自動轉為二進位儲存於本機瀏覽器，即便關閉瀏覽器或重整，客製化圖片永不遺失。"),
        ("多圖直式串流與手動排序", "突破單圖封面限制，支援由上至下垂直排版（Vertical Stream）。每張照片具備「▲ 上移」與「▼ 下移」即時微調。"),
        ("底端批次新增與原尺寸大圖預覽", "底部設置大尺寸虛線框支援多圖一次批次選取；並支援點擊圖片新分頁開啟 100% 原尺寸預覽（cursor: zoom-in）。"),
        ("JSON 完整備份導出／匯入", "一鍵導出完整客製作品集 JSON 檔案，跨裝置評圖時直接匯入即可無痛重現。")
    ]
    for h, b in mgr_points:
        ph = tf.add_paragraph()
        ph.text = f"■  {h}"
        ph.font.name = FONT_SANS
        ph.font.size = Pt(10)
        ph.font.bold = True
        ph.font.color.rgb = COBALT
        ph.space_before = Pt(6)

        pb = tf.add_paragraph()
        pb.text = f"   {b}"
        pb.font.name = FONT_SANS
        pb.font.size = Pt(9)
        pb.font.color.rgb = TEXT_BODY
        pb.line_spacing = 1.25

    add_footer(s10, 10, badge="BROWSER NATIVE INDEXEDDB ENGINE · 100% CLIENT PERSISTENCE")

    # =========================================================================
    # SLIDE 11: TEXT-TO-ARCHITECTURE (text-to-architecture)
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    s11.notes_slide.notes_text_frame.text = SPEAKER_NOTES[11]
    add_header(s11, "10 · AI SYNTHESIS · NANO BANANA DRAWINGS & GOOGLE DOCS EXTRACTION", "CROSS-MODAL GENERATION")

    # Left: Text
    tb_title = s11.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(5.8), Inches(0.8))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "text-to-architecture"
    p.font.name = FONT_HEADING
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = COBALT

    add_marker_line(s11, Inches(0.8), Inches(2.0), Inches(3.4))

    tb_body = s11.shapes.add_textbox(Inches(0.8), Inches(2.2), Inches(5.8), Inches(4.3))
    tf = tb_body.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = "從純文本論述到出版級工程圖紙：實現跨模態建築形態學提煉。"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = TEXT_MAIN
    p0.space_after = Pt(10)

    ai_synthesis_points = [
        ("Nano Banana 出版級原創圖紙", "運用 Gemini 2.5 Flash Image 繪製具備真實紙質與尺度的圖紙：八斗子 16 米耐候鋼懸挑閱讀廊道、基隆港 3 公里立體縫合甲板總圖、1:20 柳杉折板榫接大樣，以及西門町 DepthmapX 空間句法熱力圖。"),
        ("Google Docs 報告提煉新增 ELE-440", "深入解析《國宅空間原型》與《大街廓國宅社區》兩份報告，提煉柯比意「光輝城市」與「雷特朋人車分道」理論，轉化為大四選修新專案《標準化原型與大街廓批判》，並繪製專屬 1:50 原型向量圖。"),
        ("RES-501 篇名精確對齊", "依使用者指示更名為《低密度迎季風面的微氣候與通風風廊 CFD 數值模擬》，同步刷新 OpenFOAM 向量圖與 Atlas 標籤。")
    ]
    for h, b in ai_synthesis_points:
        ph = tf.add_paragraph()
        ph.text = f"■  {h}"
        ph.font.name = FONT_SANS
        ph.font.size = Pt(10)
        ph.font.bold = True
        ph.font.color.rgb = COBALT
        ph.space_before = Pt(8)

        pb = tf.add_paragraph()
        pb.text = f"   {b}"
        pb.font.name = FONT_SANS
        pb.font.size = Pt(9)
        pb.font.color.rgb = TEXT_BODY
        pb.line_spacing = 1.25

    # Right: 2 Images
    add_image_card(s11, "assets/project-8-folded-plate.jpg", Inches(7.0), Inches(1.2), Inches(2.65), Inches(5.1),
                   "ELE-430 柳杉折板屋架原型")
    add_image_card(s11, "assets/project-10-space-syntax.jpg", Inches(9.883), Inches(1.2), Inches(2.65), Inches(5.1),
                   "RES-402 空間句法軸線熱力圖")

    add_footer(s11, 11, badge="GEMINI 2.5 FLASH IMAGE & GOOGLE DRIVE EXTRACTION")

    # =========================================================================
    # SLIDE 12: CONCLUSION & AUDIT (2026 thank you)
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    s12.notes_slide.notes_text_frame.text = SPEAKER_NOTES[12]
    add_header(s12, "11 · EVALUATION · GRADING RUBRIC AUDIT & PROJECT DELIVERABLES", "FINAL SUBMISSION AUDIT")

    # Left: Title & 100/100 Scorecard
    tb_yr = s12.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(4.0), Inches(0.4))
    p = tb_yr.text_frame.paragraphs[0]
    p.text = "2026"
    p.font.name = FONT_MONO
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = COBALT

    tb_title = s12.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(5.8), Inches(0.9))
    p = tb_title.text_frame.paragraphs[0]
    p.text = "thank you"
    p.font.name = FONT_HEADING
    p.font.size = Pt(38)
    p.font.bold = True
    p.font.color.rgb = COBALT

    add_doodle_oval(s12, Inches(0.68), Inches(1.48), Inches(4.4), Inches(0.95))

    tb_lead = s12.shapes.add_textbox(Inches(0.8), Inches(2.6), Inches(5.8), Inches(0.6))
    p = tb_lead.text_frame.paragraphs[0]
    p.text = "自然科學與人工智慧 · 期末專題成果自評 100 / 100 滿分達成"
    p.font.name = FONT_SANS
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = TEXT_MAIN

    # Scorecard Box
    score_box = s12.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(3.4), Inches(5.8), Inches(2.4))
    score_box.fill.solid()
    score_box.fill.fore_color.rgb = CARD_BG
    score_box.line.color.rgb = BORDER_LIGHT

    tbs = s12.shapes.add_textbox(Inches(1.0), Inches(3.5), Inches(5.4), Inches(2.2))
    tfs = tbs.text_frame
    tfs.word_wrap = True

    p0 = tfs.paragraphs[0]
    p0.text = "基本指標：60 / 60 pts (全數達標)"
    p0.font.name = FONT_SANS
    p0.font.size = Pt(10.5)
    p0.font.bold = True
    p0.font.color.rgb = COBALT

    p0_sub = tfs.add_paragraph()
    p0_sub.text = "• 主題定位 (10分)、11件作品內容 (20分)、流暢操作示範 (15分)、AI 歷程紀錄 (10分)、個人貢獻 (5分)"
    p0_sub.font.name = FONT_SANS
    p0_sub.font.size = Pt(8.5)
    p0_sub.font.color.rgb = TEXT_MUTED
    p0_sub.space_after = Pt(8)

    p1 = tfs.add_paragraph()
    p1.text = "加分項目：+40 / 40 pts (四項全部完成)"
    p1.font.name = FONT_SANS
    p1.font.size = Pt(10.5)
    p1.font.bold = True
    p1.font.color.rgb = COBALT

    p1_sub = tfs.add_paragraph()
    p1_sub.text = "• Vercel 上線 (+10)、本機圖紙抽換 (+10)、GitHub 紀錄 (+10)、Divisare 高完成度 (+10)"
    p1_sub.font.name = FONT_SANS
    p1_sub.font.size = Pt(8.5)
    p1_sub.font.color.rgb = TEXT_MUTED

    # Links Box
    tb_links = s12.shapes.add_textbox(Inches(0.8), Inches(6.0), Inches(5.8), Inches(0.6))
    tfl = tb_links.text_frame
    pl = tfl.paragraphs[0]
    pl.text = "網頁作品集：http://localhost:8080/  |  GitHub: @ms0780935"
    pl.font.name = FONT_MONO
    pl.font.size = Pt(9)
    pl.font.bold = True
    pl.font.color.rgb = COBALT

    # Right: Hero Final Image
    add_image_card(s12, "assets/project-1-space.jpg", Inches(7.0), Inches(1.2), Inches(5.533), Inches(5.1),
                   "FIG. 12 / 空間微風實驗亭 · 校園中庭草坪光影氛圍實景")

    add_footer(s12, 12, badge="PROJECT AUTHOR: 謝易廷 (11231167) · 2026 FINAL")

    # Save presentation
    prs.save(OUTPUT_PPTX)
    print(f"Successfully generated 16:9 presentation: {OUTPUT_PPTX}")

    # Also save copy to Desktop
    try:
        prs.save(DESKTOP_PPTX)
        print(f"Successfully saved Desktop copy: {DESKTOP_PPTX}")
    except Exception as e:
        print(f"Desktop copy save notice: {e}")


if __name__ == "__main__":
    create_deck()
