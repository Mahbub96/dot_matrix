const display = document.querySelector('.display_panel');
const code = document.querySelector('.code');
const btn = document.querySelector('.btn');
let generateCode = "A SEGMENNT PERA PUBLIC 'CODE' \n ASSUME CS:A \n ORG 1000H \n MOV AL,00H \n OUT 1CH,AL \n MOV AL,0FFH \n OUT 18H,AL \n OUT 1AH,AL \nS : \n "

const preload = () =>{
    let col = []
    let values = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          
            col.push(`<input type="button" onclick='click1(${i},${j})' id='btn${i},${j}' class='btn btn-outline-primary p-3 m-1 rounded-circle' value=${i},${j} />`);
        }
        col.push('<br/>')
        values.push(col);
        col = []
    }
    
    display.innerHTML = values;
    

}


function toggleClass(i,j){
    
    let element = document.getElementById(`btn${i},${j}`);
    element.classList.toggle("active");
    return element.classList.contains('active');  
}


function click1(i,j){
    if(toggleClass(i,j)){

        generateCode += `;------------------FOR LED ${i},${j}\n`;
    
        generateCode += `MOV AL,\n`
        
    }

    code.innerText = generateCode
}


preload()

