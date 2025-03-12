import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsScreen from './SettingsScreen';
import { ScrollView } from 'react-native-gesture-handler';
import CardsScreen from './CardsScreen';
import LoadingAleaScreen from './LoadingAleaScreen';
import aleaChallengesData from '../components/aleaChallengesData';
import DreamBoardScreen from './DreamBoardScreen';
import RunGameScreen from './RunGameScreen';

const fontMontserratRegular = 'Montserrat-Regular';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const fontPlusJakartaSansRegular = 'PlusJakartaSans-Regular';
const fontPontanoSansRegular = 'PontanoSans-Regular';

const bottomBtns = [
  {
    id: 2,
    screen: 'RunGame',
    aleaIcon: require('../assets/icons/aleaBtnIcons/runGameIcon.png'),
  },
  {
    id: 3,
    screen: 'DreamBoard',
    aleaIcon: require('../assets/icons/aleaBtnIcons/dreamBoardIcon.png'),
  },
  {
    id: 1,
    screen: 'Home',
    aleaIcon: require('../assets/icons/aleaBtnIcons/mainPageIcon.png'),
  },
  {
    id: 4,
    screen: 'Cards',
    aleaIcon: require('../assets/icons/aleaBtnIcons/cardsIcon.png'),
  },
  {
    id: 5,
    screen: 'Settings',
    aleaIcon: require('../assets/icons/aleaBtnIcons/aleaSettingsIcon.png'),
  },
]

const formatAleaRiseDate = (date) => {
  if (!date) return 'Date';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedCoinCollectorScreen, setSelectedCoinCollectorScreen] = useState('Home');

  const [isRunGameStarted, setIsRunGameStarted] = useState(false);

  const [isVibrationEnabled, setVibrationEnabled] = useState(false);
  const [coinCollection, setCoinCollection] = useState([]);

  const loadCoinCollection = async () => {
    try {
      const storedCollection = await AsyncStorage.getItem('coinCollection');
      const parsedCollection = storedCollection ? JSON.parse(storedCollection) : [];
      setCoinCollection(parsedCollection);
    } catch (error) {
      console.error('Error loading coinCollection:', error);
    }
  };

  useEffect(() => {
    loadCoinCollection();
  }, []);



  return (
    <View style={{
      backgroundColor: '#0068B7',
      flex: 1,
      height: dimensions.height,
      width: dimensions.width,
    }}>
      {selectedCoinCollectorScreen === 'Home' ? (
        <SafeAreaView style={{
          flex: 1,
          paddingHorizontal: dimensions.width * 0.05,
          width: dimensions.width,
        }}>
          {coinCollection.length === 0 ? (
           <View style={{
            width: dimensions.width * 0.9,
            backgroundColor: '#2CA1F6',
            borderRadius: dimensions.width * 0.4,
            paddingHorizontal: dimensions.width * 0.05,
            paddingVertical: dimensions.height * 0.05,
           }}>

           </View>
          ) : (
            <></>
          )}

          
        </SafeAreaView>
      ) : selectedCoinCollectorScreen === 'Settings' ? (
        <SettingsScreen setSelectedCoinCollectorScreen={setSelectedCoinCollectorScreen} selectedCoinCollectorScreen={selectedCoinCollectorScreen} isVibrationEnabled={isVibrationEnabled} setVibrationEnabled={setVibrationEnabled} />
      ) : selectedCoinCollectorScreen === 'RunGame' ? (
        <RunGameScreen setSelectedCoinCollectorScreen={setSelectedCoinCollectorScreen} isRunGameStarted={isRunGameStarted} setIsRunGameStarted={setIsRunGameStarted} isVibrationEnabled={isVibrationEnabled} />
      ) : selectedCoinCollectorScreen === 'DreamBoard' ? (
        <DreamBoardScreen setSelectedCoinCollectorScreen={setSelectedCoinCollectorScreen} selectedCoinCollectorScreen={selectedCoinCollectorScreen} />
      ) : selectedCoinCollectorScreen === 'Cards' ? (
        <CardsScreen setSelectedCoinCollectorScreen={setSelectedCoinCollectorScreen} selectedCoinCollectorScreen={selectedCoinCollectorScreen} />
      ) : selectedCoinCollectorScreen === 'LoadingScreen' ? (
        <LoadingAleaScreen setSelectedCoinCollectorScreen={setSelectedCoinCollectorScreen} />
      ) : null}

      {!(selectedCoinCollectorScreen === 'RunGame' && isRunGameStarted) && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: '#2CA1F6',
              width: dimensions.width,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
              paddingTop: dimensions.height * 0.004,
              paddingBottom: dimensions.height * 0.019,
              paddingHorizontal: dimensions.width * 0.07,
              zIndex: 4000,
            }}
          >
            {bottomBtns.map((button, index) => (
              <TouchableOpacity
                key={button.id}
                onPress={() => setSelectedCoinCollectorScreen(button.screen)}
                style={{
                  padding: dimensions.height * 0.01,
                  alignItems: 'center',
                  opacity: selectedCoinCollectorScreen === button.screen ? 1 : 0.37,
                }}
              >
                <Image
                  source={button.aleaIcon}
                  style={{
                    width: dimensions.height * 0.028,
                    height: dimensions.height * 0.028,
                    textAlign: 'center'
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: selectedCoinCollectorScreen === button.screen ? '#B38C31' : '#656565',
                    fontSize: dimensions.width * 0.03,
                    textAlign: 'center',
                    fontWeight: 300,
                    marginTop: dimensions.height * 0.01,
                  }}>
                  {button.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
    </View>
  );
};

export default HomeScreen;
