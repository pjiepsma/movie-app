import React from 'react';
import {Dimensions, Image, Pressable, StyleSheet, Text} from 'react-native';
import {Movie} from "@/interfaces/movies";

const MoveListItem = ({item, onPress}: { item: Movie, onPress: () => void }) => {
    const {width} = Dimensions.get('window');
    const posterWidth = (width - 30) / 2;
    const posterHeight = (posterWidth * 3) / 2;
    const missingPoster = require('../../assets/images/missing-poster.jpg');

    return (
        <Pressable onPress={onPress} style={styles.itemContainer}>
            <Image
                source={
                    item.poster_path
                        ? {uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}
                        : missingPoster
                }
                style={{
                    width: posterWidth,
                    height: posterHeight,
                    borderRadius: 8,
                }}
            />
            <Text numberOfLines={1} style={[styles.title, {maxWidth: posterWidth}]}>
                {item.title} ({item.release_date.split('-')[0]})
            </Text>
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
        fontSize: 12,
    },
});

export default MoveListItem;
