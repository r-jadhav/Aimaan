import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Image } from 'react-native';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EI from 'react-native-vector-icons/EvilIcons';
const { height, width } = Dimensions.get('window')

const MusicListItems = ({ item, index }) => {
    const navigation = useNavigation()
    const playingIndexRef = useRef(-1);
    return (
        <View style={styles.singleContainer}>
            <View style={styles.cardTopRow}>
                <View style={styles.halrow}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.head}>{item.title}</Text>
                        <Text style={styles.headdesp}>{item.category}</Text>
                    </View>
                </View>
                <View style={styles.moredot}>
                    <View
                        style={[
                            styles.smallDot,
                            { backgroundColor: item.dot },
                        ]}></View>
                </View>
            </View>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>

                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                playingIndexRef.current === index ? 'red' : 'green',
                        },
                    ]}
                    onPress={() => {
                        navigation.navigate('Music', { data: item, index: index })
                    }}>
                    <Text style={styles.buttonText}>
                        Play
                    </Text>
                </TouchableOpacity>
            </View>

            {/* <Image
    style={{ width: '100%', height: 150, borderRadius: 10 }}
    source={item.profileImg}
/> */}
            <View
                style={{
                    paddingTop: 25,
                    marginBottom: 20,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <EI
                        size={25}
                        color="#000"
                        name="user"
                        style={styles.backIcon}></EI>
                    <Text style={styles.headdesp}>{item.artist}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <EI
                        size={25}
                        color="#000"
                        name="calendar"
                        style={styles.backIcon}></EI>
                    <Text style={styles.headdesp}>{item.date}</Text>
                </View>
            </View>
        </View>
    )
}

export default MusicListItems;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 5,
        borderRadius: 3
    },
    buttonText: {
        color: '#fff'
    },
    singleContainer: {
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 10,
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
        paddingHorizontal: 20,
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
    moredot: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallDot: {
        width: 5,
        height: 5,
        borderRadius: 5,
    },
    head: {
        fontSize: 16,
        color: '#095225',
        fontWeight: '600'
    },
    headdesp: {
     fontSize: 12,
     color: '#222',
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4C4E66',
        lineHeight: 36,
        marginLeft: 10,
    },
});