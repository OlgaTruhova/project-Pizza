const ingredientsWrapper = document.getElementById('ingredients-wrapper');
const ingredients = ingredientsWrapper.getElementsByTagName('input');
const customersPizza = document.getElementById('customers-pizza');
const creatIng = customersPizza.getElementsByTagName('input');

const price = document.getElementById('price');
const sum = document.getElementById('sum');
const btn = document.getElementById('btn');
btn.classList = 'btn inactive';

let catalogIngredients = [
    {
        ingname: 'Основа 24 см',
        price: 5.00,
        checked: false,
        name: "basis",
    },
    {
        ingname: 'Основа 32 см',
        price: 6.00,
        checked: false,
        name: "basis",
    },
    {
        ingname: 'Основа 45 см',
        price: 7.00,
        checked: false,
        name: "basis",
    },
    {
        ingname: 'Основа 60 см',
        price: 8.00,
        checked: false,
        name: "basis",
    },
    {
        ingname: 'Соус томатный',
        price: 2.00,
        checked: false,
        name: "sauce",
    },
    {
        ingname: 'Соус сливочный',
        price: 3.00,
        checked: false,
        name: "sauce",
    },
    {
        ingname: 'Соус горчичный',
        price: 4.00,
        checked: false,
        name: "sauce",
    },
    {
        ingname: 'Соус "Песто"',
        price: 5.00,
        checked: false,
        name: "sauce",
    },
    {
        ingname: 'Ветчина',
        price: 7.00,
        checked: false,
        name: "meat",
    },
    {
        ingname: 'Курица',
        price: 4.00,
        checked: false,
        name: "meat",
    },
    {
        ingname: 'Салями',
        price: 5.00,
        checked: false,
        name: "meat",
    },
    {
        ingname: 'Сыр',
        price: 6.00,
        checked: false,
        name: "meat",
    },
    {
        ingname: 'Грибы',
        price: 5.00,
        checked: false,
        name: "veggies",
    },
    {
        ingname: 'Перец',
        price: 6.00,
        checked: false,
        name: "veggies",
    },
    {
        ingname: 'Помидоры',
        price: 4.00,
        checked: false,
        name: "veggies",
    },
    {
        ingname: 'Оливки',
        price: 3.00,
        checked: false,
        name: "veggies",
    },
];

let formationChecklist = {
    'basis': [],
    'sauce': [],
    'meat': [],
    'veggies': [],
};

function creatingredients (ing) {

    const label = document.createElement('label');
    customersPizza.append(label);

    const input = document.createElement('input');
    input.type = 'checkbox';
    
    input.value = ing.ingname;
    input.name = ing.name;
    input.checked = ing.checked;
    label.append(input);

    const span = document.createElement('span');
    span.textContent = `${ing.ingname}, ${ing.price}.00 руб.`;
    label.append(span);

    const img = document.createElement('img');
    img.src = './imgs/musorka1.png';
    img.classList = 'musorka';
    img.alt = 'img';   
    label.append(img);
};

[...ingredients].forEach(ingr => {
    ingr.addEventListener('click', function (e) {
        checkedIng(e);
    })
});

function checkedIng (e) {
    catalogIngredients.forEach(ingr => {
    
        if (e.target.value === ingr.ingname) {
            ingr.checked = !ingr.checked;
            if (ingr.checked) {
                formationArrOfTypesIngredients(e);
                disablInp(e);
                priceFormation();
                colorCheck(e);
                colorDis(e);
            } else {
                removFromArrOfTypesIngredients(e);
                disablInp(e);
                delIngredients(e);
                priceFormation();
                colorCheck(e);
                colorDis(e);
            }
        }
    })
};

function formationArrOfTypesIngredients (e) {

    catalogIngredients.forEach(ingr => {
        if (e.target.name === 'basis' || e.target.name === 'sauce') {
            if (e.target.name in formationChecklist && e.target.value === ingr.ingname) {
            
                if (formationChecklist[e.target.name].length < 1) {
                    formationChecklist[e.target.name].push(ingr);
                    creatingredients(ingr);
                    [...creatIng].forEach(ingr => {ingr.addEventListener('click', dellIngredientsCheklist)});
                    imgPizza();         
                }
            }
        } else {
            if (e.target.name in formationChecklist && e.target.value === ingr.ingname) {
                if (formationChecklist[e.target.name].length < 2) {
                    formationChecklist[e.target.name].push(ingr);
                    creatingredients(ingr);    
                    [...creatIng].forEach(ingr => {ingr.addEventListener('click', dellIngredientsCheklist)});          
                    imgPizza();
                }
            }        
        }
    })
};

