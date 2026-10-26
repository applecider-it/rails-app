import { fileDragAndDrop } from '@/services/form/drag-and-drop';

const elements = document.querySelectorAll<HTMLElement>(
  '[data-app-element-drag-and-drop]',
);

type Props = {
  target: string;
  info: string;
  dragover_class: string;
};

elements.forEach((el) => {
  const all = JSON.parse(el.dataset.appElementDragAndDrop) as Props;
  console.log(all);

  const dropZone = el;
  const target = document.getElementById(all.target) as HTMLInputElement;
  const fileInfo = document.getElementById(all.info) as HTMLElement;
  const dragoverClass = all.dragover_class;

  fileDragAndDrop(dropZone, target, fileInfo, dragoverClass);
});
