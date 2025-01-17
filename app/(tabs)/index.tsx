import {ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useState,} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useDebounce} from "use-debounce";
import {Movie} from "@/interfaces/movies";
import MoveListItem from "@/components/organisms/MovieListItem";
import {fetchPopularMovies, fetchSearchedMovies} from "@/services/movieApiService";
import {useRouter} from "expo-router";


const HomeScreen = () => {
    const router = useRouter();

    const [popularMovies, setPopularMovies] = useState<Movie[]>();
    const [searchMovies, setSearchedMovies] = useState<Movie[]>();

    const [userSearch, setUserSearch] = useState<string>("");
    const [page, setPage] = useState(1);
    const [search] = useDebounce(userSearch, 500);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState()

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
                const data = await fetchSearchedMovies(search, page); // Set the movies to state
                setSearchedMovies(data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getSearchedMovies();
    }, [page, search]);

    const handleMoviePress = (item: Movie) => {
        router.push({
            pathname: '/(modals)/[id]', // Adjust this to your actual detail page path
            params: {
                id: item.id,
            },
        });
    };

    const listEmptyComponent = () => {
        return (
            <View>
                <Text>Sorry, we couldn't find any movies. Try searching for something else!</Text>
            </View>
        )
    }

    const handleNext = () => {
        setPage((page) => ++page);
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage((page) => --page);
        }
    };


    return (
        <SafeAreaView style={{flex: 1, padding: 8}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15, marginBottom: 5}}>Search movies</Text>
            <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="search" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder={"e.g. Pulp Fiction"}
                    onChangeText={setUserSearch}
                    value={userSearch}
                />
                <Pressable onPress={() => setUserSearch("")}>
                    <Ionicons style={styles.searchIcon} name="close" size={20} color="#000"/>
                </Pressable>
            </View>
            <View style={styles.navigation}>
                <Pressable style={styles.navigationButton} onPress={handlePrevious}
                           disabled={page === 1}><Text style={styles.navigationText}>Previous</Text></Pressable>
                <Pressable style={styles.navigationButton} onPress={handleNext}><Text
                    style={styles.navigationText}>Next</Text></Pressable>
            </View>
            <View style={{flex: 1}}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <FlatList
                        data={search ? searchMovies : popularMovies}
                        numColumns={2}
                        ListEmptyComponent={listEmptyComponent}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <MoveListItem item={item} onPress={() => handleMoviePress(item)}/>
                        )}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
    },
    searchIcon: {
        padding: 10,
    },
    navigationButton: {
        backgroundColor: 'white',
        borderRadius: 8,
    },
    navigationText: {
        fontSize: 16,
        padding: 8,
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    }
});

export default HomeScreen;
