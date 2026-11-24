import { ref, onMounted, onUnmounted } from "vue";

import { isPWA } from "../appli";

/**
 * アプリ管理用フック
 * 
 * ロケーションバー等の「アプリで開く」で開いた時や、インストール直後の「アプリで開く」で開いた時は、
 * JSの状態が変更されないため、変更処理が必要な時に使う。
 */
export function useAppli() {
  const pwa = ref(isPWA());
  const mediaQuery = window.matchMedia("(display-mode: standalone)");

  function callbackRefresh(e: MediaQueryListEvent) {
    if (e.matches) {
      {
        console.log("useAppli::callbackRefresh");

        pwa.value = isPWA();
      }
    }
  }

  onMounted(() => {
    console.log("useAppli::onMounted");

    mediaQuery.addEventListener("change", callbackRefresh);
  });

  onUnmounted(() => {
    console.log("useAppli::onUnmounted");

    mediaQuery.removeEventListener("change", callbackRefresh);
  });

  return { pwa };
}
