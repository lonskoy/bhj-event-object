class Game {
    constructor(container) {
        this.word = document.getElementById('word');
        this.statusWin = document.querySelector('.statusWin');
        this.statusLoose = document.querySelector('.statusLoose');
        this.time = document.querySelector('.time');

        this.count = 0;      // Счетчик букв
        this.countWin = 0;   // Счетчик слов введеных без ошибки
        this.countLoose = 0; // Счетчик слов введеных с ошибкой

        this.ENdictionary = ['apple', 'bad', 'beer', 'randmond', 'airplane', 'bank']; //Английский словарь
        this.RUdictionary = [];                                                       //Русский словарь

        /*this.levels = [            //Уровни сложности
            { name: level1,
              time: 40,
              win: 8  
            },
            { name: level2,
                time: 30,
                win: 10  
              },
              { name: level3,
                time: 20,
                win: 12  
              }
        ];*/
        

        /*this.addWord_button = document.getElementById('_addWord_button');   // Для добавления ноых слов (в разработке)
        this.textWord = document.getElementById('addWord_text');*/

        this.reset();
        this.registerEvent(); 
        this.timer()
    }

    colorizeFont(index, color) {                     // Меняет цвет букв после нажатия клавиш
        this.word.children[index].classList.add(color);
        console.log('Цвет изменен');
    }
 
    reset() {                                        // Удаляет старое слово, генерирует новое слово, отрисовывает новое слово                                  
        this.cleanWord();                           
        let random = this.randomWord();
        this.renderWord(random);
    }

    registerEvent(){                                   // Содержит функции обрабатывающие события
        let tempWord = this.takeWord();

        let newWord = () => {
            this.count = 0;
            this.reset();
            tempWord = this.takeWord();
        }

        window.addEventListener('keypress', (k) => {   //Обработчик нажатия клавиши

            k.key === tempWord[this.count].textContent ? (tempWord[this.count] = true, this.colorizeFont(this.count, 'letter__true')) 
                                                       : (tempWord[this.count] = false, this.colorizeFont(this.count, 'letter__false'))
                console.log(tempWord[this.count]);
                this.count += 1;
            
            if(this.count === tempWord.length) {
                if(tempWord.every(elem => elem === true)) {
                    console.log(tempWord);
                    this.countWin += 1;
                    this.statusWin.textContent = this.countWin;
                    newWord();
                }
                else {
                    console.log(tempWord);
                    this.countLoose += 1;
                    this.statusLoose.textContent = this.countLoose;
                    newWord();
                }
            }
        });

        /*this.addWord_button.addEventListener('click', () => this.ENdictionary.push(this.textWord.value)); */  //Обработчик на кнопку Добавить (в разработке)

    }

    randomWord() {                                         //Генерирует рандомное слово из словаря                                  
        let index = Math.floor(Math.random() * this.ENdictionary.length);
        console.log(index);
        return this.ENdictionary[index];
    }

    renderWord(i) {                                       //Отрисовывает сгенерированное слово в броузере
        let letters = Array.from(i);
        letters.forEach(elem => {
            let x = document.createElement('span');
            x.textContent = elem;
            word.appendChild(x);
        });
    }

    takeWord() {                                         //Получает в массив отрисованое слово
        let arrTemp = Array.from(document.getElementsByTagName('span')).filter(elem => elem.classList.length === 0);
        return arrTemp;
    }

    cleanWord() {                                      //Удаляет отрисованое слово
        let arrTemp = Array.from(document.getElementsByTagName('span')).filter(elem => elem.classList.length === 0); //Удляет буквы если вообще не нажимали клавиши
        let arrTemp2 = Array.from(document.getElementsByTagName('span')).filter(elem => elem.classList.contains('letter__true')); //Удадяет угаданные буквы
        let arrTemp3 = Array.from(document.getElementsByTagName('span')).filter(elem => elem.classList.contains('letter__false'));//Удаляет не угаданные буквы


        arrTemp.forEach(elem => {
            elem.parentNode.removeChild(elem);
        });
        arrTemp2.forEach(elem => {
            elem.parentNode.removeChild(elem);
        });
        arrTemp3.forEach(elem => {
            elem.parentNode.removeChild(elem);
        });

    }

    countClean() {                             // Обнуляет счетчики
        this.countWin = 0;
        this.countLoose = 0;
        this.statusWin.textContent = 0;
        this.statusLoose.textContent = 0;
    }


    showWin() {                               // Сообщение о победе
        alert('Поздравляем! Вы успели правильно ввести : ' + this.countWin + ' правильных слов !');
        this.countClean();
    }

    showLoose() {                           // Сообщение о проигрыше
        alert('Вы правильно ввели лишь : ' + this.countWin + ' слов. Леонид Аркадьевич грустит...');
        this.countClean();
    }


    timer() {                                        //Таймер обратного отсчета, проверка условий победы
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









