import { useState } from "react";
import "../styles/List.css";

function List(props) {
  const [isChecked, setIsChecked] = useState(props.condition);

  function swapCondition(condition) {
    if (condition === false) return true;
    else return false;
  }

  return (
    <div className="list-container">
      <input
        id="checkbox-input"
        type="checkbox"
        defaultChecked={props.condition}
        onChange={() => {
          props.onUpdate(props.id, props.text, swapCondition(props.condition));
          setIsChecked(swapCondition(props.condition));
        }}
      />
      <p
        className="text-item"
        style={{ textDecoration: isChecked ? "line-through" : "none" }}
      >
        {props.text}
      </p>
      <button
        className="delete-button"
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default List;
