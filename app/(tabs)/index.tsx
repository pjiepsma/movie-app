import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <Text>Home</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    conrtainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
