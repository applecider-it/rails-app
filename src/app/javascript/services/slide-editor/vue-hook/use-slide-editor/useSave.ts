import { onMounted, Ref } from 'vue';

import { cloneJson } from '@/services/data/json';
import { showToast } from '@/services/ui/message';

import { SlideElement } from '../../types';
import { initailData } from '../../slide-editor/data';

/**
 * 保存管理用Hook
 */
export function useSave(elements: Ref<SlideElement[]>) {
  /** ダミーの保存用変数 */
  let saveData = null;

  /** 保存する */
  const save = () => {
    // JSONに変換
    const json = cloneJson(elements.value);
    console.log(json);

    saveData = json;

    showToast('保存しました。');
  };

  /** 読み込みをする */
  const load = (needConfirm: boolean = true) => {
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

  onMounted(() => {
    saveData = initailData;

    load(false);
  });

  return {
    save,
    load,
  };
}
