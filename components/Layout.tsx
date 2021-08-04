import React from 'react';

import {StyleSheet,SafeAreaView, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar";

const Layout = (props: any) => {
    return (
        <SafeAreaView>

        <View style={styles.container}>
            <StatusBar style="auto"/>
            {props.children}

        </View>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Layout;
