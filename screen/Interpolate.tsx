import React from 'react';

import {Text, Dimensions, StyleSheet} from 'react-native';
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import Page from "../components/InterpolatePage";

//words displayed on each page
const Words = [
    {
        title: "What's up",
        color: "#ff3d64"
    },
    {
        title: "React-native",
        color: "#a73eff"
    },
    {
        title: "Devs",
        color: "#ffff76"
    },
    {
        title: "Building something?",
        color: "#2626f5"
    }]


const Interpolate = () => {


    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        //we can access the horizontal amount we are scrolling
        translateX.value = event.contentOffset.x
    })
    //        scrollEventThrottle={16} means we want to handle onScroll event each in 16 millisecond

    return (
        <Animated.ScrollView

            onScroll={scrollHandler}
            horizontal
            scrollEnabled
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            style={styles.container}>
            {
                Words.map((word, index) => (
                    <Page translateX={translateX} key={index.toString()} title={word.title} color={word.color} index={index}/>
                ))
            }

        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

export default Interpolate;
