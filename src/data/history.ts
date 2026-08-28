export interface HistoryItem {
  id: string;
  date: string;
  title: string;
  body: string;
  milestone: boolean;
  order: number;
}

export const history: HistoryItem[] = [
  { id: 'founding-info-session', date: '2025.04.15', title: '第一屆招生說明會', body: '創隊起點。於工程三館 129 教室舉辦第一屆招生說明會，正式開啟 NCU BoltNut Robotics 的成員招募，揭開機器人團隊的序幕。', milestone: false, order: 1 },
  { id: 'logo-reveal', date: '2025.07.14', title: 'Logo 暨隊徽公開', body: '正式公開 BoltNut 隊徽設計，確立機械結構美學與品牌識別，為團隊樹立鮮明的視覺形象。', milestone: false, order: 2 },
  { id: 'slogan-launch', date: '2025.07.16', title: '標語發布', body: '確立隊訓「Bolt together, Nuts going anywhere」，凝聚團隊核心精神——緊密合作，無處不到。', milestone: false, order: 3 },
  { id: 'sdc2026-prep-kickoff', date: '2025.08', title: '暑訓規劃與國研盃智慧機械競賽備賽啟動', body: '針對 2026 國研盃智慧機械競賽備賽週期展開全面規劃，同步進行成員招募調查，確立暑訓課程架構與分組方向。', milestone: false, order: 4 },
  { id: 'summer-bootcamp-2025', date: '2025.08.11 – 08.16', title: '2025 暑期培訓營', body: '五天密集暑訓：涵蓋理論課程、Arduino 程式設計、馬達控制、機器人設計方法論與競賽實作練習，奠定紮實的技術基礎。', milestone: false, order: 5 },
  { id: 'public-recruitment', date: '2025.09.23', title: '正式對外招募擴編', body: '公開對外招募新成員，團隊進入常態運作，同步於 Instagram、Facebook、Threads 三平台經營，建立穩定的社群形象。', milestone: false, order: 6 },
  { id: 'freshman-training', date: '2025.09', title: '大一培訓課程', body: '招收 23 名跨系新生，建立機械製圖、3D 列印、電子電路與 Arduino 控制等基礎能力，以隊內競賽專題作為成果驗收，為團隊核心人才培育計畫奠定基礎。', milestone: true, order: 7 },
  { id: 'proposal-workshop', date: '2025.11.08', title: '參賽計畫書工作坊', body: '開辦工作坊，訓練成員撰寫參賽計畫書與申請競賽經費，提升成員的競賽行政能力與書面表達力。', milestone: false, order: 8 },
  { id: 'tel-robot-combat-2025', date: '2025.12.06', title: '東京威力科創機器人大賽', body: '與陽明交通大學、清華大學及台灣師範大學跨校組成「Future Shark」隊伍，於第 10 屆東京威力科創機器人大賽（TEL Robot Combat）中榮獲亞軍，寫下團隊第一座競賽獎盃。', milestone: true, order: 9 },
  { id: 'sdc2026-kickoff-party', date: '2025.12.26', title: '國研盃智慧機械競賽 2025–2026 Kick-off Party', body: '正式啟動國研盃智慧機械競賽備賽旅程。全員進行賽題解析、分組討論與機構初步構思，為 2026 年國研盃競賽奠定備戰基礎。', milestone: true, order: 10 },
  { id: 'company-visit-frc', date: '2026.02.04', title: '企業參訪 & FRC 學術交流', body: '赴車王電子進行贊助拜訪，建立企業合作關係，獲得寶貴技術建議與支持；同日與 FRC 7130 深度交流機器人設計理念與賽事策略。', milestone: false, order: 11 },
  { id: 'sdc2026-competition', date: '2026.03.28', title: '2026 國研盃智慧機械競賽', body: '「NCU BoltNut 獵爪清道夫」正式登上國研盃競賽舞台參賽；江宜臻同學於英文演講競賽中脫穎而出，榮獲第 2 名佳績。', milestone: true, order: 12 },
  { id: 'course-expo-2026', date: '2026.06.17', title: '2026 中央大學課程博覽會', body: '以社群展示內容參與課程博覽會，分享團隊機器人研究、競賽成果與人才培育歷程，榮獲「跨域世界開拓先鋒」優等獎。', milestone: true, order: 13 },
];
