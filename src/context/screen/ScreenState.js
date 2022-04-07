import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ScreenContext} from "./screenContext";
import {screenReducer} from "./ScreenReducer";

const ScreenState = ({children}) => {

    const [state,dispatch]=React.useReducer(screenReducer,null)

    const changeState=(id)=>{
        dispatch({
            type:"CHANGE_STATE",
            payload:id
        })
    }


    return (
        < ScreenContext.Provider value={{
            state,
            changeState
        }} >

            {
                children
            }

        </ScreenContext.Provider>
    );
};

export default ScreenState;

