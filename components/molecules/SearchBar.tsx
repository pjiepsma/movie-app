import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import SearchInput from '@/components/atoms/SearchInput';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onClear: () => void;
}

const SearchBar = ({value, onChangeText, onClear}: SearchBarProps) => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#000" style={styles.icon}/>
            <SearchInput placeholder="e.g. Pulp Fiction" value={value} onChangeText={onChangeText}/>
            <Pressable onPress={onClear}>
                <Ionicons name="close" size={20} color="#000" style={styles.icon}/>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
    },
    icon: {
        padding: 10,
    },
});

export default SearchBar;
