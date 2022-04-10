import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/Octicons';

import { RootState } from '@stores/store/store';
import { useAppSelector } from '@stores/store/storeHook';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { AllStackScreenProps } from '@navigators/all-stack';
import CustomHeader from '@components/Header';
import { WIDTH_SCALE } from '@constants/constants';
import { ComicType } from '@models/comic';
import API from '@services/api';
import FastImage from 'react-native-fast-image';
import { ListGenre } from '../detail/index';

type Option = 'genre' | 'status' | 'date';
interface ListSelected {
  genre: string;
  status: string | number;
  date: string | number;
}

const Discover = ({ navigation }: AllStackScreenProps<'Discover'>) => {
  const [comics, setComics] = useState<ComicType[]>([]);
  const genres = useAppSelector((state: RootState) => state.genre.data);
  const [listSelected, setListSelected] = useState<ListSelected>({
    genre: '',
    status: '',
    date: '',
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
        value: 'desc',
        label: 'Giảm dần',
      },
      {
        value: 'asc',
        label: 'Tăng dần',
      },
    ],
    [],
  );

  const handleChangeFilter = useCallback(
    (value: string, type: Option) => {
      const newState = {
        ...listSelected,
        [type]: value,
      };
      setListSelected(newState);
    },
    [listSelected, setListSelected],
  );

  useEffect(() => {
    (async () => {
      const result = await API.get('/discover');
      setComics(result.data?.lastUpdated);
    })();
  }, []);

  // console.log('listSelected', listSelected, comics);

  return (
    <View>
      <CustomHeader title="Thể loại" />

      <ItemFilter
        data={options}
        itemSelected={listSelected.genre}
        handleSelected={handleChangeFilter}
        type="genre"
      />

      <ItemFilter
        data={options2}
        itemSelected={listSelected.status}
        handleSelected={handleChangeFilter}
        type="status"
      />

      <ItemFilter
        data={options3}
        itemSelected={listSelected.date}
        handleSelected={handleChangeFilter}
        type="date"
      />

      <ListComic data={comics} />
    </View>
  );
};

interface ItemFilterProps {
  data: {
    label: string;
    value: string | number;
  }[];
  handleSelected: (value: string, type: Option) => void;
  itemSelected: string | number;
  type: Option;
}

const ItemFilter = React.memo(
  ({ handleSelected, data, type, itemSelected }: ItemFilterProps) => {
    const renderItem = useCallback(
      ({ item, index }) => {
        return (
          <MyTouchableOpacity
            onPress={() => handleSelected(item.value, type)}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
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
}

const ListComic = React.memo(({ data }: ListComicProps) => {
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <MyTouchableOpacity
          style={{
            paddingVertical: WIDTH_SCALE * 10,
            borderBottomWidth: 1,
            borderBottomColor: pColor.bgSubColor,
            borderWidth: 1,
            borderColor: pColor.bgSubColor,

            flexDirection: 'row',
          }}>
          <MyTouchableOpacity
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
              <ListGenre data={item.genres} />
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
                <Icon name={'thumbsup'} color={pColor.textColor2} size={15} />
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
    [data],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(v, i) => `${v.id}_${i}`}
      ListEmptyComponent={() => (
        <View
          style={{
            marginTop: 100,
          }}>
          <SkypeIndicator color={pColor.black} size={40 * WIDTH_SCALE} />
        </View>
      )}
    />
  );
});

export default Discover;
