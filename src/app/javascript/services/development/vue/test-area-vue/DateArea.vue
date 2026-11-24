<script setup lang="ts">
/** Date動作確認 */

const display = (obj: Date) => {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const y = obj.getFullYear();
  const m = obj.getMonth() + 1;
  const d = obj.getDate();
  const w = days[obj.getDay()];
  const h = obj.getHours();
  const mi = obj.getMinutes();
  const s = obj.getSeconds();

  return `${y}/${m}/${d} (${w}) ${h}:${mi}:${s}`;
};

//「そのまま表示される」理由は、new Date()でタイムゾーン付きのオブジェクトに変換されて
// 出力時に、タイムゾーンにあわせた出力になるから。
// つまり、内部的なデータは変換されている。
const list = [
  '2026-11-24', // この利用方法はタイムゾーンの分ずれるのでNG
  '2026-11-24T00:00:00',  // そのまま表示される
  '2026-11-24T10:00:00',  // そのまま表示される
  '2026-11-24T10:00:00+09:00',  // タイムゾーンが違うとそれに合わせた値になる
  '2026-11-24 00:00:00',  // そのまま表示される
  '2026-11-24 10:00:00',  // そのまま表示される
  '2026-11-24 10:00:00+09:00',  // タイムゾーンが違うとそれに合わせた値になる
];
</script>

<template>
  <div>
    Date動作確認

    <div v-for="(str, index) in list" :key="index" class="border my-2 p-2">
      <table>
        <tbody>
          <tr>
            <td class="pr-2">str</td>
            <td>{{ str }}</td>
          </tr>
          <tr>
            <td class="pr-2">new Date(str)</td>
            <td>{{ new Date(str) }}</td>
          </tr>
          <tr>
            <td class="pr-2">display(new Date(str))</td>
            <td>{{ display(new Date(str)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
