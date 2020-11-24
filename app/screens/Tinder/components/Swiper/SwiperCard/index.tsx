import React from 'react';
import { ImageStyle, StyleSheet, View, ViewStyle, Image, TextStyle, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ISwiperCardProps } from './types';
import { CARD_HEIGHT, CARD_WIDTH } from '../types';
import moment from 'moment';

const SwiperCard: React.FC<ISwiperCardProps> =
  ({ card: { earth_date, camera: { full_name }, rover: { name }, img_src }}): JSX.Element => {
    return (
      <View style={[styles.container]}>
        <Image
          source={{ uri: img_src }}
          style={styles.picture}
          resizeMode='cover'
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.gradient}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.info}>{full_name}</Text>
          <Text style={styles.info}>{moment(earth_date).format('MMM D, YYYY')}</Text>
        </View>
      </View>
    );
  };

interface IStyle {
  container: ViewStyle,
  picture: ImageStyle,
  textContainer: ViewStyle,
  title: TextStyle,
  info: TextStyle,
  gradient: ViewStyle,
}

const styles = StyleSheet.create<IStyle>({
  container: {
    borderRadius: 8,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    shadowColor: 'rgba(16, 32, 39, 0.22)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  picture: {
    width: 328,
    height: 484,
    borderRadius: 8,
  },
  textContainer: {
    position: 'absolute',
    left: 24,
    top: 24,
    marginRight: 24,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    color: 'white',
    marginBottom: 4,
    fontFamily: 'IBMPlexSans-SemiBold',
  },
  info: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.75,
    color: 'white',
    fontFamily: 'IBMPlexSans-Regular',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 8,
  },
});

export default SwiperCard;
