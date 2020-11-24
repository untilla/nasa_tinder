import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Provider } from 'mobx-react';
import AppStore from './app/store/AppStore';
import AppRoot from './app/AppRoot';

const stores: Record<string, any> = {
  store: new AppStore(),
};

const App: React.FC = (): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const loadResources = async (): Promise<any> => Promise.all([
    Font.loadAsync({
      'IBMPlexSans-Regular': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
      'IBMPlexSans-Medium': require('./assets/fonts/IBMPlexSans-Medium.ttf'),
      'IBMPlexSans-SemiBold': require('./assets/fonts/IBMPlexSans-SemiBold.ttf'),
    }),
  ]);

  if (!loaded) {
    return (
      <AppLoading
        startAsync={loadResources}
        onFinish={(): void => setLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider {...stores}>
      <AppRoot/>
    </Provider>
  );
};

export default App;
