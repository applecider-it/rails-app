/**
 * ERBから使える、共通のオブジェクト
 */

import { setupEditor } from '@/services/editor/editor';
import { fileDragAndDrop } from '@/services/form/drag-and-drop';
import { fetchAddressByPostalCode } from '@/services/postal-code/postal-code';
import { showToast } from '@/services/ui/message';

export const App = {
  funcs: {
    setupEditor,
    fileDragAndDrop,
    fetchAddressByPostalCode,
    showToast,
  },
};
