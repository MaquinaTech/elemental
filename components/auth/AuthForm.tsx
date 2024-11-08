import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '@/redux/slices/authSlice';
import { User } from '@/types/user';
import AuthInputField from '../ui/AuthInputField';
import { Text, StyleSheet, Alert, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Minimum 1 character')
        .required('Name is required'),
    username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'Only alphanumeric characters')
        .min(3, 'Minimum 3 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Ivalid email')
        .required('Email is required'),
});


const AuthForm: React.FC = () => {
    const dispatch = useDispatch();

    const handleSubmit = useCallback((values: User) => {
        dispatch(login(values));
        Alert.alert('¡Welcome!', 'You have been registered successfully');
    }, [dispatch]);

    return (
        <>
            <Text style={styles.title}>Register</Text>
            <Formik
                initialValues={{ name: '', username: '', email: '', isAdult: false }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <AuthInputField
                            label="Nombre"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            error={errors.name}
                            touched={touched.name}
                        />
                        <AuthInputField
                            label="Nombre de usuario"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            error={errors.username}
                            touched={touched.username}
                        />
                        <AuthInputField
                            label="Correo electrónico"
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                        />
                        <Pressable style={styles.button} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>Register</Text>
                        </Pressable>
                    </>
                )}
            </Formik>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'SamsungBold',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'SamsungBold',
    },
});

export default AuthForm;