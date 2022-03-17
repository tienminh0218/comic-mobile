import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import FastImage from 'react-native-fast-image';

import FixedContainer from '@components/FixContainer';
import {
  HEIGHT,
  height,
  HEIGHT_SCALE,
  WIDTH_SCALE,
} from '@constants/constants';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { fromNowDate } from '@utils/moment';
import { useAppDispatch, useAppSelector } from '@stores/app/type-hook';
import { loadData } from '@stores/features/home/thunks';
import { RootState } from '@stores/app/store';
import { useSelector } from 'react-redux';
import { ComicType } from '@models/comic';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.home.data);

  useEffect(() => {
    dispatch(loadData());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('he call me');
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      nestedScrollEnabled={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <FixedContainer
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: WIDTH_SCALE * 10,
        }}>
        <View
          style={{
            marginTop: WIDTH_SCALE * 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: WIDTH_SCALE * 20,
          }}>
          <Text
            style={{
              color: pColor.textColor3,
              fontSize: 20,
              fontWeight: '600',
            }}>
            Trang chủ
          </Text>
        </View>

        <RecommendList data={data.recommend} />

        <TopView title="Lượt xem" data={data.popular} />

        <ListItem title="Cập nhật" data={data.lastUpdated} />

        <ListItem title="New Series " data={data.newSeries} />
      </FixedContainer>
    </ScrollView>
  );
};

interface TopViewProps {
  title: string;
  data: ComicType[];
}

const TopView = React.memo(({ title, data }: TopViewProps) => {
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              marginRight: WIDTH_SCALE * 10,
            }}>
            {index + 1}
          </Text>
          <MyTouchableOpacity
            style={{
              width: WIDTH_SCALE * 20,
              height: WIDTH_SCALE * 25,
              borderRadius: 4,
              overflow: 'hidden',
              marginRight: WIDTH_SCALE * 10,
            }}>
            <FastImage
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: item.images.thumbnail.url,
              }}
              resizeMode={'cover'}
            />
          </MyTouchableOpacity>
          <Text>{item.name.vnName}</Text>
        </View>
      );
    },
    [data],
  );

  return (
    <View
      style={{
        marginBottom: WIDTH_SCALE * 20,
      }}>
      <Text
        style={{
          fontSize: 16,
          color: pColor.textColor3,
          fontWeight: '600',
        }}>
        {title}
      </Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}_${index}`}
      />
    </View>
  );
});

interface ListItemProps {
  title: string;
  data: ComicType[];
}

const ListItem = React.memo(({ title, data }: ListItemProps) => {
  const renderItem = useCallback(
    ({ item }) => {
      const lastChap = item.listChapter[item.listChapter.length - 1];
      return (
        <MyTouchableOpacity
          style={{ marginRight: 10, width: WIDTH_SCALE * 100 }}>
          <MyTouchableOpacity
            style={{
              width: WIDTH_SCALE * 100,
              height: WIDTH_SCALE * 150,
              borderRadius: 15,
              overflow: 'hidden',
            }}>
            <FastImage
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: item.images.thumbnail.url,
              }}
              resizeMode={'cover'}
            />
          </MyTouchableOpacity>
          <View style={{ marginTop: 2 }}>
            <Text
              style={{
                color: pColor.textColor2,
                fontSize: 12,
                fontWeight: '600',
                height: WIDTH_SCALE * 30,
              }}
              numberOfLines={2}>
              {item.name.vnName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ color: pColor.textColor2, fontSize: 10 }}>
                Chap {lastChap?.name || 'No chap'}
              </Text>
              <Text style={{ color: pColor.textColor2, fontSize: 10 }}>
                {fromNowDate(item.updatedAt)}
              </Text>
            </View>
          </View>
        </MyTouchableOpacity>
      );
    },
    [data, pColor],
  );

  return (
    <View
      style={{
        marginBottom: WIDTH_SCALE * 20,
      }}>
      <MyTouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: HEIGHT_SCALE * 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: pColor.textColor3,
            fontWeight: '600',
          }}>
          {title}
        </Text>
        <Icon name="chevron-right" color={pColor.textColor3} />
      </MyTouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${title}_${item.id}_${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});

const colorItem = (index: number) => {
  switch (index + 1) {
    case 1:
      return '#4DAAAF';
    case 2:
      return '#CD342F';
    case 3:
      return '#CE5754';
    case 4:
      return '#9D7F70';
    case 5:
      return '#546FB8';
    default:
      return '#546FB8';
  }
};

interface RecommendListProps {
  data: ComicType[];
}

const RecommendList = React.memo(({ data }: RecommendListProps) => {
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <MyTouchableOpacity>
          <View
            style={{
              padding: WIDTH_SCALE * 10,
              height: WIDTH_SCALE * 150,
              width: WIDTH_SCALE * 300,
              borderRadius: 10,
              overflow: 'hidden',
              position: 'relative',
              justifyContent: 'flex-end',
              backgroundColor: colorItem(index),
              marginRight: 10,
            }}>
            <Text
              style={{
                color: pColor.white,
                marginBottom: 2,
                fontWeight: '600',
              }}>
              {item.name.vnName}
            </Text>
            <Text
              style={{
                color: pColor.white,
                fontSize: 12,
              }}
              numberOfLines={2}>
              {item.describe}
            </Text>
            <FastImage
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: 150,
                zIndex: -1,
              }}
              source={{
                uri: item.images.banner.url,
              }}
              resizeMode={'contain'}
            />
          </View>
        </MyTouchableOpacity>
      );
    },
    [data],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.name}_${index}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginTop: 10,
        flexGrow: 0,
        marginBottom: WIDTH_SCALE * 20,
      }}
    />
  );
});

export default Home;
