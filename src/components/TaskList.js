import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from '../features/taskSlice';
import { Link } from 'react-router-dom'

function TaskList() {

  //Esta función trae el estado de la store para poder utilizarlo.
  const tasks = useSelector(state => state.tasks);

  //Usaremos esta función para ejecutar el reducer deleteTask
  const dispatch = useDispatch();

  //Esta función está ligada al botón de abajo y lo que hace es usar el dispatch para ejecutar la función del reducer delete task y así borrar la tarea.
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  }

  //Aquí mapeamos el arreaglo de tareas del estado global y devolvemos un div con id específico de cada tarea, un h3 con el title de la tarea y p con la descripción de la misma.
  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center py-4">
        <h1>Number of tasks {tasks.length}</h1>
        <Link to='/create-task' className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">
          Create task
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {tasks.map(task =>
          <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between">
              <h3>{task.title}</h3>
              <div className="flex gap-x-2">
                <Link to={`/edit-task/${task.id}`} className="bg-zinc-600 px-2 py-1 text-xs rounded-md">Edit</Link>
                <button onClick={() => handleDelete(task.id)} className="bg-red-500 px-2 py-1 text-xs rounded-md">Delete</button>
              </div>
            </header>
            <p>{task.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList