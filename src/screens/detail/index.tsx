import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Octicons';

import FixedContainer from '@components/FixContainer';
import CustomHeader from '@components/Header';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { WIDTH_SCALE } from '@constants/constants';
import { ComicType } from '@models/comic';
import { AllStackScreenProps } from '@navigators/all-stack';
import API from '@services/api';
import { RootState } from '@stores/store/store';
import { useAppSelector } from '@stores/store/storeHook';
import { getGenres } from '@utils/getGenres';
import MySpinner from '@components/my-spinner';

const Detail = ({ navigation }: AllStackScreenProps<'Detail'>) => {
  const detailState = useAppSelector((state: RootState) => state.detail);

  if (detailState.isLoading)
    return (
      <FixedContainer
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator animating={true} color={pColor.black} />
      </FixedContainer>
    );

  return (
    <FixedContainer>
      <CustomHeader />
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
                uri: detailState.data?.images?.thumbnail.url,
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
              {detailState.data?.name.vnName}
            </Text>
            <Text
              style={{
                color: pColor.textSubColor,
                fontSize: 11,
                marginBottom: WIDTH_SCALE * 5,
              }}>
              Tên khác: {detailState.data?.name.orgName}
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
                Tác giả: {detailState.data?.author}
              </Text>
              <Text
                style={{
                  color: pColor.textColor2,
                  fontSize: 12,
                }}>
                Trạng thái: {detailState.data?.status}
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
                <Icon name={'eye'} color={pColor.textColor2} size={15} />
                <Text style={{ color: pColor.textColor2, marginLeft: 5 }}>
                  {' '}
                  {detailState.data?.interacts?.views || 0}{' '}
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
                  {detailState.data?.interacts?.bookMark || 0}{' '}
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
                  {detailState.data?.interacts?.like || 0}{' '}
                </Text>
              </View>
            </View>

            <ListGenre data={detailState.data?.genres || []} />
          </View>
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <ChapterInfo navigation={navigation} data={detailState.data!} />
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
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: pColor.bgSubColor,
          }}>
          <Icon name={'heart'} color={pColor.textColor2} size={15} />
        </MyTouchableOpacity>
        <MyTouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: pColor.bgSubColor,
          }}>
          <Icon name={'thumbsup'} color={pColor.textColor2} size={15} />
        </MyTouchableOpacity>
        <MyTouchableOpacity
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
            Đọc
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
    { key: 'list', title: 'Danh sách chương' },
    { key: 'des', title: 'Giới thiệu' },
  ]);

  const getDetailChap = useCallback(
    async (idChap: string) => {
      try {
        MySpinner.show();
        const result = await API.get(`/titles/${data.id!}/views/${idChap}`);
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

export const ListGenre = React.memo(({ data }: { data: string[] }) => {
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
