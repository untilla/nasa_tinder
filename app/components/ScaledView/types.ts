import { StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface IScaledViewProps {
  style?: StyleProp<ViewStyle>,
  scale: number,
  children: ReactNode,
}
