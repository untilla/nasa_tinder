import React from 'react';
import { ImageStyle, StyleSheet, View, ViewStyle, Image, TextStyle, Text } from 'react-native';
import { ISwiperCardProps } from './types';
import { CARD_HEIGHT, CARD_WIDTH } from '../types';
import moment from 'moment';

const SwiperCard: React.FC<ISwiperCardProps> =
  ({ card: { earth_date, camera: { full_name }, rover: { name } }}): JSX.Element => {
    return (
      <View style={[styles.container]}>
        <Image source={require('./assets/images/card.png')} style={styles.picture}/>
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
}

const styles = StyleSheet.create<IStyle>({
  container: {
    borderRadius: 8,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    shadowColor: 'rgba(16, 32, 39, 0.16)',
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
});

export default SwiperCard;
