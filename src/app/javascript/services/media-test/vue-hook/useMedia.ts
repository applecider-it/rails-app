import { useCamera } from './use-media/useCamera';
import { useAudio } from './use-media/useAudio';

/**
 * メディア動作確認
 */
export const useMedia = () => {
  const { startCamera, stopCamera, takePhoto, capturedImages, videoRef } =
    useCamera();

  const { isRecording, startRecording, stopRecording, audioList } = useAudio();

  return {
    isRecording,
    startRecording,
    stopRecording,
    audioList,
    startCamera,
    stopCamera,
    takePhoto,
    capturedImages,
    videoRef,
  };
};
