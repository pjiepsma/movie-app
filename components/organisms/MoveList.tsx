import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Movie} from '@/interfaces/movies';
import MoveListItem from '@/components/organisms/MovieListItem';
import EmptySearchResult from '@/components/molecules/EmptySearchResult';

interface MovieListProps {
    movies: Movie[] | undefined;
    loading: boolean;
    onMoviePress: (item: Movie) => void;
}

const MovieList = ({movies, loading, onMoviePress}: MovieListProps) => {
    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <FlatList
                    data={movies}
                    numColumns={2}
                    ListEmptyComponent={EmptySearchResult}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <MoveListItem item={item} onPress={() => onMoviePress(item)}/>
                    )}
                    columnWrapperStyle={styles.columnWrapper}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default MovieList;
