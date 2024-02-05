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
        setToDoItem(json.slice(0, 5));
      })
    );
  }, []);

  function addNewToDoItem(newToDoItem) {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: `${newToDoItem}`, isComplete: false })
    };

    fetch("https://localhost:7010/api/ToDo", postOptions);
  }

  function deleteToDoItem(ToDoItemId) {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(`https://localhost:7010/api/ToDo/${ToDoItemId}`, deleteOptions);
  }

  function updateToDoItem(itemId, itemText, itemCondition) {
    const putOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: itemId,
        text: `${itemText}`,
        isComplete: itemCondition
      })
    };

    fetch(`https://localhost:7010/api/ToDo/${itemId}`, putOptions);
  }

  return (
    <div className="app-container">
      <Header />
      <InputBox onAdd={addNewToDoItem} />

      {toDoItem.map((listItem, indexValue) => (
        <List
          key={indexValue}
          id={listItem.id}
          text={listItem.text}
          condition={listItem.isComplete}
          onDelete={deleteToDoItem}
          onUpdate={updateToDoItem}
        />
      ))}
    </div>
  );
}

export default App;
