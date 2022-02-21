const inputText = document.querySelector('.inputText');
const addBtn = document.querySelector('.addBtn');
const allList = document.querySelector('.allList');
const toDo = document.querySelector('.toDo');
const finish = document.querySelector('.finish');
const toDoItem = document.querySelector('.toDo-item');
const clearItem = document.querySelector('.clear-item');
const listItem = document.querySelector('.list-item');
const closeBtn = document.querySelector('.close-btn');
const work = document.querySelector('.work');


let data = [];

addBtn.addEventListener('click', addTodo);

// 初始資料
function render(){
  let str = '';
  data.forEach((item, index) => {
    str += `<li class="work">
            <span class="material-icons check-box">
              check_box_outline_blank
            </span>
            <p class="list-txt">${item.value}</p>
              <span class="material-icons close-btn" data-num="${index}">
                close
              </span>
        </li>`
  });
  listItem.innerHTML = str;
}

// 新增資料
function addTodo(){
  if (inputText.value.trim() === ""){
    alert('請輸入正確資料');
    return;
  };
  let obj = {};
  obj.value = inputText.value;
  data.push(obj);
  inputText.value = '';
  render();
}

// listItem.addEventListener('click', e => {
//   let num = e.target.dataset.num;
//   console.log(num);
//   if (e.target.getAttribute("class") == "check-box") {
//     console.log(123);
//   }
//   console.log(data);
//   render();
// })


