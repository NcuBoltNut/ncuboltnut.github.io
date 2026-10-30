export interface Sponsor {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  /** Official website; the logo links here when set. */
  website?: string;
  blurb: string;
  order: number;
}

export const sponsors: Sponsor[] = [
  {
    id: 'ncume',
    name: '國立中央大學機械工程學系',
    nameEn: 'Dept. of Mechanical Engineering, NCU',
    logo: '/sponsor-ncume.webp',
    website: 'https://www.me.ncu.edu.tw/',
    blurb: '團隊的成立母系，提供場地、設備與師長指導等長期學術資源支持。',
    order: 1,
  },
  {
    id: 'tanko',
    name: '天鋼事業股份有限公司',
    nameEn: 'Tanko Enterprise Co., Ltd.',
    logo: '/sponsor-tanko.webp',
    website: 'https://www.tanko.com.tw/',
    blurb: '專精金屬材料與鋼構加工，向團隊贊助專業的工作桌、工具車、零件箱，使團隊能夠更加安全與效率的加工。',
    order: 2,
  },
  {
    id: 'solidworks',
    name: 'SOLIDWORKS',
    nameEn: 'Dassault Systèmes',
    logo: '/sponsor-solidworks.webp',
    website: 'https://www.solidworks.com/',
    blurb: '全球領先的 3D 機構設計軟體，提供團隊建模與模擬所需的軟體授權支援。',
    order: 3,
  },
  {
    id: 'sanchu',
    name: '台灣三住股份有限公司',
    nameEn: 'MISUMI Taiwan Co., Ltd.',
    logo: '/sponsor-misumi.webp',
    website: 'https://tw.misumi-ec.com/',
    blurb: '全球知名 FA 工廠自動化零件供應商，團隊透過「MI夢想齒輪」計畫取得標準零件與快速取貨支援。',
    order: 4,
  },
  {
    id: 'jlcpcb',
    name: '嘉立創科技集團',
    nameEn: 'JLCPCB',
    logo: '/sponsor-jlcpcb.webp',
    website: 'https://jlcpcb.com/',
    blurb: '專業 PCB 製造與電子製造服務商，支援團隊電控系統的電路板打樣與製作。',
    order: 5,
  },
  {
    id: 'kss',
    name: '凱士士股份有限公司',
    nameEn: 'KSS Co., Ltd.',
    logo: '/sponsor-kss.webp',
    website: 'https://www.kss.com.tw/',
    blurb: '創立於 1969 年的台灣配線器材與線纜管理專家，向團隊贊助紮線帶、熱收縮套管、配線標誌與熱風槍等耗材與工具，協助團隊電控線路的整理與絕緣處理。',
    order: 6,
  },
  {
    id: 'pancolour',
    name: '磐采股份有限公司',
    nameEn: 'Pancolour Ink Co., Ltd.',
    logo: '/sponsor-pancolour.webp',
    website: 'https://www.pancolourink.com/',
    blurb: '深耕紫外線固化化學與 3D 列印材料的桃園廠商，贊助團隊 PLA／PETG 等 3D 列印耗材，並提供試驗性耗材供團隊測試，支援機構零件的快速打樣。',
    order: 7,
  },
  {
    id: 'happyrack',
    name: '開心角鋼',
    nameEn: 'Happy Rack',
    logo: '/sponsor-happyrack.webp',
    website: 'https://www.happyrack.tw/',
    blurb: '專營免螺絲角鋼家具與貨架，向團隊贊助角鋼櫃，讓工作室的零件與工具收納更加整齊有序。',
    order: 8,
  },
];
