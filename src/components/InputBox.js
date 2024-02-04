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
          type="text"
          placeholder="Please enter a task."
          value={newToDo}
          onChange={(e) => setToDo(e.target.value)}
          required
        />
        <button>ADD</button>
      </form>
    </div>
  );
}

export default InputBox;
