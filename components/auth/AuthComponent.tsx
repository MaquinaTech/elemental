import React, { memo, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import AuthForm from './AuthForm';
import AuthAdult from './AuthAdult';

const AuthComponent: React.FC = () => {
    const isAdult = useSelector((state: RootState) => state.auth.user.isAdult);

    const renderContent = useCallback(() => {
        if (isAdult) {
            return <AuthForm />
        } else {
            return <AuthAdult />
        }
    }, [isAdult]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {renderContent()}
            </ScrollView>
        </View>
    );
};

export default memo(AuthComponent);

// Estilos constantes optimizados
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ececec',
    },
});
