
/*----------------------------------------------------------
#1      generate list of numbers based on the size of list 
-----------------------------------------------------------*/

let listSize = 10;
let speed = 3;
let list = []
let divList = [];
let inProgress =false;

//#1 range input:
const ListSizeInput = document.getElementById('listSizeRange');

ListSizeInput.addEventListener('change',generateNumbersAndCreateDivs);

function generateNumbersAndCreateDivs(e){

    clearContainer()

    if(inProgress) inProgress = false;

    listSize = e.target.value;

    if (listSize>150 && window.innerWidth<700){
        listSize = 150;
        e.target.value = 150;
    }


    list = createNumbers(listSize);
    divList = createDivs(list,listSize);

    //speed = ((500-0.1)/(10-200)*(listSize-200)) + 0.1;
}

//#2 generate new set button:

const generateBtn = document.getElementById('generateBtn');

    generateBtn.addEventListener('click',()=>{

    clearContainer()

    if(inProgress) inProgress = false;

    list = createNumbers(listSize);
    divList = createDivs(list,listSize);
})




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
            quickSort(list,divList);
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

    let barsToAnimate = [];

    buildMaxHeap(list,divList, barsToAnimate);

    for(let endIdx=list.length-1;endIdx>0;endIdx--){
        swap(list,0,endIdx);

        barsToAnimate.push([divList[0],null,'correct-position']);
        barsToAnimate.push([divList[endIdx],null,'wrong-position']);
        barsToAnimate.push([divList[0], divList[endIdx],'correct-order']);
        barsToAnimate.push([divList[endIdx],null,'clearClasses']);

        swap(divList,0, endIdx);
        
        siftDown(0,endIdx-1,list,divList, barsToAnimate);
    }

    barsToAnimate.push([divList[0],null,'correct-position']);

    animateBars(barsToAnimate, speed);
}

//     Heap Functions
const buildMaxHeap = (list, divList, barsToAnimate) =>{

    let firstParentIdx = Math.floor((list.length - 1)/2);
    
    

    for(let currentIdx=firstParentIdx;currentIdx>=0;currentIdx--){
        
        siftDown(currentIdx, list.length-1, list,divList,barsToAnimate);

    }

}


const siftDown = (currentIdx, endIdx, heap, divList, barsToAnimate) =>{
    let childOneIdx = currentIdx*2 + 1;

    while(childOneIdx<=endIdx){

        barsToAnimate.push([divList[currentIdx],null,'visiting']);

        let childTwoIdx = currentIdx*2+2;



        if(childTwoIdx<=endIdx){
            barsToAnimate.push([divList[childOneIdx],divList[childTwoIdx],'wrong-position']);
        }else{
            barsToAnimate.push([divList[childOneIdx],null,'wrong-position']);
        }




        let idxToSwap;

        if(childTwoIdx<=endIdx && heap[childTwoIdx]>heap[childOneIdx]){
            idxToSwap = childTwoIdx;
        }else{
            idxToSwap = childOneIdx;
        }



        if (heap[idxToSwap]>heap[currentIdx]){


            swap( heap,currentIdx, idxToSwap);

            barsToAnimate.push([divList[currentIdx],divList[idxToSwap],'correct-order']);
            
            barsToAnimate.push([divList[idxToSwap],null,'correct-position']);

            barsToAnimate.push([divList[currentIdx],null,'clearClasses']);

            if(childTwoIdx<=endIdx){
                barsToAnimate.push([divList[childOneIdx],divList[childTwoIdx],'clearClasses']);
            }else{
                barsToAnimate.push([divList[childOneIdx],null,'clearClasses']);
            }

            barsToAnimate.push([divList[idxToSwap],null,'clearClasses']);

           


            swap(divList, currentIdx, idxToSwap);

            currentIdx = idxToSwap;

            childOneIdx = currentIdx*2 + 1;

            

        }else{
            
            if(childTwoIdx<=endIdx){
                barsToAnimate.push([divList[childOneIdx],divList[childTwoIdx],'correct-position']);
            }else{
                barsToAnimate.push([divList[childOneIdx],null,'correct-position']);
            }

            //barsToAnimate.push([divList[currentIdx],null,'correct-position']);

            if(childTwoIdx<=endIdx){
                barsToAnimate.push([divList[childOneIdx],divList[childTwoIdx],'clearClasses']);
            }else{
                barsToAnimate.push([divList[childOneIdx],null,'clearClasses']);
            }

            barsToAnimate.push([divList[currentIdx],null,'clearClasses']);

            return
        }
    }
}



const quickSort = (list,divList)=>{
    console.log('quick sort start');
    let barsToAnimate=[];

    quickSortHelper(0,list.length-1,list,divList,barsToAnimate);

    animateBars(barsToAnimate,speed);

    console.log('quick sort finish');
}

const quickSortHelper = (startIdx,endIdx,list,divList,barsToAnimate)=>{

    if(endIdx<=startIdx){
        if(startIdx==endIdx){
            barsToAnimate.push([divList[startIdx],null,'correct-position']);
        }
        return;
    } 

    let lessThanPointer = startIdx;
    let pivotIdx = endIdx;

    barsToAnimate.push([divList[pivotIdx],divList[lessThanPointer],'visiting']);

    for(let i=startIdx;i<endIdx;i++){
        

        if(list[i]<list[pivotIdx]){

            swap(list,i,lessThanPointer);

            barsToAnimate.push([divList[i],null,'correct-position']);
            barsToAnimate.push([divList[i],divList[lessThanPointer],'correct-order']);
            barsToAnimate.push([divList[lessThanPointer],divList[i],'clearClasses']);

            swap(divList,i,lessThanPointer);

            lessThanPointer++;

        }else{

        barsToAnimate.push([divList[i],null,'wrong-position']);
        barsToAnimate.push([divList[i],null,'clearClasses']);

        }
    }

    swap(list,pivotIdx,lessThanPointer);

    barsToAnimate.push([divList[pivotIdx],divList[lessThanPointer],'correct-order']);

    barsToAnimate.push([divList[pivotIdx],null,'clearClasses']);
    barsToAnimate.push([divList[pivotIdx],null,'correct-position']);


    
    swap(divList,pivotIdx,lessThanPointer);

    let leftSubarrayIsSmaller = (lessThanPointer - startIdx) < (endIdx - lessThanPointer)

    if(leftSubarrayIsSmaller){
        quickSortHelper(startIdx,lessThanPointer-1,list,divList,barsToAnimate);
        quickSortHelper(lessThanPointer+1,endIdx,list,divList,barsToAnimate);
    }else{
        quickSortHelper(lessThanPointer+1,endIdx,list,divList,barsToAnimate);
        quickSortHelper(startIdx,lessThanPointer-1,list,divList,barsToAnimate);
    }

    
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

                    if(cell1.classList.contains('visiting') || (cell2 && cell2.classList.contains('visiting'))){
                        cell1.classList.remove('visiting');
                        cell2 && cell2.classList.remove('visiting');
                    }

                    if(cell1.classList.contains('wrong-position') || (cell2 && cell2.classList.contains('wrong-position'))){
                        cell1.classList.remove('wrong-position');
                        cell2 && cell2.classList.remove('wrong-position');
                    }

                    if(cell1.classList.contains('correct-position') || (cell2 && cell2.classList.contains('correct-position'))){
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

    setTimeout(()=>{
        inProgress = false;
    },bars.length*speed)
}