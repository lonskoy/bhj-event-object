ArrLink = Array.from(document.getElementsByClassName('dropdown__link'));
let list = document.querySelector('.dropdown__list');
const dValue = window.dValue;

dValue.addEventListener('click', () => {
    list.className = 'dropdown__list dropdown__list_active';
});

ArrLink.forEach(element => {
    element.onclick = function() {
        dValue.textContent = element.textContent;
        list.className = 'dropdown__list';
        return false;
    }
});



    
    

