import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  PanResponder,
} from 'react-native';
import { Svg, Path, Defs, Mask, Rect } from 'react-native-svg';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';

import encyclopediaData from '../components/encyclopediaData';
import { ScrollView } from 'react-native-gesture-handler';

const fontSFProDisplayRegular = 'SF-Pro-Display-Regular';
const fontSFProTextRegular = 'SFProText-Regular';
const fontSFProTextHeavy = 'SFProText-Heavy';

const CleanCoinGameScreen = ({ setSelectedCoinCollectorScreen, isCoinGameStarted, setIsCoinGameStarted }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isCoinCleaned, setIsCoinCleaned] = useState(false);
  const [randomCoin, setRandomCoin] = useState(null);
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [remainingCoins, setRemainingCoins] = useState(() => {
    const shuffled = [...encyclopediaData].sort(() => Math.random() - 0.5);
    return shuffled;
  });

  const generateRandomCoin = () => {
    let newRemaining = [...remainingCoins];

    if (newRemaining.length === 0) {
      newRemaining = [...encyclopediaData].sort(() => Math.random() - 0.5);
    }
    const coin = newRemaining.shift();
    setRandomCoin(coin);
    setRemainingCoins(newRemaining);
  };

  const calculateTotalStrokeLength = (pathsArray) => {
    let totalLength = 0;
    pathsArray.forEach(path => {
      // Приклад path: "M100 100 L120 110 L130 140"
      // Видаляємо символи "M" і "L", розбиваємо на координати
      const coords = path.replace(/[ML]/g, ' ').trim().split(/\s+/).map(Number);
      for (let i = 2; i < coords.length; i += 2) {
        const dx = coords[i] - coords[i - 2];
        const dy = coords[i + 1] - coords[i - 1];
        totalLength += Math.sqrt(dx * dx + dy * dy);
      }
    });
    return totalLength;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath(`M${locationX} ${locationY}`);
    },
    onPanResponderMove: (evt, gestureState) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath(prev => prev + ` L${locationX} ${locationY}`);
    },
    onPanResponderRelease: () => {
      setPaths(prev => {
        const newPaths = [...prev, currentPath];

        const totalLength = calculateTotalStrokeLength(newPaths);
        if (totalLength >= dimensions.width * 0.5 * 2) {
          setIsCoinCleaned(true);
        }
        return newPaths;
      });
      setCurrentPath("");
    },
  });

  return (
    <SafeAreaView style={{
      alignSelf: 'center',
      width: dimensions.width,
      height: dimensions.height,
    }}>
      {!isCoinGameStarted ? (
        <>
          <Text
            style={{
              fontFamily: fontSFProDisplayRegular,
              color: 'white',
              fontSize: dimensions.width * 0.088,
              marginBottom: dimensions.height * 0.023,
              textAlign: 'left',
              alignSelf: 'flex-start',
              fontWeight: 700,
              paddingHorizontal: dimensions.width * 0.05,
            }}>
            Game
          </Text>

          <View style={{
            width: dimensions.width * 0.9,
            backgroundColor: '#2CA1F6',
            borderRadius: dimensions.width * 0.03,
            paddingVertical: dimensions.height * 0.01,
            paddingHorizontal: dimensions.width * 0.025,
            alignSelf: 'center',
            marginTop: dimensions.height * 0.01,
          }}>
            <Image
              source={require('../assets/images/2coinsImage.png')}
              style={{
                alignSelf: 'center',
                width: dimensions.width * 0.68,
                height: dimensions.height * 0.19,
              }}
              resizeMode='contain'
            />

            <Text
              style={{
                fontFamily: fontSFProTextHeavy,
                color: 'white',
                fontSize: dimensions.width * 0.061,
                textAlign: 'center',
                alignSelf: 'center',
                paddingHorizontal: dimensions.width * 0.05,
              }}>
              Clean coin game
            </Text>

            <Text
              style={{
                fontFamily: fontSFProTextRegular,
                marginTop: dimensions.height * 0.01,
                color: 'white',
                fontSize: dimensions.width * 0.037,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 500,
                paddingHorizontal: dimensions.width * 0.05,
              }}>
              You need to erase the film to see the coin
            </Text>

            <TouchableOpacity
              onPress={() => {
                generateRandomCoin();
                setIsCoinGameStarted(true);
                setPaths([]);
                setCurrentPath("");
                setIsCoinCleaned(false);
              }}
              style={{
                width: dimensions.width * 0.8,
                marginBottom: dimensions.height * 0.016,
                marginTop: dimensions.height * 0.03,
                alignSelf: 'center',
                backgroundColor: '#FFEA1F',
                borderRadius: dimensions.width * 0.019,
                alignItems: 'center',
                justifyContent: 'center',
                height: dimensions.height * 0.05,
                height: dimensions.height * 0.062,
              }}>
              <Text
                style={{
                  fontFamily: fontSFProDisplayRegular,
                  color: 'black',
                  fontSize: dimensions.width * 0.046,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 600,
                }}>
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              setIsCoinGameStarted(false);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
              paddingHorizontal: dimensions.width * 0.05,
            }}>
            <ChevronLeftIcon size={dimensions.height * 0.034} color='white' />
            <Text
              style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'white',
                fontSize: dimensions.width * 0.05,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 400,
                paddingHorizontal: dimensions.width * 0.01,
              }}>
              Back
            </Text>
          </TouchableOpacity>

          <ScrollView style={{
            width: dimensions.width,
            alignSelf: 'center',
          }} contentContainerStyle={{
            paddingBottom: dimensions.height * 0.16,
          }} showsVerticalScrollIndicator={false}
            scrollEnabled={isCoinCleaned}
          >
            <Text
              style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'white',
                fontSize: dimensions.width * 0.04,
                marginTop: dimensions.height * 0.04,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 600,
                paddingHorizontal: dimensions.width * 0.01,
              }}>
              Erase the layer
            </Text>
            <View style={{
              width: dimensions.width * 0.5,
              height: dimensions.width * 0.5,
              alignSelf: 'center',
              marginTop: dimensions.height * 0.01,
              borderRadius: dimensions.width * 0.5,
              overflow: 'hidden',
            }}>
              <Image
                source={randomCoin?.image}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode='contain'
              />
              {!isCoinCleaned && (
                <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }} {...panResponder.panHandlers}>
                  <Svg height="100%" width="100%">
                    <Defs>
                      <Mask id="mask">
                        <Rect x="0" y="0" width="100%" height="100%" fill="white" />
                        {paths.map((d, index) => (
                          <Path key={index} d={d} stroke="black" strokeWidth={dimensions.width * 0.14} fill="none" strokeLinecap="round" />
                        ))}
                        {currentPath !== "" && (
                          <Path d={currentPath} stroke="black" strokeWidth={dimensions.width * 0.14} fill="none" strokeLinecap="round" />
                        )}
                      </Mask>
                    </Defs>
                    <Rect x="0" y="0" width="100%" height="100%" fill="#A2A2A2" mask="url(#mask)" />
                  </Svg>
                </View>
              )}
            </View>

            {isCoinCleaned && (
              <>
                <View style={{
                  width: dimensions.width * 0.9,
                  backgroundColor: '#2CA1F6',
                  borderRadius: dimensions.width * 0.03,
                  paddingVertical: dimensions.height * 0.019,
                  paddingHorizontal: dimensions.width * 0.03,
                  alignSelf: 'center',
                  marginTop: dimensions.height * 0.01,
                }}>
                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.037,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      opacity: 0.5,
                      marginTop: dimensions.height * 0.01,
                    }}>
                    History
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.04,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      marginTop: dimensions.height * 0.01,
                    }}>
                    {randomCoin?.history}
                  </Text>

                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.037,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      opacity: 0.5,
                      marginTop: dimensions.height * 0.01,
                    }}>
                    Approximate Value
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.05,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      marginTop: dimensions.height * 0.01,
                    }}>
                    {randomCoin?.approximateValue}
                  </Text>

                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.037,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      opacity: 0.5,
                      marginTop: dimensions.height * 0.01,
                    }}>
                    Year of Issue
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.05,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      marginTop: dimensions.height * 0.01,
                    }}>
                    {randomCoin?.yearOfIssue}
                  </Text>

                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.037,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      opacity: 0.5,
                      marginTop: dimensions.height * 0.019,
                    }}>
                    Country
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.05,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      marginTop: dimensions.height * 0.01,
                    }}>
                    {randomCoin?.country}
                  </Text>

                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.037,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      opacity: 0.5,
                      marginTop: dimensions.height * 0.019,
                    }}>
                    Material
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.05,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      marginTop: dimensions.height * 0.01,
                    }}>
                    {randomCoin?.material}
                  </Text>

                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.037,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      opacity: 0.5,
                      marginTop: dimensions.height * 0.019,
                    }}>
                    Rarity
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.05,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      marginTop: dimensions.height * 0.01,
                    }}>
                    {randomCoin?.rarity}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    generateRandomCoin();
                    setPaths([]);
                    setCurrentPath("");
                    setIsCoinCleaned(false);
                  }}
                  style={{
                    width: dimensions.width * 0.9,
                    marginTop: dimensions.height * 0.05,
                    alignSelf: 'center',
                    backgroundColor: '#FFEA1F',
                    borderRadius: dimensions.width * 0.019,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: dimensions.height * 0.062,
                  }}>
                  <Text
                    style={{
                      fontFamily: fontSFProDisplayRegular,
                      color: 'black',
                      fontSize: dimensions.width * 0.046,
                      textAlign: 'center',
                      alignSelf: 'center',
                      fontWeight: 600,
                    }}>
                    New coin
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default CleanCoinGameScreen;
