import { ref } from 'vue';
import { useModal } from '@/services/ui/vue-hook/useModal';
import { getImages } from '../image';

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

  const open = async (initialValue: string) => {
    images.value = [];
    loading.value = true;
    page.value = 1;
    pageCount.value = 1;

    return await modal.open(initialValue);
  };

  const hasNext = () => {
    return page.value < pageCount.value;
  };

  const hasPrev = () => {
    return page.value > 1;
  };

  const next = () => {
    loading.value = true;
    page.value++;
    setImages();
  };

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
