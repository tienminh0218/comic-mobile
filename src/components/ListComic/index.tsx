import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Octicons';

import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { pColor } from '@constants/color';
import { HEIGHT_SCALE, WIDTH_SCALE } from '@constants/constants';
import { ComicType } from '@models/comic';
import { fromNowDate } from '@utils/moment';

interface ContainerProps {
  horizontal?: boolean | null | undefined;
  showsHorizontalScrollIndicator?: boolean | undefined;
  keyExtractor?: ((item: ComicType, index: number) => string) | undefined;
  renderItem?: ListRenderItem<ComicType> | null | undefined;
  numColumns?: number | undefined;
}

interface ListItemProps {
  title?: string;
  data: ComicType[];
  onNavigateDetail: (id: string) => void;
  style?: StyleProp<ViewStyle>;
  containerProps?: ContainerProps;
}

export const ListItem = React.memo(
  ({ title, data, style, containerProps, onNavigateDetail }: ListItemProps) => {
    const renderItem = useCallback(
      ({ item }) => {
        const lastChap = item.listChapter[item.listChapter.length - 1];
        return (
          <MyTouchableOpacity
            onPress={() => onNavigateDetail(item.id)}
            style={{
              marginRight: 15,
              width: containerProps?.horizontal ? WIDTH_SCALE * 120 : '30%',
              marginBottom: WIDTH_SCALE * 15,
            }}>
            <MyTouchableOpacity
              onPress={() => onNavigateDetail(item.id)}
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
                  uri: item.images.thumbnail.url,
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
      [data, pColor, onNavigateDetail, containerProps, style],
    );

    return (
      <View
        style={[
          {
            flex: 1,
          },
          style,
        ]}>
        {title && (
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
        )}

        <FlatList
          data={data}
          renderItem={containerProps?.renderItem || renderItem}
          //   keyExtractor={(item, index) => `${title}_${item.id}_${index}`}
          //   horizontal
          //   showsHorizontalScrollIndicator={false}
          {...containerProps}
        />
      </View>
    );
  },
);
