<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const videoRef = ref<HTMLVideoElement | null>(null);

/** カメラのストリーム */
let mediaStream: MediaStream | null = null;

/** 撮影した画像のリスト（Base64文字列などを格納） */
const capturedImages = ref<string[]>([]);

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
  if (!videoRef.value.srcObject) return;

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

onUnmounted(() => {
  stopCamera();
});
</script>

<template>
  <div class="camera-container">
    <div class="space-x-3 mb-5">
      <button @click="startCamera" class="app-btn-primary">カメラを起動</button>
      <button @click="stopCamera" class="app-btn-primary">カメラを停止</button>
      <button @click="takePhoto" class="app-btn-secondary">撮影する</button>
    </div>

    <video
      ref="videoRef"
      autoplay
      playsinline
      width="640"
      height="480"
      class="border-4"
    ></video>

    <!-- 撮影した画像のプレビュー一覧を表示するスペース -->
    <div class="mt-5">
      <h3 class="text-lg font-bold mb-3">撮影した画像一覧</h3>
      <div v-if="capturedImages.length === 0" class="text-gray-500">
        まだ撮影された画像はありません。
      </div>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="(imgSrc, index) in capturedImages"
          :key="index"
          class="border p-2 rounded shadow"
        >
          <img
            :src="imgSrc"
            alt="Captured photo"
            width="160"
            height="120"
            class="object-cover"
          />
          <p class="text-xs text-center mt-1">#{{ index + 1 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
