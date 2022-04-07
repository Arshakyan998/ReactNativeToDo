import React from 'react';
import {Text, View, StyleSheet,ActivityIndicator} from 'react-native';
import {THEME} from "../../theme";


const AppLoader = () => {

    return (
        <View style={styles.container}>


   <ActivityIndicator size='large' color={THEME.MAIN_COLOR} />
        </View>
    );
};

export default AppLoader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',

    }
})