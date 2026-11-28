import { onMounted, Ref } from 'vue';

import { cloneJson } from '@/services/data/json';
import { showToast, setIsLoading } from '@/services/ui/message';

import { SlideElement } from '../../types';
import { saveSlideData, loadSlideData } from '../../slide-editor/save';
import { NormalizeSaveData } from '../../slide-editor/elements';

/**
 * 保存管理用Hook
 */
export function useSave(elements: Ref<SlideElement[]>) {
  /** 保存する */
  const save = async () => {
    if (!confirm('保存しますが、よろしいですか？')) return;

    // JSONに変換
    const json = cloneJson(elements.value);
    console.log(json);

    setIsLoading(true);
    await saveSlideData(json);
    setIsLoading(false);

    showToast('保存しました。');
  };

  /** 読み込みをする */
  const load = async (needConfirm: boolean = true) => {
    if (
      needConfirm &&
      !confirm(
        '保存していない変更がある場合は、上書きされますが、よろしいですか？',
      )
    )
      return;

    setIsLoading(true);
    const saveData = await loadSlideData();
    setIsLoading(false);

    if (!saveData) {
      showToast('セーブデータがありません。', 'alert');
      return;
    }

    const normalizedSaveData = NormalizeSaveData(saveData);

    console.log({ saveData, normalizedSaveData });

    elements.value = normalizedSaveData;

    if (needConfirm) showToast('読み込みしました。');
  };

  onMounted(async () => {
    await load(false);
  });

  return {
    save,
    load,
  };
}
