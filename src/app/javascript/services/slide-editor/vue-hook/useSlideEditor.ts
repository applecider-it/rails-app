import { useInteraction } from './useInteraction';
import { useElements } from './useElements';
import { useEvent } from './useEvent';

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
