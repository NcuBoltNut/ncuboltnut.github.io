export interface Sponsor {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  blurb: string;
  order: number;
}

export const sponsors: Sponsor[] = [
  {
    id: 'ncume',
    name: '國立中央大學機械工程學系',
    nameEn: 'Dept. of Mechanical Engineering, NCU',
    logo: '/sponsor-ncume.webp',
    blurb: '團隊的成立母系，提供場地、設備與師長指導等長期學術資源支持。',
    order: 1,
  },
  {
    id: 'tanko',
    name: '天鋼事業股份有限公司',
    nameEn: 'Tanko Enterprise Co., Ltd.',
    logo: '/sponsor-tanko.webp',
    blurb: '專精金屬材料與鋼構加工，向團隊贊助專業的工作桌、工具車、零件箱，使團隊能夠更加安全與效率的加工。',
    order: 2,
  },
  {
    id: 'solidworks',
    name: 'SOLIDWORKS',
    nameEn: 'Dassault Systèmes',
    logo: '/sponsor-solidworks.webp',
    blurb: '全球領先的 3D 機構設計軟體，提供團隊建模與模擬所需的軟體授權支援。',
    order: 3,
  },
  {
    id: 'sanchu',
    name: '台灣三住股份有限公司',
    nameEn: 'MISUMI Taiwan Co., Ltd.',
    logo: '/sponsor-sanchu.webp',
    blurb: '全球知名 FA 工廠自動化零件供應商，團隊透過「MI夢想齒輪」計畫取得標準零件與快速取貨支援。',
    order: 4,
  },
  {
    id: 'jlcpcb',
    name: '嘉立創科技集團',
    nameEn: 'JLCPCB',
    logo: '/sponsor-jlcpcb.webp',
    blurb: '專業 PCB 製造與電子製造服務商，支援團隊電控系統的電路板打樣與製作。',
    order: 5,
  },
];
