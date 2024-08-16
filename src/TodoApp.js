import React from 'react';  // Import React from react
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';  // Import the AiOutlineDelete and AiOutlineEdit components from the react-icons/ai library
import { BsCheckLg } from 'react-icons/bs'; // Import the BsCheckLg component from the react-icons/bs library

const TodoApp = () => {
  const [isCompleteScreen, setIsCompleteScreen] = React.useState(false);  // Create a state variable called isCompleteScreen and set it to false
  const [allTodos, setTodos] = React.useState([]);  // Create a state variable called allTodos and set it to an empty array
  const [newTitle, setNewTitle] = React.useState(''); // Create a state variable called newTitle and set it to an empty string
  const [newDescription, setNewDescription] = React.useState(''); // Create a state variable called newDescription and set it to an empty string
  const [completedTodos, setCompletedTodos] = React.useState([]); // Create a state variable called completedTodos and set it to an empty array
  const [currentEdit, setCurrentEdit] = React.useState(""); // Create a state variable called currentEdit and set it to an empty string
  const [currentEditedItem, setCurrentEditedItem] = React.useState(""); // Create a state variable called currentEditedItem and set it to an empty string

  const API_URL = 'https://run.mocky.io/v3/8d9f8795-2320-4cc6-acd9-d27b8e17f4b9'; // Update to the new mock API URL

  // Add the todo item
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodoItem),
    })
    .then(response => response.json())
    .then(data => {
      let updatedTodoArr = [...allTodos, data]; // Use data from API response
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    })
    .catch(error => console.error('Error:', error));
  };

  // Delete the todo item
  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  // Complete the todo item
  const handleComplete = index => {
    let now = new Date();
    let completedOn =
      `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  // Delete the completed todo item
  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  // Fetch initial todos from the mock API
  React.useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setTodos(data.tasks); 
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Edit the todo item
  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  // Update the title of the todo item
  const handleUpdateTitle = (value) => {
    setCurrentEditedItem(prev => ({ ...prev, title: value }));
  };

  // Update the description of the todo item
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem(prev => ({ ...prev, description: value }));
  };

  // Update the todo item
  const handleUpdateToDo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  };

  return (
    <div className="App">
      <h1>TaskVanguard</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">

          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className='edit__wrapper' key={index}>
                    <input
                      placeholder='Updated Title'
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder='Updated Description'
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <button
                      type="button"
                      onClick={handleUpdateToDo}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                      />
                      <AiOutlineEdit
                        className="check-icon"
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      />
                    </div>

                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>

                </div>
              );
            })}

        </div>
      </div>
    </div>
  );
}

// Export the TodoApp function
export default TodoApp;
