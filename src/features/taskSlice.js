import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id:'1',
        title: 'Task 1',
        description: 'Task description',
        completed: false,
    },
    {
        id:'2',
        title: 'Task 2',
        description: 'Task 2 description',
        completed: false,
    }
]


const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers: {
        //Esto agrega al initialState los valores que estamos pasando al dispatch(addTask(task)). Como estos llegan como un action (objeto con type y payload) necesitamos tomar solo los valores del payload.
        addTask: (state, action)=> {
            state.push(action.payload)
            //En react y en redux no podemos alterar o mutar los estados, por lo que pushear datos al mismo no estaría permitido y deberíamos hacer [...initialState, action.payload], sin embargo, redux toolkit nos permite hacer push sin mutar el estado.
        },

        //Este reducer busca en el state (arreglo de las tareas) cual id de las tareas coincide con el id que le llega del action. Una vez lo encuentra, se usa un splice para pararnos en el indice de la tarea y eliminar solo esa tarea.
        deleteTask:(state,action) => {
            const taskFound = state.find(task => task.id === action.payload)
            if(taskFound) {
                state.splice(state.indexOf(taskFound), 1);
            }
        },
        //Este reducer nos permite actualizar las tareas que queremos modificar
        editeTask:(state,action)=> {
            const {id, title, description} = action.payload;
            const foundTask = state.find(task  => task.id === id)
            if(foundTask) {
                foundTask.title = title;
                foundTask.description = description;
            }
        }
    }
})
//Exportando el taskSlice.reducer estamos permitiendo a otros componentes acceder al estado de la store.
export const {addTask, deleteTask, editeTask} = taskSlice.actions;
export default taskSlice.reducer;