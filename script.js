const display = document.querySelector(".display_panel");
const code = document.querySelector(".code");
const btn = document.querySelector(".btn");

let generateCode =
  "A SEGMENT PARA PUBLIC 'CODE'\n ASSUME CS A \n ORG 1000H \n S:\n MOV AL,80H\n OUT 1EH,AL ;CR \n B:\n MOV AL,00H\n OUT 1CH,AL ;PORT C\n \n MOV AL,0FFH \n OUT 18H,AL ;PORT A \n OUT 1BH,AL ;PORT B\n\n ";

const generateCodeForRow = (val) => {
  let v = `;---------\nMOV AL,${val.a}H \nOUT 18H,AL ; PORT A OFF   \n\n MOV AL,${val.b}H ; RED LIGHT\nOUT 1AH,AL ;PORT B \n\nMOV AL,${val.c}H\nOUT 1CH,AL ;PORT C\n MOV AL,00H\nOUT 1CH,AL ;PORT C TURN OFF \n`;
  return v;
};
let clickedBtns = [
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
];

const preload = () => {
  let col = [];
  let values = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      col.push(
        `<input type="button" onclick='click1(${i},${j})' id='btn${i},${j}' class='btn btn-outline-primary p-3 m-1 rounded-circle' value=${i},${j} />`
      );
    }
    col.push("<br/>");
    values.push(col.join(""));
    col = [];
  }

  display.innerHTML = values.join("");
};

function click1(i, j) {
  let element = document.getElementById(`btn${i},${j}`);

  element.classList.toggle("active");

  if (element.classList.contains("active")) {
    clickedBtns[i][j] = 1;
  } else clickedBtns[i][j] = 0;

  return clickedBtns[i][j];
}

const valGen = (tempB, tempC) => {
  let fromBase = 2;
  let toBase = 16;
  let b = "0";
  let a = "0FF";
  b += parseInt(tempB.join("").toString(), fromBase)
    .toString(toBase)
    .padStart(2, "0")
    .toUpperCase();
  let c = parseInt(tempC.reverse().join("").toString(), fromBase)
    .toString(toBase)
    .padStart(2, "0")
    .toUpperCase();

  console.log(a, b, c);
  return { a, b, c };
};

const generate = () => {
  let found = false;

  /*check which buttons are clicked */
  for (let i = 0; i < 8; i++) {
    let found = false;
    let tempB = [1, 1, 1, 1, 1, 1, 1, 1];
    let tempC = [];
    for (let j = 0; j < 8; j++) {
      if (clickedBtns[i][j]) {
        tempC.push(1);
        tempB[i] = 0;
        found = true;
      } else {
        tempC.push(0);
      }
    }

    if (found) {
      let val = valGen(tempB, tempC);

      generateCode += generateCodeForRow(val);
    }
  }
  generateCode += `;----------\nJMP C\nA ENDS\nEND`;
  code.innerText = generateCode;
};

preload();
