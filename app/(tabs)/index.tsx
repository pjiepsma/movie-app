import {ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useDebounce} from "use-debounce";
import {Movie} from "@/interfaces/movies";
import MoveListItem from "@/components/organisms/MovieListItem";
import {fetchPopularMovies, fetchSearchedMovies} from "@/services/movieApiService";
import {useRouter} from "expo-router";
import EmptySearchResult from "@/components/molecules/EmptySearchResult";

const HomeScreen = () => {
    const router = useRouter();

    const [popularMovies, setPopularMovies] = useState<Movie[]>();
    const [searchMovies, setSearchedMovies] = useState<Movie[]>();

    const [search, setSearch] = useState<string>("");
    const [debounceSearch] = useDebounce(search, 500);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();

    useEffect(() => {
        setPage(1);
    }, [search]);

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

    const handleNext = () => setPage((prev) => prev + 1);
    const handlePrevious = () => page > 1 && setPage((prev) => prev - 1);

    if (error) {
        return <Text style={styles.errorText}>Error: {error.message}</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.searchTitle}>Search movies</Text>
            <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="search" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Pulp Fiction"
                    onChangeText={setSearch}
                    value={search}
                />
                <Pressable onPress={() => setSearch("")}>
                    <Ionicons style={styles.searchIcon} name="close" size={20} color="#000"/>
                </Pressable>
            </View>
            <View style={styles.navigation}>
                <Pressable style={styles.navigationButton} onPress={handlePrevious} disabled={page === 1}>
                    <Text style={styles.navigationText}>Previous</Text>
                </Pressable>
                <Pressable style={styles.navigationButton} onPress={handleNext}>
                    <Text style={styles.navigationText}>Next</Text>
                </Pressable>
            </View>
            <View style={styles.movieListContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <FlatList
                        data={search ? searchMovies : popularMovies}
                        numColumns={2}
                        ListEmptyComponent={EmptySearchResult}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <MoveListItem item={item} onPress={() => handleMoviePress(item)}/>
                        )}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    searchTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    navigationButton: {
        backgroundColor: 'white',
        borderRadius: 8,
    },
    navigationText: {
        fontSize: 16,
        padding: 8,
    },
    movieListContainer: {
        flex: 1,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default HomeScreen;
