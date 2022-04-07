import {constance} from "../types";


const handler = {
    [constance.ADD_TODO]: (state, addToDo) => {
        const newTodo = [...state.todos,  addToDo]


        return {
            ...state,
            todos: newTodo
        }

    },
    [constance.UPDATE_TODO]: (state, {id, title}) => {
        const newTodo = [...state.todos].map(el => {
            if (el.id === id) {
                el.title = title
            }
            return el
        })


        return {
            ...state,
            todos: newTodo
        }


    },
    [constance.REMOVE_TODO]: (state, id) => {


        const newTodo = [...state.todos].filter(el => el.id !== id)

        return {
            ...state,
            todos: newTodo
        }
    },
    [constance.IS_LOADING]:(state,loading)=>({...state,isLoading:loading }),
    [constance.GET_ERROR]:(state,error)=>({...state,error}),
    [constance.GET_DATE]:(state,todos)=>({...state,todos}),

    default: (state) => state
}


export const todoReducer = (state, action) => {


    const result = handler[action.type] || handler.default

    return result(state, action.payload)


}
