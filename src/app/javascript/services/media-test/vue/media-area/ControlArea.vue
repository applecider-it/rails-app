<script setup lang="ts">
interface Props {
  isRecording: boolean;
}

const videoRef = defineModel<HTMLVideoElement | null>('videoRef');

const props = defineProps<Props>();

const emit = defineEmits<{
  startCamera: [];
  stopCamera: [];
  takePhoto: [];
  startRecording: [];
  stopRecording: [];
}>();
</script>

<template>
  <div class="space-x-3 mb-5">
    <button @click="emit('startCamera')" class="app-btn-primary">
      カメラを起動
    </button>
    <button @click="emit('stopCamera')" class="app-btn-primary">
      カメラを停止
    </button>
    <button @click="emit('takePhoto')" class="app-btn-secondary">
      撮影する
    </button>

    <!-- 録音操作用ボタン -->
    <button
      v-if="!isRecording"
      @click="emit('startRecording')"
      class="app-btn-primary"
    >
      録音開始
    </button>
    <button
      v-else
      @click="emit('stopRecording')"
      class="app-btn-secondary bg-red-600 text-white"
    >
      録音停止中...
    </button>
  </div>

  <video
    ref="videoRef"
    autoplay
    playsinline
    width="640"
    height="480"
    class="border-4"
  ></video>
</template>
