import { useState } from "react";
import "../styles/InputBox.css";

function InputBox(props) {
  const [newToDo, setToDo] = useState("");

  return (
    <div className="input-box-container">
      <form
        className="form-container"
        onSubmit={() => {
          props.onAdd(newToDo);
          setToDo("");
        }}
      >
        <input
          className="input-box"
          type="text"
          placeholder="Text input."
          value={newToDo}
          onChange={(e) => setToDo(e.target.value)}
          required
        />
        <button className="add-button-input">ADD</button>
      </form>
    </div>
  );
}

export default InputBox;
