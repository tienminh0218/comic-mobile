import React, { useCallback, useState } from 'react';
import { FlatList, View, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Octicons';

import { Chapter } from '@models/chapter';
import { ComicType } from '@models/comic';
import { AllStackScreenProps } from '@navigators/all-stack';
import FixedContainer from '@components/FixContainer';
import CustomHeader from '@components/Header';
import { pColor } from '@constants/color';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import MySpinner from '@components/my-spinner';
import API from '@services/api';

interface INextAndPrev {
  nextId?: string;
  prevId?: string;
}

export interface ViewChapProps {
  nextAndPrev: INextAndPrev;
  comic: ComicType;
  chapter: Chapter;
}

const ViewChap = (props: AllStackScreenProps<'ViewChap'>) => {
  const { navigation, route } = props;
  const { chapter, nextAndPrev, comic } = route.params as ViewChapProps;
  const [isShow, setIsShow] = useState(false);

  const changeShowNav = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <View
          style={{
            width: '100%',
            height: 600,
          }}>
          <FastImage
            style={{
              width: '100%',
              height: '100%',
            }}
            source={{
              uri: item.url,
            }}
            resizeMode="cover"
          />
        </View>
      );
    },
    [chapter],
  );

  return (
    <FixedContainer edges={['bottom']}>
      <CustomHeader
        title={comic.name.vnName}
        subTitle={`Chap ${chapter.nameChapter}`}
      />
      <Pressable onPress={() => changeShowNav()}>
        <View
          style={{
            position: 'relative',
          }}>
          <FlatList
            data={chapter.images}
            renderItem={renderItem}
            keyExtractor={(v, i) => `${v.nameFile}_${i}`}
          />
        </View>
      </Pressable>
      <CustomNavBottom
        idComic={comic?.id!}
        navigation={navigation}
        nextAndPrev={nextAndPrev}
        isShow={isShow}
      />
    </FixedContainer>
  );
};

interface CustomNavBottomProps {
  idComic: string;
  nextAndPrev: INextAndPrev;
  isShow: boolean;
  navigation: any;
}

const CustomNavBottom = React.memo(
  ({ isShow, nextAndPrev, navigation, idComic }: CustomNavBottomProps) => {
    const changeChapter = useCallback(
      async (idChap: string) => {
        try {
          MySpinner.show();
          const result = await API.get(`/titles/${idComic}/views/${idChap}`);
          MySpinner.hide();
          navigation.navigate('ViewChap', {
            ...result.data,
          });
        } catch (error) {
          console.log('error from changeChapter', error?.message);
        }
      },
      [navigation, idComic, nextAndPrev],
    );

    return (
      <View
        style={{
          position: 'absolute',
          height: 50,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000033',
          display: isShow ? 'flex' : 'none',
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            backgroundColor: pColor.white,
          }}>
          <MyTouchableOpacity
            disabled={nextAndPrev?.prevId ? false : true}
            onPress={() =>
              nextAndPrev?.prevId
                ? changeChapter(nextAndPrev?.prevId!)
                : () => {}
            }>
            <Icon
              name={'arrow-left'}
              color={nextAndPrev?.prevId ? pColor.black : '#00000033'}
              size={25}
            />
          </MyTouchableOpacity>
          <MyTouchableOpacity
            disabled={nextAndPrev?.nextId ? false : true}
            onPress={() =>
              nextAndPrev?.nextId
                ? changeChapter(nextAndPrev?.nextId!)
                : () => {}
            }>
            <Icon
              name={'arrow-right'}
              color={nextAndPrev?.nextId ? pColor.black : '#00000033'}
              size={25}
            />
          </MyTouchableOpacity>
        </View>
      </View>
    );
  },
);

export default ViewChap;
