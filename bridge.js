// Copyright (c) 2026 WeXene
// Izolowany świat rozszerzenia: transport do workera i zegara w tle.
let enginePort = null;
let connecting = false;
let ready = false;
const waiting = [];
const inflight = new Set();
const publish = (msg) => window.postMessage({ ...msg, source: 'sdai-ext' }, location.origin);
function failJobs(error) {
  for (const id of inflight) publish({ type: 'analysis', id, error });
  inflight.clear();
  waiting.length = 0;
}
function connectEngine() {
  if (enginePort || connecting) return;
  connecting = true;
  chrome.runtime.sendMessage({ type: 'engine-init' }, (response) => {
    connecting = false;
    const error = chrome.runtime.lastError?.message || response?.error;
    if (error) {
      failJobs(error);
      setTimeout(connectEngine, 5000);
      return;
    }
    const port = chrome.runtime.connect({ name: 'sdai-engine' });
    enginePort = port;
    port.onMessage.addListener((msg) => {
      if (msg.type === 'ready') {
        ready = true;
        for (const job of waiting.splice(0)) port.postMessage(job);
      }
      if (msg.type === 'analysis') inflight.delete(msg.id);
      publish(msg);
    });
    port.onDisconnect.addListener(() => {
      enginePort = null;
      ready = false;
      failJobs(chrome.runtime.lastError?.message || 'Silnik rozłączony. Ponawiam połączenie.');
      setTimeout(connectEngine, 1000);
    });
  });
}
window.addEventListener('message', (event) => {
  const msg = event.data;
  if (event.source !== window || event.origin !== location.origin) return;
  if (!msg || msg.source !== 'sdai-page') return;
  if (msg.type === 'analyze') {
    inflight.add(msg.id);
    if (enginePort && ready) enginePort.postMessage(msg);
    else { waiting.push(msg); connectEngine(); }
    return;
  }
  if (msg.type === 'save-battle') {
    chrome.runtime.sendMessage({ type: 'save-battle', filename: msg.filename, json: msg.json }, () => void chrome.runtime.lastError);
    return;
  }
  if (msg.type !== 'explain') return;
  chrome.runtime.sendMessage({ type: 'explain', summary: msg.summary, lang: msg.lang }, (response) => {
    const result = chrome.runtime.lastError ? { error: chrome.runtime.lastError.message } : response || { error: 'Brak odpowiedzi rozszerzenia.' };
    publish({ id: msg.id, ...result, type: 'explain' });
  });
});
connectEngine();
