<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

// 地図を描画する DOM 要素の参照
const mapContainer = ref<HTMLDivElement | null>(null);

// Leaflet の Map インスタンスを保持する参照
let map: L.Map | null = null;

// 現在地マーカーを保持する変数
let currentMarker: L.Marker | null = null;

// 位置情報取得中のローディング状態
const isLocating = ref(false);

/** Vite 環境における Leaflet デフォルトアイコンの破綻対策 */
const fixLeafletIconPath = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

/** 初期化 */
const init = () => {
  if (!mapContainer.value) return;

  fixLeafletIconPath();

  // 中心座標（例：東京駅）とズームレベル
  const centerLocation: L.LatLngTuple = [35.681236, 139.767125];
  const zoomLevel = 15;

  // 地図の初期化
  map = L.map(mapContainer.value).setView(centerLocation, zoomLevel);

  // タイルレイヤー（OpenStreetMap）の追加
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // 初期マーカーの追加
  const marker = L.marker(centerLocation).addTo(map);
  marker
    .bindPopup('<b>東京駅</b><br>Vue 3 + Tailwind + TypeScript のサンプル')
    .openPopup();
};

/** GPSで現在地を取得して移動する関数 */
const moveToCurrentLocation = () => {
  if (!map) return;

  // ブラウザがGeolocation APIに対応しているかチェック
  if (!navigator.geolocation) {
    alert('お使いのブラウザは位置情報取得に対応していません。');
    return;
  }

  isLocating.value = true;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      isLocating.value = false;
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const latLng: L.LatLngTuple = [lat, lng];

      // 地図の中心を現在地に移動（ズームレベル16）
      map?.setView(latLng, 16);

      // 既に現在地マーカーがある場合は位置を更新、なければ新規作成
      if (currentMarker) {
        currentMarker.setLatLng(latLng);
        currentMarker.bindPopup('<b>現在地</b>').openPopup();
      } else {
        currentMarker = L.marker(latLng).addTo(map!);
        currentMarker.bindPopup('<b>現在地</b>').openPopup();
      }
    },
    (error) => {
      isLocating.value = false;
      console.error(error);
      alert(
        '現在地の取得に失敗しました。位置情報の権限（パーミッション）を確認してください。',
      );
    },
    {
      // 高精度な位置情報（GPSなど）の利用を強いるかどうか
      // true にすると精度が上がりますが、バッテリー消費が増えたり、取得に時間がかかる場合があります
      enableHighAccuracy: true,

      // 位置情報の取得を待つ最大時間（ミリ秒単位）
      // この時間（10000ms = 10秒）以内に位置情報が取得できない場合、エラーとして処理されます
      timeout: 10000,

      // キャッシュされた（保存されていた）位置情報の有効期限（ミリ秒単位）
      // 0 に指定するとキャッシュを一切使わず、常に「今現在」の最新の位置情報を取得しに行きます
      maximumAge: 0,
    },
  );
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  // 地図インスタンスをクリーンアップ
  if (map) {
    map.remove();
    map = null;
  }
});
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
