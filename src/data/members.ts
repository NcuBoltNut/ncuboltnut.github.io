export interface Member {
  id: string;
  name: string;
  generation: string; // references Generation.id
  class: string; // "機械四C"
  role: string;
  isLeader: boolean;
  roleTag: boolean; // true renders the role as a highlighted tag (e.g. 副隊長)
  photo: string;
  photoStyle?: string; // optional inline object-position/transform override
  order: number;
}

export const members: Member[] = [
  { id: 'shenkd', name: '沈楷迪', generation: 'gen-02', class: '機械三A', role: '隊長', isLeader: true, roleTag: false, photo: '/photos/member-shenkd.jpg', order: 1 },
  { id: 'tangjs', name: '湯晉昇', generation: 'gen-02', class: '機械三A', role: '工程部控制組長', isLeader: false, roleTag: false, photo: '/photos/湯.jpg', order: 2 },
  { id: 'lizx', name: '李宗勳', generation: 'gen-02', class: '機械三C', role: '工程部機構組長', isLeader: false, roleTag: false, photo: '/photos/member-lizx.jpg', order: 3 },
  { id: 'xuyx', name: '許翊軒', generation: 'gen-02', class: '機械三A', role: '總務部長', isLeader: false, roleTag: false, photo: '/photos/member-xuyx.jpg', order: 4 },
  { id: 'linby', name: '林柏瑜', generation: 'gen-02', class: '機械三A', role: '公關部幹部', isLeader: false, roleTag: false, photo: '/photos/member-linby.jpg', order: 5 },
  { id: 'qiuyue', name: '邱月', generation: 'gen-02', class: '機械三B', role: '美宣部長', isLeader: false, roleTag: false, photo: '/photos/member-qiuyue.jpg', order: 6 },
  { id: 'lanse', name: '藍士恩', generation: 'gen-02', class: '機械三B', role: '機動組幹部', isLeader: false, roleTag: false, photo: '/photos/member-lanse.jpg', order: 7 },
  { id: 'suzh', name: '蘇子皓', generation: 'gen-03', class: '機械二C', role: '工程部儲備幹部', isLeader: false, roleTag: false, photo: '/photos/member-suzh.jpg', order: 1 },
  { id: 'weixe', name: '魏絃恩', generation: 'gen-03', class: '資工二A', role: '工程部儲備幹部', isLeader: false, roleTag: false, photo: '/photos/member-weixe.webp', order: 2 },
  { id: 'wuyt', name: '吳祐霆', generation: 'gen-03', class: '機械二A', role: '公關部儲備幹部', isLeader: false, roleTag: false, photo: '/photos/member-wuyt.jpg', order: 3 },
  { id: 'jiangyz', name: '江宜臻', generation: 'gen-03', class: '機械二A', role: '公關部儲備幹部', isLeader: false, roleTag: false, photo: '/photos/member-jiangyz.jpg', order: 4 },
  { id: 'sunyx', name: '孫郁翔', generation: 'gen-03', class: '機械二A', role: '美宣部儲備幹部', isLeader: false, roleTag: false, photo: '/photos/member-sunyx.jpg', order: 5 },
  { id: 'lixr', name: '李昕叡', generation: 'gen-03', class: '太空二', role: '美宣部儲備幹部', isLeader: false, roleTag: false, photo: '/photos/member-lixr.jpg', order: 6 },
  { id: 'huangjr', name: '黃傑瑞', generation: 'gen-01', class: '機械四C', role: '隊長', isLeader: true, roleTag: false, photo: '/photos/member-huangjr.jpg', order: 1 },
  { id: 'liuyb', name: '劉禹邦', generation: 'gen-01', class: '機械四A', role: '副隊長', isLeader: false, roleTag: true, photo: '/photos/member-liuyb.jpg', order: 2 },
  { id: 'liudy', name: '劉東諺', generation: 'gen-01', class: '機械四B', role: '工程部機構組長', isLeader: false, roleTag: false, photo: '/photos/member-liudy.webp', order: 3 },
  { id: 'huangcs', name: '黃承笙', generation: 'gen-01', class: '機械四B', role: '工程部控制組長', isLeader: false, roleTag: false, photo: '/photos/defult.jpg', order: 4 },
  { id: 'pangw', name: '潘冠瑋', generation: 'gen-01', class: '機械四B', role: '總務部長', isLeader: false, roleTag: false, photo: '/photos/member-pangw.webp', order: 5 },
  { id: 'yeyj', name: '葉彥均', generation: 'gen-01', class: '機械四B', role: '公關組幹部', isLeader: false, roleTag: false, photo: '/photos/member-yeyj.webp', order: 6 },
];
