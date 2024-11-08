// ChoiceButton.tsx
import React, { memo } from 'react';
import { Pressable, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { CHOICE_COLORS } from '@/constants/constants';

interface ChoiceButtonProps {
    choice: ElementType;
    index: number;
    opacity: SharedValue<number>;
    position: SharedValue<number>;
    onPress: () => void;
    disabled: boolean;
}

const ChoiceButton = ({ choice, index, opacity, position, onPress, disabled }: ChoiceButtonProps) => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: position.value }],
    }));

    return (
        <Animated.View style={[styles.option, { backgroundColor: CHOICE_COLORS[choice] }, animatedStyle]}>
            <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.option}>
                <Text style={styles.button}>{choice}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    option: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        fontSize: 18,
        fontFamily: 'SamsungBold',
    },
});

export default memo(ChoiceButton);
