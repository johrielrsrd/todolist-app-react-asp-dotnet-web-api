import { useEffect, useState } from "react";
import "../styles/App.css";
import List from "./List";
import Header from "./Header";
import InputBox from "./InputBox";
import Footer from "./Footer";

function App(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [toDoItem, setToDoItem] = useState([]);

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(toDoItem.length / itemsPerPage)
  );

  useEffect(() => {
    getAllToDoItems();
    setTotalPages(Math.ceil(toDoItem.length / itemsPerPage));

    if (totalPages !== 0 && currentPage > totalPages)
      setCurrentPage(currentPage - 1);
  }, [currentPage, toDoItem.length, totalPages]);

  function getAllToDoItems() {
    fetch(`https://localhost:7010/api/ToDo/${props.userId}`).then((response) =>
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
      body: JSON.stringify({
        text: `${newToDoItem}`,
        isComplete: false,
        toDoItemId: props.userId
      })
    };

    fetch("https://localhost:7010/api/ToDo", postOptions);
  }

  function deleteToDoItem(itemId) {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(`https://localhost:7010/api/ToDo/${itemId}`, deleteOptions);
  }

  function updateToDoItem(itemId, itemText, itemCondition) {
    const putOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: itemId,
        text: `${itemText}`,
        isComplete: itemCondition,
        toDoItemId: props.userId
      })
    };

    fetch(`https://localhost:7010/api/ToDo/${itemId}`, putOptions);
  }

  return (
    <div className="app-container">
      <Header />
      <h2>Welcome {props.userName}!</h2>
      <InputBox onAdd={addNewToDoItem} reRender={getAllToDoItems} />
      <div className="list-container">
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
      </div>

      {/*Page Buttons*/}
      {toDoItem.length !== 0 ? (
        <div className="page-button-container">
          <button
            className="prev-button"
            onClick={() => {
              setCurrentPage(currentPage - 1);
              getAllToDoItems();
            }}
            disabled={currentPage <= 1 ? true : false}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="next-button"
            onClick={() => {
              setCurrentPage(currentPage + 1);
              getAllToDoItems();
            }}
            disabled={
              currentPage === totalPages || toDoItem.length === 0 ? true : false
            }
          >
            Next
          </button>
          <label>Page {currentPage}</label>
        </div>
      ) : null}
      <Footer />
    </div>
  );
}

export default App;
