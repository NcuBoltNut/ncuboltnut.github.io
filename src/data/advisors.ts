export interface Advisor {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  photo: string;
  photoStyle?: string;
  order: number;
}

export const advisors: Advisor[] = [
  {
    id: 'liaocy',
    name: '廖展誼',
    title: '副教授',
    bio: '研究領域涵蓋彈性力學、固體力學、波動力學、振動分析與流固耦合動態分析。',
    email: 'chanyi@ncu.edu.tw',
    photo: '/photos/advisor-liaocy.jpg',
    order: 1,
  },
  {
    id: 'changht',
    name: '張賢廷',
    title: '助理教授',
    bio: '研究領域涵蓋感測融合、先進夾爪、自主式移動機器人、無人機、機電整合與類人型七軸機械手臂。',
    email: 'htchang@ncu.edu.tw',
    photo: '/photos/advisor-changht.jpg',
    photoStyle: 'object-position:50% 20%;',
    order: 2,
  },
];
