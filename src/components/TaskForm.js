import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editeTask } from '../features/taskSlice';
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  //definimos un estado local donde se guardará toda la info typeada en el form para posteriormente pasarla al estado global de la store.
  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const navigate = useNavigate();
  // Esta función es la que nos permite disparar eventos de las funciones establecidas en el reducer del Slice.
  const dispatch = useDispatch();

  //Esta función obtiene el id de la ruta de navegación en la que nos encontramos
  const params = useParams();
  const tasks = useSelector(state => state.tasks);

  //funición que actualiza el estado local ante el ingreso de información en el form name y description
  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }
  //función que actualiza el estado global cuando se presiona el boton "save"
  const handleSubmit = e => {
    e.preventDefault();

    if (params.id) {
      dispatch(editeTask(task))
    } else {
      //Aquí usamos el dispatch para poder ejecutar la función addTask
      dispatch(addTask({
        ...task,
        id: uuid(),
      }));
    }
    navigate('/');
  }

  //Esta función se ejecuta inmediatamente el componente es cargado
  useEffect(() => {
    if (params.id) {
      //Acá estamos asignando al estado el valor de la tarea específica que queremos modificar para así poder modificarlo.
      setTask(tasks.find(task => task.id === params.id));
    }
  }, [params.id, tasks])

  return (
    <div>
      <h1 className='block text-xl font-bold'>Create task</h1>
      <form onSubmit={handleSubmit} className='bg-zinc-800 max-w-sn p-4 mb-1'>
        <label htmlFor='title' className='block text-sm font-bold mb-2'>Task</label>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={task.title}
          className='w-full p-2 rounded-md bg-zinc-600 mb-2'
        ></input>

        <label htmlFor='description' className='block text-sm font-bold mb-2'>Description</label>
        <textarea
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={task.description}
          className='w-full p-2 rounded-md bg-zinc-600 mb-2'
        ></textarea>
        <div className="flex justify-between">
        <button onClick={() => navigate('/')} className="bg-gray-600 px-2 py-1 mb-1"> Back </button>          
        <button className='bg-indigo-600 px-2 py-1 mb-2'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm