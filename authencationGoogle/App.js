
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import SigIn from './components/SigIn';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <SigIn />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
