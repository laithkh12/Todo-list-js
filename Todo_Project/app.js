var taskStore = [];

var Task = function (id, description) {
  this.id = id;
  this.description = description;
};

function addTask(des) {
  var newTask, ID;

  if (taskStore.length > 0) {
    ID = taskStore[taskStore.length - 1].id + 1;
  } else {
    ID = 0;
  }

  newTask = new Task(ID, des);
  taskStore.push(newTask);

  return newTask;
}

function deleteTask(id) {
  var ids, index;
  ids = taskStore.map(function (current) {
    return current.id;
  });
  index = ids.indexOf(parseInt(id));
  if (index !== -1) {
    taskStore.splice(index, 1);
  }
}

var DOMStrings = {
  addBtn: document.querySelector(".add__btn"),
  taskDescription: document.querySelector(".add__description"),
  taskContainer: document.querySelector(".task__list"),
};

function addListTask(task) {
  var html, newHtml, element;
  html = `
  <div class="item clearfix" id="income-%id%">
    <div class="item__description">%description%</div>
    <div class="right clearfix">
      <div class="item__done">
        <button class="item__done--btn">
          <i class="ion-ios-checkmark-outline"></i>
        </button>
      </div>
      <div class="item__delete">
        <button class="item__delete--btn">
          <i class="ion-ios-close-outline"></i>
        </button>
      </div>
    </div>
  </div>
  `;

  newHtml = html.replace("%id%", task.id);
  newHtml = newHtml.replace("%description%", task.description);

  element = DOMStrings.taskContainer;
  element.insertAdjacentHTML("beforeend", newHtml);
}

function deleteListTask(selectorID) {
  var el;
  el = document.getElementById(selectorID);
  el.remove();
}

function doneListTask(selectorID) {
  var el;
  el = document.getElementById(selectorID);
  el.firstElementChild.classList.toggle("item__description__done");
  el.children[1].children[0].children[0].classList.toggle(
    "item__done--btn--done"
  );
}

function crtlAddTask() {
  var input, text, newTask;
  input = DOMStrings.taskDescription;
  text = input.value;

  if (text) {
    newTask = addTask(text);
    addListTask(newTask);
    input.value = "";
    input.focus();
  }
}

function crtlDeleteTask(event) {
  var taskID, doneBtn, clickedElement;
  doneBtn = "ion-ios-checkmark-outline";
  clickedElement = event.target.className;

  taskID = event.target.parentNode.parentNode.parentNode.parentNode.id;

  if (clickedElement === doneBtn) {
    doneListTask(taskID);
  } else if (taskID) {
    deleteTask(taskID);
    deleteListTask(taskID);
  }
}

DOMStrings.addBtn.addEventListener("click", crtlAddTask);

document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    // Enter key
    crtlAddTask();
  }
});

DOMStrings.taskContainer.addEventListener("click", crtlDeleteTask);
