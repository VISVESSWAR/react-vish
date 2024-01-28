import { useState } from "react";

const todos = [
  { id: 1, task: "Do laundry", date: "18-10-2024", completed: true },
  { id: 2, task: "learn javascript", date: "20-10-2024", completed: false },
  { id: 3, task: "learn react", date: "18-10-2024", completed: false },
];

export default function App() {
  const [Add, setAdd] = useState(false);

  const [todo, setTodo] = useState(todos);
  //console.log(todo);

  const [tasks, setTasks] = useState("");
  const [dates, setDates] = useState("");

  function UpdateList(e) {
    e.preventDefault();
    if (!tasks || !dates) return;
    const createId = crypto.randomUUID();
    const newItem = {
      task: tasks,
      date: dates,
      id: createId,
      completed: false,
    };
    console.log(newItem);
    const newAdd = [...todo, newItem];
    setTodo(newAdd);
    setTasks("");
    setDates("");
    console.log(newAdd);
    onAdd();
  }

  function onAdd() {
    setAdd(!Add);
  }

  return (
    <div className="app">
      <h1 className="title">TODO List</h1>
      <Welcome />
      <TodoList
        todo={todo}
        setTodo={setTodo}
        key={todo.id}
        tasks={tasks}
        setTasks={setTasks}
        dates={dates}
        setDates={setDates}
      />
      {Add && (
        <AddItem
          UpdateList={UpdateList}
          tasks={tasks}
          setTasks={setTasks}
          dates={dates}
          setDates={setDates}
        />
      )}
      <button className="add btndownspace home" onClick={onAdd}>
        {!Add ? "Add-task" : "close"}
      </button>
    </div>
  );
}

function Welcome() {
  return <h2 className="message">Here are your daily remainders</h2>;
}

function TodoList({ todo, setTodo, tasks, setTasks, dates, setDates }) {
  return (
      <ul>
        {todo.map((item) => (
          <ListItems
            item={item}
            key={item.id}
            setTodo={setTodo}
            todo={todo}
            tasks={tasks}
            setTasks={setTasks}
            dates={dates}
            setDates={setDates}
          />
        ))}
      </ul>
  );
}

function ListItems({ item, setTodo, todo, tasks, setTasks, dates, setDates }) {
  const [completed, setCompleted] = useState(item.completed);
  const [edit, setEdit] = useState(false);
  //console.log('completed1-',completed);

  function changeCheck(id) {
    setCompleted(!completed);
    setTodo((item) =>
      todo.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    //console.log('completed2-',completed);
    //console.log(todo);
  }

  function changeEdit() {
    setEdit(!edit);
  }

  function Edit(e, id) {
    e.preventDefault();
    if (!tasks || !dates) return;
    console.log(tasks, dates);
    setTodo((item) =>
      todo.map((item) =>
        item.id === id ? { ...item, task: tasks, date: dates } : item
      )
    );
    setDates("");
    setTasks("");
    changeEdit();
    //console.log(todo);
  }

  function remove(id) {
    setTodo((item) => todo.filter((item) => (item.id !== id ? item : "")));
  }

  return (
      <li>
        <input
          type="checkbox"
          className="col1"
          defaultChecked={completed ? true : false}
          onClick={() => changeCheck(item.id)}
        ></input>
        <p className={completed ? "strike col1" : "col1"}>{item.task}</p>
        <p className={completed ? "strike col2" : "col2"}>{item.date}</p>
        <button onClick={() => remove(item.id)} className="col3">
          ❌
        </button>
        {edit && (
          <EditItem
            tasks={tasks}
            setTasks={setTasks}
            dates={dates}
            setDates={setDates}
            item={item}
            Edit={Edit}
          />
        )}
        <button onClick={changeEdit}>Edit</button>
      </li>
  );
}

function EditItem({ tasks, setTasks, dates, setDates, item, Edit }) {
  return (
      <form className="edititem" onSubmit={(e) => Edit(e, item.id)}>
        <label>Task:</label>
        <input
          type="text"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        ></input>
        <label>Date</label>
        <input
          type="date"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
        ></input>
        {/* <label>completed</label>
    <input type="text" value='false'></input> */}
        <button className="btnupspace">Update</button>
        {/* {console.log(tasks, dates)} */}
      </form>
  );
}

function AddItem({ UpdateList, tasks, setTasks, dates, setDates }) {
  return (
      <form className="additem newitem" onSubmit={UpdateList}>
        <label>Task:</label>
        <input
          type="text"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        ></input>
        <label>Date</label>
        <input
          type="date"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
        ></input>
        {/* <label>completed</label>
    <input type="text" value='false'></input> */}
        <button className="btnupspace">Add</button>
      </form>
  );
}
