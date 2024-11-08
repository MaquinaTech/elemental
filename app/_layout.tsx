import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainComponent from '@/components/MainComponent';
import { StyleSheet } from 'react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        Samsung: require('../assets/fonts/Samsung.ttf'),
        SamsungMedium: require('../assets/fonts/SamsungMedium.ttf'),
        SamsungBold: require('../assets/fonts/SamsungBold.ttf')
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider style={styles.safeArea}>
                <MainComponent />
            </SafeAreaProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#ececec'
    }
});