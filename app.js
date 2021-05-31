const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');


loadEventListeners();

function loadEventListeners(){

  //더하는 기능
   form.addEventListener('submit', addTask);

  // 삭제하는 기능 (taskList = .collection)
  taskList.addEventListener('click', removeTask);
  
  //전부 삭제 기능. clear task
  clearBtn.addEventListener('click', clearTask);

  //filter tasks event 
  filter.addEventListener('keyup',filterTasks);

  //DOM load event, 로컬 스토리지 
  document.addEventListener('DOMContentLoaded', getTasks);


  }




//로컬 스토리지에 저장된 걸 보여주는 기능 
function getTasks(){
 let tasks;

 if(localStorage.getItem('tasks') === null){
  task=[];
 }else{
  tasks = JSON.parse(localStorage.getItem('tasks'));
 }

 tasks.forEach(function(task){

    //넣을 컬럭션에 요소 만들어야 겠지?
    // li 엘리먼트 만들기
    const li = document.createElement('li');

    // li 에 클래스 추가
    li.className = 'collection-item';

    /* taskInput에서 document.createTextNode이용해 
    text node만들고 , appendChild 이용해 li에 추가*/
    li.appendChild(document.createTextNode(task));

    //1. anchor 엘리먼트 만들기, x 아이콘 만들거임
    const link = document.createElement('a');

    // 2.  link(a) 에 아이콘 딜리트 class 더하기
    link.className = 'delete-item secondary-content';

    // 3. a 딜리트 아이콘 html 더하기
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    // link 를 li에 더하기
    li.appendChild(link);

    // taskList(.collection)) 에 li(collection-item) 더하기 
    taskList.appendChild(li);


 });
  };


  // task 더하는 기능

function addTask(e){
    //컬렉션에 있는 게 아무것도 없으면, task 를 넣으라는 alert 작동
    if(taskList.value === ''){
        alert('add a task')
    }

    //넣을 컬럭션에 요소 만들어야 겠지?
    // li 엘리먼트 만들기
    const li = document.createElement('li');

    // li 에 클래스 추가
    li.className = 'collection-item';

    /* taskInput에서 document.createTextNode이용해 
    text node만들고 , appendChild 이용해 li에 추가*/
    li.appendChild(document.createTextNode(taskInput.value));

    //1. anchor 엘리먼트 만들기, x 아이콘 만들거임
    const link = document.createElement('a');

    // 2.  link(a) 에 아이콘 딜리트 class 더하기
    link.className = 'delete-item secondary-content';

    // 3. a 딜리트 아이콘 html 더하기
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    // link 를 li에 더하기
    li.appendChild(link);

    // taskList(.collection)) 에 li(collection-item) 더하기 
    taskList.appendChild(li);




    //로컬 스토리지에 저장하기
    storeTaskInLocalStorage(taskInput.value);

   
    //  저장후, input 창 깨끗이 비워주기
    taskInput.value = '';

    e.preventDefault();


}


//먼저 배열에 저장했다가, 로컬 스토리지에 저장.
function storeTaskInLocalStorage(task){
 
/*setItem으로 tasks를 저장할거니까, 변수 만듦*/
 let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks= [];

  }else{
     /*데이터가 있다면
		로컬 스토리지에서 데이터를 얻어올때 tasks[] normal array
     로 얻기 위해서, JSON.parse 해줘야 함..*/
     // "{1,2}"  -> {1,2}
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }

  //task[] 어레이에 변수(패러미터) push 함.(배열 뒤에 값 추가- push)
  tasks.push(task); //패러미터로 있던 task 



  /*tasks 어레이에 저장된 걸, 로컬 스토리지에 저장.
  로컬 스토리지는 오직 string 만 저장해서, 
   JSON.stringify 으로 감싸야함=> "{1,2,3}" */
  localStorage.setItem('tasks',JSON.stringify(tasks));
}



function removeTask(e){

  /* x 버튼 눌러서, collection-item 타겟시키기

  e.target 해서 x버튼 누르면 <i class="fa fa-remove"> 나오니, 그 위 상위 클래스를 타겟
  i의 상위 <a class="delete-item secondary-content"> 고 그 상위는 
  <li class="collection-item"> */
  
  if(e.target.parentElement.classList.contains('delete-item')){


    if(confirm('Are you sure? ')){

     /* 실제 삭제하는 기능, li class="collection-item" 가 삭제되야함. 
      i 태그의 부모  - a 태그, 부모 - li 태그*/
    e.target.parentElement.parentElement.remove();
  

    //DOM에서 삭제된 후, 로컬 스토리지에서도 삭제해야 함.
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
  }

}


//로컬스토리지에서 삭제하는 기능
function removeTaskFromLocalStorage(taskItem) {

/*스토리지에 있는 key이름임..*/
  let tasks;
/*왜 getItem에 tasks를 쓰는 이유? 아래에서 setItem으로
 저장할때 tasks로 key/value의 key를 저장하기 때문에.*/
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}





function clearTask(){

  //textnode니까 ...'' 공백하면 다 사라짐.
  //taskList.innerHTML = '';

 //더 빠른 방법. taskList에 firstChild가 있다면, removeChild해줘라.
 while(taskList.firstChild){
   taskList.removeChild(taskList.firstChild);
 }

}


function filterTasks(e){


  //filter tasks에 타이핑 된 걸 준다.
  const text = e.target.value.toLowerCase();

  //쿼리설렉터는 nodeList를 돌려줌. 그래서 forEach 를 array로 변형안하고도 사용가능
  document.querySelectorAll('.collection-item').forEach((task)=>{
    
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!= -1 ){ 
      //맞는 게 없으면 -1을 줄거임.

      task.style.display = 'block';

    }else{
      task.style.display = 'none';

    }
  });

}