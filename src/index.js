import _ from "lodash";
import "./scss/style.scss";

//btns
const numBtns = document.querySelectorAll("[data-numBtn]");
const actBtns = document.querySelectorAll("[data-actionBtn]");
const calculateBtn = document.querySelector("[data-calculate]");
const storeBtn = document.querySelector("[data-store]");
const resetBtn = document.querySelector("[data-clear]");
const memoryBtn = document.querySelector("[data-memory]");
//inteface
const display = document.getElementById("display");
const memory = document.querySelector(".memoryview");

//state
const state = {
  number: 0,
  action: "",
  memory: "",
  storedMemory: 0,
};

function init() {
  for (let btn of numBtns) {
    btn.addEventListener("click", (evt) => {
      setNumBtns(evt.target.value);
    });
  }
  for (let btn of actBtns) {
    btn.addEventListener("click", (evt) => {
      setActBtns(evt.target.value);
    });
  }
  calculateBtn.addEventListener("click", calculate);
  storeBtn.addEventListener("click", () => {
    memoryStore(true);
  });
  resetBtn.addEventListener("click", () => {
    memoryStore(false);
  });
  memoryBtn.addEventListener("click", (evt) => {
    setNumBtns(evt.target.value);
  });
}

const setNumBtns = (value) => {
  let currentNum = state.number;
  let newNumber = parseInt(_.join([currentNum, value], ""));
  display.innerHTML = newNumber;
  state.number = newNumber;
  updateState();
};

const setActBtns = (action) => {
  let newMemory = _.join([state.memory, state.number, action], "");
  state.memory = newMemory;
  state.number = 0;
  updateState();
};

const calculate = () => {
  state.memory = _.join([state.memory, state.number], "");
  display.innerHTML = eval(state.memory);
  stateReset();
};

const memoryStore = (store) => {
  if (store) {
    state.storedMemory = display.innerText;
    memoryBtn.value = state.storedMemory;
  } else {
    state.storedMemory = "";
    memoryBtn.value = "";
  }
  display.innerHTML = 0;
  stateReset();
};

const stateReset = () => {
  state.number = 0;
  state.action = state.memory = "";
  updateState();
};

const updateState = () => {
  memory.innerHTML = _.join(
    [
      "Number:",
      state.number,
      "<br/>",
      "action:",
      state.action,
      "<br/>",
      "memory:",
      state.memory,
      "<br/>",
      "storedMemory:",
      state.storedMemory,
    ],
    " "
  );
};

//eventlisteners

window.addEventListener("load", init);
