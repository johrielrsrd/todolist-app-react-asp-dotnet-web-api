import "../styles/Header.css";

function Header(props) {
  return (
    <header className="app-header">
      <h1>ToDo List App</h1>
      <h2>Welcome {props.userName}!</h2>
    </header>
  );
}
export default Header;
