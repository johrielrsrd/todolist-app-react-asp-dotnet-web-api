import { useState } from "react";
import "../styles/List.css";

function List(props) {
  const [condition, setCondition] = useState(props.condition);
  const [textBoxValue, setTextBoxValue] = useState(props.text);
  const [isEditable, setEditable] = useState(false);

  function updateValue(condition) {
    if (condition === false) return true;
    else return false;
  }

  return (
    <div className="list-item-container">
      {!isEditable ? (
        <>
          <input
            id="checkbox-input"
            type="checkbox"
            defaultChecked={condition}
            onChange={() => {
              props.onUpdate(
                props.id,
                props.text,
                updateValue(condition),
                props.userItemId
              );
              setCondition(updateValue(condition));
            }}
          />
          <p
            className="text-item"
            style={{
              textDecoration: condition ? "line-through" : "none"
            }}
          >
            {props.text}
          </p>
        </>
      ) : (
        <input
          className="item-text-box"
          type="text"
          value={textBoxValue}
          onChange={(event) => setTextBoxValue(event.target.value)}
        />
      )}

      {!isEditable ? (
        <>
          <button onClick={() => setEditable(true)}>EDIT</button>
          <button
            className="delete-button"
            onClick={() => {
              props.onDelete(props.id);
            }}
          >
            DELETE
          </button>
        </>
      ) : (
        <>
          <button
            className="x-button"
            onClick={() => {
              setEditable(false);
              setTextBoxValue(props.text);
            }}
          >
            X
          </button>
          <button
            className="ok-button"
            onClick={() => {
              props.onUpdate(
                props.id,
                textBoxValue,
                props.condition,
                props.userItemId
              );
              setTextBoxValue(textBoxValue);
              setEditable(false);
            }}
          >
            OK
          </button>
        </>
      )}
    </div>
  );
}

export default List;
