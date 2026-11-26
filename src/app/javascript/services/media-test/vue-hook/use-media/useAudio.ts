import { ref, onUnmounted } from 'vue';

/**
 * オーディオ管理
 */
export const useAudio = () => {
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
    stopRecording();
  });

  return {
    isRecording,
    startRecording,
    stopRecording,
    audioList,
  };
};
