

/*----------------------------------------------------------
#1      generate list of numbers based on the size of list 
-----------------------------------------------------------*/

let listSize = 100;
let speed = 4;
let list = []
let divList = [];
let inProgress =false;

/*------------------------------------------------
  Changing list size and building divs accordingly
-------------------------------------------------*/
const ListSizeInput = document.getElementById('listSizeRange');

ListSizeInput.addEventListener('input',generateNumbersAndCreateDivs);

function generateNumbersAndCreateDivs(e){

    clearContainer()

    if(inProgress){
        inProgress = false;
        //make all btns back to normal
        document.querySelectorAll('.nav #algorithms-list li').forEach(btn=>{
        btn.classList = [];
    })
    } 

    listSize = e.target.value;

    if (listSize>150 && window.innerWidth<700){
        listSize = 150;
        e.target.value = 150;
    }


    list = createNumbers(listSize);
    divList = createDivs(list,listSize);

}
/**
 *      Specifying animation speed
 */


const speedRange = document.getElementById('speedRange');
speedRange.addEventListener('input',(e)=>{
    if(inProgress){
        e.target.value = speed;
        return;
    };
    speed = e.target.value;
})

/**
 *     Generate New Set Btn
 */

const generateBtn = document.getElementById('generateBtn');

    generateBtn.addEventListener('click',()=>{

    clearContainer()

    if(inProgress){
        //make btn back to normal
        document.querySelectorAll('.nav #algorithms-list li').forEach(btn=>{
        btn.classList = [];
    });
        inProgress = false;
    } 

    list = createNumbers(listSize);
    divList = createDivs(list,listSize);
})



/**
 * 
 *      Helper functions for creating the divs
 */

//#1 random numbers
function createNumbers(listSize){
    const list = [];

    while (list.length<listSize){

        const number = Math.floor(Math.random()*listSize) +1;

        list.push(number);
    }


    return list
}





//2#populate the div of list container by bunch of divs withheight of their value;
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



/** --------------------------------
 *   Start Page With 100 divs(default value for listSize Range)
 * --------------------------------
 */

list = createNumbers(100);
divList = createDivs(list);

