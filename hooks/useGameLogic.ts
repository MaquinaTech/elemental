import { RULES } from '@/constants/constants';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { computerScore, incrementPlayerScore } from '@/redux/slices/scoreSlice';

const useGameLogic = () => {
    const dispatch = useDispatch();
    const [result, setResult] = useState<ResultType | null>(null);
    const [computerChoice, setComputerChoice] = useState<ElementType | null>(null);

    const getComputerChoice = () => {
        const choices: ElementType[] = ['fire', 'water', 'plant'];
        return choices[Math.floor(Math.random() * choices.length)];
    };

    const handleResult = useCallback((roundResult: ResultType) => { 
        if (roundResult === 'player') {
            dispatch(incrementPlayerScore());
        } else if (roundResult === 'computer') {
            dispatch(computerScore());
        }
        setTimeout(() => {
            setResult(roundResult);
        }, 1000);
    }, []);

    const playRound = useCallback((playerChoice: ElementType): ResultType => {
        const computerChoice = getComputerChoice();
        setComputerChoice(computerChoice);

        const roundResult =
            playerChoice === computerChoice
                ? 'draw'
                : RULES[playerChoice] === computerChoice
                ? 'player'
                : 'computer';
        handleResult(roundResult);
        return roundResult;
    }, []);

    return { playRound, result, computerChoice };
};

export default useGameLogic;
