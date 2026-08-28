export interface Generation {
  id: string;
  label: string; // "第一屆"
  year: string; // "大四" — display year-in-school for this generation's founding members
  order: number;
  /** Once true, this generation's members no longer render inline on the
   *  about page — they move into a single dropdown-gated "歷屆學長姐"
   *  section instead, so the page doesn't grow a full member roster per
   *  graduated year. */
  isAlumni?: boolean;
}

export const generations: Generation[] = [
  { id: 'gen-01', label: '第一屆', year: '大四', isAlumni: false, order: 1 },
  { id: 'gen-02', label: '第二屆', year: '大三', order: 2 },
  { id: 'gen-03', label: '第三屆', year: '大二', order: 3 },
];
