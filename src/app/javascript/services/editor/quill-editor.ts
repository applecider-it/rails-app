import type Quill from 'quill';
import { format } from 'prettier/standalone';
import * as htmlPlugin from 'prettier/plugins/html';

// 画像ボタン（base64埋め込み）を含むツールバー
export const toolbar = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  ['clean'],
];

/** セレクター → ヒント文言 */
const tooltips: Record<string, string> = {
  'span.ql-header': '見出し',
  'button.ql-bold': '太字',
  'button.ql-italic': '斜体',
  'button.ql-underline': '下線',
  'button.ql-strike': '取り消し線',
  'button.ql-list[value="ordered"]': '番号付きリスト',
  'button.ql-list[value="bullet"]': '箇条書き',
  'button.ql-blockquote': '引用',
  'button.ql-code-block': 'コードブロック',
  'button.ql-link': 'リンク',
  'button.ql-image': '画像を挿入',
  'button.ql-clean': '書式をクリア',
};

/** 整形で入った改行・インデントを取り除く（タグ間の空白のみ） */
export const minifyHtml = (html: string) =>
  html
    .replace(/>\s*\n\s*</g, '><') // タグとタグの間の改行＋インデント
    .trim();

export const formatHtml = async (val: string) => {
  return await format(val, {
    parser: 'html',
    plugins: [htmlPlugin],
    printWidth: 80,
  });
};

/** 画像操作 */
export const imageCtrl = (quill: Quill) => {
  const url = window.prompt('画像のURLを入力してください', 'http://localhost:3000/icon.svg')?.trim();
  if (!url) return;

  // http(s) 以外（javascript: など）は弾く
  if (!/^https?:\/\//i.test(url)) {
    window.alert('http:// または https:// で始まるURLを入力してください');
    return;
  }

  const range = quill.getSelection(true);
  quill.insertEmbed(range.index, 'image', url, 'user');
  quill.formatText(range.index, 1, 'width', '50%', 'user');
  quill.setSelection(range.index + 1, 0);
};

/** getModule('toolbar') の戻り値として使う最小限の型 */
export type ToolbarModule = { container: HTMLElement };

/** アイコンにヒントをつける */
export const applyTooltips = (toolbar: ToolbarModule | undefined) => {
  const container = toolbar?.container;
  if (!container) return;

  Object.entries(tooltips).forEach(([selector, text]) => {
    container.querySelectorAll(selector).forEach((el) => {
      el.setAttribute('title', text);
    });
  });
};

/** Quill独自のリスト形式を、標準の ul/ol/li に変換する */
export const normalizeLists = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  doc.body.querySelectorAll('ol').forEach((container) => {
    const items = Array.from(container.children).filter(
      (el): el is HTMLLIElement => el.tagName === 'LI',
    );
    // 標準形式のリスト（data-list なし）は触らない
    if (!items.some((li) => li.hasAttribute('data-list'))) return;

    type Entry = { el: HTMLElement; tag: 'ul' | 'ol'; lastLi: HTMLElement | null };
    const fragment = doc.createDocumentFragment();
    const stack: Entry[] = [];

    items.forEach((src) => {
      const tag = src.getAttribute('data-list') === 'ordered' ? 'ol' : 'ul';
      const level = Number(/ql-indent-(\d+)/.exec(src.className)?.[1] ?? 0);

      // 中身だけ取り出して、新しい li を作る
      src.querySelector(':scope > .ql-ui')?.remove();
      const li = doc.createElement('li');
      li.innerHTML = src.innerHTML;

      // 浅い階層に戻る / 同じ階層で種類が変わる場合
      while (stack.length > level + 1) stack.pop();
      if (stack.length === level + 1 && stack[level].tag !== tag) stack.pop();

      // 深い階層に入る場合は、直前の li の中に新しいリストを作る
      while (stack.length < level + 1) {
        const list = doc.createElement(tag);
        const parent = stack.length === 0
          ? fragment
          : (stack[stack.length - 1].lastLi ?? stack[stack.length - 1].el);
        parent.appendChild(list);
        stack.push({ el: list, tag, lastLi: null });
      }

      const top = stack[stack.length - 1];
      top.el.appendChild(li);
      top.lastLi = li;
    });

    container.replaceWith(fragment);
  });

  return doc.body.innerHTML;
};