function removFromArrOfTypesIngredients (e) {
    
    formationChecklist[e.target.name].forEach((ingr, i, arr) => {
        if (e.target.value === ingr.ingname) {
            arr.splice(i, 1);
        }
        imgPizza();
    })
};

function disablInp (e) {
    catalogIngredients.forEach(ingr => {
        if (ingr.ingname === e.target.value && ingr.checked) {
            if(e.target.name === 'basis' || e.target.name === 'sauce') {
                if (formationChecklist[e.target.name].length === 1) {
                    [...ingredients].forEach((ing) => {
                        if(ing.name === ingr.name && !ing.checked) {
                            ing.disabled = true;
                        }
                    }) 
                }
            } else {
                if (formationChecklist[e.target.name].length === 2) {
                    [...ingredients].forEach((ing) => {
                        if(ing.name === ingr.name && !ing.checked) {
                            ing.disabled = true;

                        }
                    }) 
                }
            }
        } else if (ingr.ingname === e.target.value && !ingr.checked) {
            [...ingredients].forEach((ing) => {
                if(ing.name === ingr.name && ing.checked === ingr.checked) {
                    ing.disabled = false;
                }
            })
        }
    });
};

function delIngredients (e) {
    [...creatIng].forEach(ingr => {
        if (e.target.value === ingr.value) {
            ingr.parentElement.remove();
        }
    }) 
};

function dellIngredientsCheklist (e) {
    [...ingredients].forEach(ingr => {
        if(ingr.value === e.target.value && ingr.checked) {
            ingr.checked = !ingr.checked;
            checkedIng(e);
        }
    })
};

function priceFormation () {
    let price = 0;
    [...catalogIngredients].forEach((ingr)=>{
        if (ingr.checked) {
            price += ingr.price
        }
    });
    sum.textContent = `${price.toFixed(2)} руб.`;
}

function colorCheck () {
    [...ingredients].forEach((ing)=> {
        ing.checked ? ing.parentElement.style.color = 'red' : ing.parentElement.style.color = 'black';
    })
}

function colorDis () {
    [...ingredients].forEach((ing)=> {
        if (ing.disabled) {
            ing.parentElement.style.color = '#A9A9A9';
        }
    })
}

function imgPizza () {
    let counter = 0;
    
    if (formationChecklist.basis.length > 0) {
       counter += 1;
    } 
    if (formationChecklist.sauce.length > 0) {
        counter += 1;
    } 
    if (formationChecklist.meat.length > 0) {
        counter += 1;
    } 
    if (formationChecklist.veggies.length > 0) {
        counter += 1;
    }

    if (formationChecklist.basis.length < 0) {
        counter -= 1;
    } 
    if (formationChecklist.sauce.length < 0) {
        counter -= 1;
    } 
    if (formationChecklist.meat.length < 0) {
        counter -= 1;
    } 
    if (formationChecklist.veggies.length < 0) {
        counter -= 1;
    }
    
    const img = document.getElementById('img');
    img.src = `./imgs/${counter}.png`;

    counter === 4 ? btn.addEventListener('click', creatingOrderWindow) : btn.removeEventListener('click', creatingOrderWindow);
    
    orderButton(counter);
}

function orderButton (counter) {
    if(counter < 4) {
        btn.classList.add('inactive');
        btn.classList.remove('btnactive');
        btn.classList.remove('btnactive:hover');
        btn.classList.remove('btnactive:active');
    } else {
        btn.classList.remove('inactive');
        btn.classList.add('btnactive');
        btn.classList.add('btnactive:active');
        btn.classList.add('btnactive:hover');
    }
}

function creatingOrderWindow () {
    console.log(formationChecklist);
    const body = document.getElementById('body');

    const divOrderWindow = document.createElement('div');
    divOrderWindow.id = 'order-window';
    divOrderWindow.classList = 'order-window';
    body.append(divOrderWindow);

    const divOrder = document.createElement('div');
    divOrder.id = 'order';
    divOrderWindow.append(divOrder);

    const divTextOrder = document.createElement('div');
    divTextOrder.id = 'text-order';
    divOrder.append(divTextOrder);

    const span = document.createElement('span');
    span.textContent = 'Ваш заказ сформирован!';
    divTextOrder.append(span);
}

