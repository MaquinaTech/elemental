import { setAdult } from '@/redux/slices/authSlice';
import { Text, StyleSheet, Pressable, View, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';

const AuthAdult: React.FC = () => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = useCallback(() => {
        dispatch(setAdult());
    }, [dispatch]);

    const handleNoPress = useCallback(() => {
        setModalVisible(true);
    }, []);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Are you over 18 years old?</Text>
            <View style={styles.buttonGroup}>
                <Pressable style={styles.button} onPress={handleNoPress}>
                    <Text style={styles.buttonText}>No</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Yes</Text>
                </Pressable>
            </View>    

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>You must be over 18 to play!</Text>
                        <Pressable style={styles.modalButton} onPress={handleCloseModal}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'SamsungBold',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        width: '48%',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'SamsungBold',
    },
    // Estilos del modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo translúcido
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'SamsungBold',
        marginBottom: 20,
    },
    modalButton: {
        width: '50%',
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontFamily: 'SamsungBold',
    },
});

export default AuthAdult;
