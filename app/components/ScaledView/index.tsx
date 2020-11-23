import React, { useState, useEffect } from 'react';
import {
  Animated,
} from 'react-native';
import { IScaledViewProps } from './types';

const ScaledView: React.FC<IScaledViewProps> =
  ({
     style = {},
     scale = 1,
     children
  }): JSX.Element => {
    const [didMount, setDidMount] = useState<boolean>(false);
    const [savedScale, setSavedScale] = useState<number>(scale);
    const [startValue] = useState(new Animated.Value(scale));

    useEffect(() => {
      if (didMount) {
        if (scale !== savedScale) {
          Animated.timing(startValue, {
            toValue: scale,
            duration: 200,
            useNativeDriver: true,
          }).start();
          setSavedScale(scale);
        }
      }
      else {
        setDidMount(true);
      }
    }, [didMount, scale, savedScale, startValue]);
    return (
      <Animated.View
        style={[{
          transform: [{
            scale: startValue,
          }],
        }, style]}
      >
        {children}
      </Animated.View>
    );
  };

export default ScaledView;
