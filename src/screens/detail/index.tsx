import { FlatList, Text, View, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import React, { useCallback, useState } from 'react';
import SwitchSelector from 'react-native-switch-selector';

import FixedContainer from '@components/FixContainer';
import CustomHeader from '@components/Header';
import { pColor } from '@constants/color';
import { HEIGHT_SCALE, WIDTH_SCALE } from '@constants/constants';
import { RootState } from '@stores/store/store';
import { useAppSelector } from '@stores/store/storeHook';
import { getGenres } from '@utils/getGenres';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { ComicType } from '@models/comic';

const comic = {
  id: '8Ty7UFpwrAOtC60KUYj7',
  updatedAt: '2021-12-31T15:06:02.100Z',
  author: ' Tomohito Oda',
  status: 'Đang tiến hành',
  listChapter: [
    {
      name: '1',
      views: 3,
      idChapter: '0f87e3a1-9de1-445e-b276-61c584902e8b',
      createdAt: '12/31/2021',
    },
    {
      name: '2',
      views: 1,
      idChapter: '11e363fc-1bbf-448c-83a0-946de0aa662f',
      createdAt: '12/31/2021',
    },
    {
      name: '3',
      views: 1,
      idChapter: 'ba7ff9dd-e9a2-4083-a7cf-8a17436d9793',
      createdAt: '12/31/2021',
    },
    {
      name: '4',
      idChapter: '2e4417e5-4909-459d-b54e-c16d6606b3cd',
      views: 1,
      createdAt: '12/31/2021',
    },
    {
      views: 1,
      createdAt: '12/31/2021',
      idChapter: 'e1c4f9d9-a166-44a4-b9a2-8442830260ec',
      name: '5',
    },
  ],
  interacts: {
    bookMark: 0,
    unlike: 0,
    like: 0,
    views: 43,
  },
  genres: ['comedy', 'romance', 'school_life', 'shounen', 'slice_of_life'],
  describe:
    "Tên khác: Komi-san can't speak well.; Komi-san has a communication disease.; Komi-san has poor communication skills.; Komi-san is asocial.; Komi-san is socially ill\nMột em dở giao tiếp, nhưng 1 khi đã nói thì.......",
  nameFolder: 'komi_san_wa_comyushou_desu_20c1468b-0d7c-4e4a-ba18-02d998e8d633',
  comments: [],
  recommended: true,
  createdAt: '2021-11-08T07:54:11.915Z',
  name: {
    orgName: 'Komi san wa Comyushou desu',
    vnName: 'Komi-san wa Komyushou Desu',
  },
  deleted: false,
  images: {
    thumbnail: {
      url: 'https://firebasestorage.googleapis.com/v0/b/comic-c193e.appspot.com/o/comics%2Fkomi_san_wa_comyushou_desu_20c1468b-0d7c-4e4a-ba18-02d998e8d633%2Fimages%2F_thumbnail.jpg?alt=media&token=cb404776-ed76-426a-a3a8-89ca7aa5ed8f',
      fullPath:
        'comics/komi_san_wa_comyushou_desu_20c1468b-0d7c-4e4a-ba18-02d998e8d633/images/_thumbnail.jpg',
    },
    banner: {
      url: 'https://firebasestorage.googleapis.com/v0/b/comic-c193e.appspot.com/o/comics%2Fkomi_san_wa_comyushou_desu_20c1468b-0d7c-4e4a-ba18-02d998e8d633%2Fimages%2F_banner.jpg?alt=media&token=1a45fc42-a69e-48bb-96c3-028679eac9e7',
      fullPath:
        'comics/komi_san_wa_comyushou_desu_20c1468b-0d7c-4e4a-ba18-02d998e8d633/images/_banner.jpg',
    },
  },
};

const SHOW_TYPE = {
  LIST: 0,
  DESCRIPTION: 1,
};

const options = [
  { label: 'Danh sách chương', value: SHOW_TYPE.LIST },
  { label: 'Giới thiệu', value: SHOW_TYPE.DESCRIPTION },
];

const Detail = () => {
  const [selectedType, setSelectedType] = useState<number>(SHOW_TYPE.LIST);

  const onSwitchSelectorPress = useCallback(
    (value: number) => {
      setSelectedType(value);
    },
    [selectedType],
  );

  console.log('selectedType', selectedType);

  return (
    <FixedContainer>
      <CustomHeader />
      <View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'black',
            padding: WIDTH_SCALE * 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: WIDTH_SCALE * 120,
              height: WIDTH_SCALE * 170,
              borderRadius: 6,
              overflow: 'hidden',
              marginRight: WIDTH_SCALE * 10,
              elevation: 10,
            }}>
            <FastImage
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: comic.images.thumbnail.url,
              }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingTop: WIDTH_SCALE * 5,
              paddingBottom: WIDTH_SCALE * 10,
            }}>
            <Text
              style={{
                color: pColor.black,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {comic.name.vnName}
            </Text>
            <Text
              style={{
                color: pColor.textSubColor,
                fontSize: 11,
                marginBottom: WIDTH_SCALE * 5,
              }}>
              Tên khác: {comic.name.orgName}
            </Text>
            <View
              style={{
                // flex: 1,
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  color: pColor.textColor2,
                  fontSize: 12,
                }}>
                Tác giả: {comic.author}
              </Text>
              <Text
                style={{
                  color: pColor.textColor2,
                  fontSize: 12,
                }}>
                Trạng thái: {comic.status}
              </Text>
              <Text
                style={{
                  color: pColor.textColor2,
                  fontSize: 12,
                }}>
                Lượt xem {comic.interacts.views}
              </Text>
            </View>

            <ListGenre data={comic.genres} />
          </View>
        </View>

        <SwitchSelector
          options={options}
          initial={selectedType}
          onPress={onSwitchSelectorPress}
          style={{
            marginTop: WIDTH_SCALE * 10,
            // marginBottom: WIDTH_SCALE * 5,
            elevation: 2,
          }}
          textColor={pColor.textColor2}
          buttonColor="transparent"
          selectedTextStyle={{
            color: pColor.black,
            fontSize: 14,
            fontWeight: '600',
          }}
          borderRadius={0}
          selectedTextContainerStyle={{
            borderBottomWidth: 2,
            borderBottomColor: pColor.black,
            paddingVertical: HEIGHT_SCALE * 10,
          }}
        />

        {selectedType === SHOW_TYPE.LIST ? (
          <ListChapter data={comic as ComicType} />
        ) : (
          <View
            style={{
              padding: WIDTH_SCALE * 5,
            }}>
            <Text>{comic?.describe}</Text>
          </View>
        )}
      </View>
    </FixedContainer>
  );
};

