import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tinder from './screens/Tinder';
import { observer } from 'mobx-react';
import { useStores } from './hooks/useStores';
import LoaderOverlay from './components/LoaderOverlay';

const Stack = createStackNavigator();

const AppRoot: React.FC = observer((): JSX.Element => {
  const { store: { isLoading } } = useStores();
  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <View style={[styles.container, { backgroundColor: AppTheme.colors.background }]}>
      <NavigationContainer theme={AppTheme}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName={'Tinder'}
          >
            <Stack.Screen
              name={'Tinder'}
              component={Tinder}
            />
          </Stack.Navigator>
          {isLoading && (<LoaderOverlay/>)}
        </SafeAreaView>
      </NavigationContainer>
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
