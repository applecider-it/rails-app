import { ref, onUnmounted } from 'vue';

/**
 * メディア動作確認
 */
export const useMedia = () => {
  const videoRef = ref<HTMLVideoElement | null>(null);

  /** カメラのストリーム */
  let mediaStream: MediaStream | null = null;

  /** 撮影した画像のリスト（Base64文字列などを格納） */
  const capturedImages = ref<string[]>([]);

  /* --- 音声録音機能の追加 --- */
  /** マイクのストリーム */
  let audioStream: MediaStream | null = null;

  /** MediaRecorderインスタンス */
  let mediaRecorder: MediaRecorder | null = null;

  /** 録音データのチャンク一時保存用 */
  let audioChunks: Blob[] = [];

  /** 録音中フラグ */
  const isRecording = ref<boolean>(false);

  /** 録音した音声URL（Base64またはBlob URL）のリスト */
  const audioList = ref<string[]>([]);

  /** カメラを起動 */
  const startCamera = async (): Promise<void> => {
    // すでに起動中の場合は一度停止する
    if (mediaStream) {
      stopCamera();
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: { facingMode: 'user' },
        audio: false,
      };

      // カメラのストリームを取得
      mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      // refを通してvideo要素にストリームをセット
      if (videoRef.value) {
        videoRef.value.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('カメラの起動に失敗しました:', err);
      alert('カメラへのアクセスが許可されていないか、利用できません。');
    }
  };

  /** カメラを停止 */
  const stopCamera = (): void => {
    if (mediaStream) {
      const tracks: MediaStreamTrack[] = mediaStream.getTracks();
      tracks.forEach((track: MediaStreamTrack) => track.stop()); // 全てのトラックを停止
      mediaStream = null;
    }
    if (videoRef.value) {
      videoRef.value.srcObject = null;
    }
  };

  /** 現在のビデオ映像を撮影（キャプチャ）する */
  const takePhoto = (): void => {
    if (!videoRef.value || !videoRef.value.srcObject) return;

    const video = videoRef.value;

    // ビデオの実際の解像度を取得（未読み込みの場合はデフォルト値）
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    // 一時的なcanvas要素を作成してビデオの1フレームを描画
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // 1フレームを描画
      ctx.drawImage(video, 0, 0, width, height);

      // canvasの内容を画像URL（Base64）に変換
      const dataUrl = canvas.toDataURL('image/png');

      capturedImages.value.push(dataUrl);
    }
  };

  /** 録音を開始 */
  const startRecording = async (): Promise<void> => {
    // 既に録音中の場合は処理しない
    if (isRecording.value) return;

    try {
      // マイクのストリームを取得
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorder = new MediaRecorder(audioStream);
      audioChunks = [];

      // 録音データが取得可能になったときに実行
      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      // 録音停止時の処理を設定
      mediaRecorder.onstop = () => {
        // 取得したBlobデータから再生用URLを作成
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioList.value.push(audioUrl);
      };

      // 録音開始
      mediaRecorder.start();
      isRecording.value = true;
    } catch (err) {
      console.error('マイクの起動に失敗しました:', err);
      alert('マイクへのアクセスが許可されていないか、利用できません。');
    }
  };

  /** 録音を停止 */
  const stopRecording = (): void => {
    if (mediaRecorder && isRecording.value) {
      mediaRecorder.stop();
      isRecording.value = false;
    }

    // マイクのトラックを全て停止してストリームを削除
    if (audioStream) {
      audioStream
        .getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
      audioStream = null;
    }
  };

  onUnmounted(() => {
    stopCamera();
    stopRecording();
  });

  return {
    startCamera,
    stopCamera,
    takePhoto,
    isRecording,
    startRecording,
    stopRecording,
    capturedImages,
    audioList,
    videoRef,
  };
};
