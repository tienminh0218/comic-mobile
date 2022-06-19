import FixedContainer from '@components/FixContainer';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { HEIGHT_SCALE, WIDTH_SCALE } from '@constants/constants';
import { ComicType } from '@models/comic';
import { AllStackScreenProps } from '@navigators/all-stack';
import { RootState } from '@stores/store/store';
import { useAppDispatch, useAppSelector } from '@stores/store/storeHook';
import { fromNowDate } from '@utils/moment';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Octicons';
import { useAuth } from 'src/hooks/useAuth';
import { Edge } from 'react-native-safe-area-context';
import { loadDetailComic } from '@stores/reducer/detail/actions';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const edge: Edge[] = ['bottom', 'top'];

const Home = (props: AllStackScreenProps<'Home'>) => {
  const { navigation } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const data = useAppSelector((state: RootState) => state.home.data);
  const user = useAppSelector((state: RootState) => state.user.data);
  const listRecommend = useAppSelector(
    (state: RootState) => state.user.listRecommend,
  );
  const detailComic = useAppSelector((state: RootState) => state.detail.data);
  const isLoading = useAppSelector((state: RootState) => state.home.isLoading);
  const dispatch = useAppDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log('onRefresh');
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const navigateToDetail = useCallback(
    (id: string) => {
      dispatch(loadDetailComic(id));
      navigation.navigate('Detail');
    },
    [dispatch, navigation, detailComic],
  );

  if (isLoading)
    return (
      <FixedContainer
        edges={edge}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator animating={true} color={pColor.black} />
      </FixedContainer>
    );
  // console.log('listRecommend', listRecommend);

  return (
    <ScrollView
      style={{
        backgroundColor: 'black',
      }}
      nestedScrollEnabled={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <FixedContainer
        edges={edge}
        style={{
          backgroundColor: pColor.white,
        }}>
        <View
          style={{
            flex: 1,
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

          <RecommendList
            onNavigateDetail={navigateToDetail}
            data={data.recommend}
          />

          <TopView
            title="Lượt xem"
            data={data.popular}
            onNavigateDetail={navigateToDetail}
          />
        </View>
        <View
          style={{
            backgroundColor: '#f4f4f4',
            paddingHorizontal: WIDTH_SCALE * 10,
          }}>
          <ListItem
            title="Cập nhật"
            data={data.lastUpdated}
            onNavigateDetail={navigateToDetail}
          />

          <ListItem
            title="New Series "
            data={data.newSeries}
            onNavigateDetail={navigateToDetail}
          />

          {Boolean(user?.id) && (
            <ListItem
              title="Recommend "
              data={listRecommend}
              onNavigateDetail={navigateToDetail}
            />
          )}
        </View>
      </FixedContainer>
    </ScrollView>
  );
};

interface TopViewProps {
  title: string;
  data: ComicType[];
  onNavigateDetail: (id: string) => void;
}

const TopView = React.memo(
  ({ title, data, onNavigateDetail }: TopViewProps) => {
    const colorRating = (index: number): string => {
      switch (index + 1) {
        case 1:
          return '#CD342F';
        case 2:
          return '#1D5CFF';
        case 3:
          return '#00BE7A';
        default:
          return pColor.textColor2;
      }
    };

    const renderItem = useCallback(
      ({ item, index }) => {
        return (
          <MyTouchableOpacity
            onPress={() => onNavigateDetail(item.id)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                marginRight: WIDTH_SCALE * 10,
                color: colorRating(index),
              }}>
              {index + 1}
            </Text>
            <MyTouchableOpacity
              style={{
                width: WIDTH_SCALE * 35,
                height: WIDTH_SCALE * 40,
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
            <Text
              style={{
                color: pColor.textColor2,
                fontSize: 14,
                fontWeight: '600',
              }}>
              {item.name.vnName}
            </Text>
          </MyTouchableOpacity>
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
  },
);

interface ListItemProps {
  title: string;
  data: ComicType[];
  onNavigateDetail: (id: string) => void;
}

const ListItem = React.memo(
  ({ title, data, onNavigateDetail }: ListItemProps) => {
    const renderItem = useCallback(
      ({ item }) => {
        const lastChap = item.listChapter[item.listChapter.length - 1];
        return (
          <MyTouchableOpacity
            onPress={() => onNavigateDetail(item.id)}
            style={{ marginRight: 15, width: WIDTH_SCALE * 120 }}>
            <MyTouchableOpacity
              onPress={() => onNavigateDetail(item.id)}
              style={{
                height: WIDTH_SCALE * 150,
                borderRadius: 6,
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
                  {lastChap?.name ? `Chap ${lastChap?.name}` : 'Đang up'}
                </Text>
                <Text style={{ color: pColor.textColor2, fontSize: 10 }}>
                  {fromNowDate(item.updatedAt)}
                </Text>
              </View>
            </View>
          </MyTouchableOpacity>
        );
      },
      [data, pColor, onNavigateDetail],
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
  },
);

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
  onNavigateDetail: (id: string) => void;
}

const RecommendList = React.memo(
  ({ data, onNavigateDetail }: RecommendListProps) => {
    const renderItem = useCallback(
      ({ item, index }) => {
        return (
          <MyTouchableOpacity
            onPress={() => onNavigateDetail(item.id)}
            style={{
              marginRight: 10,
            }}>
            <View
              style={{
                padding: WIDTH_SCALE * 10,
                height: WIDTH_SCALE * 170,
                width: WIDTH_SCALE * 300,
                borderRadius: 10,
                overflow: 'hidden',
                position: 'relative',
                justifyContent: 'flex-end',
                backgroundColor: colorItem(index),
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
  },
);

export default Home;
