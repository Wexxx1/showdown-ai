// Most między skryptem na stronie (world: MAIN) a service workerem rozszerzenia.
// Przekazuje wyłącznie prośby o wyjaśnienie decyzji; klucz API zostaje w background.js.
window.addEventListener('message', (event) => {
  const msg = event.data;
  if (event.source !== window || event.origin !== location.origin) return;
  if (!msg || msg.source !== 'sdai-page' || msg.type !== 'explain') return;
  chrome.runtime.sendMessage({ type: 'explain', summary: msg.summary }, (response) => {
    const result = chrome.runtime.lastError ? { error: chrome.runtime.lastError.message } : response || { error: 'Brak odpowiedzi rozszerzenia.' };
    window.postMessage({ source: 'sdai-ext', id: msg.id, ...result }, location.origin);
  });
});
