

/*import {list,divList,speed,inProgress} from './UI.js';

let inProgress = inProgress;*/


//select the type of algorithm:

const algorithmList = document.getElementById('algorithms-list');

algorithmList.addEventListener('click',specifyAlgorithmType)


function specifyAlgorithmType(e){
    console.log(inProgress);
    if(inProgress) return;
    
    inProgress = true;

    let algorithm = e.target.id;
    
    //make all other disabled and this one active
    e.target.classList.add('active');
    document.querySelectorAll('.nav #algorithms-list li').forEach(btn=>{
        if(btn.id!==e.target.id){
            btn.classList.add('disabled');
        }
    })

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
            mergeSort(list, divList);
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







function bubbleSort(list,divList){
    console.log('start');
    let listToAnimate = [];

    let isSorted = false;
    let counter = 0 ;
    
    while(!isSorted){
        isSorted = true;
    
        for(let j=0;j<list.length-counter-1;j++){
           console.log('for-loop start')
            listToAnimate.push([divList[j],divList[j+1],'visiting']);

                if(list[j]>list[j+1]){
                    
                    swap(list,j,j+1);
                    
                    listToAnimate.push([divList[j],divList[j+1],'wrong-position'])
                    
                    listToAnimate.push([divList[j],divList[j+1],'correct-order']);

                    listToAnimate.push([divList[j+1],divList[j],'correct-position']);
                    
                    
                    listToAnimate.push([divList[j+1],divList[j],'clearClasses']);
                    
                    swap(divList,j,j+1);

                    isSorted = false;

                }else{
                   
                    listToAnimate.push([divList[j+1],divList[j],'correct-position']);
                    listToAnimate.push([divList[j+1],divList[j],'clearClasses']);
                }
                
                if(j+1==list.length-counter){
                    listToAnimate.push([divList[j+1],null,'correct-position']);
                }
            
        }

        listToAnimate.push([divList[divList.length-1-counter],null,'correct-position']);
        counter++;
    }


    while(counter<list.length){
        listToAnimate.push([divList[list.length-1-counter],null,'correct-position']);
        counter++;
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

const mergeSort = (list,divList) =>{
    console.log('merge start');
    let barsToAnimate = [];
    let tempList = list.map(num=>null);
    let tempDivList = list.map(num=>null);

    mergeHelper(list,tempList,0,list.length-1,divList,tempDivList,barsToAnimate)
    console.log(divList);
    console.log(tempDivList);
    console.log(list);
    animateBars(barsToAnimate,speed);
}


const mergeHelper = (list,tempList,leftStart,rightEnd,divList,tempDivList,barsToAnimate) =>{
    
    if(leftStart >= rightEnd) return;

    let middle = Math.floor((leftStart+rightEnd)/2);

    mergeHelper(list,tempList,leftStart, middle,divList,tempDivList, barsToAnimate);
    mergeHelper(list, tempList,middle+1,rightEnd,divList,tempDivList, barsToAnimate);

    mergeHalves(list,tempList,leftStart,rightEnd,divList,tempDivList, barsToAnimate);

}

const mergeHalves = (list,tempList,leftStart,rightEnd,divList,tempDivList, barsToAnimate)=>{

    let leftEnd = Math.floor((leftStart+rightEnd)/2);
    let rightStart = leftEnd+1;

    let left = leftStart;
    let right = rightStart;
    let tempIdx = leftStart;

    while(left<=leftEnd && right<=rightEnd){

        if(list[left]<=list[right]){
            
            tempList[tempIdx] = list[left];
            tempDivList[tempIdx] = divList[left];

            //barsToAnimate.push([divList[tempIdx],divList[left],'correct-order'])

            left++;

        }else{
            
            tempList[tempIdx] = list[right];
            tempDivList[tempIdx] = divList[right];

            //barsToAnimate.push([divList[tempIdx],divList[right],'correct-order'])


            right++;
        }
        tempIdx++;
    }

    while(left<=leftEnd){
        tempList[tempIdx] = list[left];
        tempDivList[tempIdx] = divList[left];
        left++;
        tempIdx++;
    }

    while(right<=rightEnd){
       
        tempList[tempIdx] = list[right];
        tempDivList[tempIdx] = divList[right];
        right++;
        tempIdx++;
    }

    for(let i=leftStart;i<=rightEnd;i++){
        list[i] = tempList[i];
        barsToAnimate.push([tempDivList[i],i,'merge-order']);
        divList[i] = tempDivList[i];
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
                case 'merge-order':
                    //cell2 here is actually index
                    cell1.style.order = cell2+1;
                default:
                    break;
            }

        },i*speed)
    }

    setTimeout(()=>{
        inProgress = false;
    //make btn back to normal
    document.querySelectorAll('.nav #algorithms-list li').forEach(btn=>{
        btn.classList = [];
    })
    },bars.length*speed)
}
