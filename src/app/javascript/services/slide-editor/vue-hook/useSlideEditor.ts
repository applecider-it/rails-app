import { useInteraction } from './use-slide-editor/useInteraction';
import { useElements } from './use-slide-editor/useElements';
import { useEvent } from './use-slide-editor/useEvent';

export function useSlideEditor() {
  const {
    selectedId,
    selectedElement,
    deleteSelectedElement,
    addElement,
    moveElement,
    deselect,
    elements,
  } = useElements();

  const { startInteraction } = useInteraction(selectedId, selectedElement);

  useEvent(selectedId, deleteSelectedElement);

  return {
    addElement,
    deselect,
    elements,
    selectedId,
    startInteraction,
    selectedElement,
    moveElement,
    deleteSelectedElement,
  };
}
