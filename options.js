// Copyright (c) 2026 WeXene
const input = document.getElementById('key');
const status = document.getElementById('status');

chrome.storage.local.get('apiKey').then(({ apiKey }) => {
  status.textContent = apiKey ? 'Klucz jest zapisany.' : 'Brak zapisanego klucza.';
});

document.getElementById('save').addEventListener('click', async () => {
  const apiKey = input.value.trim();
  if (!apiKey) {
    status.textContent = 'Wpisz klucz.';
    return;
  }
  await chrome.storage.local.set({ apiKey });
  input.value = '';
  status.textContent = 'Zapisano.';
});

document.getElementById('clear').addEventListener('click', async () => {
  await chrome.storage.local.remove('apiKey');
  status.textContent = 'Klucz usunięty.';
});

// Zapis walk do Pobranych: domyślnie wyłączony, uprawnienie "downloads" jest opcjonalne i prosimy o nie
// dopiero przy włączeniu.
const saveBattles = document.getElementById('save-battles');
const saveStatus = document.getElementById('save-status');
chrome.storage.local.get('saveBattles').then(({ saveBattles: on }) => {
  saveBattles.checked = !!on;
});
saveBattles.addEventListener('change', async () => {
  let on = saveBattles.checked;
  if (on) on = await chrome.permissions.request({ permissions: ['downloads'] });
  saveBattles.checked = on;
  await chrome.storage.local.set({ saveBattles: on });
  saveStatus.textContent = on ? 'Włączone.' : 'Wyłączone.';
});
