import React from 'react';
import {Dimensions, Image, Pressable, StyleSheet, Text} from 'react-native';
import {Movie} from "@/interfaces/interfaces";

const MoveListItem = ({item, onPress}: { item: Movie, onPress: () => void }) => {
    const {width} = Dimensions.get('window');
    const posterWidth = (width - 30) / 2;
    const posterHeight = (posterWidth * 3) / 2;

    return (
        <Pressable onPress={onPress} style={styles.itemContainer}>
            <Image
                source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}}
                style={{
                    width: posterWidth,
                    height: posterHeight,
                    borderRadius: 8,
                }}
            />
            <Text style={styles.title}>
                {item.title} ({item.release_date.split('-')[0]})
            </Text>
            {/*<Text numberOfLines={4} ellipsizeMode="tail" style={{width: posterWidth}}>{item.overview}</Text>*/}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 15,
    },
    title: {
        marginTop: 8,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MoveListItem;
