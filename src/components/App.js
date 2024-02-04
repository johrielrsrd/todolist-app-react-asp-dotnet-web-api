import { useEffect, useState } from "react";
import "../styles/App.css";
import List from "./List";
import Header from "./Header";
import InputBox from "./InputBox";

function App() {
  const [toDoItem, setToDoItem] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7010/api/ToDo").then((response) =>
      response.json().then((json) => {
        setToDoItem(json);
        console.log(json);
      })
    );
  }, []);

  function addNewToDoItem(newToDoItem) {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: `${newToDoItem}`, isComplete: false }),
    };

    fetch("https://localhost:7010/api/ToDo", postOptions)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function deleteToDoItem(ToDoItemId) {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`https://localhost:7010/api/ToDo/${ToDoItemId}`, deleteOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("TodoItem deleted successfully");
      })
      .catch((error) => console.error("Error deleting TodoItem:", error));
  }

  return (
    <div className="app-container">
      <Header />
      <InputBox onAdd={addNewToDoItem} />

      {toDoItem.map((listItem) => (
        <List
          key={listItem.id}
          id={listItem.id}
          text={listItem.text}
          condition={listItem.isComplete}
          onDelete={deleteToDoItem}
        />
      ))}
    </div>
  );
}

export default App;
