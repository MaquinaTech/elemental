import { memo } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface AuthInputFieldProps extends TextInputProps {
    label: string;
    error?: string;
    touched?: boolean;
}

const AuthInputField: React.FC<AuthInputFieldProps> = ({ label, error, touched, ...props }) => {
    const hasError = touched && error;

    return (
        <View style={styles.inputContainer}>
            <TextInput
                {...props}
                style={[styles.input, hasError ? styles.inputError : undefined]}
                placeholder={label}
                placeholderTextColor="#888" // Color para el texto del placeholder
            />
            {hasError && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default memo(AuthInputField);

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontFamily: 'Samsung',
    },
    inputError: {
        borderColor: 'red',
        fontFamily: 'Samsung',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        fontFamily: 'SamsungMedium',
    },
});
