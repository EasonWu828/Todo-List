const inputText = document.querySelector('.inputText');
const addBtn = document.querySelector('.addBtn');
const list = document.querySelector('.list');
const deleteBtn = document.querySelector('.deleteBtn');
const main = document.querySelector('.main');
const workNum = document.querySelector('.workNum');
const cardList = document.querySelector('.card-list');
const clearItem = document.querySelector('.clear-item');


let data = [];
// 切換狀態預設
let toggleStatus = 'all';

addBtn.addEventListener('click', addTodo);
// 鍵盤操作
inputText.addEventListener('keyup', e =>{
  if(e.key === 'Enter'){
    addTodo(e)
  }
});
// 監聽 Tab
main.addEventListener('click', changeTab);
// 刪除單一項目&確認 checked 狀態
list.addEventListener('click', deleteCheckStatus);
// 清除完成項目
clearItem.addEventListener('click', deleteDone);

// 清除完成項目
function deleteDone(e){
  e.preventDefault();
  data = data.filter((item) => item.checked === '')
  updateList();
}

// 切換狀態
function changeTab(e){
  toggleStatus = e.target.dataset.toggle;
  let tabs = document.querySelectorAll('.main li');
  tabs.forEach((item) => {
    item.classList.remove('active');
  })
  e.target.classList.add('active');
  updateList();
}


// tab 狀態更新資料
function updateList(){
  let showData = [];
  if (toggleStatus === 'all') {
    showData = data;
  } else if (toggleStatus === 'work') {
    showData = data.filter((item) => item.checked === '');
  } else {
    showData = data.filter((item) => item.checked === 'checked');
  }
  let todoLength = data.filter((item)=> item.checked === '');
  workNum.textContent = todoLength.length;
  render(showData);
}


// 初始資料
function render(todo){
  if(!data.length){
    cardList.style.display = 'none';
    return;
  }
  cardList.style.display = 'block';
  let str = '';
  todo.forEach((item) => {
    str += `<li data-id="${item.id}">
            <label for="" class="checkBox">
              <input type="checkbox" ${item.checked}>
              <p>${item.value}</p>
            </label>
            <a href="#"><span class="material-icons deleteBtn">
              close
            </span></a>
          </li>`
  });
  list.innerHTML = str;
}

// 新增資料
function addTodo(e){
  e.preventDefault();
  if (inputText.value.trim() === ""){
    alert('請輸入正確資料');
    return;
  };
  let obj = {};
  obj.value = inputText.value;
  obj.id = new Date().getTime();
  obj.checked = '';
  data.push(obj);
  inputText.value = '';
  updateList();
}

// 刪除單一&切換 ckecked 狀態
function deleteCheckStatus(e){
  let id = parseInt(e.target.closest('li').dataset.id);
  if (e.target.classList.contains('deleteBtn')) {
    e.preventDefault();
    if (confirm('確定刪除這個項目?')) {
      data = data.filter((item) => item.id !== id);
    }
  } else {
    data.forEach((item) => {
      if (item.id === id) {
        if (item.checked === 'checked') {
          item.checked = '';
        } else {
          item.checked = 'checked';
        }
      }
    })
  }
  updateList();
}







