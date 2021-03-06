import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Text, useWindowDimensions, View, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import IconMA from 'react-native-vector-icons/MaterialCommunityIcons';

import FixedContainer from '@components/FixContainer';
import { LoadingScreen } from '@components/loading';
import CustomHeader from '@components/Header';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { WIDTH_SCALE } from '@constants/constants';
import { ComicType } from '@models/comic';
import { AllStackScreenProps } from '@navigators/all-stack';
import API from '@services/api';
import { RootState } from '@stores/store/store';
import { useAppDispatch, useAppSelector } from '@stores/store/storeHook';
import { getGenres } from '@utils/getGenres';
import MySpinner from '@components/my-spinner';
import { interactWithComic } from '@stores/reducer/user/actions';
import { InteractsOfUser } from '@stores/reducer/user/userSlice';
import * as RootNavigation from '@utils/RootNavigation';

export interface InteractOfUserWithComic {
  idComic?: string;
  isLike?: boolean;
  isBookmark?: boolean;
}

const DEFAULT_INTERACTS: InteractOfUserWithComic = {
  isLike: false,
  isBookmark: false,
};

const Detail = ({ navigation }: AllStackScreenProps<'Detail'>) => {
  const detailState = useAppSelector((state: RootState) => state.detail.data);
  const isLoading = useAppSelector(
    (state: RootState) => state.detail.isLoading,
  );
  const interacts = useAppSelector((state: RootState) => state.user.interacts);
  const userId = useAppSelector((state: RootState) => state.user.data?.id);
  const latestChapter = useMemo(
    () =>
      detailState?.listChapter[detailState?.listChapter.length - 1]?.idChapter,
    [detailState],
  );
  const [interactOfComic, setInteractOfComic] =
    useState<InteractOfUserWithComic>(DEFAULT_INTERACTS);
  const dispatch = useAppDispatch();

  const getDetailChap = useCallback(
    async (idChap: string) => {
      try {
        MySpinner.show();
        const result = await API.get(
          `/titles/${detailState?.id}/view/${idChap}`,
        );
        MySpinner.hide();
        navigation.navigate('ViewChap', {
          ...result.data,
        });
      } catch (error: any) {
        console.log('error from getDetailChap', error?.message);
      }
    },
    [detailState],
  );

  const handleInteractOfComic = useCallback(
    (action: InteractOfUserWithComic) => {
      if (!userId) {
        Alert.alert(
          'Th??ng b??o',
          'B???n ch??a ????ng nh???p. Vui l??ng ????ng nh???p ????? th???c hi???n thao t??c n??y.',
          [
            {
              text: 'Hu???',
            },
            {
              text: '????ng nh???p',
              onPress: () => navigation.navigate('Login'),
            },
          ],
        );

        return;
      }

      const newInteractOfComic = {
        ...interactOfComic,
        ...action,
      };
      setInteractOfComic(newInteractOfComic);
      dispatch(interactWithComic(newInteractOfComic as any));
    },
    [interactOfComic, userId],
  );

  const updateInteractState = useCallback(
    (interacts: InteractsOfUser, id: string) => {
      return (
        interacts.comicsWasInteracted.find((item) => item.idComic === id) || {
          idComic: id,
          ...DEFAULT_INTERACTS,
        }
      );
    },
    [detailState, interacts],
  );

  const onNavigateToDiscover = (slug: string) => {};

  useEffect(() => {
    setInteractOfComic(updateInteractState(interacts, detailState?.id!));
  }, [detailState]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <FixedContainer>
      <CustomHeader title="Th??ng tin truy???n" />
      <View
        style={{
          flex: 1,
        }}>
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
                uri: detailState?.images?.thumbnail.url,
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
              {detailState?.name.vnName}
            </Text>
            <Text
              style={{
                color: pColor.textSubColor,
                fontSize: 11,
                marginBottom: WIDTH_SCALE * 5,
              }}>
              T??n kh??c: {detailState?.name.orgName}
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
                T??c gi???: {detailState?.author}
              </Text>
              <Text
                style={{
                  color: pColor.textColor2,
                  fontSize: 12,
                }}>
                Tr???ng th??i: {detailState?.status}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'red',
                marginTop: 5 * WIDTH_SCALE,
              }}>
              <View
                style={{
                  marginRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IconMA name={'eye'} color={pColor.textColor2} size={15} />
                <Text style={{ color: pColor.textColor2, marginLeft: 5 }}>
                  {' '}
                  {detailState?.interacts?.views || 0}{' '}
                </Text>
              </View>
              <View
                style={{
                  marginRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IconMA name={'heart'} color={pColor.textColor2} size={15} />
                <Text style={{ color: pColor.textColor2, marginLeft: 5 }}>
                  {' '}
                  {detailState?.interacts?.bookMark || 0}{' '}
                </Text>
              </View>
              <View
                style={{
                  marginRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IconMA name={'thumb-up'} color={pColor.textColor2} size={15} />
                <Text style={{ color: pColor.textColor2, marginLeft: 5 }}>
                  {' '}
                  {detailState?.interacts?.like || 0}{' '}
                </Text>
              </View>
            </View>

            <ListGenre
              data={detailState?.genres || []}
              onNavigateToDiscover={onNavigateToDiscover}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <ChapterInfo navigation={navigation} data={detailState!} />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          height: 40 * WIDTH_SCALE,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 0.5,
          borderTopColor: pColor.bgSubColor,

          flexDirection: 'row',
        }}>
        <MyTouchableOpacity
          onPress={() =>
            handleInteractOfComic({ isBookmark: !interactOfComic.isBookmark })
          }
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: pColor.bgSubColor,
          }}>
          <IconMA
            name={
              interactOfComic.isBookmark ? 'cards-heart' : 'cards-heart-outline'
            }
            color={pColor.textColor2}
            size={18}
          />
        </MyTouchableOpacity>
        <MyTouchableOpacity
          onPress={() =>
            handleInteractOfComic({ isLike: !interactOfComic.isLike })
          }
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: pColor.bgSubColor,
          }}>
          <IconMA
            name={interactOfComic.isLike ? 'thumb-up' : 'thumb-up-outline'}
            color={pColor.textColor2}
            size={18}
          />
        </MyTouchableOpacity>
        <MyTouchableOpacity
          onPress={() => getDetailChap(latestChapter!)}
          style={{
            height: '100%',
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.4,
          }}>
          <Text
            style={{
              color: pColor.black,
              fontWeight: '600',
              fontSize: 16,
            }}>
            ?????c
          </Text>
        </MyTouchableOpacity>
      </View>
    </FixedContainer>
  );
};

