"use sttrict"

const sum = function(n, k, r){
    if (k.value === ""){
        k.value = 0;
    }    
    return (+n.innerHTML * +k.value)
}    

for (let i in kk){  
    kk[i].onkeyup = function () {
        kr[i].innerHTML = sum(kn[i], kk[i])
        
        let sk = 0
        for (let i in kr){
            sk += +kr[i].innerHTML
        }
        sumk.innerHTML = sk
        sumall.innerHTML = (+sumk.innerHTML + +summ.innerHTML).toFixed(2)
    }
    kk[i].onchange = kk[i].onkeyup
}

for (let i in mk){
    mk[i].onkeyup = function () {
        mr[i].innerHTML = sum(mn[i], mk[i]).toFixed(2)
        
        let sm = 0
        for (let i in mr){
            sm += +mr[i].innerHTML
        }
        summ.innerHTML = sm.toFixed(2)
        sumall.innerHTML = (+sumk.innerHTML + +summ.innerHTML).toFixed(2)
    }
    mk[i].onchange = mk[i].onkeyup
}

const random = (min, max) => {
    const rand = min + Math.random() * (max - min + 1);
    return Math.floor(rand);
}

btn.addEventListener('mouseenter', () => {
    btn.style.left = `${random(0, 90)}%`;
    btn.style.top = `${random(0, 90)}%`;
});

btn.addEventListener('click', () => {
    alert('Чудово! Дозвіл на видалення Windows отримано! Починаю!');
});