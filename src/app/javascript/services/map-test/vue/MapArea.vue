<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

import Icon from './map-area/Icon.vue';

import { useMap } from '../vue-hook/useMap';

const { moveToCurrentLocation, isLocating, mapContainer } = useMap();
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-4">
    <!-- コントロールエリア（GPSボタン） -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-800">マップ表示</h2>
      <button
        @click="moveToCurrentLocation"
        :disabled="isLocating"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-200 disabled:opacity-50 cursor-pointer"
      >
        <Icon :isLocating="isLocating" />
        <span>{{ isLocating ? '取得中...' : '現在地へ移動' }}</span>
      </button>
    </div>

    <!-- 地図を表示するエリア -->
    <div
      ref="mapContainer"
      class="w-full h-125 rounded-lg shadow-md border border-gray-200 z-0"
    ></div>
  </div>
</template>
