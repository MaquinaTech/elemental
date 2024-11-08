import { View, Text, StyleSheet } from 'react-native';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Link } from 'expo-router';

const HomeScreen: React.FC = () => {
    const username = useSelector((state: RootState) => state.auth.user.username);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>¡Bienvenido {username}!</Text>
                <Text style={styles.subtitle}>Has iniciado sesión correctamente.</Text>
            </View>
            <View style={styles.gameWrapper}>
                <Link href="/game" style={styles.link}>
                    <Text style={styles.text}>Elemental</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#ececec',
    },
    header: {
        marginBottom: 20,
        gap: 7,
    },
    title: {
        fontSize: 24,
        fontFamily: 'SamsungBold',
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'SamsungMedium',
    },
    link: {
        color: 'white',
        padding: 20
    },
    linkText: {
        color: 'black',
        borderRadius: 5,
        fontFamily: 'SamsungBold',
    },
    text: {
        color: 'black',
        borderRadius: 5,
        fontFamily: 'SamsungBold',
    },
    gameWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        maxWidth: 150,
    },
});

export default HomeScreen;
