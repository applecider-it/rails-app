import { ref, onBeforeUnmount, watch } from 'vue';
import { useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle, Color } from '@tiptap/extension-text-style';

import { CustomImage } from './parts';
import { formatHtml } from '@/services/data/html';

/**
 * TipTapエディタのロジックをまとめたcomposable。
 * エディタの初期化、WYSIWYG／HTMLコード表示の切り替え、
 * 画像挿入・文字色変更などの操作を提供する。
 *
 * @param initialValue エディタの初期HTML
 * @param onChange     HTMLが変更されるたびに呼ばれるコールバック
 */
export function useHtmlEditor(
  initialValue: string,
  onChange: (val: string) => void,
) {
  /** true のとき、エディタではなくHTMLのtextareaを表示する */
  const isCodeView = ref(false);

  /** 常に最新のHTML。エディタとtextareaの両方がこれを参照・更新する */
  const htmlContent = ref(initialValue);

  // HTMLが変わるたびに、親へ最新の値を通知する
  watch(htmlContent, (html) => onChange(html));

  // TipTapエディタの初期化
  const editor = useEditor({
    content: htmlContent.value,
    // StarterKit: 基本機能（太字・斜体・リストなど）
    // CustomImage: style属性を保持できる画像
    // TextStyle + Color: 文字色の変更
    extensions: [StarterKit, CustomImage, TextStyle, Color],
    // エディタで編集されるたびに、整形したHTMLを htmlContent に反映する
    onUpdate: async ({ editor }) => {
      htmlContent.value = await formatHtml(editor.getHTML());
    },
  });

  /**
   * エディタ表示とHTMLコード表示を切り替える。
   */
  const toggleView = () => {
    // コード表示からエディタに戻るときは、textareaで編集した内容をエディタに反映する。
    if (isCodeView.value && editor.value) {
      editor.value.commands.setContent(htmlContent.value);
    }

    isCodeView.value = !isCodeView.value;
  };

  /** URLを入力させて、カーソル位置に画像を挿入する */
  const addImage = () => {
    if (!editor.value) return;
    const url = window.prompt('画像のURLを入力してください');
    if (!url) return;
    editor.value.chain().focus().setImage({ src: url }).run();
  };

  /** 選択範囲の文字色を変更する */
  const setColor = (color: string) => {
    editor.value?.chain().focus().setColor(color).run();
  };

  /** 選択範囲の文字色を解除してデフォルトに戻す */
  const resetColor = () => {
    editor.value?.chain().focus().unsetColor().run();
  };

  /** 選択範囲の書式（太字・斜体・文字色・リストなど）をすべて解除する */
  const clearFormat = () => {
    editor.value?.chain().focus().unsetAllMarks().clearNodes().run();
  };

  // コンポーネント破棄時にエディタを破棄し、メモリリークを防ぐ
  onBeforeUnmount(() => {
    editor.value?.destroy();
  });

  return {
    editor,
    isCodeView,
    htmlContent,
    toggleView,
    addImage,
    setColor,
    resetColor,
    clearFormat
  };
}
