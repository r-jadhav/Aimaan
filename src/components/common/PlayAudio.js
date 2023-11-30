import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Slider, TouchableOpacity, View, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { moderateScale } from '../../common/constants';
import { listData } from '../../api/constant';

const PlayAudio = () => {

  const [isPlayingArray, setIsPlayingArray] = useState(Array(listData.length).fill(false));
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [progressArray, setProgressArray] = useState(Array(listData.length).fill({ position: 0, duration: 0 }));

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.add(listData);
    });

    return () => {
      TrackPlayer.stop();
    };
  }, []);

  const progress = useProgress();


  // correct
  const playPause = async (index) => {
    const updatedIsPlayingArray = [...isPlayingArray];
    const isCurrentlyPlaying = currentTrackIndex === index;
  
    // Pause the current track if it is playing and is not the clicked track
    if (isCurrentlyPlaying && updatedIsPlayingArray[index]) {
      await TrackPlayer.pause();
      updatedIsPlayingArray[index] = false;
    } else {
      // Pause the currently playing track (if any)
      if (currentTrackIndex !== null) {
        updatedIsPlayingArray[currentTrackIndex] = false;
        await TrackPlayer.pause();
      }
  
      // Skip to the new track
      await TrackPlayer.skip(index);
      // Play the new track
      await TrackPlayer.play();
  
      updatedIsPlayingArray[index] = true;
      setCurrentTrackIndex(index);
    }
  
    // Update the state
    setIsPlayingArray(updatedIsPlayingArray);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {listData.map((item, index) => (
            <View style={styles.singleContainer} key={index}>
              <View style={styles.cardTopRow}>
                <View style={styles.halrow}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.head}>{item.title}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
        <TouchableOpacity onPress={() => playPause(index)}>
                <AntDesign
                  name={isPlayingArray[index] ? 'pausecircle' : 'play'}
                  size={moderateScale(25)}
                  color={'#000'}
                />
              </TouchableOpacity>

                <View style={styles.sliderView}>
                {isPlayingArray[index] ? 
                 <Slider
                 value={progress.position}
                 maximumValue={progress.duration}
                 minimumValue={0}
                 thumbStyle={{ width: 20, height: 20 }}
                 thumbTintColor={'black'}
                 onValueChange={async (value) => {
                   await TrackPlayer.seekTo(value);
                 }}
               />
                : <Slider
                value={progressArray[index].position}
                minimumValue={0}
                thumbStyle={{ width: 20, height: 20 }}
                thumbTintColor={'black'}
                onValueChange={async (value) => await TrackPlayer.seekTo(value)}
              />
               }
                 
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PlayAudio;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    flex: 1,
    padding: 5,
  },
  buttonPlay: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(00,80,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  buttonStop: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(80,00,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  feature: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 7,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
  },
  singleContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  halrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderView: {
    alignSelf: 'center',
    width: '90%'
  },
});