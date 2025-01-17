// app/modal.js
import React from 'react';
import {Button, Text, View} from 'react-native';
import {useRouter} from 'expo-router';

const ModalScreen = () => {
    const router = useRouter();

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>This is a modal!</Text>
            <Button title="Close Modal" onPress={() => router.back()}/>
        </View>
    );
};

export default ModalScreen;