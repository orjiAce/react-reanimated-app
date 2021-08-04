import React from 'react';

import {Dimensions, Text, View, StyleSheet} from 'react-native';
import Animated, {interpolate, Extrapolate, useAnimatedStyle} from 'react-native-reanimated';

//our props
interface PageProps {
    title: string,
    color: string,
    translateX: Animated.SharedValue<number>
    index: number
}


//design how each page will display

const {height, width} = Dimensions.get('window')
const SIZE = width * 0.7


const Page = (props: PageProps) => {
    const {translateX, index,color,title} = props
    const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];


    const rAninatedStyle = useAnimatedStyle(() => {


        /*
        basically this means when translateX value is equal to
         (index - 1) * width our scale value is equal to 0
         when TranslateX value is equal to index * width our scale value
         is equal 1 and so on
      * */
        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        );

        const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0, SIZE / 2, 0],
            Extrapolate.CLAMP
        );

        return {
            borderRadius,
            transform: [{scale: scale}]
        }
    })

    const rTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            translateX.value,
            inputRange,
            [height / 2, 0, -height / 2],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            translateX.value,
            inputRange,
            [-2, 1, -2],
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY: translateY }],
        };
    });

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <Animated.View style={[rAninatedStyle,
                styles.square]}/>

            <Animated.View style={[styles.textContainer,
                rTextStyle]}>
                <Text style={styles.text}>{title}</Text>
            </Animated.View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: '#242424'
    },
    text: {
        color:'white',
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: '700',
    },
    textContainer: { position: 'absolute', alignItems:'center' },
})

export default Page;
