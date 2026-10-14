# Showdown AI – Gen 9 Random Battle assistant

A Chrome extension that shows an advice panel during **Gen 9 Random Battle** games on
[Pokémon Showdown](https://play.pokemonshowdown.com): which move to use or which Pokémon to switch to,
with a short explanation, damage tables and a speed comparison.

The optional **"Explain (AI)"** button sends a summary of the battle to Claude (Anthropic API) and shows
an explanation of the decision. It requires your own API key; everything else works for free without it.

> The extension's interface is currently in Polish.

## Installation

1. Download the repository (Code → Download ZIP) and unzip it.
2. Open `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the folder containing `manifest.json`.
4. Go to play.pokemonshowdown.com and play a Gen 9 Random Battle.

## Privacy

- The API key is stored only locally (`chrome.storage.local`) and is used only by the extension's service worker.
- Battle data is sent to the Anthropic API **only** when you click "Explain (AI)".

## Disclaimer

Fan project, not affiliated with Nintendo, Game Freak, The Pokémon Company or Pokémon Showdown.
Pokémon is a trademark of its respective owners. Use in accordance with Pokémon Showdown's rules.

## License

All rights reserved – see [LICENSE](LICENSE).

Third-party libraries and data: see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
