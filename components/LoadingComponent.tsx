import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming, interpolate } from 'react-native-reanimated';

const LoadingComponent = () => {
    const rotation = useSharedValue(0);

    rotation.value = withRepeat(
        withTiming(360, {
            duration: 2000,
            easing: Easing.linear,
        }),
        -1
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${interpolate(rotation.value, [0, 360], [0, 360])}deg` }],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('@/assets/images/logo.jpeg')}
                style={[styles.image, animatedStyle]}
            />
        </View>
    );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0bc481',
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default LoadingComponent;