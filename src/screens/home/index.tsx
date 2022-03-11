import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  return (
    <View>
      <Text style={{color: 'red'}}>Home</Text>
      <Icon name="home" size={30} color="#900" />
    </View>
  );
};

export default Home;
