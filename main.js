/* 
  Students tasks:
  [1] Use sweet alert if input is empty[Done]
  [2] Check if task is exist[Done]
  [3] Create Delete all tasks button[Done]
  [4] Create finish all tasks button[Done]
  [5] Add tasks to local storage[Done]
*/

// Setting up variables
let theInput = document.querySelector('.add-task input');
let theAddButton = document.querySelector('.add-task .plus');
let taskContainer = document.querySelector('.tasks-content');
let tasksCount = document.querySelector('.tasks-count span');
let tasksCompleted = document.querySelector('.tasks-completed span');
let taskStats = document.querySelector('.task-stats');
let deleteAllButton = document.querySelector('.delete-all');
let finishAllButton = document.querySelector('.finish-all');
let allTasks = [];

window.onload = function () {

  // Focus on input filed
  theInput.focus();

  // Get local storage
  getLocalStorage();

  // Show Buttons
  if (taskContainer.children.length > 1) {
      
    // Show delete all button
    deleteAllButton.style.visibility = 'visible';

    // Show finish all button
    finishAllButton.style.visibility = 'visible';
  }

  // if (taskContainer.children[0].textContent === 'No tasks to show') {

  //   deleteAllButton.style.visibility = 'hidden';

  //   finishAllButton.style.visibility = 'hidden';
  // }
};

// Add in the task
theAddButton.onclick = function () {

  // If input is empty or white space
  if (theInput.value == 0) {
  
    // Use sweet alert if input is empty
    swal("You Should Fill Task Filed");

    // Empty the input
    theInput.value = '';
  
    // Focus on filed
    document.querySelector('.swal-button').onclick = function () {

      theInput.focus();
    };

    // Focus on filed
    document.querySelector('.swal-overlay').onclick = function () {

      theInput.focus();
    };

    // Remove empty value from allTasks array
    let emptyValue = allTasks.indexOf('');

    if (emptyValue !== -1) allTasks.splice(emptyValue, 1);
    
  } else {

    // No tasks to show message
    let noTaskMsg = document.querySelector('.no-tasks-message');

    // Check if span with no tasks message is exist
    if (document.body.contains(noTaskMsg)) {
      
      // Remove no tasks message
      noTaskMsg.remove();

      // Delete Empty value related with the removed no tasks message
      allTasks = [];
    }
    
    // Create main span element
    let mainSpan = document.createElement('span');

    // Create delete button
    let deleteElement = document.createElement('span');

    // Create the main span text
    let text = document.createTextNode(theInput.value);

    // Create the delete button text
    let deleteText = document.createTextNode('Delete');

    // Add text to main span
    mainSpan.appendChild(text);

    // Add class to main span
    mainSpan.className = 'task-box';

    // Add text to delete button
    deleteElement.appendChild(deleteText);

    // Add class to delete button
    deleteElement.className = 'delete';

    // Add delete button to main span
    mainSpan.appendChild(deleteElement);

    // Add the task to the container
    taskContainer.appendChild(mainSpan);

    // Check number of tasks
    if (taskContainer.children.length > 1) {
      
      // Show delete all button
      deleteAllButton.style.visibility = 'visible';
  
      // Show finish all button
      finishAllButton.style.visibility = 'visible';
    }
    
    // Remove white spaces from input
    let inputValue = theInput.value.replace(/\s+/g, '');

    // Check if an input is exist
    if (allTasks.includes(inputValue) === false) {
      
      // Add input to allTasks array
      allTasks.push(inputValue);

    } else {

      // Sweet alert
      swal("Task is exist");

      // Remove the task if founded before
      taskContainer.lastElementChild.remove();

      // Check number of tasks
      if (taskContainer.children.length === 1) {
        
        // Show delete all button
        deleteAllButton.style.visibility = 'hidden';
    
        // Show finish all button
        finishAllButton.style.visibility = 'hidden';
      }

      // Focus on filed
       document.querySelector('.swal-button').onclick = function () {

        theInput.focus();
       };

       // Focus on filed
       document.querySelector('.swal-overlay').onclick = function () {

        theInput.focus();
      };
    }

    // Empty the input
    theInput.value = '';

    // Focus on filed
    theInput.focus();

    // Calculate tasks
    calculateTasks();
  }
};

