import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {fetchMovieDetails} from "@/services/movieApiService";
import {MovieDetails} from "@/interfaces/movies";
import {useNavigation} from "@react-navigation/native";

const DetailsPage = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [movie, setMovieDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        const getMovieDetails = async () => {
            setLoading(true);

            try {
                const data = await fetchMovieDetails(id);
                setMovieDetails(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        getMovieDetails();
    }, [id]);

    useLayoutEffect(() => {
        if (movie) {
            navigation.setOptions({
                title: movie.title,
            });
        }
    }, [movie, navigation]);

    if (loading || !movie) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`}}
                style={styles.backdropImage}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <View style={styles.genresContainer}>
                    {movie.genres.map((genre) => (
                        <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
                    ))}
                </View>

                <Text style={styles.overview}>{movie.overview}</Text>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Release Date: {movie.release_date}</Text>
                    <Text style={styles.detailText}>Status: {movie.status}</Text>
                    <Text style={styles.detailText}>Duration: {movie.runtime} min.</Text>

                    <Text style={styles.detailText}>Rating: {movie.vote_average} ({movie.vote_count} votes)</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backdropImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 8,
    },
    genre: {
        backgroundColor: '#eee',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    overview: {
        fontSize: 16,
        color: '#333',
        marginVertical: 8,
    },
    detailsContainer: {
        marginVertical: 12,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 6,
        color: '#333',
    },
});

export default DetailsPage;
