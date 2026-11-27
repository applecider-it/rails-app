import { ref } from 'vue';
import { useModal } from '@/services/ui/vue-hook/useModal';
import { getImages } from '../image/api';

/**
 * 画像用モーダル
 */
export function useImageModal() {
  const modal = useModal<string>({
    onOpened: async () => {
      setImages();
    },
  });

  const page = ref<number>(0);
  const pageCount = ref<number>(0);

  const images = ref<string[]>([]);

  const loading = ref<boolean>(false);

  /** 画像を設定 */
  const setImages = async () => {
    const result = await getImages(page.value);

    console.log({ result });

    images.value = result.list;
    pageCount.value = result.pageCount;

    loading.value = false;
  };

  /** 画像選択時 */
  const onSelectImage = (src: string) => {
    console.log('onSelectImage', src);
    modal.value.value = src;
    modal.onCommit();
  };

  /** 画像モーダルを開く */
  const open = async (initialValue: string) => {
    images.value = [];
    loading.value = true;
    page.value = 1;
    pageCount.value = 1;

    return await modal.open(initialValue);
  };

  /** 次のページがあるか返す */
  const hasNext = () => {
    return page.value < pageCount.value;
  };

  /** 前のページがあるか返す */
  const hasPrev = () => {
    return page.value > 1;
  };

  /** 次のページに移動 */
  const next = () => {
    loading.value = true;
    page.value++;
    setImages();
  };

  /** 前のページに移動 */
  const prev = () => {
    loading.value = true;
    page.value--;
    setImages();
  };

  return {
    modal,
    onSelectImage,
    images,
    open,
    loading,
    page,
    pageCount,
    hasNext,
    next,
    hasPrev,
    prev,
  };
}