document.addEventListener('click', function (e) {

  // Delete Task
  if (e.target.className == 'delete') {

    // Get content of deleted task
    let deletedTaskContent = e.target.parentNode.textContent.slice(0, -6);

    // assign var name to the deleted index from allTasks array
    let wantDelete = allTasks.indexOf(deletedTaskContent);

    // Remove deleted value from allTasks array
    if (wantDelete !== -1) allTasks.splice(wantDelete, 1);

    // Remove current task
    e.target.parentNode.remove();
    
    // Focus on filed
    theInput.focus();

    // Check task length
    if (taskContainer.children.length === 1) {

      // Hide delete all button
      deleteAllButton.style.visibility = 'hidden';

      // Hide finish all button
      finishAllButton.style.visibility = 'hidden';
    }

    if (taskContainer.children.length === 0) {
      
      // Add no tasks message
      createNoTasks();
    }
  }
  
  // Finish task
  if (e.target.classList.contains('task-box')) {
    
    // Toggle class finished
    e.target.classList.toggle('finished');

    // Focus on filed
    theInput.focus();
  }

  // Calculate tasks
  calculateTasks();

  // Store local storage
  setLocalStorage();
});

// Function to create no tasks message
function createNoTasks() {
  
  // Create message span element
  let msgSpan = document.createElement('span');

  // Create text message
  let msgText = document.createTextNode('No tasks to show');

  // Add text to message span element
  msgSpan.appendChild(msgText);

  // Add class To message Span
  msgSpan.className = 'no-tasks-message';

  // Add message span to task container
  taskContainer.appendChild(msgSpan);
}

// Function to calculat tasks
function calculateTasks() {
  
  // Calculate all tsks
  tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;

  // Calculate completed tasks
  tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
}

// function to stor last sittings
function setLocalStorage() {
  
  // Set local storage for tasks
  localStorage.setItem('tasks', taskContainer.innerHTML);

  // Set local storage for count
  localStorage.setItem('count', tasksCount.innerHTML);

  // Set local storage for completed 
  localStorage.setItem('completed', tasksCompleted.innerHTML);

  // Set local storage for previous tasks
  localStorage.setItem('previousTasks', allTasks);
}

// Function to get last stiings
function getLocalStorage() {
  
  // Get local storage for tasks
  taskContainer.innerHTML = localStorage.getItem('tasks') || taskContainer.innerHTML;

  // Get local storage for count
  tasksCount.innerHTML = localStorage.getItem('count') || '0';

  // Get local storage for completed
  tasksCompleted.innerHTML = localStorage.getItem('completed') || '0';

  // Get local storage for allTaskslocalStorage
  allTasks = localStorage.getItem('previousTasks');
  
  // Convert allTasks comming from local storage to array
  if (typeof allTasks === 'string') {

    allTasks = allTasks.split(',');

  } else {

    allTasks = [];
  }
}

// Delete All tasks
deleteAllButton.onclick = function () {

  // Remove all tasks
  taskContainer.innerHTML = '';

  // Clear allTasks array
  allTasks = [];

  // Focus on filed
  theInput.focus();

  // Check number of tasks
  if (taskContainer.children.length === 0) {

    // Create no tasks message
    createNoTasks();

    // Hide delete all button
    deleteAllButton.style.visibility = 'hidden';

    // Hide finish all button
    finishAllButton.style.visibility = 'hidden';
  }
};

// Finish all tasks
finishAllButton.onclick = function () {
  
  for (let i = 0; i < taskContainer.children.length; i++) {

    // Toggle finished class to all tasks
    taskContainer.children[i].classList.toggle('finished');

    // Focus on filed
    theInput.focus();
  }
}