interface ListChapterProps {
  data: ComicType;
}

const ListChapter = React.memo(({ data }: ListChapterProps) => {
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <MyTouchableOpacity
          style={{
            paddingHorizontal: WIDTH_SCALE * 15,
            paddingVertical: WIDTH_SCALE * 6,
            borderBottomWidth: 1,
            borderBottomColor: pColor.textSubColor,

            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>{`${index + 1}. Chap ${item.name} `}</Text>
          <Text>{item.createdAt}</Text>
        </MyTouchableOpacity>
      );
    },
    [data],
  );

  return (
    <FlatList
      data={data?.listChapter || []}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item?.idChapter}_${index}`}
    />
  );
});

const ListGenre = React.memo(({ data }: { data: string[] }) => {
  const listGenres = useAppSelector((state: RootState) => state.genre.data);

  return (
    <FlatList
      data={getGenres(listGenres, data)}
      renderItem={({ item }) => {
        return (
          <MyTouchableOpacity
            style={{
              backgroundColor: pColor.bgSubColor,
              padding: 4,
              borderRadius: 4,
              marginRight: 5,
              marginTop: 5,
            }}>
            <Text
              style={{
                color: pColor.textColor2,
                fontSize: 10,
              }}>
              {item.name}
            </Text>
          </MyTouchableOpacity>
        );
      }}
      numColumns={4}
      style={{
        flexGrow: 0,
        flexDirection: 'column',
      }}
    />
  );
});

export default Detail;
