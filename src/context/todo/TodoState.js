import React, { useReducer } from 'react'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import {constance} from "../types";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
      isLoading:false,
      error:' '
  }
  const [state, dispatch] = useReducer(todoReducer, initialState)

    const addToDo=async (title)=>{

     const response= await fetch('https://rn-todo-app-16820-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
         {
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              title
          })
        })



        const  { name}= await response.json()


        dispatch({
          type:constance.ADD_TODO,
          payload: { title,id:name}

      })
    }

    const removeTodo=async (id)=>{
        await fetch(`https://rn-todo-app-16820-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,{
            method:"DELETE",
        })
        dispatch({
            type:constance.REMOVE_TODO,
            payload:id
        })
    }

    const update=async (id,title)=>{
        let response=await fetch(`https://rn-todo-app-16820-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title
            })
        })

        let data=await response.json()

        dispatch({
            type:constance.UPDATE_TODO,
            payload:{
                id,
                title:data.title
            }

        })
    }


    const getDate=async ()=>{

   try {


       dispatch({
           type:constance.IS_LOADING,
           payload:true
       })

       let response=await fetch('https://rn-todo-app-16820-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
       let data=await response.json()

       let result= Object.keys(data).reduce((aggr=[],el)=>{
            aggr=  [...aggr,{
               title:data[el].title,
               id:el
           }]
           return aggr
       },[])


      dispatch({
          type:constance.GET_DATE,
          payload:result
      })



   }catch (e) {
       dispatch({
           type:constance.GET_ERRORE,
           payload:'Ape mi ban sxala'
       })

   }finally {
        dispatch({
            type:constance.IS_LOADING,
            payload:false
        })
   }
    }


  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
          addToDo,
          removeTodo,
          update,
          getDate,
          state
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
