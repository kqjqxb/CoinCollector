import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Linking,
} from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

const fontSFProDisplayRegular = 'SF-Pro-Display-Regular';
const fontSFProTextRegular = 'SFProText-Regular';
const fontSFProTextHeavy = 'SFProText-Heavy';

const coinCollecorAppStoreLink = 'https://apps.apple.com/us/app/coin-collector-unique-coins/id6743238725';

const coinCollectorLinkButtons = [
  {
    id: 1,
    coinButtonTitle: 'Privacy Policy',
    coinButtonLink: 'https://www.termsfeed.com/live/72d42e7b-a1db-4a23-b004-8e5e9129271c',
  },
  {
    id: 2,
    coinButtonTitle: 'Terms of Use',
    coinButtonLink: 'https://www.termsfeed.com/live/5ce06937-5613-4c66-9c15-e8f338c4f337',
  }
]

const SettingsScreen = ({ setSelectedCoinCollectorScreen, }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  return (
    <SafeAreaView style={{
      alignSelf: 'center',
      width: dimensions.width,
      height: dimensions.height,
    }}>
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
        Settings
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
          source={require('../assets/images/settingsCoinsImage.png')}
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
          Rate us!
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
          Click the button below to rate our application
        </Text>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(coinCollecorAppStoreLink);
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
            Rate
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: dimensions.height * 0.01}}></View>

      {coinCollectorLinkButtons.map((button) => (
        <TouchableOpacity
          key={button.id}
          onPress={() => {
            Linking.openURL(button.coinButtonLink);
          }}
          style={{
            width: dimensions.width * 0.9,
            height: dimensions.height * 0.07,
            backgroundColor: '#2CA1F6',
            borderRadius: dimensions.width * 0.03,
            paddingHorizontal: dimensions.width * 0.04,
            alignSelf: 'center',
            marginTop: dimensions.height * 0.007,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontSFProDisplayRegular,
              color: 'white',
              fontSize: dimensions.width * 0.046,
              textAlign: 'center',
              alignSelf: 'center',
              fontWeight: 600,
            }}>
            {button.coinButtonTitle}
          </Text>

          <ChevronRightIcon size={dimensions.height * 0.03} color='white'/>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default SettingsScreen;
