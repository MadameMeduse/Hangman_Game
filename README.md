# Hangman_Game

<a href="https://madamemeduse.github.io/Hangman_Game/"></a>

<h1>Architektura aplikacji:</h1>
<ol>
<li>
  <p>Najpierw ustaliłam stan początkowy czyli initialState w którym zawarte jest:</p>
</li>
    <ul>
        <li>lives: ilość żyć, liczba </li>
        <li>used: used z tablicy letters [ ]</li>
        <li>word: słowo pobrane jako string z API</li>
    </ul>
<li>
   <p>Następnie ustaliłam co ma być zawarte w widoku aplikacji: -- > element (zależny od):</p>
  <br>
  </li>
    <ul>
        <li>alfabet (used) - widok zmienia się w zależności od wykorzystanych już liter</li>
        <li>liczba żyć (lives) - zmienia się w zależności od ilości pozostałych żyć </li>
        <li>słowo (word, used) - zmienia się z zależności od słowa i wykorzystanych liter</li>
        <li>hangman (lives) -  zmienia się w zależności od liczby żyć </li>
        <li>loading (word) - zmienia się w zależności od słowa. Jeśli słowa nie ma, pokazuje się ładowanie.</li>
        <li>final screen (lives, word, used) - ekran końcowy w zależności od ilości żyć, słowa i wykorzystanych liter.</li>
    </ul>
<li>
   <p>Ustaliłam eventy jakie mają wystąpić w aplikacji:</p>
</li>
<li>
 <ul>
  <p>
    <b>click</b> 
    po kliknięciu w literkę</p>
  </li>
      <ul>
 <li>dodajemy do used</li>
  <li>jeśli nie pasuje do słowa =></li>
   <li>lives-- (odejmujemy życie)</li>
    </ul>
</ul>
<li>
   <p>Final screen:</p></li>

<ul> Wygrana jeśli:
    <li>lives > 0</li>
    <li>wszystkie literki z word są w used (nie licząc pierwszej i ostatniej)</li>
</ul>

<li> 
  <p>Słabe strony aplikacji:</p>
</li>
 <ul>
    <li>Brak webpacka - wszystkie funkcje w jednym pliku js  </li>
    <li>Wrzucenie projektu na github na sam koniec zamiast na początku (to było bardzo nierozsądne) </li>
    <li>Gra źle wyświetla się na poziomym widoku komórki </li>
    <li>Canva hangman wygląda brzydko, gdybym miała więcej czasu wyglądałaby lepiej</li>
 </ul>

 <li> 
  <p>Aby uruchomić grę należy kliknąc w link na samej górze lub:</p>
</li>
 <ul>
    <li>Uruchomic za pomocą liveserver 
        <br> <b>npm install -g live-server</b> 
        <br>a następnie 
        <br> <b>npx live-server </b> 
    </li>
    <li>zainstalować SCSS przez npm install -g sass</li>
    <li>Kompilacja do folderu css za pomocą npx sass --watch scss:css </li>
    
 </ul>
</ol>