interface ChapterInfoProps {
  data: ComicType;
  navigation: any;
}

const ChapterInfo = React.memo(({ data, navigation }: ChapterInfoProps) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'list', title: 'Danh s??ch ch????ng' },
    { key: 'des', title: 'Gi???i thi???u' },
  ]);

  const getDetailChap = useCallback(
    async (idChap: string) => {
      try {
        MySpinner.show();
        const result = await API.get(`/titles/${data.id!}/view/${idChap}`);
        MySpinner.hide();
        navigation.navigate('ViewChap', {
          ...result.data,
        });
      } catch (error: any) {
        console.log('error from getDetailChap', error?.message);
      }
    },
    [data],
  );

  const ListChapter = useCallback(() => {
    const renderItem = useCallback(
      ({ item, index }) => {
        return (
          <MyTouchableOpacity
            onPress={() => getDetailChap(item.idChapter)}
            style={{
              paddingHorizontal: WIDTH_SCALE * 15,
              paddingVertical: WIDTH_SCALE * 6,
              borderBottomWidth: 1,
              borderBottomColor: pColor.textSubColor,

              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ color: pColor.textSubColor }}>{`${index + 1}. Chap ${
              item.name
            } `}</Text>
            <Text style={{ color: pColor.textSubColor }}>{item.createdAt}</Text>
          </MyTouchableOpacity>
        );
      },
      [data],
    );

    return (
      <FlatList
        data={data.listChapter}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item?.idChapter}_${index}`}
      />
    );
  }, [data]);

  const Description = useCallback(() => {
    return (
      <View
        style={{
          padding: WIDTH_SCALE * 5,
        }}>
        <Text style={{ color: pColor.textSubColor }}>{data?.describe}</Text>
      </View>
    );
  }, [data]);

  const renderScene = useMemo(
    () =>
      SceneMap({
        list: ListChapter,
        des: Description,
      }),
    [data],
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={{
        paddingBottom: 40 * WIDTH_SCALE,
      }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: pColor.black }}
          style={{
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: pColor.bgSubColor,
            borderBottomColor: pColor.bgSubColor,
          }}
          inactiveColor={pColor.bgSubColor}
          activeColor={pColor.black}
        />
      )}
    />
  );
});

interface IListGenre {
  data: string[];
  onNavigateToDiscover: any;
}

export const ListGenre = React.memo(
  ({ data, onNavigateToDiscover }: IListGenre) => {
    const listGenres = useAppSelector((state: RootState) => state.genre.data);

    return (
      <FlatList
        data={getGenres(listGenres, data)}
        renderItem={({ item }) => {
          return (
            <MyTouchableOpacity
              onPress={() => onNavigateToDiscover(item?.slug)}
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
  },
);

export default Detail;
