import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface NavigationControlsProps {
    onNext: () => void;
    onPrevious: () => void;
    isPreviousDisabled: boolean;
}

const NavigationControls = ({onNext, onPrevious, isPreviousDisabled}: NavigationControlsProps) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onPrevious} disabled={isPreviousDisabled}>
                <Text style={styles.text}>Previous</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onNext}>
                <Text style={styles.text}>Next</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
        padding: 8,
    },
});

export default NavigationControls;
