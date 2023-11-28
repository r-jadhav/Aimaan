import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import EText from '../common/EText';
import {commonColor, styles} from '../../themes';
import {deviceWidth, moderateScale} from '../../common/constants';

export default function SmallCardComponent({item, index}) {
  const navigation = useNavigation();

  const [englishTitle, tamilTitle] = (item?.section_title || '').split(' / ');

  // const onPressDetail = () => {
  //   if (item.routes === 'ViewDetails') {
  //     navigation.navigate('ViewDetails', { title: englishTitle }); 
  //   }
  // };

  return (
    <TouchableOpacity
      style={[
        localStyles.root,
        index % 2 === 0 ? styles.mr5 : styles.ml5,
        {backgroundColor: '#ffffff' ? '#ffffff' :'#ffffff'},
      ]}
      onPress={()=>navigation.navigate(item.routes, { title: englishTitle })}
       >

      <Image
      source={{
        uri: `http://43.228.126.245/mouloodproapi/storage/uploads/${item?.file_name}`,
      }}
        style={localStyles.imageStyle}
        >
      </Image>

      {/* <EText
        type={'S16'}
        numberOfLines={1}
        style={localStyles.textStyle}>
        {englishTitle}
      </EText>
      <EText
        type={'S16'}
        numberOfLines={1}
        style={[localStyles.textStyle,{marginTop:2}]}>
        {tamilTitle}
      </EText> */}
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.p10,
    ...styles.flex,
    ...styles.shadowStyle,
    ...styles.justifyCenter,
    width: (deviceWidth - moderateScale(120)) / 2,
    ...styles.mt15,
    borderRadius: moderateScale(100),
  },
  imageStyle: {
    width: 45,
    height: 45,
    alignSelf:'center',
   resizeMode: 'cover',
  },
  textStyle: {
    ...styles.mt10,
    ...styles.flex,
    alignSelf:'center',
    fontSize:12,
  },
  locationSubContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.flex,
  },
  locationContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt10,
    ...styles.mb5,
  },
  freeContainer: {
    height: moderateScale(22),
    width: moderateScale(36),
    borderRadius: moderateScale(8),
    ...styles.selfEnd,
    ...styles.center,
    backgroundColor: commonColor.primary5,
    right: moderateScale(10),
    top: moderateScale(10),
  },
});
