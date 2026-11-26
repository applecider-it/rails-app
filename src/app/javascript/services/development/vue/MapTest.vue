<script setup lang="ts">
import 'leaflet/dist/leaflet.css';

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
        <!-- 取得中のスピナーアイコン -->
        <svg
          v-if="isLocating"
          class="animate-spin -ml-1 mr-1.5 h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <!-- アイコン（SVG） -->
        <svg
          v-else
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 14a4 4 0 10-4-4 4 4 0 004 4zm0-6a2 2 0 11-2 2 2 2 0 012-2z"
          ></path>
        </svg>
        <span>{{ isLocating ? '取得中...' : '現在地へ移動' }}</span>
      </button>
    </div>

    <!-- 地図を表示するエリア -->
    <div
      ref="mapContainer"
      class="w-full h-[500px] rounded-lg shadow-md border border-gray-200 z-0"
    ></div>
  </div>
</template>
