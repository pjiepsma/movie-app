import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface SearchInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const SearchInput = ({placeholder, value, onChangeText}: SearchInputProps) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        color: '#424242',
        borderRadius: 8,
    },
});

export default SearchInput;
