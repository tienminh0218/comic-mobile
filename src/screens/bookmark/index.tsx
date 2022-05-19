import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  StyleProp,
  ViewStyle,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import { AllStackScreenProps } from '@navigators/all-stack';
import FixedContainer from '@components/FixContainer';
import CustomHeader from '@components/Header';
import API from '@services/api';
import { useAppSelector } from '@stores/store/storeHook';
import { RootState } from '@stores/store/store';
import { pColor } from '@constants/color';
import MyTouchableOpacity from '@components/MyTouchableOpacity';
import { HEIGHT_SCALE, WIDTH_SCALE } from '@constants/constants';
import { fromNowDate } from '@utils/moment';
import FastImage from 'react-native-fast-image';
import { ComicType } from '@models/comic';
import { ListItem } from '@components/ListComic';

const Bookmark = ({ navigation }: AllStackScreenProps<'Bookmark'>) => {
  const [comics, setComics] = useState<ComicType[]>([]);
  const user = useAppSelector((state: RootState) => state.user.data);

  useEffect(() => {
    (async () => {
      try {
        const result = await API.get(`/users/${user?.id}`);
        setComics([...result.data, ...result.data, ...result.data]);
      } catch (error: any) {
        console.log('error get data from bookmark ', error?.message);
      }
    })();
  }, []);

  return (
    <FixedContainer>
      <CustomHeader title="Truyện đã theo dõi" />

      <ListItem
        style={{
          paddingHorizontal: WIDTH_SCALE * 10,
        }}
        data={comics}
        onNavigateDetail={(idComic) => {}}
        containerProps={{
          keyExtractor: (item, index) => `${item?.id}_${index}`,
          showsHorizontalScrollIndicator: false,
          numColumns: 3,
        }}
      />
    </FixedContainer>
  );
};

export default Bookmark;
