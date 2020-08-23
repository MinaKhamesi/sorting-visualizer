
/*----------------------------------------------------------
#1      generate list of numbers based on the size of list 
-----------------------------------------------------------*/

let listSize = 10;
let speed = 0.1;
let list = []
let divList = [];
let inProgress =false;

const ListSizeInput = document.getElementById('listSizeRange');

ListSizeInput.addEventListener('change',generateNumbersAndCreateDivs);

function generateNumbersAndCreateDivs(e){

    clearContainer()

    if(inProgress) inProgress = false;

    let listSize = e.target.value;

    if (listSize>150 && window.innerWidth<700){
        listSize = 150;
        e.target.value = 150;
    }


    list = createNumbers(listSize);
    divList = createDivs(list,listSize);

    //speed = ((500-0.1)/(10-200)*(listSize-200)) + 0.1;
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
function createDivs(list){
    let listSize = list.length;

    const divList = list.map((number,idx)=>createDiv(number,idx,listSize));

    return divList
}



const listContainer = document.querySelector('.list-container');



function createDiv(number,idx,listSize){
    const width = 10 ;

    const height = number/listSize*100;

    const div = document.createElement('div');

    div.className = 'number';

    if (listSize<50 && window.innerWidth>700){
        div.appendChild(document.createTextNode(`${number}`))
    }
    

    div.style.width = `${width}%`;
    div.style.height = `${height}%`;
    div.style.order = idx+1;

    listContainer.appendChild(div);


    return div;
}




function clearContainer(){
    listContainer.innerHTML = ''
}



//start page with 10 numbers.aka divs

list = createNumbers(10);
divList = createDivs(list);






//select the type of algorithm:

const algorithmList = document.getElementById('algorithms-list');

algorithmList.addEventListener('click',specifyAlgorithmType)


function specifyAlgorithmType(e){
    if(inProgress) return;
    
    inProgress = true;

    let algorithm = e.target.className;

    visualizeAlgorithm(algorithm);
}


function visualizeAlgorithm(algorithm){
    switch(algorithm){
        case 'bubble':
            console.log('bubble is gonna run')
            bubbleSort(list,divList);
            break;
        case "insertion":
            insertionSort(list, divList);
            break;
        case "selection":
            selectionSort(list, divList);
            break;
        case 'merge':
            console.log('merge is gonna run')
            break;
        case 'quick':
            console.log('quick is gonna run')
            break;
        case 'heap':
            heapSort(list,divList);
            break;
        default:
            return;
    }
}
/*------------------------------------------------------

                  ALGORITHMS

-----------------------------------------------------*/

function bubbleSort(list,divList){
    console.log('start');
    let listToAnimate = [];
    
    for(let i=0;i<list.length;i++){
        for(let j=0;j<list.length-i-1;j++){
           console.log('for-loop start')
            listToAnimate.push([divList[j],divList[j+1],'visiting']);

                if(list[j]>list[j+1]){
                    
                    swap(list,j,j+1);
                    
                    listToAnimate.push([divList[j],divList[j+1],'wrong-position'])
                    
                    listToAnimate.push([divList[j],divList[j+1],'correct-order']);

                    listToAnimate.push([divList[j+1],divList[j],'correct-position']);
                    
                    
                    listToAnimate.push([divList[j+1],divList[j],'clearClasses']);
                    
                    swap(divList,j,j+1);

                }else{
                   
                    listToAnimate.push([divList[j+1],divList[j],'correct-position']);
                    listToAnimate.push([divList[j+1],divList[j],'clearClasses']);
                }
            
        }
        listToAnimate.push([divList[divList.length-1-i],divList[divList.length-1-i],'correct-position']);
    }
    animateBars(listToAnimate,speed);
    console.log('algorithm is done');
}


const insertionSort = (list, divList) =>{

    let barsToAnimate = [];

    for(let i=1; i<list.length;i++){

        let current = list[i];

        barsToAnimate.push([divList[i],null,'visiting']);

        for(let j=i-1;j>=0;j--){

            barsToAnimate.push([divList[j],null,'visiting']);

            if(list[j+1]<list[j]){
                swap(list,j,j+1);

                //barsToAnimate.push([divList[j],null,'wrong-position']);
                barsToAnimate.push([divList[j],divList[j+1],'correct-order']);
                barsToAnimate.push([divList[j],null,'correct-position']);
                //barsToAnimate.push([divList[j],null,'clearClasses']);

                swap(divList,j,j+1);
            }else{
                barsToAnimate.push([divList[j],divList[j+1],'correct-position']);
                break;
            }
        }
        //barsToAnimate.push([divList[i],null,'clearClasses']);
    }

    animateBars(barsToAnimate,speed);
}




const selectionSort = (list,divList) =>{

    console.log('selectionSort start.');

    let barsToAnimate = []

    let currentIdx = 0;

    while (currentIdx<list.length - 1){

        let smallestIdx = currentIdx;

        barsToAnimate.push([divList[currentIdx],null,'correct-position']);

        for(let i=currentIdx+1; i<list.length; i++){

        barsToAnimate.push([divList[i],null,'visiting']);

            
            if(list[smallestIdx]>list[i]){

                barsToAnimate.push([divList[i],null,'correct-position']);

                barsToAnimate.push([divList[smallestIdx],null,'clearClasses']);

                smallestIdx = i;

            }else{
                barsToAnimate.push([divList[i],null,'clearClasses']);
            }

        }

        swap(list,currentIdx,smallestIdx);

        barsToAnimate.push([divList[currentIdx],divList[smallestIdx],'wrong-position']);
        
        barsToAnimate.push([divList[currentIdx],divList[smallestIdx],'correct-order']);

       
        barsToAnimate.push([divList[currentIdx],null,'clearClasses']);
        barsToAnimate.push([divList[smallestIdx],null,'correct-position']);

        swap(divList,currentIdx,smallestIdx);
        
        
        currentIdx++;

    }
    barsToAnimate.push([divList[currentIdx],null,'correct-position']);
    console.log('selectionSort finish.');

    animateBars(barsToAnimate,speed);
}



const heapSort = (list,divList)=>{
    console.log('heap sort start');
}
/*-------------------------------------
                helper functions
----------------------------------------*/
function swap(list,j,k){
    const temp = list[j];
    list[j] = list[k];
    list[k] = temp;
}



const animateBars = (bars,speed)=>{
    for(let i=0;i<bars.length;i++){
        const [cell1,cell2,task] = bars[i];
        setTimeout(()=>{
            switch(task){
                case 'visiting':
                    cell1.classList.add('visiting');
                    cell2 && cell2.classList.add('visiting');
                    return;
                case 'wrong-position':
                    cell1.classList.add('wrong-position');
                    cell2 && cell2.classList.add('wrong-position');
                    return;
                case 'correct-position':
                    cell1.classList.add('correct-position');
                    cell2 && cell2.classList.add('correct-position');
                    return;
                case 'clearClasses':
                    if(cell1.classList.contains('visiting')){
                        cell1.classList.remove('visiting');
                        cell2 && cell2.classList.remove('visiting');
                    }
                    if(cell1.classList.contains('wrong-position')){
                        cell1.classList.remove('wrong-position');
                        cell2 && cell2.classList.remove('wrong-position');
                    }
                    if(cell1.classList.contains('correct-position')){
                        cell1.classList.remove('correct-position');
                        cell2 && cell2.classList.remove('correct-position');
                    }
                    return;
                case 'correct-order':
                    let order1 = cell1.style.order;
                    let order2 = cell2.style.order;
                    cell1.style.order = order2;
                    cell2.style.order = order1;
                    break;
                default:
                    break;
            }

        },i*speed)
    }
}