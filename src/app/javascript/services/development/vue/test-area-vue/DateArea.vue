<script setup lang="ts">
/** Date動作確認 */

import { dateFormat } from '@/services/data/date';

const display = (obj: Date) => {
  return dateFormat(obj, 'all');
};

//「そのまま表示される」の部分が、そのまま表示される理由は、
// new Date()でタイムゾーン付きのオブジェクトに変換されて
// 出力時に、タイムゾーンにあわせた出力になるから。
//
// つまり、内部的なデータは、ブラウザ上のタイムゾーンにあわせた、タイムゾーン付きのデータに変換されている。
const list = [
  '2026-11-24', // この利用方法はタイムゾーンの分ずれるのでNG

  '2026-11-24T00:00:00', // そのまま表示される
  '2026-11-24T10:00:00', // そのまま表示される
  '2026-11-24T10:00:00+09:00', // タイムゾーンが違うとそれに合わせた値になる

  '2026-11-24 00:00:00', // そのまま表示される
  '2026-11-24 10:00:00', // そのまま表示される
  '2026-11-24 10:00:00+09:00', // タイムゾーンが違うとそれに合わせた値になる

  '2026-1-2 3:4:5', // dateFormat()動作確認用
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
