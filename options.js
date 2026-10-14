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
