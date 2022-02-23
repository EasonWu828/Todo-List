const inputText = document.querySelector('.inputText');
const addBtn = document.querySelector('.addBtn');
const list = document.querySelector('.list');
const deleteBtn = document.querySelector('.deleteBtn');
const main = document.querySelector('.main');


let data = [];
// 切換狀態預設
let toggleStatus = 'all';

addBtn.addEventListener('click', e =>{
  e.preventDefault();
  addTodo();
});
// 鍵盤操作
inputText.addEventListener('keypress', e =>{
  if(e.key === 'Enter'){
    addTodo()
  }
});
// 監聽 Tab
main.addEventListener('click', changeTab);

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

// checked 狀態更新資料
function updateList(){
  let showData = [];
  if (toggleStatus === 'all') {
    showData = data;
  } else if (toggleStatus === 'work') {
    showData = data.filter((item) => item.checked === '');
  } else {
    showData = data.filter((item) => item.checked === 'checked');
  }
  render(showData);
}


// 初始資料
function render(todo){
  let str = '';
  todo.forEach((item, index) => {
    str += `<li data-id="${item.id}">
            <label for="" class="checkBox">
              <input type="checkbox" ${item.checked}>
              <p>${item.value}</p>
            </label>
            <a href="#"><span class="material-icons deleteBtn" data-num="${index}">
              close
            </span></a>
          </li>`
  });
  list.innerHTML = str;
}

// 新增資料
function addTodo(){
  if (inputText.value.trim() === ""){
    alert('請輸入正確資料');
    return;
  };
  let obj = {};
  obj.value = inputText.value,
  obj.id = new Date().getTime(),
  obj.checked = '';
  data.push(obj);
  inputText.value = '';
  render(data);
}


list.addEventListener('click', e => {
  let id = parseInt(e.target.closest('li').dataset.id);
  if (e.target.classList.contains('deleteBtn')){
    e.preventDefault();
    let num = e.target.dataset.num;
    if(confirm('確定刪除這個項目?')){
      data.splice(num, 1);
    }
  }else{
    data.forEach((item)=>{
      if (item.id === id){
        if (item.checked === 'checked'){
          item.checked = '';
        }else{
          item.checked = 'checked';
        }
      }
    })
  }
  render();
})




