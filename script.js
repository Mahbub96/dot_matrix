const display = document.querySelector(".display_panel");
const code = document.querySelector(".code");
const btn = document.querySelector(".btn");

let generateCode =
  "A SEGMENT PERA PUBLIC 'CODE' \n ASSUME CS:A \n ORG 1000H \n MOV AL,00H \n OUT 1CH,AL \n MOV AL,0FFH \n OUT 18H,AL ;for red right \n OUT 1AH,AL ;for yellow light \nS : \n ";

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
    values.push(col);
    col = [];
  }

  display.innerHTML = values;
};

function click1(i, j) {
  let element = document.getElementById(`btn${i},${j}`);

  element.classList.toggle("active");
  clickedBtns[i][j] = element.classList.contains("active");

  return clickedBtns[i][j];
}

const valGen = (i, j) => {
  let tempB = "";
  let tempC = [];
  for (let k = 0; k < 8; k++) {
    if (clickedBtns[i][k] === true) {
      tempB += "0";
    } else tempB += "1";

    if (clickedBtns[k][j] === true) {
      tempC.push("1");
    } else tempC.push("0");
  }
  tempC = tempC.reverse().join("");
  console.log(tempC);

  let fromBase = 2;
  let toBase = 16;
  a = "0FF";
  b = parseInt(tempB, fromBase).toString(toBase).padStart(2, "0");
  c = parseInt(tempC, fromBase).toString(toBase).padStart(2, "0");
  return { a, b, c };
};

const generate = () => {
  /*check which buttons are clicked */
  for (let i = 0; i < clickedBtns.length; i++) {
    for (let j = 0; j < clickedBtns[i].length; j++) {
      if (clickedBtns[i][j]) {
        let temp = valGen(i, j);
        console.log(temp);
        generateCode += `;---------------FOR LED ${i}${j}`;

        generateCode += `MOV AL,0FFH ; VALUE FOR PORT  'A'`;
        generateCode += `OUT 18H,AL ; SEND VALUE TO PORT 'A'`;
      }
    }
  }
};

preload();
