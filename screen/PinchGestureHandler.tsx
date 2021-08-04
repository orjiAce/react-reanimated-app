import React from 'react';

import {StyleSheet, Dimensions, Image} from 'react-native';
import {
    PinchGestureHandler,
    PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';




// Credit to Mariana Ibanez https://unsplash.com/photos/NJ8Z8Y_xUKc
const imageUri =
    'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

//this is required to create animated image
const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width, height } = Dimensions.get('window');

const PinchGesture = () => {


    const scale = useSharedValue(1);

    //to scale the image from the focal point
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({

        //with <PinchGestureHandlerGestureEvent> as the type
            onActive: (event) => {
                scale.value = event.scale;
                focalX.value = event.focalX;
                focalY.value = event.focalY;
            },

            onEnd: () => {
                //return the image back to initial when finger is released
                scale.value = withTiming(1);
            },
        });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateX: -width / 2 },
                { translateY: -height / 2 },
                { scale: scale.value },
                { translateX: -focalX.value },
                { translateY: -focalY.value },
                { translateX: width / 2 },
                { translateY: height / 2 },
            ],
        };
    });

    //focal point is the center of between the two fingers

    const focalPointStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
        };
    });

    return (
        <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.View style={{ flex: 1 }}>
                <AnimatedImage
                    style={[{ flex: 1 }, rStyle]}
                    source={{ uri: imageUri }}
                />
                <Animated.View style={[styles.focalPoint, focalPointStyle]} />
            </Animated.View>
        </PinchGestureHandler>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    focalPoint: {
        ...StyleSheet.absoluteFillObject,
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
});

export default PinchGesture;
