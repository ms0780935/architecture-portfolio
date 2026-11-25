/**
 * ARCH/FOLIO - Architectural Projects Dataset
 * Curated for Architecture Student Portfolio
 * Bilingual: Traditional Chinese (zh) & English (en)
 */

const ARCH_PROJECTS = [
  {
    id: "proj-1",
    yearNumber: 1,
    yearLabel: { zh: "一年級", en: "Year 1" },
    semester: { zh: "大一上 · 基本設計 I", en: "1st Year Fall · Basic Design I" },
    period: "2021",
    category: "studio", // studio, elective, research
    categoryLabel: { zh: "建築設計", en: "Architectural Design" },
    code: "ARC-101",
    title: {
      zh: "空間微風：輕質木構與重力感知實驗亭",
      en: "Micro-Breeze Pavilion: Lightweight Timber & Gravitational Perception"
    },
    typology: { zh: "實驗亭／空間裝置", en: "Experimental Pavilion / Installation" },
    location: { zh: "學校中庭花園草坪", en: "University Courtyard Lawn" },
    advisor: { zh: "陳建華 建築師", en: "Arch. Jian-Hua Chen" },
    defaultImage: "assets/project-1.svg",
    summary: {
      zh: "探索木材受力受拉之極限狀態，透過連續尺度模矩與斜向支撐，構築出捕捉中庭微氣候氣流之空間感知構築物。",
      en: "Exploring the boundary of timber in tension and compression through modular scaling and diagonal bracing to capture courtyard microclimatic airflows."
    },
    concept: {
      zh: "作為大一進入建築設計的第一個構築體驗，本案從手作1:1木節點模型出發。透過2寸乘2寸台灣柳杉角材的交錯疊加，形成同時具備自重穩定度與通透視覺的開放亭。頂部折板順應迎風面導引自然風，底座微懸浮於草坡之上，使人置身其中能敏銳察覺風向與光影推移。",
      en: "Serving as the foundational tectonic exercise in first year, this project originated from 1:1 physical joint mockups. Using 2x2 Cryptomeria timber sections arranged in reciprocal joints, the pavilion creates an open shelter balancing self-weight stability with visual transparency, funneling breezes toward the seating plinth."
    },
    drawings: [
      {
        type: "Axonometric Drawing",
        label: {
          zh: "1:20 等角透視軸測構造分解與微氣候流場分析圖",
          en: "1:20 Axonometric Tectonic Breakdown & Microclimate Aerodynamic Simulation"
        },
        src: "assets/project-1-drawing.svg"
      },
      {
        type: "Physical Model",
        label: {
          zh: "1:1 與 1:20 手作木構榫接節點與互承骨架實體模型實拍",
          en: "1:1 & 1:20 Handcrafted Reciprocal Timber Joinery & Frame Physical Mockup"
        },
        src: "assets/project-1-model.jpg"
      },
      {
        type: "Spatial Atmosphere",
        label: {
          zh: "校園中庭草坪微氣候輕質木構空間實景與光影穿透氛圍",
          en: "Courtyard Lawn Campus Installation: Light Penetration & Aerodynamic Spatial Atmosphere"
        },
        src: "assets/project-1-space.jpg"
      }
    ],
    tags: ["Timber", "Pavilion", "Basic Design", "Joinery", "1:1 Mockup"]
  },
  {
    id: "proj-2",
    yearNumber: 2,
    yearLabel: { zh: "二年級", en: "Year 2" },
    semester: { zh: "大二下 · 建築設計 IV", en: "2nd Year Spring · Architectural Design IV" },
    period: "2022",
    category: "studio",
    categoryLabel: { zh: "建築設計", en: "Architectural Design" },
    code: "ARC-202",
    title: {
      zh: "邊界共生：斜坡地階梯式集合住宅與巷弄紋理",
      en: "Boundary Symbiosis: Terraced Hillside Housing & Alleyway Fabric"
    },
    typology: { zh: "山坡地集合住宅", en: "Hillside Terraced Collective Housing" },
    location: { zh: "基隆市中正區山坡巷道", en: "Zhongzheng District Slope, Keelung" },
    advisor: { zh: "林宛儀 教授", en: "Prof. Wan-Yi Lin" },
    defaultImage: "assets/project-2.svg",
    summary: {
      zh: "依循基隆山坡地等高線梯級退縮，將公共步道與私密露台錯位縫合，重現台灣傳統山城聚落之鄰里垂直社交網絡。",
      en: "Following Keelung's topography with stepped terraces that interweave public stairways with private verandas, reviving the vertical community fabric of hillside settlements."
    },
    concept: {
      zh: "針對基隆多雨、陡峭山坡地形，設計利用階梯狀退縮屋頂作為每一層住戶的私家花園，同時將都市公共階梯直接穿透建築核心，形成遮風避雨的社區廊道。清水混凝土與洗石子外牆對抗基隆海風與高濕氣候，創造與山坡綠意共生的長久居所。",
      en: "Responding to Keelung's hyper-humid and hilly environment, the terraced roofs serve as private sky gardens while public steps slice through the core to provide weather-sheltered neighborhood connectivity, executed in fair-faced concrete and washed terrazzo."
    },
    drawings: [
      { type: "Section", label: { zh: "1:50 坡地縱向剖面透視圖", en: "1:50 Longitudinal Section Perspective" }, src: "assets/project-2.svg" }
    ],
    tags: ["Housing", "Topography", "Terrace", "Keelung", "Sectional Urbanism"]
  },
  {
    id: "proj-3",
    yearNumber: 3,
    yearLabel: { zh: "三年級", en: "Year 3" },
    semester: { zh: "大三下 · 建築設計 VI", en: "3rd Year Spring · Architectural Design VI" },
    period: "2023",
    category: "studio",
    categoryLabel: { zh: "建築設計", en: "Architectural Design" },
    code: "ARC-302",
    title: {
      zh: "潮汐閱覽所：八斗子漁港海洋文化公共圖書館",
      en: "Tidal Library: Badouzi Harbor Marine Cultural Commons"
    },
    typology: { zh: "公共圖書館／水岸文化設施", en: "Public Library / Waterfront Cultural Center" },
    location: { zh: "基隆八斗子觀光漁港水岸", en: "Badouzi Fishing Port Waterfront, Keelung" },
    advisor: { zh: "黃柏森 建築師", en: "Arch. Bo-Sen Huang" },
    defaultImage: "assets/project-3.svg",
    summary: {
      zh: "結合潮汐漲退景觀之懸挑閱覽廊道，引入海水調節建築熱環境，創造讀者與海洋生態直接對話之文化地標。",
      en: "A cantilevered reading gallery responding to ocean tides, integrating seawater heat exchange with interactive coastal reading platforms."
    },
    concept: {
      zh: "八斗子漁港飽含台灣百年討海記憶，本案將公共圖書館置於消波碼頭延伸端。低樓層以半開放清水混凝土基座沉浸於潮間帶，漲潮時海水湧入景觀水階；高樓層則透過耐候鋼與超低反射玻璃懸挑於海面上空，使閱讀者伴隨浪聲與波光沉澱思維。",
      en: "Perched at the breakwater pier of Badouzi, the lower levels sit within the intertidal zone where sea water naturally fills retention basins at high tide. Upper reading chambers cantilever 16 meters over the sea with weathering steel trusses and anti-reflective glass."
    },
    drawings: [
      { type: "Site Plan", label: { zh: "1:200 八斗子碼頭水岸全區配置圖", en: "1:200 Badouzi Waterfront Master Site Plan" }, src: "assets/project-3.svg" }
    ],
    tags: ["Waterfront", "Library", "Public Architecture", "Cantilever", "Marine Culture"]
  },
  {
    id: "proj-4",
    yearNumber: 4,
    yearLabel: { zh: "四年級", en: "Year 4" },
    semester: { zh: "大四下 · 建築設計 VIII", en: "4th Year Spring · Architectural Design VIII" },
    period: "2024",
    category: "studio",
    categoryLabel: { zh: "建築設計", en: "Architectural Design" },
    code: "ARC-402",
    title: {
      zh: "垂直複合生態社群：舊市區混居住宅與立體農園",
      en: "Vertical Ecological Commons: Mixed-use Housing & Urban Agro-Tower"
    },
    typology: { zh: "複合商業住宅大樓／垂直農業", en: "Mixed-use Commercial Residential / Agro-Tower" },
    location: { zh: "台北市萬華區康定路街廓", en: "Kanding Road Urban Block, Wanhua, Taipei" },
    advisor: { zh: "周榮敬 建築師", en: "Arch. Jung-Ching Chou" },
    defaultImage: "assets/project-4.svg",
    summary: {
      zh: "於高密度舊城區植入立體螺旋公有農園，重組地面傳統市場、青年共居與長照支援系統之永續複合大樓。",
      en: "Inserting a spiraling vertical community farm into high-density historic Taipei, synthesizing traditional wet market, co-living, and elder care."
    },
    concept: {
      zh: "面對萬華老齡化與密集空間課題，本案將地面層傳統市場延伸為盤旋向上的生態空中步道。各層住戶均分配專屬微型菜園，利用中水回收灌溉，並設置通風浮力風井驅動自然對流，使高層集合住宅重現台灣騎樓鄰里互助的生活溫馨感。",
      en: "Addressing aging demographics and dense urban fabric in Wanhua, the traditional market expands upward into a public agro-ramp. Greywater recycling irrigates terrace allotments, while solar chimneys drive stack ventilation throughout residential modules."
    },
    drawings: [
      { type: "Axonometric", label: { zh: "1:100 分解機能爆炸軸測圖", en: "1:100 Exploded Functional Program Axonometric" }, src: "assets/project-4.svg" }
    ],
    tags: ["Mixed-Use", "Vertical Farming", "Sustainability", "Urban Regeneration", "Wanhua"]
  },
  {
    id: "proj-5",
    yearNumber: 5,
    yearLabel: { zh: "五年級", en: "Year 5" },
    semester: { zh: "大五畢業設計 · Thesis", en: "5th Year · Graduation Thesis Design" },
    period: "2025",
    category: "studio",
    categoryLabel: { zh: "建築設計", en: "Architectural Design" },
    code: "ARC-500",
    title: {
      zh: "地景縫合：基隆港東岸軍事港區轉型與潮境文化地帶",
      en: "Landform Suture: Keelung East Coast Naval Pier Transformation"
    },
    typology: { zh: "都市設計／港區地景再生", en: "Urban Landscape Infrastructure / Thesis" },
    location: { zh: "基隆港東岸威海營區與海關碼頭", en: "Keelung Harbor East Wharf & Former Military Base" },
    advisor: { zh: "蔡明宏 特聘教授", en: "Distinguished Prof. Ming-Hong Tsai" },
    defaultImage: "assets/project-5.svg",
    summary: {
      zh: "拆解封閉超過七十年的軍事邊界，以連續人行地景甲板跨越港濱高架橋，重啟基隆市民親近海灣港口之都市願景。",
      en: "Dismantling a 70-year military perimeter to craft a continuous pedestrian deck bridge over coastal expressways, reconnecting citizens to the inner harbor."
    },
    concept: {
      zh: "畢業設計聚焦基隆港東五號碼頭之軍港遷移契機。本案提出三公里長的『港山縫合帶』，結合海水淨化濕地、當代造船工藝中心與潮境音樂劇場。利用大跨度鋼構吊橋架空跨越交通動脈，打破過去山海阻隔，使基隆港灣重返市民日常生活之核心舞台。",
      en: "This graduation thesis seizes the historic military relocation at Wharf E-5. Proposing a 3km 'Mountain-to-Sea Suture Deck', the project merges wetland purification, naval craftsmanship studios, and maritime amphitheater, elevating pedestrians above vehicular viaducts."
    },
    drawings: [
      { type: "Masterplan", label: { zh: "1:500 港灣都市縫合全區景觀總圖", en: "1:500 Urban Waterfront Suture Master Plan" }, src: "assets/project-5.svg" }
    ],
    tags: ["Thesis", "Graduation Design", "Urban Suture", "Waterfront", "Masterplan"]
  },
  {
    id: "proj-6",
    yearNumber: 3,
    yearLabel: { zh: "三年級", en: "Year 3" },
    semester: { zh: "大三上 · 專業選修", en: "3rd Year Fall · Elective" },
    period: "2023",
    category: "elective",
    categoryLabel: { zh: "選修科目", en: "Elective Courses" },
    code: "ELE-310",
    title: {
      zh: "參數化遮陽桁架：以 Grasshopper 進行微氣候日照演算法構築",
      en: "Parametric Kinetic Shading: Grasshopper Microclimatic Solar Façade"
    },
    typology: { zh: "計算設計／動態立面構件", en: "Computational Design / Kinetic Façade" },
    location: { zh: "數位製造實驗室", en: "Digital Fabrication FabLab" },
    advisor: { zh: "柯皓文 助理教授", en: "Asst. Prof. Hao-Wen Ko" },
    defaultImage: "assets/project-6-parametric.jpg",
    summary: {
      zh: "利用 Ladybug 工具組分析台北夏季極端日射量，以 Voronoi 幾何演算法自動調節遮陽格柵開口孔徑，降低室內 32% 空調負荷。",
      en: "Simulating Taipei's peak solar radiation using Ladybug Tools, driving Voronoi geometry apertures to decrease indoor cooling load by 32%."
    },
    concept: {
      zh: "修習『參數化建築設計與數位製造』之專題成果。透過 Rhino+Grasshopper 建構日射向量即時響應模型，單元依太陽仰角與方位角自動旋轉開闔。最終使用雷射切割壓克力與 Arduino 步進馬達製作 1:5 工作動態機構模型，落實自適應立面技術。",
      en: "Developed within the Advanced Parametric Design seminar, this project scripts solar radiation vectors to actuate individual kinetic louvers. A 1:5 scale prototype was fabricated with laser cutting and Arduino stepper motors to test physical daylighting calibration."
    },
    drawings: [
      { type: "Render", label: { zh: "日照感應幾何百葉立面渲染圖", en: "Solar-Responsive Kinetic Facade Rendering" }, src: "assets/project-6-parametric.jpg" },
      { type: "Diagram", label: { zh: "Grasshopper 演算法網絡與太陽軌跡圖", en: "Grasshopper Algorithm Network & Sun-path Diagram" }, src: "assets/project-6.svg" }
    ],
    tags: ["Parametric", "Grasshopper", "Ladybug", "Kinetic Façade", "Digital Fabrication"]
  },
  {
    id: "proj-7",
    yearNumber: 2,
    yearLabel: { zh: "二年級", en: "Year 2" },
    semester: { zh: "大二上 · 專業選修", en: "2nd Year Fall · Elective" },
    period: "2022",
    category: "elective",
    categoryLabel: { zh: "選修科目", en: "Elective Courses" },
    code: "ELE-220",
    title: {
      zh: "大稻埕街屋立面構造演變與騎樓空間實地踏查",
      en: "Dadaocheng Shophouse Tectonics: Arcade Morphological Field Survey"
    },
    typology: { zh: "歷史建築測繪／田野調查", en: "Architectural History / Field Measurement" },
    location: { zh: "台北市大同區迪化街一段", en: "Dihua St. Sec 1, Datong District, Taipei" },
    advisor: { zh: "鄭書華 副教授", en: "Assoc. Prof. Shu-Hua Cheng" },
    defaultImage: "assets/dadaocheng-field-streetscape.jpg",
    summary: {
      zh: "針對迪化街 12 棟典型長條型街屋展開立面測繪，梳理閩南磚瓦、紅磚圓柱至日治折衷主義泥塑山牆之營造體系流變。",
      en: "Detailed manual measurement of 12 historic shophouses along Dihua Street, cataloging tectonic shifts from Minnan masonry to Eclectic baroque pediments."
    },
    concept: {
      zh: "修習『台灣建築史與聚落踏查』期末實錄。小組深入大稻埕老屋核心，利用手繪測繪草圖與雷射測距儀，還原天井進深、騎樓（亭仔腳）開間比例與女兒牆收頭細部。研究揭示出街屋如何透過長條中庭自然通風排熱，展現極高適地性生態智慧。",
      en: "Completed for the Taiwan Architectural History seminar, this survey produced archival orthographic elevations and courtyard sections. The research demonstrates how historic shophouse courtyards function as natural thermal chimneys in subtropical heat."
    },
    drawings: [
      {
        type: "Field Photo",
        label: { zh: "【現場踏查 01】大稻埕迪化街歷史街廓街景與街屋連續立面全景", en: "Field Survey 01: Dihua Street Historic Streetscape & Sequential Elevations" },
        src: "assets/dadaocheng-field-streetscape.jpg"
      },
      {
        type: "Field Photo",
        label: { zh: "【現場踏查 02】連續騎樓（亭仔腳）空間光影與磚造拱圈廊道實地踏查", en: "Field Survey 02: Continuous Ting-a-kha Covered Arcade & Brick Arch Walkway" },
        src: "assets/dadaocheng-field-arcade.jpg"
      },
      {
        type: "Field Photo",
        label: { zh: "【現場踏查 03】折衷主義巴洛克泥塑山牆、女兒牆與紅磚柱頭裝飾特寫", en: "Field Survey 03: Eclectic Baroque Plaster Pediment & Red Brick Capital Detail" },
        src: "assets/dadaocheng-field-facade.jpg"
      },
      {
        type: "Measured Photo",
        label: { zh: "【實地測繪 01】製圖桌實體圖紙寫真：街屋立面正投影與尺度標註測繪原稿", en: "Measured Survey 01: Drafting Table Photo of Facade Elevation Survey Sheet" },
        src: "assets/dadaocheng-measured-drafting.jpg"
      },
      {
        type: "Section",
        label: { zh: "【實地測繪 02】1:50 街屋長向三進兩天井縱剖面圖（進深 35.3m 與熱浮力拔風分析）", en: "Measured Drawing 02: 1:50 Longitudinal Section (35.3m Depth & Thermal Stack Analysis)" },
        src: "assets/dadaocheng-measured-section.svg"
      },
      {
        type: "Detail",
        label: { zh: "【實地測繪 03】1:10 騎樓清水紅磚圓柱（Ø 520mm）與莨苕葉柱頭構造大樣測繪圖", en: "Measured Drawing 03: 1:10 Tectonic Detail of Arcade Column & Acanthus Capital" },
        src: "assets/dadaocheng-measured-tectonics.svg"
      }
    ],
    tags: ["Architectural History", "Survey", "Dadaocheng", "Arcade", "Measured Drawing"]
  },
  {
    id: "proj-8",
    yearNumber: 4,
    yearLabel: { zh: "四年級", en: "Year 4" },
    semester: { zh: "大四上 · 專業選修", en: "4th Year Fall · Elective" },
    period: "2024",
    category: "elective",
    categoryLabel: { zh: "選修科目", en: "Elective Courses" },
    code: "ELE-430",
    title: {
      zh: "國產材柳杉膠合木短跨距折板屋架力學原型",
      en: "Domestic Cryptomeria Glulam Folded-Plate Truss Prototype"
    },
    typology: { zh: "結構形態學／木構造原型", en: "Structural Morphology / Timber Prototype" },
    location: { zh: "木工製造工坊", en: "Woodworking Fabrication Shop" },
    advisor: { zh: "許峰銘 教授", en: "Prof. Feng-Ming Hsu" },
    defaultImage: "assets/project-8.svg",
    summary: {
      zh: "探討台灣在地疏伐木柳杉之結構潛力，研發毋需金屬巨型接頭之折板自承重系統，達成 9 米無柱跨距之木構空間。",
      en: "Investigating Taiwan's native thinned Cryptomeria timber to engineer self-supporting folded plates, achieving a 9m column-free clear span."
    },
    concept: {
      zh: "修習『木構造設計與結構形態學』成果。捨棄昂貴進口鋼接件，採用全木榫卯栓接技術。折板的幾何連續摺痕大幅增強面外剛度，減少膠合木厚度達 25%。透過極限破壞載重試驗，驗證其抗彎承載力與抗震韌性。",
      en: "Developed within the Timber Engineering seminar, the design eliminates expensive steel brackets by leveraging geometric folding rigidity. Load-bearing destructive testing confirmed the structural safety margin under Taiwan Seismic Zone requirements."
    },
    drawings: [
      { type: "Axonometric", label: { zh: "1:20 膠合木折板構造接頭細部大樣", en: "1:20 Glulam Folded Plate Joint Axonometric Detail" }, src: "assets/project-8.svg" }
    ],
    tags: ["Timber Structure", "Glulam", "Folded Plate", "Prototyping", "Sustainable"]
  },
  {
    id: "proj-9",
    yearNumber: 5,
    yearLabel: { zh: "五年級", en: "Year 5" },
    semester: { zh: "大五上 · 畢業專題研究", en: "5th Year Fall · Graduation Research" },
    period: "2024",
    category: "research",
    categoryLabel: { zh: "研究專題", en: "Research & Theory" },
    code: "RES-501",
    title: {
      zh: "高密度亞熱帶都市街道峽谷微氣候與通風風廊 CFD 數值模擬",
      en: "CFD Microclimate & Wind Corridor Simulation in High-Density Urban Canyons"
    },
    typology: { zh: "學術研究論文／都市微氣候", en: "Academic Research / Urban Climatology" },
    location: { zh: "台北盆地信義計畫區邊界", en: "Xinyi District Border, Taipei" },
    advisor: { zh: "沈家駒 教授", en: "Prof. Jia-Ju Shen" },
    defaultImage: "assets/project-9.svg",
    summary: {
      zh: "運用 OpenFOAM 計算流體力學，量化建築迎風面退縮比對消除都市熱島效應之關聯性，建立低風速死區改善指引。",
      en: "Utilizing OpenFOAM CFD to quantify building setback ratios on urban heat island mitigation, establishing planning guidelines for pedestrian airflow."
    },
    concept: {
      zh: "本研究針對台北夏季悶熱街道峽谷展開流體模擬。研究指出，當街道高寬比（H/W）大於 2.5 時，地面層風速衰減超過 60%，形成滯熱死區。透過本研究所提出的『多孔隙通透低樓層』與『導風傾角屋頂』設計準則，能有效將涼爽季風導入行人層，平均降溫達 1.8°C。",
      en: "Focusing on severe urban canyon stagnation in subtropical Taipei, this CFD research simulated 18 urban typologies. The paper proves that a stepped ground-floor arcade reduces stagnant hot spots by 45%, providing quantitative design guidelines for city zoning."
    },
    drawings: [
      { type: "Simulation", label: { zh: "都市風速向量流線分布與熱島溫度色階圖", en: "CFD Wind Velocity Streamlines & Thermal Gradient Map" }, src: "assets/project-9.svg" }
    ],
    tags: ["Research", "CFD Simulation", "Microclimate", "Urban Heat Island", "OpenFOAM"]
  },
  {
    id: "proj-10",
    yearNumber: 4,
    yearLabel: { zh: "四年級", en: "Year 4" },
    semester: { zh: "大四上 · 專題研究", en: "4th Year Fall · Research Seminar" },
    period: "2023",
    category: "research",
    categoryLabel: { zh: "研究專題", en: "Research & Theory" },
    code: "RES-402",
    title: {
      zh: "台北西門町街廓空間句法與步行可達性之拓樸分析",
      en: "Space Syntax & Topological Pedestrian Accessibility of Ximending Blocks"
    },
    typology: { zh: "空間句法／都市形態學", en: "Space Syntax / Urban Morphology" },
    location: { zh: "台北市萬華區西門町商圈", en: "Ximending Pedestrian District, Taipei" },
    advisor: { zh: "杜宜倫 博士", en: "Dr. Yi-Lun Tu" },
    defaultImage: "assets/project-10.svg",
    summary: {
      zh: "利用 DepthmapX 演算軸線整合度（Integration）與穿透度（Choice），解析步行人流密度與商業立面空間配置之空間結構規律。",
      en: "Using DepthmapX to calculate axial integration and choice, revealing underlying spatial laws linking pedestrian density with storefront commerce."
    },
    concept: {
      zh: "西門町是台北最具活力的徒步商業聚落。研究導入 Hillier 的空間句法理論，繪製 120 條主要軸線地圖（Axial Map）。研究發現全球整合度最高的『漢中街-峨眉街交匯軸』與青年聚集熱點完全吻合，證實都市空間拓樸拓撲構造對人類行動模式具備決定性影響。",
      en: "Deploying Bill Hillier's Space Syntax methodology, this research modeled 120 axial segments across Ximending. Statistical regression confirmed a 0.84 correlation between local integration values and real-world pedestrian counts, informing commercial revitalization."
    },
    drawings: [
      { type: "Syntax Map", label: { zh: "西門町核心街廓全局整合度（Rn）軸線分析圖", en: "Global Integration (Rn) Axial Map of Core Ximending" }, src: "assets/project-10.svg" }
    ],
    tags: ["Space Syntax", "DepthmapX", "Urban Morphology", "Accessibility", "Research"]
  }
];

