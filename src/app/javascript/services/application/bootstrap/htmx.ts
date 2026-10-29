import 'htmx.org';

// htmxのリクエストにRailsのCSRFトークンを自動で含める設定
document.body.addEventListener('htmx:configRequest', (event: Event) => {
  // CustomEvent にキャストして detail プロパティにアクセスできるようにする
  const htmxEvent = event as CustomEvent<{ headers: Record<string, string> }>;
  
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  
  if (token && htmxEvent.detail?.headers) {
    htmxEvent.detail.headers['X-CSRF-Token'] = token;
  }
});