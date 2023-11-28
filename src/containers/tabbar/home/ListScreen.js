import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import EHeader from '../../../components/common/EHeader';
import Sound from 'react-native-sound';
import { listData } from '../../../api/constant';
import MusicListItems from '../../../components/common/MusicListItems';

const ListScreen = () => {
    const route = useRoute();

    const [sounds, setSounds] = useState([]);
    const playingIndexRef = useRef(-1);

    useEffect(() => {
        Sound.setCategory('Playback', true);
        return () => {
            stopAllSounds();
        };
    }, []);

    const playSound = (item, index) => {
        console.log("playSound", index)
        const newIndex = index;
        // 1===0
        if (index === playingIndexRef.current) {
            stopSound(item, newIndex);
        } else {
            stopAllSounds();

            const sound = new Sound(item.sound, (error, _sound) => {
                if (error) {
                    alert('error' + error.message);
                    return;
                }
                sound.play(() => {
                    console.log(`play sound at index ${newIndex}`);
                    playingIndexRef.current = newIndex;
                    // setPlayingIndex(newIndex);
                });
            });

            setSounds((prevSounds) => [...prevSounds, sound]);
            playingIndexRef.current = newIndex;
            // setPlayingIndex(newIndex);
        }
    };

    const stopSound = (_item, index) => {
        if (sounds[index]) {
            sounds[index].stop(() => {
                sounds[index].release();
                console.log(`stop sound at index ${index}`);
                playingIndexRef.current = -1; // Reset the ref when explicitly stopping
            });
        }
    };

    const stopAllSounds = () => {
        sounds.forEach((sound, index) => {
            if (sound) {
                sound.stop(() => {
                    sound.release();
                    console.log(`stop sound at index ${index}`);
                });
            }
        });
        setSounds([]);
        playingIndexRef.current = -1; // Reset the ref when stopping all sounds
    };



    return (

        <SafeAreaView style={styles.container}>
            <EHeader title={route.params.title} />


            <View style={styles.Feedcontainer}>
                <FlatList
                    data={listData}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    renderItem={({ item, index }) => (
                        <MusicListItems item={item} index={index} />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Feedcontainer: {
        marginHorizontal: 10,
    },
});

export default ListScreen;
