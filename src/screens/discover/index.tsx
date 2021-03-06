import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

import { RootState } from '@stores/store/store';
import { useAppDispatch, useAppSelector } from '@stores/store/storeHook';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { AllStackScreenProps } from '@navigators/all-stack';
import CustomHeader from '@components/Header';
import { WIDTH_SCALE } from '@constants/constants';
import { ComicType } from '@models/comic';
import { ListGenre } from '../detail/index';
import { loadDetailComic } from '@stores/reducer/detail/actions';
import FixedContainer from '@components/FixContainer';
import API from '@services/api';
import { formatObj } from '@utils/format';
import MySpinner from '@components/my-spinner';

type Option = 'genres' | 'status' | 'upload';
interface ListSelected {
  genres: string;
  status: string | number;
  upload: string | number;
}

const Discover = ({ navigation, route }: AllStackScreenProps<'Discover'>) => {
  const [comics, setComics] = useState<ComicType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state: RootState) => state.genre.data);
  const [listSelected, setListSelected] = useState<ListSelected>({
    genres: '',
    status: '',
    upload: '',
  });
  const options = genres.map((v) => ({
    label: v.name,
    value: v.slug!,
  }));
  const options2 = useMemo(
    () => [
      {
        value: 1,
        label: 'Đang tiến hành',
      },
      {
        value: 2,
        label: 'Đã hoàn thành',
      },
      {
        value: 3,
        label: 'Tạm ngưng',
      },
    ],
    [],
  );
  const options3 = useMemo(
    () => [
      {
        value: 1,
        label: 'Giảm dần',
      },
      {
        value: 2,
        label: 'Tăng dần',
      },
    ],
    [],
  );

  const handleChangeFilter = async (value: string, type: Option) => {
    const newState = {
      ...listSelected,
      [type]: value,
    };
    try {
      setIsLoading(true);
      setListSelected(newState);
      MySpinner.show();
      const { data } = await API.get(`/discover/filter`, {
        params: formatObj(newState),
      });
      MySpinner.hide();
      setComics(data);
      setIsLoading(false);
    } catch (error: any) {
      MySpinner.hide();
      setIsLoading(false);
      console.log('error from handleChangeFilter', error.message);
    }
  };

  const loadMore = useCallback(async () => {
    try {
      const isFilter = Object.keys(formatObj(listSelected)).length > 0;
      if (isFilter) return;

      const lastId = comics[comics.length - 1].id;
      const { data } = await API.get(`/discover/getMore?nextPage=${lastId}`);
      if (data.length === 0) return;
      setComics([...comics, ...data]);
    } catch (error: any) {
      console.log(error?.message);
    }
  }, [comics, API]);

  useEffect(() => {
    (async () => {
      const result = await API.get('/discover');
      setComics(result.data?.lastUpdated);
      setIsLoading(false);
    })();
  }, []);

  const navigateToDetail = useCallback(
    (id: string) => {
      dispatch(loadDetailComic(id));
      navigation.navigate('Detail');
    },
    [dispatch, navigation],
  );

  return (
    <FixedContainer>
      <CustomHeader title="Thể loại" />

      <ItemFilter
        data={options}
        itemSelected={listSelected.genres}
        onSelected={handleChangeFilter}
        type="genres"
      />

      <ItemFilter
        data={options2}
        itemSelected={listSelected.status}
        onSelected={handleChangeFilter}
        type="status"
      />

      <ItemFilter
        data={options3}
        itemSelected={listSelected.upload}
        onSelected={handleChangeFilter}
        type="upload"
      />

      <ListComic
        onGoToChap={navigateToDetail}
        data={comics}
        isLoading={isLoading}
        onLoadMore={loadMore}
        navigate={navigation}
      />
    </FixedContainer>
  );
};

interface ItemFilterProps {
  data: {
    label: string;
    value: string | number;
  }[];
  onSelected: (value: string, type: Option) => void;
  itemSelected: string | number;
  type: Option;
}

const ItemFilter = React.memo(
  ({ onSelected, data, type, itemSelected }: ItemFilterProps) => {
    const handleSelected = (value: string) => {
      if (value === itemSelected) {
        onSelected('', type);
      } else {
        onSelected(value, type);
      }
    };

    const renderItem = useCallback(
      ({ item, index }) => {
        return (
          <MyTouchableOpacity
            onPress={() => handleSelected(item.value)}
            style={{
              paddingHorizontal: 10 * WIDTH_SCALE,
              paddingVertical: 5 * WIDTH_SCALE,
              marginRight: 10,
              borderRadius: 30,
              borderWidth: item.value === itemSelected ? 1 : 0,
            }}>
            <Text
              style={{
                color: pColor.textColor2,
              }}>
              {item.label}
            </Text>
          </MyTouchableOpacity>
        );
      },
      [data, handleSelected],
    );

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(v, i) => `${v.label}_${i}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 5 * WIDTH_SCALE,
          paddingVertical: 8 * WIDTH_SCALE,
          borderBottomWidth: 1,
          borderBottomColor: pColor.bgSubColor,
          flexGrow: 0,
          minHeight: 45 * WIDTH_SCALE,
        }}
      />
    );
  },
);

interface ListComicProps {
  data: ComicType[];
  onGoToChap: (idComic: string) => void;
  isLoading: boolean;
  onLoadMore: () => void;
  navigate: any;
}

const ListComic = ({
  data,
  onGoToChap,
  onLoadMore,
  navigate,
}: ListComicProps) => {
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <MyTouchableOpacity
          onPress={() => onGoToChap(item.id)}
          style={{
            paddingVertical: WIDTH_SCALE * 10,
            borderBottomWidth: 1,
            borderBottomColor: pColor.bgSubColor,
            borderWidth: 1,
            borderColor: pColor.bgSubColor,
            flexDirection: 'row',
          }}>
          <MyTouchableOpacity
            onPress={() => onGoToChap(item.id)}
            style={{
              width: WIDTH_SCALE * 80,
              height: WIDTH_SCALE * 110,
              borderRadius: 4,
              overflow: 'hidden',
              marginLeft: WIDTH_SCALE * 10,
              marginRight: WIDTH_SCALE * 15,
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

          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  marginBottom: 5,
                  color: pColor.textColor2,
                }}>
                {item.name.vnName}
              </Text>
              <ListGenre
                data={item.genres as any}
                onNavigateToDiscover={(slug: string) => {}}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name={'eye'} color={pColor.textColor2} size={15} />
                <Text style={{ color: pColor.textColor2, marginLeft: 5 }}>
                  {' '}
                  {item.interacts.views}{' '}
                </Text>
              </View>
              <View
                style={{
                  marginRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name={'heart'} color={pColor.textColor2} size={15} />
                <Text style={{ color: pColor.textColor2, marginLeft: 5 }}>
                  {' '}
                  {item.interacts.bookMark}{' '}
                </Text>
              </View>
              <View
                style={{
                  marginRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name={'thumb-up'} color={pColor.textColor2} size={15} />
                <Text style={{ color: pColor.textColor2, marginLeft: 5 }}>
                  {' '}
                  {item.interacts.like}{' '}
                </Text>
              </View>
            </View>
          </View>
        </MyTouchableOpacity>
      );
    },
    [data, onGoToChap, pColor],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(v, i) => `${v.id}_${i}`}
      onEndReached={(info: { distanceFromEnd: number }) => {
        onLoadMore();
      }}
      ListEmptyComponent={() => (
        <View
          style={{
            marginTop: 100,
          }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{ color: pColor.black, fontSize: 16, fontWeight: '500' }}>
              No Data
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default Discover;
