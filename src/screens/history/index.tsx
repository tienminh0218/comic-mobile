import FixedContainer from '@components/FixContainer';
import CustomHeader from '@components/Header';
import { ListItem } from '@components/ListComic';
import { WIDTH_SCALE } from '@constants/constants';
import { ComicType } from '@models/comic';
import API from '@services/api';
import { RootState } from '@stores/store/store';
import { useAppSelector } from '@stores/store/storeHook';
import React, { useEffect, useState } from 'react';

const History = () => {
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
      <CustomHeader title="Truyện đã xem" />

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

export default History;
