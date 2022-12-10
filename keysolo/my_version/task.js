class Game {
    constructor(container) {
        this.word = document.getElementById('word');
        this.statusWin = document.querySelector('.statusWin');
        this.statusLoose = document.querySelector('.statusLoose');
        this.time = document.querySelector('.time');
        this.count = 0;
        this.countWin = 0;
        this.countLoose = 0;
        this.dictionary = ['apple', 'bad', 'beer', 'randmond', 'airplane', 'bank']; 

        /*this.addWord_button = document.getElementById('_addWord_button');   // Для добавления ноых слов (в разработке)
        this.textWord = document.getElementById('addWord_text');*/

        this.reset();
        this.registerEvent(); 
        this.timer()
    }
 
    reset() {                                        //Удаляет старое слово, генерирует новое слово, отрисовывает новое слово                                  
        this.cleanWord();                           
        let random = this.randomWord();
        this.renderWord(random);
    }

    registerEvent(){
        let tempWord = this.setWord();
        window.addEventListener('keypress', (k) => {               //Обработчик нажатия клавиши
            if(k.key === tempWord[this.count].textContent) {
                tempWord[this.count] = true;
                console.log(tempWord[this.count]);
                this.count += 1;

            }
            else {
                tempWord[this.count] = false;
                console.log(tempWord[this.count]);
                this.count += 1;
            }
            
            if(this.count === tempWord.length) {
                if(tempWord.every(elem => elem === true)) {
                    console.log(tempWord);
                    this.countWin += 1;
                    this.statusWin.textContent = this.countWin;
                    this.count = 0;
                    this.reset();
                    tempWord = this.setWord();
                }
                else {
                    console.log(tempWord);
                    this.countLoose += 1;
                    this.statusLoose.textContent = this.countLoose;
                    this.count = 0;
                    this.reset();
                    tempWord = this.setWord();
                }
            }
        });

        /*this.addWord_button.addEventListener('click', () => this.dictionary.push(this.textWord.value)); */  //Обработчик на кнопку Добавить (в разработке)

    }

    randomWord() {                                         //Генерирует рандомное слово из словаря                                  
        let index = Math.floor(Math.random() * this.dictionary.length);
        console.log(index);
        return this.dictionary[index];
    }

    renderWord(i) {                                       //Отрисовывает сгенерированное слово
        let letters = Array.from(i);
        letters.forEach(elem => {
            let x = document.createElement('span');
            x.textContent = elem;
            word.appendChild(x);
        });
    }

    setWord() {                                         //Получает в массив отрисованое слово
        let arrTemp = Array.from(document.getElementsByTagName('span')).filter(elem => elem.classList.length === 0);
        return arrTemp;
    }

    cleanWord() {                                      //Удаляет отрисованое слово
        let arrTemp = Array.from(document.getElementsByTagName('span')).filter(elem => elem.classList.length === 0);
        arrTemp.forEach(elem => {
            elem.parentNode.removeChild(elem);
        });
    }

    showWin() {                               // Сообщение о победе
        alert('Поздравляем! Вы успели правильно ввести : ' + this.countWin + ' правильных слов !');
        this.countClean();
    }

    showLoose() {                           // Сообщение о проигрыше
        alert('Вы правильно ввели лишь : ' + this.countWin + ' слов. Леонид Аркадьевич грустит...');
        this.countClean();
    }

    countClean() {                             // Обнуляет счетчики
        this.countWin = 0;
        this.countLoose = 0;
        this.statusWin.textContent = 0;
        this.statusLoose.textContent = 0;
    }

    timer() {
        setInterval(() => {
            let tempTime = this.time.textContent;
            tempTime -= 1;
            this.time.textContent = tempTime; 
            if(tempTime === 0) {
                if(this.countWin >= 10) {
                    this.showWin();
                    this.reset();
                    this.time.textContent = 30;
                }
                else {
                    this.showLoose();
                    this.reset(); 
                    this.time.textContent = 30;
                }
            }
        }, 1000);
    }

}

new Game(document.getElementById('card'));









