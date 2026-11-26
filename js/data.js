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
    location: { zh: "基隆八斗子觀光漁港水岸消波碼頭", en: "Badouzi Fishing Port Breakwater Waterfront, Keelung" },
    advisor: { zh: "黃柏森 建築師", en: "Arch. Bo-Sen Huang" },
    defaultImage: "assets/project-3-tidal-library.jpg",
    summary: {
      zh: "依附於八斗子外防波堤之水岸文化地標。透過 16 米懸挑閱讀廊道直面海潮湧動，並將消波潮間帶轉化為建築蓄水階梯，引入海水進行被動式熱交換調節，構築讀者與浩瀚太平洋對話之精神場域。",
      en: "A waterfront cultural landmark anchored to the Badouzi breakwater pier. Featuring a dramatic 16-meter cantilevered reading gallery suspended directly over ocean swells, the design transforms intertidal retention pools into passive seawater heat-exchange aquifers, crafting a contemplative sanctuary overlooking the Pacific."
    },
    concept: {
      zh: "八斗子漁港乘載著北台灣百年討海記憶與狂暴海象的歷史沈積。本案跳脫傳統公共圖書館內向閉鎖的閱覽模式，將建築量體精確植入消波碼頭外側的潮間帶岩礁。低層採用高抗硫酸鹽清水混凝土巨型基座，漲潮時海水自然漫入消波景觀水階，使建築下部形成潮汐流體動態調節池；高層閱覽主體則以 16 米大跨度耐候鋼空間桁架（Weathering Steel Space Truss）橫向懸挑於海浪之上，外覆超低反射雙層中空減反射玻璃，消弭內外邊界。讀者身處懸挑長廊端點，腳下即為拍岸浪潮，伴隨潮汐聲響、海鹽氣息與夕照波光，將獲取知識的過程昇華為對海洋自然力量的身體性感知。",
      en: "Badouzi Harbor embodies northern Taiwan’s century-old maritime memory and relentless oceanic exposure. This project departs from the inward-looking typology of conventional municipal libraries by directly anchoring its structural mass onto the intertidal basalt bedrock beyond the breakwater. The lower levels employ high-durability sulfate-resistant fair-faced concrete caissons, where seawater enters retention terraces at high tide to function as a passive thermodynamic heat-sink. Above, the principal reading hall cantilevers 16 meters over the crashing surf via weathering steel space trusses, wrapped in anti-reflective double-glazed curtain walls that dissolve visual thresholds. Readers positioned at the cantilevered prow perceive the rhythm of Pacific waves beneath their feet, intertwining knowledge acquisition with somatic awareness of coastal elemental forces."
    },
    drawings: [
      {
        type: "Section Perspective",
        label: {
          zh: "1:200 消波碼頭水岸全區配置與 16 米耐候鋼懸挑閱覽剖面透視圖（Nano Banana 原創圖紙）",
          en: "1:200 Breakwater Waterfront Site Plan & 16m Weathering Steel Cantilever Tidal Section Perspective"
        },
        src: "assets/project-3-tidal-library.jpg"
      },
      {
        type: "Tectonic Axonometric",
        label: {
          zh: "1:50 耐候鋼空間桁架構造分解與消波塊潮間帶抗浪基礎大樣",
          en: "1:50 Weathering Steel Space Truss Breakdown & Intertidal Wave-Breaking Foundation Detail"
        },
        src: "assets/project-3.svg"
      }
    ],
    tags: ["Waterfront", "Library", "Public Architecture", "Cantilever", "Marine Culture", "Weathering Steel", "Intertidal Basin"]
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
    location: { zh: "基隆港東岸威海營區與東五號碼頭", en: "Keelung Harbor East Wharf E-5 & Former Naval Base" },
    advisor: { zh: "蔡明宏 特聘教授", en: "Distinguished Prof. Ming-Hong Tsai" },
    defaultImage: "assets/project-5-suture-masterplan.jpg",
    summary: {
      zh: "解構基隆港東岸封閉超過七十載之軍事管制邊界。以全長 3 公里的立體人行地景甲板跨越沿海高架交通阻隔，串聯港灣濕地、造船工藝修復場與潮境露天劇場，重塑市民親水權利與山海共生都市紋理。",
      en: "Dismantling a 70-year military perimeter at Wharf E-5, Keelung. A 3km continuous elevated pedestrian landscape deck spans over congested coastal viaducts, synthesizing wetland bio-filtration, artisanal naval shipbuilding, and an amphitheater to restore civic waterfront access."
    },
    concept: {
      zh: "本案為大五畢業設計專題，直擊基隆市百年來因軍事防衛、港務海關與沿海高架橋切割，導致市中心與內港水岸嚴重割裂之都市宿命。藉由國防部威海營區與東五號海軍碼頭騰退之歷史契機，本設計提出全長 3 公里的『立體山海縫合甲板（Suture Deck）』。在構造策略上，以輕質斜張拉索鋼構橋塔（Cable-stayed Hybrid Structure）空降於東岸聯外高架道路之上，將中正公園山脊綠意平緩導引入海港；底層活化歷史造船修造塢，建構結合海水鹽生植物的生態淨化濕地；末端延伸為漂浮於潮境海灣的開敞階梯劇場。都市不再是陸地與海洋的對立阻隔，而是透過連續流動的人行地景，讓市民重新奪回撫觸浪濤與眺望港景的自由。",
      en: "This graduation thesis seizes the historic decommissioning of Keelung's Naval Base E-5 to confront a century of physical alienation between the city and its harbor, historically severed by military blockades and elevated coastal expressways. The design synthesizes a 3-kilometer continuous 'Mountain-to-Sea Suture Deck'. Structurally resolved through cable-stayed hybrid steel spans that vault gracefully above vehicular viaducts, the deck funnels the lush ridges of Zhongzheng Park directly down to the waterfront. At grade, obsolete dry docks are repurposed into halophytic bio-filtration wetlands and naval artisan workshops, culminating in a tidal amphitheater floating over the bay. Rather than treating the urban edge as an impenetrable barrier, the project reclaims the citizen's democratic right to the horizon through continuous, topography-braided pedestrian infrastructure."
    },
    drawings: [
      {
        type: "Masterplan Axonometric",
        label: {
          zh: "1:500 港山縫合全區景觀總圖與 3 公里立體人行地景甲板等角軸測圖（Nano Banana 原創圖紙）",
          en: "1:500 Mountain-to-Sea Urban Suture Masterplan & 3km Elevated Landscape Deck Axonometric"
        },
        src: "assets/project-5-suture-masterplan.jpg"
      },
      {
        type: "Structural Section",
        label: {
          zh: "1:100 斜張鋼構高架人行步道跨越沿海公路縱向剖面透視圖",
          en: "1:100 Cable-Stayed Pedestrian Viaduct Crossing Coastal Expressway Section Perspective"
        },
        src: "assets/project-5.svg"
      }
    ],
    tags: ["Thesis", "Graduation Design", "Urban Suture", "Waterfront", "Masterplan", "Pedestrian Deck", "Cable-Stayed Bridge"]
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
    defaultImage: "assets/project-8-folded-plate.jpg",
    summary: {
      zh: "探討台灣林業疏伐木柳杉之工程力學極限。捨棄進口高碳排鋼接件，研發幾何連續立體折板與全木榫卯栓接體系，成功驗證 9 米無柱跨距之自承重木構空間原型。",
      en: "Pushing the mechanical performance limits of Taiwan's thinned Cryptomeria timber. Eliminating imported steel brackets, this research develops self-supporting glulam folded plates joined via all-wood mortise-and-tenon dowels, achieving a 9m column-free clear span."
    },
    concept: {
      zh: "修習『木構造設計與結構形態學』之深入研究成果。面對當代木構造過度依賴國外進口昂貴五金連接件的沉苛，本案回歸『以幾何形態產生剛度（Form-Active Rigidity）』之構造本質。選用台灣新竹五峰與南投林區之國產柳杉（Cryptomeria japonica）疏伐木，經低溫除濕乾燥與高壓膠合製成 120mm 五層交錯膠合折板。透過 128 度與 52 度交替之空間摺痕，大幅擴張板件面外抗彎慣性矩（Moment of Inertia），厚度減縮達 25%。折板交界面創新研發『木栓燕尾暗榫（Concealed Dovetail Wooden Dowels）』，全構件可於木工坊預製後由四名工人以人力徒手吊掛組裝。經極限垂直載重與動態抗震試驗，成功承受 3.6 kN/m² 荷載，展現純木工法於大跨度公共空間之永續潛力。",
      en: "Developed within the Advanced Timber Engineering seminar, this project challenges the contemporary over-reliance on imported, high-carbon steel connectors by reviving the tectonic principle of form-active rigidity. Utilizing domestic thinned Cryptomeria lumber harvested from Hsinchu and Nantou, the material was processed into 120mm 5-ply cross-laminated folded plates. Alternating dihedral fold angles of 128° and 52° dramatically amplify out-of-plane second moments of area, achieving a 25% reduction in material thickness. Panel interfaces feature proprietary all-timber concealed dovetail joints locked with hardwood dowels, allowing rapid prefabrication and human-scale erection without heavy cranes. Destructive load-testing verified elastic deflection resilience up to 3.6 kN/m², proving the viability of native timber in large-span civic architecture."
    },
    drawings: [
      {
        type: "Tectonic Axonometric",
        label: {
          zh: "1:20 國產柳杉膠合木 9 米無柱跨距折板屋架力學原型與榫卯栓接構造分解圖（Nano Banana 原創圖紙）",
          en: "1:20 Domestic Cryptomeria Glulam 9m Column-Free Folded Plate Prototype & Mortise-and-Tenon Assembly"
        },
        src: "assets/project-8-folded-plate.jpg"
      },
      {
        type: "Load Testing Diagram",
        label: {
          zh: "1:20 膠合木幾何摺痕面外剛度增強與破壞載重應力流線圖",
          en: "1:20 Glulam Dihedral Fold Form-Active Rigidity & Destructive Load Stress Streamlines"
        },
        src: "assets/project-8.svg"
      }
    ],
    tags: ["Timber Structure", "Glulam", "Folded Plate", "Prototyping", "Sustainable", "Structural Morphology", "Wood Joinery"]
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
      zh: "低密度迎季風面的微氣候與通風風廊 CFD 數值模擬",
      en: "CFD Microclimate & Wind Corridor Simulation on Low-Density Windward Fronts"
    },
    typology: { zh: "學術研究論文／都市微氣候", en: "Academic Research / Urban Climatology" },
    location: { zh: "台北盆地信義計畫區邊界", en: "Xinyi District Border, Taipei" },
    advisor: { zh: "沈家駒 教授", en: "Prof. Jia-Ju Shen" },
    defaultImage: "assets/project-9.svg",
    summary: {
      zh: "運用 OpenFOAM 計算流體力學，量化低密度迎季風面之建築群退縮比對消除都市熱島效應之關聯性，建立低風速死區改善指引。",
      en: "Utilizing OpenFOAM CFD to quantify building setback ratios on low-density windward fronts for urban heat island mitigation, establishing planning guidelines for pedestrian airflow."
    },
    concept: {
      zh: "本研究針對低密度迎季風面之開放街廓展開流體模擬。研究指出，當迎風面配置順應季風主導風向時，可有效消除滯熱死區。透過本研究所提出的『多孔隙通透低樓層』與『導風傾角屋頂』設計準則，能有效將涼爽季風導入行人層，平均降溫達 1.8°C。",
      en: "Focusing on low-density windward urban fabrics, this CFD research simulated monsoon airflow patterns. The paper proves that a stepped ground-floor arcade aligned with prevailing windward vectors reduces stagnant hot spots by 45%, providing quantitative design guidelines for sustainable zoning."
    },
    drawings: [
      { type: "Simulation", label: { zh: "都市風速向量流線分布與熱島溫度色階圖", en: "CFD Wind Velocity Streamlines & Thermal Gradient Map" }, src: "assets/project-9.svg" }
    ],
    tags: ["Research", "CFD Simulation", "Microclimate", "Urban Heat Island", "OpenFOAM", "Windward Front"]
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
    defaultImage: "assets/project-10-space-syntax.jpg",
    summary: {
      zh: "結合 Bill Hillier 空間句法理論與 DepthmapX 演算核心。針對西門町 120 條主要街道軸線建立拓樸拓撲模型，精準量化空間整合度與人流行為關聯性（R²=0.84），提出舊商圈步行動線微創改造指引。",
      en: "Synthesizing Bill Hillier's Space Syntax theory with DepthmapX computational modeling across 120 axial lines in Ximending, Taipei. Quantifying the statistical correlation between global integration and pedestrian flows (R²=0.84) to guide commercial urban revitalization."
    },
    concept: {
      zh: "修習『建築理論與空間資訊專題』之學術研究成果。西門町自日治時期以來便是台北最具代表性的商圈，但其內部次級巷弄長期面臨人潮分配不均與空間死角課題。本研究導入空間句法（Space Syntax）之軸線圖分析法（Axial Analysis），於 DepthmapX 平台建構包含 120 條街道軸段之都市網絡拓樸矩陣。運算結果證實：全區整合度最高的『漢中街-峨眉街交匯軸（Rn=1.42）』與現場觀測之極高人流密度（>180 人/分鐘）具備高達 R²=0.84 的統計回歸相關性；反之，具備高度歷史價值的後街商巷則因穿透度（Choice）衰減高達 72% 而形成經濟邊界。本研究進一步提出『微創穿透破口（Acupuncture Spatial Puncture）』設計方案，透過局部拆卸騎樓私有隔屏，成功在模擬模型中提升周邊副街廓 38% 之步行可達性，提供都市空間規劃具實證基礎的科學決策支持。",
      en: "Completed within the Spatial Information and Architectural Theory research seminar, this study investigates pedestrian inequity within Taipei's historic Ximending district. Deploying Bill Hillier’s Space Syntax methodology, the research established an axial topological model comprising 120 road segments processed via DepthmapX. Mathematical integration (Rn) and topological choice algorithms revealed that the Hanzhong-Emei primary intersection achieves the city's highest integration score (Rn=1.42), exhibiting an empirical R²=0.84 correlation with real-world pedestrian sensor counts (>180 persons/min). Conversely, historic artisan alleyways suffer up to 72% decay in topological choice, creating socio-economic stagnation. The study formulates an 'Acupuncture Spatial Puncture' urban protocol—strategically opening private arcade barriers to boost secondary alleyway walkability by 38% in simulated networks, establishing an empirical foundation for evidence-based urban morphology."
    },
    drawings: [
      {
        type: "Space Syntax Map",
        label: {
          zh: "西門町 120 條主要街道軸線全局整合度（Rn）與穿透度（Choice）拓樸色階熱力圖（Nano Banana 原創圖紙）",
          en: "Ximending 120-Axial Line Global Integration (Rn) & Choice Topological Heatmap"
        },
        src: "assets/project-10-space-syntax.jpg"
      },
      {
        type: "Regression & Morphology",
        label: {
          zh: "核心商圈街廓空間句法整合度與步行人流迴歸相關性分析圖（R²=0.84）",
          en: "Space Syntax Integration vs. Pedestrian Flow Statistical Regression Correlation Map (R²=0.84)"
        },
        src: "assets/project-10.svg"
      }
    ],
    tags: ["Space Syntax", "DepthmapX", "Urban Morphology", "Accessibility", "Research", "Walkability", "Pedestrian Network"]
  },
  {
    id: "proj-11",
    yearNumber: 4,
    yearLabel: { zh: "四年級", en: "Year 4" },
    semester: { zh: "大四下 · 專業選修", en: "4th Year Spring · Elective" },
    period: "2024",
    category: "elective",
    categoryLabel: { zh: "選修科目", en: "Elective Courses" },
    code: "ELE-440",
    title: {
      zh: "標準化原型與大街廓批判：台灣 1970–1980 年代準則國宅空間形態學研究",
      en: "Standardized Prototypes & Superblock Critique: Spatial Morphology of Taiwan's 1970–1980s Public Housing"
    },
    typology: { zh: "集合住宅空間形態學／現代主義都市批判", en: "Housing Typology & Morphology / Critical Urbanism" },
    location: { zh: "台北市大安國宅、成功國宅社區與忠孝國宅", en: "Da'an, Chenggong & Zhongxiao Public Housing Estates, Taipei" },
    advisor: { zh: "夏鑄九 講座教授 / 住宅空間研究室", en: "Prof. Chu-Joe Hsia / Housing Space Laboratory" },
    defaultImage: "assets/project-11.svg",
    summary: {
      zh: "剖析台灣 1970 至 1980 年代『六年國宅計畫』之準則國宅空間機制。從單元平面『L+D+K 核心確立』與『服務核集中化』標準化工業化邏輯，到大基地『雷特朋人車分道』與『公園中的塔』現代主義大街廓規劃，進而批判其演變為都市孤立『飛地』與機車停車矛盾之歷史教訓。",
      en: "Analyzing the spatial apparatus of Taiwan's 1970–1980s standardized public housing under the Six-Year Housing Plan. Investigating unit-level 'L+D+K living cores' and centralized service shafts alongside superblock urbanism inspired by Le Corbusier's 'Tower in the Park' and Radburn pedestrian segregation, while critiquing their historical descent into urban enclaves and pedestrian-scooter conflicts."
    },
    concept: {
      zh: "修習『台灣戰後集合住宅與都市形態專題』之核心研究成果。本研究緊扣台灣 1970 年代中後期至 1980 年代政府頒布《國民住宅條例》與實施『六年國宅計畫』之『準則國宅時期』，以台北市指標性之大安國宅與成功國宅為實證案例，解構兩大維度之空間體系：\n\n一、 單元平面原型與高坪效工業化邏輯：\n為達成國家在有限土地與造價下的大規模快速供給，單元平面發展出高度同質的空間原型。其一為確立『L+D+K』公共起居軸線，將客餐廳連貫並緊鄰獨立廚房，擺脫戰後初期暗廳困局；其二為『服務機能核（Service Core）集中化』，將廚房、衛浴與工作後陽台集中背靠背配置，共用垂直水電管道間（Pipe Chase）以極大化施工效率並防阻油煙濕氣；其三為『極小化過道（Corridor）』，臥室房門直接面向小型過渡小廳，在 24–34 坪的小坪數內實現極致之『三房兩廳』；其四為住棟走向『四併型』與『風車十字型』幾何組合，確保各單元均具備雙面採光與風向對流。\n\n二、 大街廓社區規劃與西方現代主義移植：\n在社區層面，國宅全面實踐柯比意（Le Corbusier）『光輝城市』中『公園中的塔（Tower in the Park）』理念與美國『雷特朋原則（Radburn Principles）』。依循《國民住宅社區規劃及住宅設計規則》與《臺北市鼓勵大街廓設計審查原則》，將數個街廓整併為逾 15,000 平方公尺之巨型基地，以 10 至 19 層高樓壓低建蔽率至 30%–40%，騰出地面圍塑中央綠地與防衛空間（Defensible Space）；車行動線外圍化與地下化，人工平台專供人行、幼兒園與生活商場，建構自給自足微型社會。\n\n三、 歷史反思與空間批判：\n本研究援引夏鑄九、沈孟穎等學者論述展開歷史檢討：大街廓巨型量體與封閉防衛邊界實質造成與周邊舊市區紋理斷裂，異化為都市『孤立飛地（Enclave）』；西式汽車導向的人車分道與台灣 1980 年代機車/公車為主的現實嚴重脫節，導致地面人行步道遭機車大量佔據；而俯視圖面的幾何中庭更因缺乏遮蔭與人體尺度失調，暴露了技術官僚理性規劃與日常真實生活的深刻斷裂。",
      en: "Completed within the Post-war Housing Typology and Urban Morphology research seminar. Focuses on Taiwan's 'Standardized Public Housing Era' (1970s–1980s) initiated under the Six-Year Public Housing Plan and the Public Housing Act, using Taipei's landmark Da'an and Chenggong estates as empirical benchmarks across two interconnected spatial dimensions:\n\n1. Standardized Unit Prototypes & High-Efficiency Industrialization:\nTo achieve rapid mass housing within constrained budgets, architectural layouts crystallized into standardized prototypes. First, establishing the 'L+D+K' (Living-Dining-Kitchen) social spine by creating continuous living-dining axes adjacent to segregated galley kitchens. Second, 'Service Core Centralization'—clustering kitchens, bathrooms, and utility verandas back-to-back to share vertical mechanical pipe chases (Pipe Chase) for maximal plumbing efficiency. Third, 'Corridor Minimization', where bedrooms radiate directly off a compressed transitional node to pack three-bedroom programs into 24–34 ping footprints. Fourth, transitioning from linear slab blocks to 4-in-1 cluster and pinwheel geometries ensuring dual-aspect daylighting and cross-ventilation.\n\n2. Superblock Urbanism & Modernist Ideological Transplantation:\nAt the neighborhood scale, planning doctrine imported Le Corbusier's 'Tower in the Park' (Radiant City) and American 'Radburn Principles'. Governed by the 1984 Public Housing Community Design Rules and Taipei's Superblock Bonus Regulations, multiple blocks were consolidated into massive 15,000+ sqm parcels. High-rise towers (10–19 storeys) capped building coverage at 30%–40%, liberating ground planes for geometric courtyards and Oscar Newman's 'Defensible Space'. Peripheral and subterranean vehicular circulation yielded elevated pedestrian decks housing internal nurseries, markets, and civic centers.\n\n3. Historical Spatial Critique:\nSynthesizing critical frameworks by scholars Chu-Joe Hsia and Meng-Ying Shen, this research dissects systemic contradictions: the fortified perimeter created urban 'enclaves' that severed surrounding neighborhood fabrics; the automotive-centric Radburn dogma collided with Taiwan's scooter-dominated mobility, leaving walkways colonized by two-wheelers; and rigid aerial geometric plazas, lacking shade and micro-scale intimacy, unveiled the profound fissure between technocratic rationalism and lived spatial reality."
    },
    drawings: [
      {
        type: "Architectural Plan (Awaiting Upload)",
        label: {
          zh: "【圖紙 01 · 待上傳】1:50 準則國宅標準化單元空間原型分析圖（L+D+K 動靜分區與集中服務核管道間配置）",
          en: "Figure 01 (Awaiting Upload): 1:50 Standardized Housing Prototype Plan (L+D+K Living Core & Pipe Chase Detail)"
        },
        src: "assets/project-11.svg"
      },
      {
        type: "Superblock Axonometric (Awaiting Upload)",
        label: {
          zh: "【圖紙 02 · 待上傳】1:500 大街廓國宅社區立體人車分道、防衛中庭與都市飛地形態分析軸測圖",
          en: "Figure 02 (Awaiting Upload): 1:500 Superblock Morphology Axonometric (Pedestrian-Vehicular Segregation & Enclave Analysis)"
        },
        src: "assets/project-11.svg"
      }
    ],
    tags: ["Public Housing", "Superblock", "Housing Typology", "Service Core", "Modernism", "Urban Morphology", "Taiwan Architecture", "Defensible Space"]
  }
];

