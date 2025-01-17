import {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {Movie} from "@/interfaces/interfaces";
import {fetchMovieDetails} from "@/services/movieApiService";

const {width} = Dimensions.get('window');

const DetailsPage = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [movie, setMovieDetails] = useState<Movie>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState()

    useEffect(() => {
        const getMovieDetails = async () => {
            setLoading(true);

            try {
                const data = await fetchMovieDetails(id);
                setMovieDetails(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getMovieDetails();
    }, [id]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.listingContainer}>
                <Text>{movie?.title}</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listingContainer: {
        // add styles for listing container here
    },
});

export default DetailsPage;
