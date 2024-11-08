import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { resetScore } from '@/redux/slices/scoreSlice';
import GameOptionSelector from '@/components/GameOptionSelector';
import ScoreDisplay from '@/components/ScoreDisplay';
import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';
import ResultComponent from '@/components/ResultComponent';

// Memoized selector
const selectGameScores = createSelector(
    (state: RootState) => state.score,
    (score) => ({
        playerScore: score.playerScore,
        computerScore: score.computerScore,
        rounds: score.rounds,
    })
);

const GameScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { playerScore, computerScore, rounds } = useSelector(selectGameScores, shallowEqual);
    const [gameResult, setGameResult] = useState<ResultType | null>(null);

    // Reset score when component mounts
    useEffect(() => {
        dispatch(resetScore());
    }, [dispatch]);

    // Reset score when game ends
    useEffect(() => {
        if (gameResult) {
            dispatch(resetScore());
        }
    }, [gameResult, dispatch]);

    // Verify if there is a winner after each round
    useEffect(() => {
        if (playerScore >= 3) {
            setGameResult('player');
        } else if (computerScore >= 3) {
            setGameResult('computer');
        }
    }, [playerScore, computerScore]);

    if (gameResult !== null) {
        return <ResultComponent winner={gameResult} />;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Round: {rounds}</Text>
                </View>
                <View style={styles.scoreWrapper}>
                    <ScoreDisplay label="Player" score={playerScore} style={styles.scorePlayer} />
                    <ScoreDisplay label="Computer" score={computerScore} style={styles.scoreComputer} />
                </View>
                <GameOptionSelector />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#ececec',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontFamily: 'SamsungBold',
    },
    scoreWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
        marginBottom: 20,
    },
    scorePlayer: {
        flex: 1,
        marginRight: 4,
        backgroundColor: 'lightblue',
    },
    scoreComputer: {
        flex: 1,
        marginLeft: 4,
        backgroundColor: 'lightcoral',
    },
});

export default GameScreen;
