import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox } from "@mui/material";
import "../App.css";



export default function TodoContent() {
  const getLocalItems =()=>{
    let list = localStorage.getItem('lists')
    console.log(list);
  
    if(list){
      return JSON.parse(localStorage.getItem('lists'))
    }else{
      return []
    }
  }
  const [checked, setChecked] = React.useState(false);
  const [todo, setTodo] = React.useState("");
  const [todos, setTodos] = React.useState(getLocalItems());
  const [editId, setEditId] = React.useState(0);
  const [date, setDate] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentDate = new Date();
    var dateUpdated =
      
      currentDate.getDate() +
      "-" + 
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getFullYear() +
      " " + 
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      (currentDate.getSeconds() < 10 ?  ("0" + currentDate.getSeconds()) : (currentDate.getSeconds()) )

    setDate(dateUpdated);

    setChecked(false);

    if (editId) {
      const editTodo = todos.find((item) => item.id === editId);
      const updateTodo = todos.map((item) =>
        item.id === editTodo.id
          ? (item = { id: item.id, todo, checked: false, date: dateUpdated })
          : { id: item.id, todo: item.todo, checked: false, date: dateUpdated }
      );
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([
        {
          id: `${todo}-${Date.now()}`,
          todo,
          checked: false,
          date: dateUpdated,
        },
        ...todos,
      ]);
      setTodo("");
    }
    console.log(todos);
  };

  const handleChange = (event, id) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );

    console.log(todos);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((item) => item.id !== id);
    setTodos([...delTodo]);
  };

 React.useEffect(() => {
   localStorage.setItem('lists', JSON.stringify(todos));
   
 }, [todos])
 

  return (
    <>
      <h1 className="heading">Maintain Your Todo List</h1>
      <form className="todoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          placeholder="Add to list..."
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="allTodo">
        {todos.map((item) => (
          <li key={item.id}>
            <Card
              sx={{ maxWidth: 600 }}
              style={{
                marginTop: 20,
                marginLeft: 10,
                backgroundColor: "#1976d2",
                color: "white",
              }}
            >
              <CardHeader
                className={item.checked ? "done" : ""}
                title={item.todo}
                action={
                  <IconButton aria-label="settings">
                    <Checkbox
                      checked={item.checked}
                      onChange={(e) => handleChange(e.target.checked, item.id)}
                      inputProps={{ "aria-label": "controlled" }}
                      style={{ color: "white" }}
                    />
                  </IconButton>
                }
              />

              <CardActions disableSpacing>
                <IconButton >
                  {!item.checked && (
                    <EditIcon
                      onClick={() => handleEdit(item.id)}
                      style={{ color: "white" }}
                      className="icons"
                    />
                  )}
                </IconButton>
                <IconButton >
                  <DeleteIcon
                    onClick={() => handleDelete(item.id)}
                    style={{ color: "white" }}
                    className="icons"
                  />
                </IconButton>
                <p  className="dateDiplay">{item.date}</p>
              </CardActions>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
