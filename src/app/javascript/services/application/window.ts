/**
 * ERBから使える、共通のオブジェクト
 */

import { setupRichtextEditor } from '@/services/richtext-editor/richtext-editor';
import { fileDragAndDrop } from '@/services/form/drag-and-drop';
import { fetchAddressByPostalCode } from '@/services/postal-code/postal-code';
import { showToast } from '@/services/ui/message';

export const App = {
  funcs: {
    setupRichtextEditor,
    fileDragAndDrop,
    fetchAddressByPostalCode,
    showToast,
  },
};
