const arrTab = Array.from(document.getElementsByClassName('tab'));
const arrCont = Array.from(document.getElementsByClassName('tab__content'));
let index = 0;

for(let i = 0; i < arrTab.length; i++ ) {
    arrTab[i].addEventListener('click', () => {
        index = i;
        console.log(index);
        arrTab[i].className = 'tab tab_active';
        arrCont[i].className = 'tab__content tab__content_active';
        for(let i = 0; i < arrTab.length; i++ ) {
            if(i !== index){
                arrTab[i].className = 'tab';
                arrCont[i].className = 'tab__content';
            }
        }
    });
}


