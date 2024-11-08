// useGameAnimations.ts
import { useState, useEffect, useCallback } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { CHOICES } from '@/constants/constants';

const ANIMATION_TIME = 400;

const useGameAnimations = (selectedChoice: ElementType | null, playRound: Function, result: string | null) => {
    const animations = {
        positions: [
            useSharedValue(0),
            useSharedValue(0),
            useSharedValue(0),
        ],
        opacities: [
            useSharedValue(1),
            useSharedValue(1),
            useSharedValue(1),
        ],
        computerChoiceOpacity: useSharedValue(0),
        resultOpacity: useSharedValue(0),
    };

    const [isSelectable, setIsSelectable] = useState(true);

    // Animate the choices to the center
    const animateChoices = useCallback(() => {
        animations.positions[0].value = withTiming(100, { duration: ANIMATION_TIME });
        animations.positions[1].value = withTiming(0, { duration: ANIMATION_TIME });
        animations.positions[2].value = withTiming(-100, { duration: ANIMATION_TIME });

        // Cambiar opacidades de acuerdo a la elección del jugador
        animations.opacities[0].value = withTiming(selectedChoice === CHOICES[0] ? 1 : 0, { duration: ANIMATION_TIME });
        animations.opacities[1].value = withTiming(selectedChoice === CHOICES[1] ? 1 : 0, { duration: ANIMATION_TIME });
        animations.opacities[2].value = withTiming(selectedChoice === CHOICES[2] ? 1 : 0, { duration: ANIMATION_TIME });
    }, [selectedChoice]);

    // Reset the animations
    const resetAnimations = useCallback(() => {
        animations.positions.forEach((position) => {
            position.value = withTiming(0, { duration: ANIMATION_TIME });
        });

        animations.opacities.forEach((opacity) => {
            opacity.value = withTiming(1, { duration: ANIMATION_TIME });
        });

        animations.computerChoiceOpacity.value = withTiming(0, { duration: ANIMATION_TIME });
        animations.resultOpacity.value = withTiming(0, { duration: ANIMATION_TIME });

        setIsSelectable(true);
    }, []);

    useEffect(() => {
        if (selectedChoice) {
            setIsSelectable(false);
            animateChoices();

            const timeouts: NodeJS.Timeout[] = [];

            // Init the computer choice after the animations
            timeouts.push(setTimeout(() => {
                playRound(selectedChoice);
                animations.computerChoiceOpacity.value = withTiming(1, { duration: ANIMATION_TIME });
            }, ANIMATION_TIME));

            // Show the result after hiding the losing choice
            timeouts.push(setTimeout(() => {
                animations.resultOpacity.value = withTiming(1, { duration: ANIMATION_TIME });
            }, ANIMATION_TIME * 3));

            // Reset the animations after showing the result
            timeouts.push(setTimeout(() => {
                resetAnimations();
            }, ANIMATION_TIME * 5));

            return () => {
                timeouts.forEach(clearTimeout);
            };
        }
    }, [selectedChoice, animateChoices, resetAnimations]);

    return {
        positions: animations.positions,
        opacities: animations.opacities,
        computerChoiceOpacity: animations.computerChoiceOpacity,
        resultOpacity: animations.resultOpacity,
        isSelectable
    };
};

export default useGameAnimations;
