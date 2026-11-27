import { ref } from 'vue';
import { useModal } from './useModal';
import { getImages } from '../image';

/**
 * 画像用モーダル
 */
export function useImageModal() {
  const modal = useModal<string>({
    onOpened: async () => {
      const list = await getImages();

      console.log({ list });

      images.value = list;
      loading.value = false;
    },
  });

  const images = ref<string[]>([]);

  const loading = ref<boolean>(false);

  /** 画像選択時 */
  const onSelectImage = (src: string) => {
    modal.value.value = src;
    modal.onCommit();
  };

  const open = async (initialValue: string) => {
    images.value = [];
    loading.value = true;

    await modal.open(initialValue);
  };

  return { modal, onSelectImage, images, open, loading };
}
