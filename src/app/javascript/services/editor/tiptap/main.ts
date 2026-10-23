import { ref, onBeforeUnmount, watch } from 'vue';
import { useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle, Color } from '@tiptap/extension-text-style';

import { CustomImage } from './parts';
import { formatHtml } from '@/services/data/html';

export function useHtmlEditor(
  initialValue: string,
  onChange: (val: string) => void,
) {
  const isCodeView = ref(false);
  const htmlContent = ref(initialValue);

  watch(htmlContent, (html) => onChange(html));

  const editor = useEditor({
    content: htmlContent.value,
    extensions: [StarterKit, CustomImage, TextStyle, Color],
    onUpdate: async ({ editor }) => {
      htmlContent.value = await formatHtml(editor.getHTML());
    },
  });

  const toggleView = () => {
    if (isCodeView.value && editor.value) {
      editor.value.commands.setContent(htmlContent.value);
    }
    isCodeView.value = !isCodeView.value;
  };

  const addImage = () => {
    if (!editor.value) return;
    const url = window.prompt('画像のURLを入力してください');
    if (!url) return;
    editor.value.chain().focus().setImage({ src: url }).run();
  };

  const setColor = (color: string) => {
    editor.value?.chain().focus().setColor(color).run();
  };

  const resetColor = () => {
    editor.value?.chain().focus().unsetColor().run();
  };

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
  };
}