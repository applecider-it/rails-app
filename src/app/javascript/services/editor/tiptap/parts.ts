import Image from '@tiptap/extension-image';

/** スタイルの変更を有効にするためのカスタムイメージ */
export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: 'width: 20rem;',
        parseHTML: (element) => element.getAttribute('style'),
        renderHTML: (attributes) => ({ style: attributes.style }),
      },
    };
  },
});

export const COLORS = [
  { label: '赤', value: '#dc2626' },
  { label: '青', value: '#2563eb' },
  { label: '緑', value: '#16a34a' },
];

export const btnClass =
  'px-3 py-1.5 text-sm font-medium rounded-sm border transition-colors';
export const btnActiveClass = 'bg-blue-600 text-white border-blue-600';
export const btnUnactiveClass =
  'bg-white text-gray-700 border-gray-300 hover:bg-gray-100';
