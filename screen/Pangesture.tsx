import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';


const SIZE = 100.0
const CIRCLE_RADIUS = SIZE * 2;

//we define our context type
type ContextType = {
    translateX: number;
    translateY: number;
};

const Pangesture = () => {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({

        //we store the previous value using the context object
        onStart: (event, context) => {

            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            //we also retrieve the previous value using the context
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
        onEnd: () => {
            //this control where the gesture bounces back to zero
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

            if (distance < CIRCLE_RADIUS + SIZE / 2) {
                //if the gesture distance is less than the radius of the circle
                //bounce back to initial value
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        },
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    return (
<View style={styles.circle}>

 <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View  style={[styles.box, rStyle]} />
            </PanGestureHandler>
</View>

    );
};

const styles = StyleSheet.create({
    box:{
        width:SIZE,
        height:SIZE,
        backgroundColor:'#151ff1',
        borderRadius:15,
    },
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 5,
        borderColor: 'rgba(0, 0, 256, 0.5)',
    },
})

export default Pangesture;
