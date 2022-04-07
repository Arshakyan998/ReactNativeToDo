import React, {useContext, useState} from 'react';

import {View, Text, StyleSheet, Alert, SafeAreaView} from "react-native";
import {Navbar} from "./components/Navbar";
import {THEME} from "./theme";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {ScreenContext} from "./context/screen/screenContext";
import {TodoContext} from "./context/todo/todoContext";

export const MainLeyout = () => {

    const [todoId, setTodoId] = useState(null)
    const [todos, setTodos] = useState([])

    const screenContext=useContext(ScreenContext)
    const context=useContext(TodoContext)


     const addTodo = title => {
        context.addToDo(title)

    }

    const removeTodo = id => {

        const todo=context.todos.find(el=>el.id===id)

        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${todo.title}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        screenContext.changeState(null)
                         context.removeTodo(id)
                    }
                }
            ],
            { cancelable: false }
        )
    }

    const updateTodo = (id, title) => {
      context.update(id,title)
    }

    const changeToDoId=(id)=>{

        screenContext.changeState(id)

    }


    React.useEffect(()=>{
         (async ()=>{
            await context.getDate()
        })()

     },[])

    let content = (
        <MainScreen
            todos={context.todos}
            addTodo={addTodo}
            removeTodo={removeTodo}
            openTodo={changeToDoId}
        />
    )

    if (screenContext.state) {
        const selectedTodo = context.todos.find(todo => todo.id === screenContext.state)

        content = (
            <TodoScreen
                onRemove={removeTodo}
                goBack={() => screenContext.changeState(null)}
                todo={selectedTodo}
                onSave={updateTodo}
            />
        )
    }
    return (
        <SafeAreaView>
            <Navbar title='Todo App!' />
            <View style={styles.container}>{content}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    }
})