// UI Text Dictionary for i18n
const I18N = {
  zh: {
    siteTitle: "PORTFOLIO",
    siteSubtitle: "建築系學生五年學習歷程與設計作品集",
    curatorNote: "收錄一至五年級建築設計、選修課程與研究專題",
    filterAll: "全部作品",
    filterStudio: "建築設計 (一~五年級)",
    filterElective: "選修科目",
    filterResearch: "研究專題",
    yearAll: "全部年級",
    timeline: "時間軸",
    searchPlaceholder: "搜尋作品名稱、年份、建築類型或標籤...",
    totalProjects: "件作品展示中",
    btnAssetManager: "📷 圖片管理中心",
    btnPresentation: "📊 期末報告與評量",
    customBadge: "已換裝置圖片",
    defaultBadge: "原創圖紙",
    replaceFromDevice: "從我的裝置抽換圖片",
    quickReplace: "更換圖片",
    viewDetails: "查閱作品檔案",
    prevProject: "上一個作品 (←)",
    nextProject: "下一個作品 (→)",
    close: "關閉 (Esc)",
    projectDossier: "作品檔案編號",
    studioMeta: "設計課與指引",
    conceptTitle: "設計概念與構造論述",
    drawingsTitle: "圖紙、模型與圖說庫",
    tagsTitle: "關鍵詞與技術標籤",
    uploadSuccess: "成功載入本機裝置圖片！",
    exportData: "匯出備份資料 (JSON)",
    importData: "匯入備份資料",
    resetDefaults: "重設為預設圖紙",
    resetConfirm: "確定要將所有圖片恢復為預設的原創建築圖紙嗎？",
    dragDropText: "拖曳圖片至此，或點擊由本機檔案選擇",
    imageSlotLabel: "作品主視覺封面",
    managerTitle: "本機裝置圖片管理中心",
    managerSubtitle: "隨時替換您個人的建築手繪圖、平立剖面CAD、3D渲染圖或實體模型照片，所有變更自動儲存於您的瀏覽器本機資料庫。",
    reportTitle: "期末專案報告與自評對照",
    scorePreview: "目前預估得分",
    scoreTotal: "100 / 100",
    rubricBasic: "基本作品 (60分滿分)",
    rubricBonus: "四個加分項目 (+40分滿分)",
    improvementsTitle: "三項實際改善歷程紀錄 (前後對照)",
    navTimeline: "歷年時間軸",
    themeLight: "日間",
    themeDark: "夜間",
    themeAuto: "系統",
    visualStreamTitle: "圖紙、模型與空間影像 (由上至下依序排列)",
    btnAddImage: "新增圖片 (由本機選取)",
    addImagesTitle: "新增或擴充此作品之圖片 (由上至下依序排列)",
    dragDropMultiText: "拖曳一張或多張圖片至此，或點擊選取檔案增加數量",
    deleteSingleImg: "移除此圖",
    imgSeqBadge: "圖紙",
    moveUp: "▲ 上移",
    moveDown: "▼ 下移",
    btnAddImageBottom: "➕ 在最下方新增照片 (由本機選取)",
    reorderSuccess: "照片順序已更新並自動儲存！",
    footerText: "自然科學與人工智慧課程 · 建築設計學程期末專案成果"
  },
  en: {
    siteTitle: "PORTFOLIO",
    siteSubtitle: "Architecture Student 5-Year Portfolio & Academic Archive",
    curatorNote: "Design Studios (Years 1-5), Elective Studies & Theoretical Research",
    filterAll: "All Works",
    filterStudio: "Design Studio (Yr 1-5)",
    filterElective: "Electives",
    filterResearch: "Research & Theory",
    yearAll: "All Years",
    timeline: "Timeline",
    searchPlaceholder: "Search projects, typologies, years, or tags...",
    totalProjects: "works curated",
    btnAssetManager: "📷 Device Asset Manager",
    btnPresentation: "📊 Final Presentation & Rubric",
    customBadge: "Device Image Active",
    defaultBadge: "Original Drawing",
    replaceFromDevice: "Replace with Device Image",
    quickReplace: "Replace Image",
    viewDetails: "View Project Dossier",
    prevProject: "Previous (←)",
    nextProject: "Next (→)",
    close: "Close (Esc)",
    projectDossier: "Project Dossier Code",
    studioMeta: "Studio & Mentorship",
    conceptTitle: "Architectural Statement & Tectonics",
    drawingsTitle: "Drawings, Models & Visual Archive",
    tagsTitle: "Keywords & Technical Tags",
    uploadSuccess: "Device image successfully loaded and saved locally!",
    exportData: "Export Backup Data (JSON)",
    importData: "Import Backup Data",
    resetDefaults: "Reset to Default Drawings",
    resetConfirm: "Are you sure you want to reset all images to the default architectural drawings?",
    dragDropText: "Drag & drop image here, or click to browse device files",
    imageSlotLabel: "Primary Cover Visual",
    managerTitle: "Local Device Asset Manager",
    managerSubtitle: "Replace any project drawings with your own architectural renders, sketches, plans or physical models. Saved persistently in local IndexedDB.",
    reportTitle: "Final Project Presentation & Grading Rubric",
    scorePreview: "Estimated Score",
    scoreTotal: "100 / 100",
    rubricBasic: "Base Requirements (60/60 pts)",
    rubricBonus: "Four Bonus Criteria (+40 pts)",
    improvementsTitle: "Three Documented Architectural Improvements",
    navTimeline: "Chronological Timeline",
    themeLight: "Light",
    themeDark: "Dark",
    themeAuto: "Auto",
    visualStreamTitle: "Drawings, Models & Visual Archive (Ordered Vertically)",
    btnAddImage: "Add Image from Device",
    addImagesTitle: "Add or Expand Project Images (Ordered Vertically)",
    dragDropMultiText: "Drag & drop one or multiple images here, or click to add more",
    deleteSingleImg: "Remove Image",
    imgSeqBadge: "Figure",
    moveUp: "▲ Move Up",
    moveDown: "▼ Move Down",
    btnAddImageBottom: "➕ Add Photo to End (from Device)",
    reorderSuccess: "Photo order updated and saved!",
    footerText: "Natural Science & AI Course · Architecture Portfolio Final Project"
  }
};