// ==========================================================================
// Divisare Atlas Architectural Taxonomy & Keywords Index
// Categorized keywords & technical tags inspired by Divisare.com Atlas
// ==========================================================================
const DIVISARE_ATLAS_TAXONOMY = [
  {
    id: "elements",
    name: "ELEMENTS",
    labelZh: "建築構件與空間元素",
    icon: "⊞",
    tags: [
      { id: "arcades", name: "ARCADES & TING-A-KHA", labelZh: "連續騎樓與亭仔腳", projectIds: ["proj-7", "proj-4"] },
      { id: "arches", name: "ARCHES", labelZh: "清水紅磚拱圈廊道", projectIds: ["proj-7"] },
      { id: "balconies", name: "BALCONIES & TERRACES", labelZh: "退縮露台與私家花園", projectIds: ["proj-2", "proj-4", "proj-11"] },
      { id: "cantilevers", name: "CANTILEVERS", labelZh: "16米水岸懸挑閱讀廊道", projectIds: ["proj-3"] },
      { id: "columns", name: "COLUMNS & CAPITALS", labelZh: "紅磚圓柱與莨苕葉柱頭", projectIds: ["proj-7"] },
      { id: "courtyards", name: "COURTYARDS & ATRIUMS", labelZh: "中庭草坪與長條拔風天井", projectIds: ["proj-1", "proj-7", "proj-11"] },
      { id: "folded-plates", name: "FOLDED PLATES", labelZh: "自承重膠合木連續折板", projectIds: ["proj-8"] },
      { id: "kinetic-facade", name: "KINETIC SHADING", labelZh: "演算法動態日照感應百葉", projectIds: ["proj-6"] },
      { id: "pediments", name: "PEDIMENTS & PLASTERWORK", labelZh: "折衷主義巴洛克泥塑山牆", projectIds: ["proj-7"] },
      { id: "reciprocal-joinery", name: "RECIPROCAL JOINERY", labelZh: "互承木構與榫卯抗剪節點", projectIds: ["proj-1", "proj-8"] },
      { id: "roof-gardens", name: "ROOF GARDENS & RAMPS", labelZh: "螺旋立體公共空中農園", projectIds: ["proj-4"] },
      { id: "service-cores", name: "SERVICE CORES & SHAFTS", labelZh: "服務核與垂直管道間集中配置", projectIds: ["proj-11"] },
      { id: "solar-chimneys", name: "SOLAR CHIMNEYS", labelZh: "熱浮力自然對流拔風風井", projectIds: ["proj-4", "proj-7"] },
      { id: "suspension-bridge", name: "SUSPENSION BRIDGES", labelZh: "大跨度鋼構吊橋人行甲板", projectIds: ["proj-5"] }
    ]
  },
  {
    id: "materiality",
    name: "MATERIALITY",
    labelZh: "構造材料與營造工法",
    icon: "◈",
    tags: [
      { id: "brick-masonry", name: "BRICK & MASONRY", labelZh: "清水紅磚與閩南磚造體系", projectIds: ["proj-7"] },
      { id: "concrete-terrazzo", name: "CONCRETE & TERRAZZO", labelZh: "清水混凝土與耐候洗石子", projectIds: ["proj-2", "proj-3"] },
      { id: "cryptomeria", name: "CRYPTOMERIA TIMBER", labelZh: "在地國產柳杉與疏伐木材", projectIds: ["proj-1", "proj-8"] },
      { id: "digital-fab", name: "DIGITAL FABRICATION", labelZh: "雷射切割、3D列印與CNC", projectIds: ["proj-6"] },
      { id: "glulam", name: "GLULAM TIMBER", labelZh: "高剛度膠合木與工程木材", projectIds: ["proj-8"] },
      { id: "glass", name: "LOW-REFLECTION GLASS", labelZh: "超低反射水岸全景透光玻璃", projectIds: ["proj-3"] },
      { id: "steel-structures", name: "STEEL STRUCTURES", labelZh: "大跨距耐候鋼與拉索桁架", projectIds: ["proj-3", "proj-5"] },
      { id: "weathering-steel", name: "WEATHERING STEEL", labelZh: "耐候鏽蝕鋼板與海風抗蝕", projectIds: ["proj-3"] },
      { id: "wooden-structures", name: "WOODEN STRUCTURES", labelZh: "輕質木構與無金屬榫接系統", projectIds: ["proj-1", "proj-8"] }
    ]
  },
  {
    id: "types",
    name: "TYPES",
    labelZh: "建築類型與空間機能",
    icon: "▲",
    tags: [
      { id: "academic-research", name: "ACADEMIC RESEARCH", labelZh: "計算流體模擬與形態學論文", projectIds: ["proj-9", "proj-10"] },
      { id: "collective-housing", name: "COLLECTIVE HOUSING", labelZh: "坡地梯級退縮集合住宅", projectIds: ["proj-2", "proj-11"] },
      { id: "computational-prototype", name: "COMPUTATIONAL PROTOTYPE", labelZh: "參數化自適應動態構件", projectIds: ["proj-6"] },
      { id: "experimental-pavilion", name: "EXPERIMENTAL PAVILION", labelZh: "輕質木構微氣候感知實驗亭", projectIds: ["proj-1"] },
      { id: "historic-survey", name: "HISTORIC FIELD SURVEY", labelZh: "大稻埕街屋立面實測與踏查", projectIds: ["proj-7"] },
      { id: "infrastructure", name: "INFRASTRUCTURE & MASTERPLAN", labelZh: "基隆軍港東岸轉型都市設計", projectIds: ["proj-5"] },
      { id: "mixed-use-agro", name: "MIXED-USE AGRO-TOWER", labelZh: "高密度舊城混居與垂直農園", projectIds: ["proj-4"] },
      { id: "public-housing", name: "PUBLIC HOUSING & SUPERBLOCKS", labelZh: "準則國宅與大街廓社區研究", projectIds: ["proj-11"] },
      { id: "public-library", name: "PUBLIC LIBRARY", labelZh: "八斗子潮汐海洋文化圖書館", projectIds: ["proj-3"] },
      { id: "structural-prototype", name: "STRUCTURAL PROTOTYPE", labelZh: "9米無柱跨距折板屋架力學原型", projectIds: ["proj-8"] }
    ]
  },
  {
    id: "topics",
    name: "TOPICS",
    labelZh: "環境永續與微氣候科學",
    icon: "◎",
    tags: [
      { id: "aerodynamics", name: "AERODYNAMICS", labelZh: "迎風面折板與氣流捕捉導引", projectIds: ["proj-1", "proj-9"] },
      { id: "cfd-simulation", name: "CFD SIMULATION", labelZh: "OpenFOAM 迎季風面微氣候模擬", projectIds: ["proj-9"] },
      { id: "daylighting", name: "DAYLIGHTING & SOLAR", labelZh: "Ladybug 太陽輻射即時演算法", projectIds: ["proj-6"] },
      { id: "defensible-space", name: "DEFENSIBLE SPACE & ZONING", labelZh: "防衛空間與人車分道立體分區", projectIds: ["proj-11"] },
      { id: "housing-policy", name: "HOUSING STANDARDIZATION", labelZh: "國民住宅條例與標準化工業化", projectIds: ["proj-11"] },
      { id: "intertidal", name: "INTERTIDAL INTEGRATION", labelZh: "消波碼頭潮汐海水熱交換調節", projectIds: ["proj-3"] },
      { id: "microclimate", name: "MICROCLIMATE", labelZh: "中庭與街道微氣候通風優化", projectIds: ["proj-1", "proj-9"] },
      { id: "passive-ventilation", name: "PASSIVE VENTILATION", labelZh: "騎樓多孔隙通透與浮力拔風", projectIds: ["proj-4", "proj-7", "proj-9", "proj-11"] },
      { id: "space-syntax", name: "SPACE SYNTAX", labelZh: "DepthmapX 軸線拓樸整合度分析", projectIds: ["proj-10"] },
      { id: "sustainability", name: "SUSTAINABLE DESIGN", labelZh: "中水回收、垂直綠化與永續材料", projectIds: ["proj-4", "proj-8"] },
      { id: "topography", name: "TOPOGRAPHY & SLOPES", labelZh: "依循等高線梯級退縮縫合", projectIds: ["proj-2"] },
      { id: "urban-heat-island", name: "URBAN HEAT ISLAND", labelZh: "亞熱帶盆地熱島效應緩解", projectIds: ["proj-9"] }
    ]
  },
  {
    id: "ideas",
    name: "IDEAS",
    labelZh: "設計概念與演算手法",
    icon: "◆",
    tags: [
      { id: "mockup-1-1", name: "1:1 PHYSICAL MOCKUP", labelZh: "1:1 實體榫接節點與破壞試驗", projectIds: ["proj-1", "proj-8"] },
      { id: "algorithmic-arch", name: "ALGORITHMIC ARCHITECTURE", labelZh: "Grasshopper 參數化關聯幾何", projectIds: ["proj-6"] },
      { id: "community-resilience", name: "COMMUNITY RESILIENCE", labelZh: "青年共居、傳統市場與長照互助", projectIds: ["proj-4"] },
      { id: "enclave-critique", name: "URBAN ENCLAVE CRITIQUE", labelZh: "都市飛地與歷史空間批判反思", projectIds: ["proj-11"] },
      { id: "historic-tectonics", name: "HISTORIC TECTONICS", labelZh: "閩南磚瓦至日治折衷泥塑流變", projectIds: ["proj-7"] },
      { id: "measured-drafting", name: "MEASURED DRAFTING", labelZh: "現場正投影測繪手稿與大樣圖", projectIds: ["proj-7"] },
      { id: "modernist-transplant", name: "MODERNIST URBANISM", labelZh: "光輝城市與公園中的塔之移植", projectIds: ["proj-11"] },
      { id: "sectional-urbanism", name: "SECTIONAL URBANISM", labelZh: "剖面都市主義與立體公共步道", projectIds: ["proj-2"] },
      { id: "spatial-perception", name: "SPATIAL PERCEPTION", labelZh: "輕質懸浮感知與風向光影推移", projectIds: ["proj-1"] },
      { id: "urban-suture", name: "URBAN SUTURE", labelZh: "拆解七十年封閉軍事港區邊界", projectIds: ["proj-5"] },
      { id: "voronoi-geometry", name: "VORONOI APERTURES", labelZh: "Voronoi 幾何開口演算法調控", projectIds: ["proj-6"] }
    ]
  },
  {
    id: "cities",
    name: "CITIES & SITES",
    labelZh: "基地脈絡與場域紋理",
    icon: "⌖",
    tags: [
      { id: "keelung-badouzi", name: "KEELUNG · BADOUZI", labelZh: "八斗子觀光漁港水岸碼頭", projectIds: ["proj-3"] },
      { id: "keelung-harbor", name: "KEELUNG · HARBOR", labelZh: "基隆港東岸軍事碼頭威海營區", projectIds: ["proj-5"] },
      { id: "keelung-zhongzheng", name: "KEELUNG · ZHONGZHENG", labelZh: "基隆市中正區山坡巷道山城", projectIds: ["proj-2"] },
      { id: "taipei-daan-chenggong", name: "TAIPEI · DA'AN & CHENGGONG", labelZh: "台北市大安國宅與成功國宅社區", projectIds: ["proj-11"] },
      { id: "taipei-dadaocheng", name: "TAIPEI · DADAOCHENG", labelZh: "大同區迪化街一段傳統街屋", projectIds: ["proj-7"] },
      { id: "taipei-wanhua", name: "TAIPEI · WANHUA", labelZh: "萬華區康定路舊市區生活街廓", projectIds: ["proj-4"] },
      { id: "taipei-ximending", name: "TAIPEI · XIMENDING", labelZh: "萬華區西門町行人徒步商圈", projectIds: ["proj-10"] },
      { id: "taipei-xinyi", name: "TAIPEI · XINYI", labelZh: "信義計畫區邊界高密度街谷", projectIds: ["proj-9"] },
      { id: "campus-courtyard", name: "CAMPUS · COURTYARD", labelZh: "建築系館中庭花園草坪", projectIds: ["proj-1"] },
      { id: "digital-fablab", name: "FABLAB & WORKSHOP", labelZh: "數位製造實驗室與木工工坊", projectIds: ["proj-6", "proj-8"] }
    ]
  },
  {
    id: "plans-details",
    name: "PLANS & DETAILS",
    labelZh: "圖紙類型與大樣尺度",
    icon: "◫",
    tags: [
      { id: "detail-joinery", name: "1:1 / 1:20 JOINERY DETAILS", labelZh: "榫接構造分解與軸測大樣圖", projectIds: ["proj-1", "proj-8"] },
      { id: "detail-housing-plans", name: "1:50 HOUSING PROTOTYPE PLANS", labelZh: "1:50 準則國宅單元空間原型與服務核平面", projectIds: ["proj-11"] },
      { id: "detail-sections", name: "1:50 LONGITUDINAL SECTIONS", labelZh: "山坡地與老街屋長向縱剖面透視", projectIds: ["proj-2", "proj-7"] },
      { id: "detail-exploded", name: "1:100 EXPLODED AXONOMETRIC", labelZh: "機能立體複合爆炸軸測圖", projectIds: ["proj-4"] },
      { id: "detail-site-plan", name: "1:200 WATERFRONT SITE PLANS", labelZh: "八斗子消波碼頭全區配置圖", projectIds: ["proj-3"] },
      { id: "detail-masterplan", name: "1:500 URBAN MASTERPLANS", labelZh: "港灣縫合三公里全區景觀總圖", projectIds: ["proj-5"] },
      { id: "detail-superblock-map", name: "1:500 SUPERBLOCK AXONOMETRIC", labelZh: "1:500 大街廓社區立體分區與防衛中庭形態", projectIds: ["proj-11"] },
      { id: "detail-cfd-maps", name: "CFD VECTOR FLOW MAPS", labelZh: "風速流線向量與熱舒適色階圖", projectIds: ["proj-9"] },
      { id: "detail-syntax-maps", name: "SYNTAX AXIAL MAPS", labelZh: "軸線拓樸整合度與穿透度分析圖", projectIds: ["proj-10"] },
      { id: "detail-field-draft", name: "MEASURED FIELD ARCHIVES", labelZh: "製圖桌實體手繪原稿實拍寫真", projectIds: ["proj-7"] }
    ]
  },
  {
    id: "selected-projects",
    name: "SELECTED PROJECTS",
    labelZh: "十一件建築專案目錄",
    icon: "✦",
    tags: [
      { id: "sel-proj-1", name: "ARC-101 輕質木構實驗亭", labelZh: "一年級 · 基本設計", projectIds: ["proj-1"] },
      { id: "sel-proj-2", name: "ARC-202 邊界共生山坡住宅", labelZh: "二年級 · 建築設計", projectIds: ["proj-2"] },
      { id: "sel-proj-3", name: "ARC-302 潮汐閱覽所圖書館", labelZh: "三年級 · 建築設計", projectIds: ["proj-3"] },
      { id: "sel-proj-4", name: "ARC-402 垂直複合生態社群", labelZh: "四年級 · 建築設計", projectIds: ["proj-4"] },
      { id: "sel-proj-5", name: "ARC-500 地景縫合港區轉型 (Thesis)", labelZh: "五年級 · 畢業設計", projectIds: ["proj-5"] },
      { id: "sel-proj-6", name: "ELE-310 參數化遮陽桁架", labelZh: "三年級 · 專業選修", projectIds: ["proj-6"] },
      { id: "sel-proj-7", name: "ELE-220 大稻埕街屋測繪踏查", labelZh: "二年級 · 專業選修", projectIds: ["proj-7"] },
      { id: "sel-proj-8", name: "ELE-430 柳杉膠合木折板原型", labelZh: "四年級 · 專業選修", projectIds: ["proj-8"] },
      { id: "sel-proj-11", name: "ELE-440 準則國宅空間原型與大街廓研究", labelZh: "四年級 · 專業選修", projectIds: ["proj-11"] },
      { id: "sel-proj-9", name: "RES-501 低密度迎季風面微氣候模擬", labelZh: "五年級 · 研究專題", projectIds: ["proj-9"] },
      { id: "sel-proj-10", name: "RES-402 西門町空間句法分析", labelZh: "四年級 · 研究專題", projectIds: ["proj-10"] }
    ]
  },
  {
    id: "all-exhibits",
    name: "ALL EXHIBITS",
    labelZh: "全部作品 (11/11)",
    icon: "○",
    isReset: true,
    tags: [
      { id: "view-all-projects", name: "VIEW ALL 11 EXHIBITS", labelZh: "顯示全體 11 件作品 (重設篩選)", projectIds: ["proj-1", "proj-2", "proj-3", "proj-4", "proj-5", "proj-6", "proj-7", "proj-8", "proj-9", "proj-10", "proj-11"] }
    ]
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
    btnSlides: "🖥 12頁期末簡報",
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
    openFullSize: "原尺寸預覽",
    zoomHint: "點擊於新分頁開啟原尺寸大圖預覽",
    atlasBtnMain: "PROJECTS",
    atlasBtnSub: "全部作品 · 分類標籤 ▾",
    atlasBadge: "DIVISARE ATLAS",
    atlasTitle: "ARCHITECTURAL TAXONOMY & KEYWORDS INDEX · 建築分類關鍵詞與標籤索引",
    atlasResetAll: "○ 全部作品 (ALL 11)",
    atlasClose: "關閉",
    activeTagPrefix: "標籤篩選:",
    clearActiveTag: "清除標籤篩選",
    tagMatchCount: "件作品",
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
    btnSlides: "🖥 12-Slide Deck",
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
    openFullSize: "Full Size",
    zoomHint: "Click to open full-size image in a new tab",
    atlasBtnMain: "PROJECTS",
    atlasBtnSub: "All Exhibits · Taxonomy ▾",
    atlasBadge: "DIVISARE ATLAS",
    atlasTitle: "ARCHITECTURAL TAXONOMY & KEYWORDS INDEX",
    atlasResetAll: "○ All Works (ALL 11)",
    atlasClose: "Close",
    activeTagPrefix: "Taxonomy Tag:",
    clearActiveTag: "Clear Tag Filter",
    tagMatchCount: "exhibits",
    footerText: "Natural Science & AI Course · Architecture Portfolio Final Project"
  }
};
