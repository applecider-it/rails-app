/**
 * ERBから使える、共通のオブジェクト
 */

import { setupRichtextEditor } from '@/services/richtext-editor/richtext-editor';
import { setupFileDragAndDrop } from '@/services/form/drag-and-drop';
import { setupPostalCodeSearch } from '@/services/postal-code/postal-code';
import { writeClipboard } from "@/services/system/edit";
import { checkFormChanges } from "@/services/form/check-form-changes";

export const App = {
  funcs: {
    setupRichtextEditor,
    setupFileDragAndDrop,
    setupPostalCodeSearch,
    writeClipboard,
    checkFormChanges,
  },
};
