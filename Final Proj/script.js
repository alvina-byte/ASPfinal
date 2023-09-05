// Setting up our program
function setup() {
  // No canvas needed in this program

  // Selecting the "Add Task" button and linking it to the addTask function
  const addTaskButton = select('#add-task');
  addTaskButton.mousePressed(addTask);

  // Selecting the task lists for different sections
  const todoList = select('#todo-list');
  const inProgressList = select('#in-progress-list');
  const completedList = select('#completed-list');

  // Allowing these lists to accept dropped items
  todoList.drop(dragged);
  inProgressList.drop(dragged);
  completedList.drop(dragged);
}

// Function to add a new task
function addTask() {
  // Selecting the task input field and getting its trimmed value
  const taskInput = select('#task-input');
  const taskText = taskInput.value().trim();

  // Checking if the input is not empty
  if (taskText !== "") {
    // Selecting the "TO-DO" list
    const todoList = select('#todo-list');

    // Creating a list item with the task text
    const listItem = createElement('li', taskText);

    // Creating a button based on the task's initial state (todo)
    const initialState = 'todo';
    const buttonLabel = getButtonLabel(initialState);
    const taskButton = createButton(buttonLabel);

    // Setting a data attribute to keep track of the task's state
    listItem.elt.dataset.section = initialState;

    // Defining what happens when the task button is pressed
    taskButton.mousePressed(function () {
      const currentSection = listItem.elt.dataset.section;
      // Moving the task to the next section or removing it if completed
      if (currentSection === 'todo' || currentSection === 'in-progress') {
        moveToNextSection(listItem);
        taskButton.elt.textContent = getButtonLabel(currentSection);
      } else if (currentSection === 'completed') {
        listItem.remove();
      }
    });

    // Adding a CSS class to the button
    taskButton.addClass('next-button');
    // Making the button a child of the list item
    taskButton.parent(listItem);

    // Making the list item a child of the "TO-DO" list
    listItem.parent(todoList);

    // Clearing the task input field
    taskInput.value("");
  }
}

// Function to move a task to the next section
function moveToNextSection(taskItem) {
  const currentSection = taskItem.elt.dataset.section;

  if (currentSection === 'todo') {
    // Selecting the "In Progress" list
    const inProgressList = select('#in-progress-list');
    // Changing the task's data attribute to 'in-progress'
    taskItem.elt.dataset.section = 'in-progress';
    // Moving the task to the "In Progress" list
    taskItem.parent(inProgressList);
  } else if (currentSection === 'in-progress') {
    // Selecting the "Completed" list
    const completedList = select('#completed-list');
    // Changing the task's data attribute to 'completed'
    taskItem.elt.dataset.section = 'completed';
    // Moving the task to the "Completed" list
    taskItem.parent(completedList);
  }
}

// Function to get the button label based on the task's section
function getButtonLabel(taskSection) {
  if (taskSection === 'completed') {
    return 'Remove';
  } else {
    return 'Next';
  }
}
