import { SlideElement } from '../types';

/** ダミーデータ */
const initailData: SlideElement[] = [
  {
    id: 'el-1',
    type: 'text',
    x: 50,
    y: 50,
    width: 240,
    height: 60,
    content: 'タイトルテキスト',
    color: '#1e293b',
    fontSize: 24,
  },
  {
    id: 'el-2',
    type: 'shape',
    x: 120,
    y: 130,
    width: 150,
    height: 150,
    content: '図形',
    color: '#3b82f6',
    fontSize: 16,
  },
];

/** ダミーの保存用変数 */
//let saveData = null;
let saveData = initailData;

/** スライドデータの保存 */
export const saveSlideData = async (json: any) => {
  saveData = json;
};

/** スライドデータの読み込み */
export const loadSlideData = async () => {
  return saveData;
};
