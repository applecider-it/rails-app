/**
 * ERBから使える、共通のオブジェクト
 */

import { setupRichtextEditor } from '@/services/richtext-editor/richtext-editor';
import { setupFileDragAndDrop } from '@/services/form/drag-and-drop';
import { setupPostalCodeSearch } from '@/services/postal-code/postal-code';

export const App = {
  funcs: {
    setupRichtextEditor,
    setupFileDragAndDrop,
    setupPostalCodeSearch,
  },
};
