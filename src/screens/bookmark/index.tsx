import React, { useCallback, useEffect, useState } from 'react';

import FixedContainer from '@components/FixContainer';
import CustomHeader from '@components/Header';
import { ListItem } from '@components/ListComic';
import { WIDTH_SCALE } from '@constants/constants';
import { ComicType } from '@models/comic';
import { AllStackScreenProps } from '@navigators/all-stack';
import API from '@services/api';
import { RootState } from '@stores/store/store';
import { useAppDispatch, useAppSelector } from '@stores/store/storeHook';
import { loadDetailComic } from '@stores/reducer/detail/actions';

const Bookmark = ({ navigation }: AllStackScreenProps<'Bookmark'>) => {
  const [comics, setComics] = useState<ComicType[]>([]);
  const user = useAppSelector((state: RootState) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const result = await API.get(`/users/${user?.id}`);
        setComics(result.data);
      } catch (error: any) {
        console.log('error get data from bookmark ', error?.message);
      }
    })();
  }, []);

  return (
    <FixedContainer>
      <CustomHeader
        title="Truyện đã theo dõi"
        style={{
          marginBottom: 10,
        }}
      />

      <ListItem
        style={{
          paddingHorizontal: WIDTH_SCALE * 10,
        }}
        data={comics}
        onNavigateDetail={(idComic) => {
          dispatch(loadDetailComic(idComic));
          navigation.navigate('Detail');
        }}
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
