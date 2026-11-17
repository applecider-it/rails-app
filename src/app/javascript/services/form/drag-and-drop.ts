/**
 * ファイルをドラッグアンドドロップのセットアップ
 */
export const setupFileDragAndDrop = (
  dropZone: HTMLElement,
  target: HTMLInputElement | null,
  fileInfo: HTMLElement,
  dragoverClass: string,
): void => {
  /** ファイル情報を出力 */
  const setInfo = (file: File) => {
    fileInfo.textContent = `選択されたファイル: ${file.name} (${Math.round(file.size / 1024)} KB)\n`;
  };

  // dropZone がクリックされたら、target のクリックイベントを起動
  dropZone.addEventListener('click', () => {
    console.log('setupFileDragAndDrop click');
    target.click();
  });

  // ファイルが選択されたときの処理など
  target.addEventListener('change', (e) => {
    console.log('setupFileDragAndDrop change');
    const input = e.target as HTMLInputElement;
    const files: FileList | null = input.files;

    if (files && files.length > 0) {
      const file = files[0];
      setInfo(file);
    }
  });

  // デフォルトのブラウザ動作（ファイルを開くなど）を無効化
  (['dragenter', 'dragover', 'dragleave', 'drop'] as const).forEach(
    (eventName) => {
      dropZone.addEventListener(
        eventName,
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
        },
        false,
      );
    },
  );

  // ドラッグ中のエフェクト（スタイルの切り替え）
  (['dragenter', 'dragover'] as const).forEach((eventName) => {
    dropZone.addEventListener(
      eventName,
      () => {
        dropZone.classList.add(dragoverClass);
      },
      false,
    );
  });

  (['dragleave', 'drop'] as const).forEach((eventName) => {
    dropZone.addEventListener(
      eventName,
      () => {
        dropZone.classList.remove(dragoverClass);
      },
      false,
    );
  });

  // ドロップされたファイルの取得処理
  dropZone.addEventListener(
    'drop',
    (e: Event) => {
      console.log('setupFileDragAndDrop drop');
      const dragEvent = e as DragEvent;
      const dt = dragEvent.dataTransfer;
      if (!dt) return;

      const files = dt.files; // FileList オブジェクト

      if (files.length > 0 && target) {
        // DataTransferオブジェクトを使ってinputにファイルを設定
        const dataTransfer = new DataTransfer();
        const file = files[0]; // 1つ目のファイルが対象
        dataTransfer.items.add(file);
        target.files = dataTransfer.files;
        setInfo(file);
      }
    },
    false,
  );
};
