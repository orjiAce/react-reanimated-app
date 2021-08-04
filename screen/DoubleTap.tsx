import React, {useCallback, useRef} from 'react';

import {StyleSheet, Image, View, Dimensions, ImageBackground} from 'react-native';
import {TapGestureHandler} from "react-native-gesture-handler";
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming} from 'react-native-reanimated'


//in this example we will replicate the instagram double tab
const {width: SIZE} = Dimensions.get('window');

//we need to create animated image component if the animation will not work
const AnimatedImage = Animated.createAnimatedComponent(Image);


const DoubleTap = () => {
//we create the scale value for our image animation
    const scale = useSharedValue(0);
    const opacity = useSharedValue(1);

    //double tap ref
    const doubleTapRef = useRef()


    //to add animation we the specify animated style using teh useAnimatedStyle hook

    const rStyle = useAnimatedStyle(() =>({
//this style required no return statement
        transform: [{ scale: Math.max(scale.value, 0) }],
    }))

    const rTextStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    //so on double tap of the image
    const onDoubleTap = useCallback(() => {
        //update the scale value to 1
        scale.value = withSpring(1, undefined, (isFinished) => {

            //when it's finished send the value back to 0
            if (isFinished) {
                scale.value = withDelay(100, withSpring(0));
            }
        });
    }, []);


    const onSingleTap = useCallback(() => {
        opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) {
                opacity.value = withDelay(500, withTiming(1));
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
                <TapGestureHandler
                    ref={doubleTapRef}
                    maxDelayMs={250}
                    numberOfTaps={2}
                    onActivated={onDoubleTap}>

                    <Animated.View>
                    <ImageBackground source={require('../assets/image.jpeg')}
                           style={styles.image}
                    >
                        <AnimatedImage source={require('../assets/heart.png')}
                               resizeMode='center'
                        style={[
                            {
                                shadowOffset: { width: 0, height: 20 },
                                shadowOpacity: 0.35,
                                shadowRadius: 35,
                            },
                            styles.image,
                            rStyle,
                        ]}/>
                    </ImageBackground>
                        <Animated.Text style={[styles.turtles, rTextStyle]}>
                            🐢🐢🐢🐢
                        </Animated.Text>
                    </Animated.View>
                </TapGestureHandler>
            </TapGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: SIZE,
        height: SIZE,
    },
    turtles: {fontSize: 40, textAlign: 'center', marginTop: 30},
});

export default DoubleTap;
