import "../styles/List.css";

function List(props) {
  return (
    <div className="list-container">
      <input type="checkbox"></input>
      <p className="text-item">{props.text}</p>
      <button
        className="delete-button"
        onClick={() => {
          props.onDelete(props.id);
          window.location.reload();
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default List;
