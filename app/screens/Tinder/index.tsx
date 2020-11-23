import React, { useCallback, useEffect } from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';
import Swiper from './components/Swiper';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/useStores';

const Tinder: React.FC = observer((): JSX.Element => {
  const { store: { fetchPhotos, photoCards } } = useStores();
  const handleMoreData = useCallback(() => {

    fetchPhotos();
  }, []);
  useEffect(() => {
    fetchPhotos();
  }, []);
  return (
    <View style={styles.container}>
      <Swiper
        cards={[...photoCards]}
        // onLike={card => console.log(card)}
        // onUndoLastLike={card => console.log(card)}
        onFinish={handleMoreData}
      />
    </View>
  );
});

interface IStyle {
  container: ViewStyle,
  cardContainer: ViewStyle,
}

const styles = StyleSheet.create<IStyle>({
  container: {
    flex: 1,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default Tinder;
