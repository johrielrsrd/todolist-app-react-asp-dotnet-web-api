import { useState } from "react";
import "../styles/LogInForm.css";

function LogInForm(props) {
  const [inputField, setInputField] = useState({
    username: "",
    password: ""
  });

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setInputField((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div className="log-in-form-container">
      <form
        id="log-in-form"
        onSubmit={(e) => {
          e.preventDefault();
          setInputField({
            username: "",
            password: ""
          });
          props.onLog(inputField);
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="UserName"
          value={inputField.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputField.password}
          onChange={handleChange}
          required
        />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default LogInForm;
