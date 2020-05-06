import React, { useState } from "react";
import {SortableContainer, SortableElement} from "react-sortable-hoc"
import arrayMove from "array-move"    // libreria para guardar array de react sortable
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
  const [task, setTask] = useState([
    { title: "item 1", description: "task one" },
    { title: "item 2", description: "task two" },
    { title: "item 3", description: "task three" },
    { title: "item 4", description: "task four" },
    { title: "item 5", description: "task five" },
  ]);

  const onSortEnd = ({oldIndex, newIndex}) => {

    console.log({oldIndex, newIndex} );
    const taskCopy = [...task]
    const nuevaLista = arrayMove(taskCopy, oldIndex, newIndex)
    setTask(nuevaLista)

    console.table(nuevaLista);
    
  }

  return (
    <SortableLista items={task}  onSortEnd={onSortEnd} />
  );
}





const SortableLista = SortableContainer(({items}) => {
  return(
    <ul className="list-group">
        {items.map((value, i) => (
          <SortableItem value={value} index={i}  key={i} />
        ))}
      </ul>
  )
  })


 

const SortableItem = SortableElement(({value})=> {

  return (
    <li className="list-group-item" >
      <h3>{value.title}</h3>
      <p> {value.description} </p>
    </li>
  );
})
