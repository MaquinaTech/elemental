import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface ScoreDisplayProps {
    label: string;
    score: number;
    style?: ViewStyle;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = React.memo(({ label, score, style }) => (
    <View style={[styles.scoreContainer, style]}>
        <Text style={styles.scoreText}>{label}</Text>
        <Text style={styles.scoreNumber}>{score}</Text>
    </View>
));

const styles = StyleSheet.create({
    scoreContainer: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    scoreText: {
        fontSize: 18,
        fontFamily: 'SamsungMedium',
    },
    scoreNumber: {
        fontSize: 24,
        fontFamily: 'SamsungBold',
    },
});

export default ScoreDisplay;
