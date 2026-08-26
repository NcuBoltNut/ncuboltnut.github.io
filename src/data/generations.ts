export interface Generation {
  id: string;
  label: string; // "第一屆"
  year: string; // "大四" — display year-in-school for this generation's founding members
  order: number;
}

export const generations: Generation[] = [
  { id: 'gen-01', label: '第一屆', year: '大四', order: 1 },
  { id: 'gen-02', label: '第二屆', year: '大三', order: 2 },
  { id: 'gen-03', label: '第三屆', year: '大二', order: 3 },
];
