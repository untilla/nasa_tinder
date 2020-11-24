import React, { useRef, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, ViewStyle, View, Animated, PanResponder } from 'react-native';
import { ISwiperProps } from './types';
import SwiperCard from './SwiperCard';
import { SCREEN_WIDTH } from '../../../../constants/globals';

const Swiper = forwardRef<React.RefObject<React.FC> | any, ISwiperProps>(
  ({
     cards,
     onLike = () => {},
     onUndoLastLike= () => {},
     onFinish = () => {},
     undoEnableCallback = () => {},
   }, ref): JSX.Element => {
    const [undoEnabled, enableUndo] = useState<boolean>(false);
    const [cardIndex, setCardIndex] = useState<number>(0);
    const [lastCoords, setLastCoords] = useState({ x: 0, y: 0});
    const scaleValue = useRef(new Animated.Value(0)).current;
    const position = useRef(new Animated.ValueXY()).current;
    const setEnableUndo = useCallback((enable: boolean) => {
      enableUndo(enable);
      undoEnableCallback(enable);
    }, [undoEnableCallback]);
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
        const dx = gestureState.dx > 0 ? gestureState.dx : -gestureState.dx;
        if (dx > 80) {
          Animated.timing(scaleValue, {
            duration: 50,
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }
        else {
          Animated.timing(scaleValue, {
            duration: 50,
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          setLastCoords({ x: SCREEN_WIDTH + 100, y: gestureState.dy });
          Animated.spring(position, {
            useNativeDriver: true,
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          }).start(() => {
            position.setValue({ x: 0, y: 0 });
            setCardIndex(prevIndex => prevIndex + 1);
            setEnableUndo(true);
            scaleValue.setValue(0);
          });
        }
        else if (gestureState.dx < -120) {
          setLastCoords({ x: -SCREEN_WIDTH - 100, y: gestureState.dy });
          Animated.spring(position, {
            useNativeDriver: true,
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          }).start(() => {
            onLike(cards[cardIndex]);
            position.setValue({ x: 0, y: 0 });
            setEnableUndo(true);
            setCardIndex(prevIndex => prevIndex + 1);
            scaleValue.setValue(0);
          });
        }
        else {
          Animated.spring(position, {
            useNativeDriver: true,
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
          Animated.timing(scaleValue, {
            duration: 50,
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      }
    });
    const rotate = useRef(position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    })).current;

    const handleUndo = useCallback((): void => {
      setEnableUndo(false);
      if (lastCoords.x < 0) {
        onUndoLastLike(cards[cardIndex - 1]);
      }
      setCardIndex(prevIndex => prevIndex - 1);
      position.setValue(lastCoords);
      scaleValue.setValue(1);
      Animated.parallel([
        Animated.spring(position, {
          useNativeDriver: true,
          toValue: { x: 0, y: 0 },
          friction: 4,
        }),
        Animated.timing(scaleValue, {
          duration: 50,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, [setCardIndex, lastCoords, position, setEnableUndo, cardIndex]);

    useImperativeHandle(ref, () => ({
      undoHandler: () => handleUndo(),
    }),[handleUndo]);

    useEffect(() => {
      if (cards.length && cardIndex >= cards.length) {
        onFinish();
        setCardIndex(0);
        setEnableUndo(false);
      }
    }, [cardIndex, cards]);

    const rotateAndTranslate = {
      transform: [{
        rotate,
      },
        ...position.getTranslateTransform(),
      ],
    };

    return (
      <View style={{ flex: 1, marginTop: 64 }} ref={ref}>
        <View style={styles.container}>
          {cards[cardIndex + 3] && (
            <Animated.View
              style={
                [
                  styles.cardContainer,
                  {
                    transform: [{ scale: 0.8 }, { translateY: - 60 }],
                  }
                ]
              }
            >
              <SwiperCard card={cards[cardIndex + 3]}/>
            </Animated.View>
          )}
          {cards[cardIndex + 2] && (
            <Animated.View
              style={
                [
                  styles.cardContainer,
                  {
                    transform: [
                      {
                        scale: scaleValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 0.9],
                        }),
                      },
                      {
                        translateY: scaleValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-60, -10],
                        }),
                      }],
                  },
                ]
              }
            >
              <SwiperCard card={cards[cardIndex + 2]}/>
            </Animated.View>
          )}
          {cards[cardIndex + 1] && (
            <Animated.View
              style={
                [
                  styles.cardContainer,
                  {
                    transform: [
                      {
                        scale: scaleValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      },
                      {
                        translateY: scaleValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-10, 32],
                        }),
                      }],
                  },
                ]
              }
            >
              <SwiperCard card={cards[cardIndex + 1]}/>
            </Animated.View>
          )}
          {cards[cardIndex] && (
            <Animated.View
              style={
                [
                  styles.cardContainer,
                  {
                    top: 32,
                  },
                  // @ts-ignore
                  rotateAndTranslate,
                ]
              }
              {...panResponder.panHandlers}
            >
              <SwiperCard card={cards[cardIndex]} />
            </Animated.View>
          )}
        </View>
      </View>
    );
  });

interface IStyle {
  container: ViewStyle,
  cardContainer: ViewStyle,
}

const styles = StyleSheet.create<IStyle>({
  container: {
    transform: [{ scale: 1.1 }],
    flex: 1,
  },
  cardContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
  },
});

export default Swiper;
