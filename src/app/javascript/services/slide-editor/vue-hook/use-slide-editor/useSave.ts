import { onMounted, Ref } from 'vue';

import { cloneJson } from '@/services/data/json';
import { showToast } from '@/services/ui/message';

import { SlideElement } from '../../types';
import { saveSlideData, loadSlideData } from '../../slide-editor/save';

/**
 * 保存管理用Hook
 */
export function useSave(elements: Ref<SlideElement[]>) {
  /** 保存する */
  const save = async () => {
    // JSONに変換
    const json = cloneJson(elements.value);
    console.log(json);

    await saveSlideData(json);

    showToast('保存しました。');
  };

  /** 読み込みをする */
  const load = async (needConfirm: boolean = true) => {
    const saveData = await loadSlideData();

    if (!saveData) {
      showToast('セーブデータがありません。', 'alert');
      return;
    }

    console.log(saveData);

    if (
      needConfirm &&
      !confirm(
        '保存していない変更がある場合は、上書きされますが、よろしいですか？',
      )
    )
      return;

    // 再生成しないと、変更が認識されない
    elements.value = cloneJson(saveData);

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
