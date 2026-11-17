import { ref, onBeforeUnmount, watch } from 'vue';
import { useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle, Color } from '@tiptap/extension-text-style';

import { formatHtml } from '@/services/data/html';

import { CustomImage, HEADING_LEVELS } from './parts';
import { useModal } from '@/services/ui/vue-hook/useModal';

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

  /** 画像用モーダル */
  const imageModal = useModal<string>();

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
  const addImage = async () => {
    if (!editor.value) return;
    const url = await imageModal.open('');
    if (!url) return;
    editor.value.chain().focus().setImage({ src: url }).run();
  };

  /** カーソル位置のブロック種別（paragraph または 見出しレベル）を返す */
  const currentBlock = (): string => {
    for (const level of HEADING_LEVELS) {
      if (editor.value?.isActive('heading', { level })) return String(level);
    }
    return 'paragraph';
  };

  /** セレクトボックスの選択に応じて、見出し／通常の段落に変換する */
  const changeBlock = (value: string) => {
    const chain = editor.value?.chain().focus();
    if (value === 'paragraph') {
      chain.setParagraph().run();
    } else {
      chain.setHeading({ level: Number(value) as 2 | 3 | 4 }).run();
    }
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
    currentBlock,
    changeBlock,
    imageModal,
  };
}
