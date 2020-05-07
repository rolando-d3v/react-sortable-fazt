import React, { useState, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move"; // libreria para guardar array de react sortable
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4 m-auto">
          <h3>Lista de Tareas</h3>
          <SortableComponent />
        </div>
      </div>
    </div>
  );
}

export default App;

function SortableComponent() {
  const [tasks, setTask] = useState([
    // { title: "item 1", description: "tasks one" },
    // { title: "item 2", description: "tasks two" },
    // { title: "item 3", description: "tasks three" },
    // { title: "item 4", description: "tasks four" },
    // { title: "item 5", description: "tasks five" },
  ]);

  const getData = async () => {
    const res = await fetch("http://localhost:4000/tasks");
    const tasks = await res.json();
    // logica para ordenar los bloques y id del sorting
    tasks.sort((a, b) => (a.sorting > b.sorting) ? 1 : ((b.sorting > a.sorting) ? -1 : 0 ))
    setTask(tasks);
  };

  useEffect(() => {
    getData();
  }, []);

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    const tasksCopy = [...tasks];
    const nuevaLista = arrayMove(tasksCopy, oldIndex, newIndex);
    setTask(nuevaLista);

    const tasksIds = nuevaLista.map((t) => t._id);
    const res = await fetch("http://localhost:4000/tasks", {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(tasksIds),
    });

    const data = await res.json();
    console.log(data);

    console.log(tasksIds);
  };

  return <SortableLista items={tasks} onSortEnd={onSortEnd} />;
}

const SortableLista = SortableContainer(({ items }) => {
  return (
    <ul className="list-group">
      {items.map((value, i) => (
        <SortableItem value={value} index={i} key={i} />
      ))}
    </ul>
  );
});

const SortableItem = SortableElement(({ value }) => {
  return (
    <li className="list-group-item">
      <h3>
        {" "}
        {value.sorting} - {value.title}
      </h3>
      <p> {value.description} </p>
      <p> {value._id} </p>
    </li>
  );
});
