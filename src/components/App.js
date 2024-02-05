import { useEffect, useState } from "react";
import "../styles/App.css";
import List from "./List";
import Header from "./Header";
import InputBox from "./InputBox";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [toDoItem, setToDoItem] = useState([]);

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    getAllToDoItems();
  }, [currentPage]);

  function getAllToDoItems() {
    fetch("https://localhost:7010/api/ToDo").then((response) =>
      response.json().then((json) => {
        setToDoItem(json);
      })
    );
  }

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

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="app-container">
      <Header />
      <InputBox onAdd={addNewToDoItem} reRender={getAllToDoItems} />

      {toDoItem.slice(startIndex, endIndex).map((listItem) => (
        <List
          key={listItem.id}
          id={listItem.id}
          text={listItem.text}
          condition={listItem.isComplete}
          onDelete={deleteToDoItem}
          onUpdate={updateToDoItem}
        />
      ))}

      <button
        className="prev-button"
        onClick={() => {
          getAllToDoItems();
          prevPage();
        }}
        disabled={currentPage <= 1 ? true : false}
      >
        Previous
      </button>

      <button
        className="next-button"
        onClick={() => {
          nextPage();
          getAllToDoItems();
        }}
      >
        Next
      </button>
      <label>Page {currentPage}</label>
    </div>
  );
}

export default App;
