import { createSlice } from '@reduxjs/toolkit';

interface ScoreState {
    playerScore: number;
    computerScore: number;
    rounds: number;
}

const initialState: ScoreState = {
    playerScore: 0,
    computerScore: 0,
    rounds: 0,
};

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        incrementPlayerScore: (state) => {
            state.playerScore += 1;
            state.rounds += 1;
        },
        computerScore: (state) => {
            state.computerScore += 1;
            state.rounds += 1;
        },
        resetScore: (state) => {
            state.playerScore = 0;
            state.computerScore = 0;
            state.rounds = 0;
        },
    },
});

export const { incrementPlayerScore, computerScore, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
