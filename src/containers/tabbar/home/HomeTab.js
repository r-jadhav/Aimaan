// Library Imports
import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import { styles } from '../../../themes';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../../../components/CarouselCardItem';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import SmallCardComponent from '../../../components/homeComponent/SmallCardComponent';
import EText from '../../../components/common/EText';
import EHeader from '../../../components/common/EHeader';
// import TrackPlayer from 'react-native-track-player';
import api from '../../../api/api';

const HomeTab = () => {
  const colors = useSelector(state => state.theme.theme);
  const [extraData, setExtraData] = useState(true);

  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  // const data = [
  //   {
  //     imgUrl: require("../../../assets/images/banner.png"),
  //   },
  //   {
  //     imgUrl: require("../../../assets/images/banner1.png"),
  //   },
  //   {
  //     imgUrl: require("../../../assets/images/banner2.png"),
  //   },
  //   {
  //     imgUrl: require("../../../assets/images/banner3.png"),
  //   },
  // ];

// getMenus
const [menu, setMenu] = useState()
  const getMenus = () => {
    api
      .get('/section/getSectionMenu')
      .then(res => {
        setMenu(res.data.data);
      })
      .catch(error => {
        console.log("error",error)
      });

  };

  useEffect(() => {
    setExtraData(!extraData);
  }, [colors]);

  useEffect(() => {
    getMenus();
  }, []);

  const renderCategoryItem = ({item, index}) => {
    return <SmallCardComponent item={item} key={index}/>;
  };

  // useEffect(() => {
  //   const start = async () => {
  //     await TrackPlayer.setupPlayer();
  //     await TrackPlayer.add({
  //       id: '1',
  //       url: require('../../../assets/audios/audio.mp3'),
  //       title: 'slider',
  //       artwork: images.users75
  //     });
  //     await TrackPlayer.play();
  //   };

  //   start();
  // }, []);

  return (
    <View style={[styles.flexGrow1, { backgroundColor: '#fafafa'}]}>
        {/* <EHeader title="Abu Dhabi Mawlid Committee (ADMC)" /> */}




        <View style={{  }}>
          <View style={{
            backgroundColor: '#fafafa',
            alignItems: 'center',
            justifyContent: 'center',
           paddingBottom: 0,
          }}>
            {/* <Carousel
              layout="tinder"
              layoutCardOffset={9}
              ref={isCarousel}
              data={data}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              useScrollView={true}
              onSnapToItem={(index) => setIndex(index)}              
            />
            
            <Pagination
              dotsLength={data.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: colors.primary
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            /> */}
          </View>
        </View>
        {/* <EText type="B24" numberOfLines={1} color={colors.theme} 
        style={localStyles.fancyText}
        >
        LAUNCHING SOON</EText> */}
      <FlashList
        data={menu}
        extraData={extraData}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={10}
        numColumns={5}
        // ListHeaderComponent={<RenderHeaderItem />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.contentContainerStyle}
        style={styles.flatList}
      />

    </View>
  );
}

export default HomeTab
const localStyles = StyleSheet.create({
  contentContainerStyle: {
    ...styles.ph10,
    ...styles.pb50,
  },
  fancyText: {
    alignSelf:'center',
  },
  flatList: {
    marginTop: 100,
  }
  
});
