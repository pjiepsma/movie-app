import {ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState,} from "react";
import axios from 'axios';
import {Ionicons} from "@expo/vector-icons";
import {useDebounce} from "use-debounce";
import {Movie} from "@/interfaces/interfaces";
import MoveListItem from "@/components/organisms/MovieListItem";

const HEADERS = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmJkZTFmM2JhYjU4NmYzMDU3OGRmZGY5OWI0Zjk2MCIsIm5iZiI6MTczNzEwNjA3NS4xNDUsInN1YiI6IjY3OGEyMjliMmJhOWZiN2M1ZWFkNTljNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-6ml0nKDan3afmiLD5-giwpZGFw8xOVhXHaRIjeAFQ'
}
const BASE_URL = 'https://api.themoviedb.org/3/'

const HomeScreen = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>();
    const [searchMovies, setSearchedMovies] = useState<Movie[]>();
    const [page, setPage] = useState(1);

    const [userSearch, setUserSearch] = useState<string>("");
    const [search] = useDebounce(userSearch, 500);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPopularMovies(page);
    }, [page]);

    useEffect(() => {
        setLoading(true);
        const encode = encodeURI(search);
        const fetchSearchedMovies = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/search/movie?query=${encode}&include_adult=false&language=en-US&page=${page}`, {
                    headers: HEADERS
                });
                setSearchedMovies(response.data.results); // Set the movies to state
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        fetchSearchedMovies();
    }, [search]);

    const fetchPopularMovies = async (page: number) => {
        try {
            const response = await axios.get(`${BASE_URL}movie/popular?language=en-US&page=${page}`, {
                headers: HEADERS
            });
            setPopularMovies(response.data.results); // Set the movies to state
        } catch (error) {
            console.error(error);
        }
    };

    const listEmptyComponent = () => {
        return (
            <View>
                <Text>Sorry, we couldn't find any movies. Try searching for something else!</Text>
            </View>
        )
    }

    const handleNext = () => {
        setPage((page) => page++);
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage((page) => page--);
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable style={styles.navigation} onPress={handlePrevious}
                           disabled={page === 1}><Text>Previous</Text></Pressable>
                <Pressable style={styles.navigation} onPress={handleNext}><Text>Next</Text></Pressable>
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
                        renderItem={MoveListItem}
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
    },
    navigationText: {}
});

export default HomeScreen;
