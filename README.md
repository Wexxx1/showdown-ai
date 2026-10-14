# Showdown AI – asystent Gen 9 Random Battle

Rozszerzenie do Chrome, które w trakcie walki **Gen 9 Random Battle** na [Pokémon Showdown](https://play.pokemonshowdown.com)
pokazuje panel z podpowiedzią: jaki ruch użyć albo na kogo zmienić Pokémona, z krótkim uzasadnieniem,
tabelami obrażeń i porównaniem prędkości.

Opcjonalny przycisk **„Wyjaśnij (AI)”** wysyła opis sytuacji do Claude'a (API Anthropic) i pokazuje
wyjaśnienie decyzji. Wymaga własnego klucza API – bez niego reszta działa za darmo.

## Instalacja

1. Pobierz repozytorium (Code → Download ZIP) i rozpakuj.
2. Otwórz `chrome://extensions` i włącz **Tryb dewelopera**.
3. Kliknij **Załaduj rozpakowane** i wskaż folder z plikiem `manifest.json`.
4. Wejdź na play.pokemonshowdown.com i zagraj Gen 9 Random Battle.

Szczegóły: [INSTRUKCJA.txt](INSTRUKCJA.txt).

## Prywatność

- Klucz API jest przechowywany tylko lokalnie (`chrome.storage.local`) i używany wyłącznie przez service worker rozszerzenia.
- Dane z walki są wysyłane do API Anthropic **tylko** po kliknięciu „Wyjaśnij (AI)”.

## Uwaga

Projekt fanowski, niezwiązany z Nintendo, Game Freak, The Pokémon Company ani Pokémon Showdown.
Pokémon jest znakiem towarowym jego właścicieli. Używaj zgodnie z zasadami Pokémon Showdown.

## Licencja

Wszelkie prawa zastrzeżone – zobacz [LICENSE](LICENSE).

Wykorzystane biblioteki i dane: zobacz [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
