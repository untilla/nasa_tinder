import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, ViewStyle, View, ImageStyle } from 'react-native';

const LoaderOverlay: React.FC = (): JSX.Element => {
  const rotate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animatedLoop = (): void =>
      Animated.sequence([
        Animated.timing(rotate, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          useNativeDriver: true,
          duration: 0,
        })
      ]).start(animatedLoop);
    animatedLoop();
  }, [rotate]);
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/images/progress-bar.png')}
        style={[
          styles.spinner,
          {
            transform: [{
              rotate: rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              })
            }]
          }
        ]}
      />
    </View>
  );
};

interface IStyle {
  container: ViewStyle,
  spinner: ImageStyle,
}

const styles = StyleSheet.create<IStyle>({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  spinner: {
    width: 44,
    height: 44,
    alignSelf: 'center',
  },
});

export default LoaderOverlay;
