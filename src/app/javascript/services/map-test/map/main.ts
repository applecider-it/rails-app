import L from 'leaflet';

/** Vite 環境における Leaflet デフォルトアイコンの破綻対策 */
export const fixLeafletIconPath = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

/** タイルレイヤー（OpenStreetMap）の追加 */
export const addTileLayer = (map: L.Map) => {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

export const getCurrentPositionOptions = {
  // 高精度な位置情報（GPSなど）の利用を強いるかどうか
  // true にすると精度が上がりますが、バッテリー消費が増えたり、取得に時間がかかる場合があります
  enableHighAccuracy: true,

  // 位置情報の取得を待つ最大時間（ミリ秒単位）
  // この時間（10000ms = 10秒）以内に位置情報が取得できない場合、エラーとして処理されます
  timeout: 10000,

  // キャッシュされた（保存されていた）位置情報の有効期限（ミリ秒単位）
  // 0 に指定するとキャッシュを一切使わず、常に「今現在」の最新の位置情報を取得しに行きます
  maximumAge: 0,
};
