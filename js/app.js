var newTaskInput    = document.getElementById('new-task'); //#new-task
var addButton       = document.getElementsByTagName('button')[0]; //first button
var incompleteTasks = document.getElementById('incomplete-tasks'); // ul#incomplete-tasks
var completedTasks  = document.getElementById('completed-tasks'); // ul#completed-tasks

var editNewTaskHandler = function(key){
  if(key.key == 'Enter'){
    addTaskHandler();
  }else{
    if(newTaskInput.value.trim() != ""){
      addButton.disabled = false;
    }else{
      addButton.disabled = true;
      newTaskInput.value = ""; //empty the text input if it's made up of spaces
    }
  }
}

//it creates a <li> (with checkbox, etc inside it) to be added to ul#incomplete-tasks
var createNewTaskListItem = function(taskContent){
  var li           = document.createElement("li");
  var checkbox     = document.createElement("input");
  var label        = document.createElement("label");
  var textInput    = document.createElement("input");
  var editButton   = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkbox.type = 'checkbox';
  label.innerText = taskContent;
  textInput.type = 'text';
  textInput.value = taskContent;
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(textInput);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  return li;
}

var addTaskHandler = function() {
  var newTaskContent = newTaskInput.value;
  if(newTaskContent.trim() != ""){
    var li = createNewTaskListItem(newTaskContent);
    incompleteTasks.appendChild(li);
    bindTaskHandlers(li, markTaskAsCompleted);
    newTaskInput.value = "";
    addButton.disabled = true;
  }
}

var editTaskHandler = function() {
  li = this.parentNode;
  var textInput = li.querySelector("input[type=text]");
  var label = li.querySelector("label");
  var editButton = li.querySelector("button.edit");
  if(li.classList.contains('editMode')){
    label.innerText = textInput.value;
    editButton.innerText = 'Edit';
  } else{
    textInput.value = label.innerText;
    editButton.innerText = 'Ok';
  }
  li.classList.toggle('editMode');
}

var deleteTaskHandler = function() {
  var li = this.parentNode; //the parent of the button.delete
  var ul = li.parentNode;
  ul.removeChild(li);
}

var markTaskAsCompleted = function() {
  var li = this.parentNode; //the parent of the checkbox
  completedTasks.appendChild(li); //move the li to ul#completed-task
  this.onchange = markTaskAsIncomplete;
}

var markTaskAsIncomplete = function() {
  var li = this.parentNode; //the parent of the checkbox
  incompleteTasks.appendChild(li); //move the li to ul.incomplete-tasks
  this.onchange = markTaskAsCompleted;
}

var bindTaskHandlers = function(taskListItem, checkboxEventHandler){
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');
  var checkbox = taskListItem.querySelector('input[type=checkbox]');
  editButton.onclick = editTaskHandler; //bind editTaskHandler to the edit button
  deleteButton.onclick = deleteTaskHandler; //bind deleteTaskHandler to the delete button
  checkbox.onchange = checkboxEventHandler; //bind markTaskAsCompleted to the checkbox
}

//attach the click handler to the addTaskHandler function
addButton.addEventListener('click', addTaskHandler);
newTaskInput.addEventListener('keyup', editNewTaskHandler);

//cycle over incompleteTasks li childs
for(var i = 0; i < incompleteTasks.children.length; i++){
  var li = incompleteTasks.children[i];
  bindTaskHandlers(li, markTaskAsCompleted);
}

//cycle over completedTasks li childs
for(var i = 0; i < completedTasks.children.length; i++){
  li = completedTasks.children[i];
  bindTaskHandlers(li, markTaskAsIncomplete);
}
