// GameOptionSelector.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import useGameLogic from '../hooks/useGameLogic';
import useGameAnimations from '../hooks/useGameAnimations';
import ChoiceButton from './ChoiceButton';
import { CHOICE_COLORS, CHOICES } from '@/constants/constants';

const GameOptionSelector = () => {
    const { playRound, result, computerChoice } = useGameLogic();
    const [selectedChoice, setSelectedChoice] = useState<ElementType | null>(null);

    const {
        positions,
        opacities,
        computerChoiceOpacity,
        resultOpacity,
        isSelectable,
    } = useGameAnimations(selectedChoice, playRound, result);

    // Handle player choice, reset if the same choice is selected again
    const handlePlayerChoice = (choice: ElementType) => () => {
        if (isSelectable) {
            // If the same option is selected again, reset the game
            if (selectedChoice === choice) {
                setSelectedChoice(null);  // Reset choice and let user select again
            } else {
                setSelectedChoice(choice);  // Make new selection
            }
        }
    };

    const getResultMessage = () => {
        if (result === 'draw') return 'Empate';
        return result === 'player' ? '¡Victoria!' : '¡Derrota!';
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Choose your element</Text>
            <View style={styles.options}>
                {CHOICES.map((choice, index) => (
                    <ChoiceButton
                        key={choice}
                        choice={choice}
                        index={index}
                        opacity={opacities[index]}
                        position={positions[index]}
                        onPress={handlePlayerChoice(choice)}
                        disabled={selectedChoice !== null && !isSelectable}
                    />
                ))}
            </View>

            {computerChoice && (
                <Animated.View
                    style={[styles.option, { backgroundColor: CHOICE_COLORS[computerChoice] }, { opacity: computerChoiceOpacity }]}
                >
                    <Text style={styles.selectedChoiceText}>{computerChoice}</Text>
                </Animated.View>
            )}

            {result && (
                <Animated.View style={[styles.resultContainer, { opacity: resultOpacity }]}>
                    <Text style={styles.resultText}>{getResultMessage()}</Text>
                </Animated.View>
            )}
        </View>
    );
};

export default GameOptionSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'SamsungBold',
    },
    options: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: 30,
        marginBottom: 40,
    },
    option: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    resultContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 20,
        fontFamily: 'SamsungBold',
    },
    selectedChoiceText: {
        fontSize: 18,
        fontFamily: 'SamsungBold',
        textAlign: 'center',
    },
});
