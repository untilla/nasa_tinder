import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Tinder from './screens/Tinder';
import { observer } from 'mobx-react';
import { useStores } from './hooks/useStores';
import LoaderOverlay from './components/LoaderOverlay';

const AppRoot: React.FC = observer((): JSX.Element => {
  const { store: { isLoading } } = useStores();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Tinder/>
        {isLoading && (<LoaderOverlay/>)}
      </SafeAreaView>
    </View>
  );
});

interface IStyle {
  container: ViewStyle,
}

const styles = StyleSheet.create<IStyle>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AppRoot;
