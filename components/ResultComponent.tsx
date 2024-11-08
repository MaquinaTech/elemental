import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

interface Props {
    winner: ResultType;
}

const ResultComponent: React.FC<Props> = ({ winner }) => {

    const handleWinner = () => {
        if (winner === 'player') {
            return '¡Victoria!';
        } else {
            return '¡Derrota!';
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>
                {handleWinner()}
            </Text>
            <View style={styles.linksWrapper}>
                <Text style={styles.linkText}>
                    <Link href="/game" style={styles.link} replace>
                        Play again
                    </Link>
                </Text>
                <Text style={styles.linkText}>
                    <Link href="/" style={styles.link}>
                        Main menu
                    </Link>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 26,
    },
    resultText: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'SamsungBold',
    },
    linksWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    link: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'SamsungMedium',
    },
    linkText: {
        backgroundColor: 'lightcoral',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default ResultComponent;
