import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text} from 'react-native';
import {useDebounce} from 'use-debounce';
import {useRouter} from 'expo-router';

import {Movie} from '@/interfaces/movies';
import SearchBar from '@/components/molecules/SearchBar';
import NavigationControls from '@/components/molecules/NavigationControls';

import {fetchPopularMovies, fetchSearchedMovies} from '@/services/movieApiService';
import MovieList from "@/components/organisms/MoveList";

const HomeScreen = () => {
    const router = useRouter();

    const [popularMovies, setPopularMovies] = useState<Movie[]>();
    const [searchMovies, setSearchedMovies] = useState<Movie[]>();


    const [search, setSearch] = useState<string>('');
    const [debounceSearch] = useDebounce(search, 500);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();

    useEffect(() => {
        setPage(1);
    }, [debounceSearch]);

    useEffect(() => {
        const getPopularMovies = async () => {
            setLoading(true);
            try {
                const data = await fetchPopularMovies(page);
                setPopularMovies(data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getPopularMovies();
    }, [page]);

    useEffect(() => {
        const getSearchedMovies = async () => {
            setLoading(true);
            try {
                const data = await fetchSearchedMovies(search, page);
                setSearchedMovies(data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getSearchedMovies();
    }, [page, debounceSearch]);

    const handleMoviePress = (item: Movie) => {
        router.push({
            pathname: '/(modals)/[id]',
            params: {id: item.id},
        });
    };

    if (error) {
        return <Text style={styles.errorText}>Error: {error.message}</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Search movies</Text>
            <SearchBar value={search} onChangeText={setSearch} onClear={() => setSearch('')}/>
            <NavigationControls
                onNext={() => setPage((prev) => prev + 1)}
                onPrevious={() => setPage((prev) => prev - 1)}
                isPreviousDisabled={page === 1}
            />
            <MovieList movies={debounceSearch ? searchMovies : popularMovies} loading={loading}
                       onMoviePress={handleMoviePress}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default HomeScreen;
