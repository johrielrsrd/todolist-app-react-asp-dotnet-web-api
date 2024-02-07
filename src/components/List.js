import { useState } from "react";
import "../styles/List.css";

function List(props) {
  const [condition, setCondition] = useState(props.condition);
  const [textValue, setTextValue] = useState(props.text);
  const [isEditable, setEditable] = useState(false);

  function updateValue(condition) {
    if (condition === false) return true;
    else return false;
  }

  return (
    <div className="list-item-container">
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
          textDecoration: condition ? "line-through" : "none",
          border: isEditable ? "1px solid black" : "none",
          padding: "5px"
        }}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
      >
        {props.text}
      </p>

      <button onClick={() => setEditable(true)}>EDIT</button>
      <button
        className="delete-button"
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        DELETE
      </button>

      {isEditable === true ? (
        <>
          <button onClick={() => setEditable(false)}>X</button>
          <button>OK</button>
        </>
      ) : null}
    </div>
  );
}

export default List;
