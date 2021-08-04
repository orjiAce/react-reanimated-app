import React, {useState} from 'react';

import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue, useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const Colors = {
    dark: {
        background: '#1E1E1E',
        circle: '#252525',
        text: '#F8F8F8',
    },
    light: {
        background: '#F8F8F8',
        circle: '#FFF',
        text: '#1E1E1E',
    },
};

const SIZE = Dimensions.get('window').width * 0.7;

const SWITCH_TRACK_COLOR = {
    true: 'rgba(0,64,255, 0.2)',
    false: 'rgba(0,0,0,0.1)',
};

type Theme = 'light' | 'dark';



const Theme = () => {

    const [theme, setTheme] = useState<Theme>('light');

    const progress = useDerivedValue(() =>{
        return theme === 'dark' ? withTiming(1) : withTiming(0)
    },[theme])

    const rStyle = useAnimatedStyle(()=>{

        const backgroundColor = interpolateColor(
            progress.value,
            [0,1],
            [Colors.light.background, Colors.dark.background]
            )

        return{
backgroundColor
        }
    })




    const rCircleStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.circle, Colors.dark.circle]
        );

        return { backgroundColor };
    });

    const rTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.text, Colors.dark.text]
        );

        return { color };
    });

    return (
        <Animated.View style={[rStyle,styles.container]}>
            <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
<Animated.View style={[rCircleStyle, styles.circle]}>
    <Switch trackColor={SWITCH_TRACK_COLOR}
            thumbColor='blue'
            value={theme === 'dark'} onValueChange={(toggled) => {
        setTheme(toggled ? 'dark' : 'light')
    }}/>
</Animated.View>

        </Animated.View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        width: SIZE,
        height: SIZE,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE / 2,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 8,
    },
    text: {
        fontSize: 70,
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: 14,
        marginBottom: 35,
    },
})

export default Theme;
