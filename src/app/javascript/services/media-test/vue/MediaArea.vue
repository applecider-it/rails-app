<script setup lang="ts">
import { useMedia } from '../vue-hook/useMedia';

import ResultArea from './media-area/ResultArea.vue';
import ControlArea from './media-area/ControlArea.vue';

const {
  startCamera,
  stopCamera,
  takePhoto,
  isRecording,
  startRecording,
  stopRecording,
  capturedImages,
  audioList,
  videoRef,
} = useMedia();
</script>

<template>
  <div class="camera-container">
    <!-- 操作ボタンエリア -->
    <ControlArea
      :startCamera="startCamera"
      :stopCamera="stopCamera"
      :takePhoto="takePhoto"
      :isRecording="isRecording"
      :startRecording="startRecording"
      :stopRecording="stopRecording"
      v-model:videoRef="videoRef"
    />

    <ResultArea :capturedImages="capturedImages" :audioList="audioList" />
  </div>
</template>
