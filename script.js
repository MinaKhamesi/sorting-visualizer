
//#1generate list of numbers based on the size of list 
let listSize;
let list = []
let divList = []
const ListSizeInput = document.getElementById('listSizeRange');
ListSizeInput.addEventListener('change',generateNumbersAndCreateDivs);

function generateNumbersAndCreateDivs(e){
    clearContainer()
    let listSize = e.target.value;
    list = createNumbers(listSize)
    divList = createDivs(list,listSize)
}
function createNumbers(listSize){
    const list = [];
    while (list.length<listSize){
        const number = Math.floor(Math.random()*listSize) +1;
        list.push(number);
    }
    return list
}
//#populate the div of list container by bunch of divs with auto width and height of their value;
function createDivs(list,listSize){
    const divList = list.map((number,idx)=>createDiv(number,idx,listSize));
    return divList
}
const listContainer = document.querySelector('.list-container');
function createDiv(number,idx,listSize){
    const width = 10;
    const height = number/listSize*100;
    const div = document.createElement('div');
    div.className = 'number';
    if (listSize<50){
        div.appendChild(document.createTextNode(`${number}`))
    }
    div.style.width = `${width}%`;
    div.style.height = `${height}%`;
    div.style.order = idx;
    listContainer.appendChild(div);
    return div;
}

function clearContainer(){
    listContainer.innerHTML = ''
}

//start page with 10 numbers.aka divs
list = createNumbers(10);
divList = createDivs(list,10);


//select the type of algorithm:
const algorithmList = document.getElementById('algorithms-list');
algorithmList.addEventListener('click',specifyAlgorithmType)

let algorithm;
function specifyAlgorithmType(e){
    algorithm = e.target.className;
    console.log(algorithm);
}

//main part visualize algorithm
const visualizBtn = document.querySelector('.nav li.btn');

visualizBtn.addEventListener('click',visualizeAlgorithm);

function visualizeAlgorithm(){
    switch(algorithm){
        case 'bubble':
            console.log('bubble is gonna run')
            bubbleSort(list,divList);
            break;
        case 'merge':
            console.log('merge is gonna run')
            break;
        case 'quick':
            console.log('quick is gonna run')
            break;
        case 'heap':
            console.log('heap is gonna run')
            break;
    }
}


//algorithms: bubble
function bubbleSort(list,divList){
    for(i=0;i<list.length;i++){
        for(j=0;j<list.length-1-i;j++){
            console.log(divList[j])
            setTimeout(()=>{
                //animateCurrentIdxs(divList,j,j+1,'visiting')
                if(list[j]>list[j+1]){
                    swap(list,j,j+1)
                    swapOrder(divList,j,j+1);
                }
            },j*100)
        }
    }
}



//helper functions::
function swap(list,j,K){
    const temp = list[j];
    list[j] = list[K];
    list[k] = temp;
}

function swapOrder(divList,j,k){
    divList[j].style.order = k;
    divList[k].style.order = j;
}

function animateCurrentIdxs(divList,j,k,className){
    console.log(divList[j])
    divList[j].classList.add(className);
    divList[k].classList.add(className);
}