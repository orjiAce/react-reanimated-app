import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle,withRepeat, withTiming, withSpring} from 'react-native-reanimated'
import Layout from "./components/Layout";
import Interpolate from "./screen/Interpolate";
import Theme from "./screen/InterpolateColor";
import PinchGesture from "./screen/PinchGestureHandler";
import DoubleTap from "./screen/DoubleTap";
import SwipeWithPan from "./screen/SwipeWithPanGesture";


const SIZE = 100.0
const handleRotation = (progress: Animated.SharedValue<number>) => {
    'worklet';
    return `${progress.value * 2 * Math.PI}rad`;
};

export default function App() {

//this example was for our simple box scale transition animation effect
    const progress = useSharedValue(0)
    const scale = useSharedValue(0)

    const reanimatedStyle = useAnimatedStyle(() => {

        return {
            opacity: progress.value,
            borderRadius: (progress.value * SIZE) / 2,
            transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
        }

    },[])

    useEffect(() =>{


        progress.value = withRepeat(withSpring(0.5), -1, true);
        scale.value = withRepeat(withSpring(1), -1, true);
    },[])


    {/*   <Animated.View style={[{
                height: SIZE, width: SIZE, backgroundColor: 'purple'
            }, reanimatedStyle]}>

            </Animated.View>
            */}

    return (
            <SwipeWithPan/>

    );
}

