import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import FixedContainer from '@components/FixContainer';
import CustomHeader from '@components/Header';
import { ListItem } from '@components/ListComic';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { WIDTH_SCALE } from '@constants/constants';
import { AllStackScreenProps } from '@navigators/all-stack';
import { fromNowDate } from '@utils/moment';
import { loadDetailComic } from '@stores/reducer/detail/actions';
import { useAppDispatch } from '@stores/store/storeHook';

const History = ({ navigation, route }: AllStackScreenProps<'History'>) => {
  const { data } = route.params as any;
  const dispatch = useAppDispatch();

  const navigateToDetail = useCallback(
    (id: string) => {
      dispatch(loadDetailComic(id));
      navigation.navigate('Detail');
    },
    [dispatch, navigation],
  );

  const renderItem = useCallback(
    ({ item }) => {
      const { comic, chapter } = item;
      const current = comic.listChapter.find(
        (v) => v.idChapter === item.idChapter,
      );

      return (
        <MyTouchableOpacity
          onPress={() => navigateToDetail(item.idComic)}
          style={{
            marginRight: 15,
            // width: containerProps?.horizontal ? WIDTH_SCALE * 120 : '30%',
            width: WIDTH_SCALE * 120,
            marginBottom: WIDTH_SCALE * 15,
          }}>
          <MyTouchableOpacity
            onPress={() => navigateToDetail(item.idComic)}
            style={{
              borderRadius: 6,
              overflow: 'hidden',
              height: WIDTH_SCALE * 150,
            }}>
            <FastImage
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: comic.images.thumbnail.url,
              }}
              resizeMode={'cover'}
            />
          </MyTouchableOpacity>

          <View style={{ marginTop: WIDTH_SCALE * 2 }}>
            <Text
              style={{
                color: pColor.textColor2,
                fontSize: 12,
                fontWeight: '600',
                marginTop: WIDTH_SCALE * 2,
                marginBottom: WIDTH_SCALE * 4,
              }}
              numberOfLines={1}>
              {comic.name.vnName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ color: pColor.textColor2, fontSize: 10 }}>
                {current?.name ? `Chap ${current?.name}` : 'Đang up'}
              </Text>
              <Text style={{ color: pColor.textColor2, fontSize: 10 }}>
                {fromNowDate(item.updatedAt)}
              </Text>
            </View>
          </View>
        </MyTouchableOpacity>
      );
    },
    [pColor],
  );

  return (
    <FixedContainer>
      <CustomHeader title="Truyện đã xem" style={{ marginBottom: 10 }} />

      <ListItem
        style={{
          paddingHorizontal: WIDTH_SCALE * 10,
        }}
        data={data}
        containerProps={{
          keyExtractor: (item, index) => `${item?.id}_${index}`,
          showsHorizontalScrollIndicator: false,
          numColumns: 3,
          renderItem,
        }}
      />
    </FixedContainer>
  );
};

export default History;
