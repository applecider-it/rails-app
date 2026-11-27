import { ElementType, SlideElement } from '../types';

/** 新しい要素（テキストまたは図形）を作成 */
export const createSlideElement = (type: ElementType) => {
  const newEl: SlideElement = {
    id: `el-${Date.now()}`,
    type,
    x: 100,
    y: 100,
    width: type === 'text' ? 180 : 120,
    height: type === 'text' ? 50 : 120,
    content: type === 'text' ? '新規テキスト' : '四角形',
    color: type === 'text' ? '#000000' : '#10b981',
    fontSize: 18,
  };

  return newEl;
};

/** 保存データの後方互換 */
export const NormalizeSaveData = (saveData: any[]): SlideElement[] => {
  const list: SlideElement[] = [];

  saveData.forEach((row, index) => {
    const newRow = createSlideElement(row.type);
    for (const [key, value] of Object.entries(row)) {
      newRow[key] = value;
    }

    list.push(newRow);
  });

  return list;
};
