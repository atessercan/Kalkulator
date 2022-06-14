class Kalkulator {
  constructor() {
    this.operationString = "";
    this.dotUsed = false;
    this.default = "0";
    this.currentFontSize = 3;
    this.previousFontSize;
    this.listenClk();
    this.displayOperationString(this.default);

    this.fitToScreen();
  }

  buttons = {
    ansBtn: document.querySelector("#ans"),
    clearBtn: document.querySelector("#clear"),
    delBtn: document.querySelector("#del"),
    modBtn: document.querySelector("#mod"),
    addBtn: document.querySelector("#add"),
    minusBtn: document.querySelector("#minus"),
    multiplyBtn: document.querySelector("#multiply"),
    divideBtn: document.querySelector("#divide"),
    dotBtn: document.querySelector("#dot"),
    equalBtn: document.querySelector("#equal"),
    numericBtns: document.querySelectorAll(".nums"),
  };

  listenClk() {
    for (const btn in this.buttons) {
      if (btn != "numericBtns") {
        this.buttons[btn].addEventListener("click", () => {
          this.createOperationString(this.buttons[btn]);
          this.fitToScreen();
        });
      } else if (btn == "numericBtns") {
        this.buttons.numericBtns.forEach((Element) => {
          Element.addEventListener("click", () => {
            this.createOperationString(Element);
            this.fitToScreen();
          });
        });
      }
    }
  }

  createOperationString(param) {
    let strLngt = this.operationString.length;
    if (param.classList.contains("nums")) {
      if (
        this.operationString[0] == 0 &&
        this.operationString[1] != "." &&
        this.operationString[1] != "+" &&
        this.operationString[1] != "-" &&
        this.operationString[1] != "*" &&
        this.operationString[1] != "/" &&
        this.operationString[1] != "%"
      ) {
        this.operationString = this.operationString.slice(1);
      }

      this.operationString += param.innerText;
      this.displayOperationString(this.operationString);
    } else if (param.classList.contains("operators")) {
      if (
        strLngt != 0 &&
        this.operationString[strLngt - 1] != "-" &&
        this.operationString[strLngt - 1] != "+" &&
        this.operationString[strLngt - 1] != "/" &&
        this.operationString[strLngt - 1] != "*" &&
        this.operationString[strLngt - 1] != "%"
      ) {
        this.operationString += param.innerText;
        this.displayOperationString(this.operationString);
        this.dotUsed = false;
      }
    } else if (param.id == "equal") {
      this.fitToScreen("equal");
      let result = eval(this.operationString);
      if (this.isFloat(result)) {
        this.dotUsed = true;
      } else if (Number.isInteger(result)) {
        this.dotUsed = false;
      } 
      this.displayOperationString(result);
      document.querySelector(".previous").innerText = this.operationString;
      this.operationString = JSON.stringify(result);
    } else if (param.id == "clear") {
      this.fitToScreen("clear");
      this.dotUsed = false;
      this.displayOperationString("clear");
    } else if (param.id == "del") {
      strLngt = this.operationString.length;
      if (strLngt > 0) {
        this.operationString = this.operationString.slice(0, -1);
        this.displayOperationString(this.operationString);
      }
    } else if (param.id == "dot") {
      if (this.dotUsed == false ) {
        this.operationString += param.innerText;
        this.displayOperationString(this.operationString);
        this.dotUsed = true;
      } else if (this.dotUsed == true){
      }
    } else if (param.id == "ans") {
      if (
        this.operationString == "0" ||
        this.operationString == "" ||
        this.operationString[strLngt - 1] == "+" ||
        this.operationString[strLngt - 1] == "-" ||
        this.operationString[strLngt - 1] == "*" ||
        this.operationString[strLngt - 1] == "/" ||
        this.operationString[strLngt - 1] == "%"
      ) {
        if (this.operationString[0] == "0") {
          this.operationString = this.operationString.slice(1);
          document.querySelector(".previous").innerText += this.operationString;
        }
        this.operationString += document.querySelector(".previous").innerText;
        this.displayOperationString(this.operationString);
      }
    }
    
  }


  displayOperationString(param) {
    if (param == "clear") {
      document.querySelector(".previous").innerText = "";
      document.querySelector(".current").innerText = "0";
      this.operationString = "";
    } else if (this.operationString.length == 0) {
      document.querySelector(".current").innerText = "0";
    } else if (param === "equal") {
      this.operationString = "";
      document.querySelector(".current").innerText =this.operationString;
      this.operationString = "";
    } else {
      document.querySelector(".current").innerText = param;
    }
  }

  fitToScreen(param) {
    let previousDisplay;
    let currentDisplay;
    let clientWidthCurrent;
    let scrollWidthCurrent;
    const refresh = () => {
      // this refreshes querySelectors
      previousDisplay = document.querySelector(".previous");
      currentDisplay = document.querySelector(".current");
      clientWidthCurrent = currentDisplay.clientWidth;
      scrollWidthCurrent = currentDisplay.scrollWidth;
    };
    refresh();
    if (param === "equal") {
      this.previousFontSize = this.currentFontSize;
      previousDisplay.style.fontSize = this.previousFontSize + "rem";
      this.currentFontSize = 3;
      currentDisplay.style.fontSize = this.currentFontSize + "rem";
    } else if (param === "clear") {
      refresh();
      this.currentFontSize = 3;
      currentDisplay.style.fontSize = this.currentFontSize + "rem";
    } else {
      while (scrollWidthCurrent > clientWidthCurrent) {
        refresh();
        this.currentFontSize = this.currentFontSize - this.currentFontSize / 30;
        currentDisplay.style.fontSize = this.currentFontSize + "rem";
      }
    }
  }
  isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }
}

new Kalkulator();
