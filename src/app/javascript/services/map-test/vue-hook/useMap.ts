import { ref, onMounted, onUnmounted } from 'vue';
import L from 'leaflet';

import {
  fixLeafletIconPath,
  addTileLayer,
  getCurrentPositionOptions,
} from '../map/main';

/**
 * マップ動作確認
 */
export const useMap = () => {
  // 地図を描画する DOM 要素の参照
  const mapContainer = ref<HTMLDivElement | null>(null);

  // Leaflet の Map インスタンスを保持する参照
  let map: L.Map | null = null;

  // 現在地マーカーを保持する変数
  let currentMarker: L.Marker | null = null;

  // 位置情報取得中のローディング状態
  const isLocating = ref(false);

  // 初期座標（例：東京駅）とズームレベル
  const initialLocation: L.LatLngTuple = [35.681236, 139.767125];
  const initialZoomLevel = 15;
  const markerTextInitialLocation = '<b>東京駅</b>';
  const markerTextCurrentLocation = '<b>現在地</b>';

  /** 初期化 */
  const init = () => {
    if (!mapContainer.value) return;

    fixLeafletIconPath();

    // 地図の初期化
    map = L.map(mapContainer.value).setView(initialLocation, initialZoomLevel);

    addTileLayer(map);

    // 初期マーカーの追加
    const marker = L.marker(initialLocation).addTo(map);
    marker.bindPopup(markerTextInitialLocation).openPopup();
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
        } else {
          currentMarker = L.marker(latLng).addTo(map!);
        }

        currentMarker.bindPopup(markerTextCurrentLocation).openPopup();
      },
      (error) => {
        isLocating.value = false;
        console.error(error);
        alert(
          '現在地の取得に失敗しました。位置情報の権限（パーミッション）を確認してください。',
        );
      },
      getCurrentPositionOptions,
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

  return { moveToCurrentLocation, isLocating, mapContainer };
};
