/**
 * ERBから使える、共通のオブジェクト
 */

import { setupEditor } from '@/services/editor/editor';
import { setIsLoading } from '@/services/ui/message';

export const App = {
  funcs: {
    setupEditor,
    setIsLoading,
  },
};
