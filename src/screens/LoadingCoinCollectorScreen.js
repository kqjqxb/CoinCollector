import React, { useEffect, useRef, useState } from 'react';
import { View, ImageBackground, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoadingCoinCollectorScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();
  const [percentage, setPercentage] = useState(0);

  const animatedOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedOpacity]);

  useEffect(() => {
    if (percentage < 100) {
      const timer = setTimeout(() => {
        setPercentage(percentage + 1);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      navigation.replace('Home');
    }
  }, [percentage]);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
    }}>
      <ImageBackground 
        source={require('../assets/images/loaderBg.png')}
        style={{
          position: 'absolute',
          width: dimensions.width,
          height: dimensions.height,
          alignSelf: 'center',
        }}
        resizeMode='stretch'
      />
      <Animated.Image
        source={require('../assets/images/coinCollectorIcon.png')}
        resizeMode='contain'
        style={{
          width: dimensions.width * 0.7,
          height: dimensions.width * 0.7,
          opacity: animatedOpacity,
        }}
      />
    </View>
  );
};

export default LoadingCoinCollectorScreen;