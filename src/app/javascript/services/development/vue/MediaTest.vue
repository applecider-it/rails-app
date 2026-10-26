<script setup lang="ts">
import { useMedia } from '../javascript-test/useMedia';

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
    <div class="space-x-3 mb-5">
      <button @click="startCamera" class="app-btn-primary">カメラを起動</button>
      <button @click="stopCamera" class="app-btn-primary">カメラを停止</button>
      <button @click="takePhoto" class="app-btn-secondary">撮影する</button>

      <!-- 録音操作用ボタン -->
      <button
        v-if="!isRecording"
        @click="startRecording"
        class="app-btn-primary"
      >
        録音開始
      </button>
      <button
        v-else
        @click="stopRecording"
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
          class="border p-2 rounded-sm shadow-sm"
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

    <!-- 録音した音声一覧プレビュー表示スペース -->
    <div class="mt-8">
      <h3 class="text-lg font-bold mb-3">録音した音声一覧</h3>
      <div v-if="audioList.length === 0" class="text-gray-500">
        まだ録音された音声はありません。
      </div>
      <div class="space-y-3">
        <div
          v-for="(audioSrc, index) in audioList"
          :key="index"
          class="flex items-center space-x-3 border p-3 rounded-sm shadow-sm"
        >
          <span class="text-sm font-bold">音声 #{{ index + 1 }}</span>
          <audio :src="audioSrc" controls class="h-8"></audio>
        </div>
      </div>
    </div>
  </div>
</template>
