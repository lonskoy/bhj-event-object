class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.statusWin = document.querySelector('.status__wins');
    this.statusLoss = document.querySelector('.status__loss');

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.statusWin.textContent = 0;
    this.statusLoss.textContent = 0;
    this.setNewWord();
  }

  registerEvents() {
    let setWord = Array.from(document.getElementsByClassName('symbol'));
    let count = 0;
    let tempWin = 0;
    let tempLoss = 0;

    window.addEventListener('keydown', (k) => {   // Проверка нажатие клавише соответвует текущему эллементу массива?
      setWord[count].textContent === k.key ? (setWord[count] = true, count += 1) : (setWord[count] = false,count += 1);

      if(count === setWord.length) {    // Если счетчик count = длинне массива, то слово закончилось и подводим итог
        if (setWord.some(elem => elem === false)) {  // Если хоть один эллемент массива равен false то счетчик проигрышей + 1
            tempLoss += 1;
            this.statusLoss.textContent = tempLoss;
            count = 0;
            this.setNewWord();
            setWord = Array.from(document.getElementsByClassName('symbol'));

        }
        else {
            tempWin += 1;
            this.statusWin.textContent = tempWin;
            count = 0;
            this.setNewWord();
            setWord = Array.from(document.getElementsByClassName('symbol'));
        }

        if (this.statusWin.textContent == 10) {  //Проверка условия выигрыша
          alert('Победа!');
          tempWin = 0;
          tempLoss = 0;
          this.reset();
          setWord = Array.from(document.getElementsByClassName('symbol'));
        }
        if (this.statusLoss.textContent == 5) {  //Проверка условия проыигрыша
          alert('Вы проиграли!');
          tempWin = 0;
          tempLoss = 0;
          this.reset();
          setWord = Array.from(document.getElementsByClassName('symbol'));
        }

      }

    });
  }

 /* success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }*/

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'));

