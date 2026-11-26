// 型定義

/** スライド上の要素の種類 */
export type ElementType = 'text' | 'shape';

/** スライド内の各要素（テキストや図形）のデータ構造 */
export interface SlideElement {
  /** 要素の一意識別子 */
  id: string;
  /** 要素の種類（テキストまたは図形） */
  type: ElementType;
  /** X座標 (px) */
  x: number;
  /** Y座標 (px) */
  y: number;
  /** 幅 (px) */
  width: number;
  /** 高さ (px) */
  height: number;
  /** 表示テキストまたはラベル */
  content: string;
  /** カラーコードまたは背景色 */
  color: string;
  /** フォントサイズ (px) */
  fontSize: number;
}

/** インタラクションの種類 */
export type InteractionType = 'drag' | 'resize';