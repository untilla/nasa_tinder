import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, ViewStyle, View, ImageStyle, TextStyle, TouchableOpacity, Text, Image } from 'react-native';
import Swiper from './components/Swiper';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/useStores';
import { INavigationProps } from '../../types/global';
import LoaderOverlay from '../../components/LoaderOverlay';

const Tinder: React.FC<INavigationProps> = observer(({ navigation }): JSX.Element => {
  const swiperRef = useRef<React.RefObject<React.FC> | any>();
  const { store: { fetchPhotos, photoCards, isLoading } } = useStores();
  const [undoEnabled, setUndoEnabled] = useState<boolean>(false);
  const [likeEnabled, setLikeEnabled] = useState<boolean>(true);
  useLayoutEffect(() => navigation.setOptions({
    header: () => (
      <View style={styles.headerContainer}>
        <View style={styles.button}>
          <TouchableOpacity onPress={(swiperRef.current && undoEnabled) && swiperRef.current.undoHandler}>
            <Text style={[styles.undo, { color: undoEnabled ? '#EB5757' : '#CFD8DC'}]}>Undo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Mars</Text>
        </View>
        <View style={styles.button}>
          <Image
            source={likeEnabled ? require('./assets/images/heart.png') : require('./assets/images/heart_d.png')}
            style={styles.likePic}
          />
        </View>
      </View>
    ),
  }), [navigation, undoEnabled]);
  useEffect(() => {
    fetchPhotos();
  }, []);
  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={[...photoCards]}
        // onLike={card => console.log(card)}
        // onUndoLastLike={card => console.log(card)}
        onFinish={fetchPhotos}
        undoEnableCallback={setUndoEnabled}
      />
      {isLoading && (<LoaderOverlay/>)}
      <Text style={styles.tabText}>10 cards</Text>
    </View>
  );
});

interface IStyle {
  container: ViewStyle,
  cardContainer: ViewStyle,
  headerContainer: ViewStyle,
  button: ViewStyle,
  likePic: ImageStyle,
  title: TextStyle,
  titleContainer: TextStyle,
  undo: TextStyle,
  tabText: TextStyle,
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
  headerContainer: {
    flexDirection: 'row',
    height: 64,
  },
  button: {
    width: 96,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likePic: {
    width: 28,
    height: 28,
    alignSelf: 'flex-end',
    marginRight: 24,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: 'black',
    fontFamily: 'IBMPlexSans-Medium',
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  undo: {
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#EB5757',
    fontFamily: 'IBMPlexSans-Medium',
    textAlign: 'center',
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.75,
    color: '#727C81',
    fontFamily: 'IBMPlexSans-Regular',
    textAlign: 'center',
  },
});

export default Tinder;
