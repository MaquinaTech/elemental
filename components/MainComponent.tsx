import React, { useEffect, useCallback, memo } from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthComponent from './auth/AuthComponent';
import { finishLoading } from '@/redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '@/components/LoadingComponent';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

// Selector memoization
const selectAuth = createSelector(
    (state: RootState) => state.auth,
    (auth) => ({
        isAuthenticated: auth.isAuthenticated,
        loading: auth.loading,
    })
);

const MainComponent: React.FC = () => {
    const { isAuthenticated, loading } = useSelector(selectAuth);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    // Finish loading after 1.5 seconds
    useEffect(() => {
        const timer = setTimeout(() => dispatch(finishLoading()), 1500);
        return () => clearTimeout(timer);
    }, [dispatch]);

    // Render content based on loading and authentication status
    const renderContent = useCallback(() => {
        if (loading) {
            return <LoadingComponent />;
        }
        if (!isAuthenticated) {
            return <AuthComponent />;
        }
        return <Slot />;
    }, [loading, isAuthenticated]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                    paddingBottom: insets.bottom,
                }
            ]}>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

export default memo(MainComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ececec',
    },
    centeredContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
    },
});
