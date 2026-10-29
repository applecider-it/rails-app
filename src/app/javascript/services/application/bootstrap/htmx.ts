import 'htmx.org';

import { setIsLoading } from '@/services/ui/message';

// htmxのリクエストにRailsのCSRFトークンを自動で含める設定
document.body.addEventListener('htmx:configRequest', (event: Event) => {
  // CustomEvent にキャストして detail プロパティにアクセスできるようにする
  const htmxEvent = event as CustomEvent<{ headers: Record<string, string> }>;
  
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  
  if (token && htmxEvent.detail?.headers) {
    htmxEvent.detail.headers['X-CSRF-Token'] = token;
  }
});

// 送信開始時
document.body.addEventListener('htmx:beforeRequest', () => {
  console.log('送信開始！');
  setIsLoading(true);
});

// 送信終了時（成功・失敗問わず）
document.body.addEventListener('htmx:afterRequest', () => {
  console.log('送信終了！');
  setIsLoading(false);
});
