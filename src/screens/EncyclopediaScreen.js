import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import encyclopediaData from '../components/encyclopediaData';
import defectiveCoinsData from '../components/defectiveCoinsData';

const fontSFProDisplayRegular = 'SF-Pro-Display-Regular';

const EncyclopediaScreen = ({ setSelectedCoinCollectorScreen }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [defectiveCoinModalVisivle, setDefectiveCoinModalVisivle] = useState(false);
  const [coinDetailsModalVisible, setCoinDetailsModalVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isDefectiveCoinsVisible, setIsDefectiveCoinsVisible] = useState(false);

  const getDataByCategory = () => {

    switch (isDefectiveCoinsVisible) {
      case true:
        return defectiveCoinsData;
      case false:
        return encyclopediaData;
      default:
        return [];
    }
  };

  const data = getDataByCategory();

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#0068B7',
      width: dimensions.width,
      height: dimensions.height,
    }}>
      <View style={{
        width: dimensions.width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: dimensions.height * 0.01,
      }}>
        <TouchableOpacity
          onPress={() => {
            if (isDefectiveCoinsVisible) {
              setIsDefectiveCoinsVisible(false);
            } else {
              setSelectedCoinCollectorScreen('Home');
            }
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            justifyContent: 'center',
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
              marginTop: dimensions.height * 0.0021,
            }}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
        }}
          onPress={() => {
            setIsDefectiveCoinsVisible(true)
          }}
          disabled={isDefectiveCoinsVisible}
        >
          <Text
            style={{
              fontFamily: fontSFProDisplayRegular,
              color: 'white',
              fontSize: dimensions.width * 0.046,
              textAlign: 'left',
              alignSelf: 'flex-start',
              fontWeight: 400,
              paddingHorizontal: dimensions.width * 0.01,
              marginTop: dimensions.height * 0.0021,
              opacity: isDefectiveCoinsVisible ? 0 : 1,
            }}>
            Defective coins
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontFamily: fontSFProDisplayRegular,
          color: 'white',
          fontSize: dimensions.width * 0.07,
          textAlign: 'left',
          alignSelf: 'flex-start',
          fontWeight: 700,
          maxWidth: dimensions.width * 0.55,
          marginLeft: dimensions.width * 0.05,
          marginTop: dimensions.height * 0.01,
        }}
      >
        {!isDefectiveCoinsVisible ? 'Encyclopedia' : 'Defective coins'}
      </Text>

      <ScrollView style={{
        width: dimensions.width,
        alignSelf: 'center',
        marginTop: dimensions.height * 0.01,
      }} contentContainerStyle={{
        paddingBottom: dimensions.height * 0.16,
      }}>

        {data.map((coin, index) => (
          <TouchableOpacity key={coin.id}
            onPress={() => {
              setSelectedCoin(coin);
              if (!isDefectiveCoinsVisible)
                setCoinDetailsModalVisible(true);
              else setDefectiveCoinModalVisivle(true);
            }}
            style={{
              width: dimensions.width * 0.9,
              backgroundColor: '#2CA1F6',
              borderRadius: dimensions.width * 0.014,
              paddingVertical: dimensions.height * 0.014,
              paddingHorizontal: dimensions.width * 0.03,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginBottom: dimensions.height * 0.01,
            }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                source={coin.image}
                style={{
                  width: dimensions.width * 0.16,
                  height: dimensions.width * 0.16,
                  borderRadius: dimensions.width * 0.5,
                }}
                resizeMode='stretch'
              />
              <Text
                style={{
                  fontFamily: fontSFProDisplayRegular,
                  color: 'white',
                  fontSize: dimensions.width * 0.04,
                  textAlign: 'left',
                  alignSelf: 'center',
                  fontWeight: 700,
                  maxWidth: dimensions.width * 0.55,
                  marginLeft: dimensions.width * 0.025,
                }}
              >
                {coin.title}
              </Text>
            </View>
            <ChevronRightIcon size={dimensions.height * 0.025} color='white' />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={coinDetailsModalVisible}
        onRequestClose={() => {
          setCoinDetailsModalVisible(!coinDetailsModalVisible);
        }}
      >
        <SafeAreaView style={{
          backgroundColor: '#0068B7',
          width: dimensions.width,
          height: dimensions.height,
        }}>
          <View style={{
            width: dimensions.width * 0.9,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: dimensions.height * 0.01,
          }}>
            <TouchableOpacity
              onPress={() => {
                setCoinDetailsModalVisible(false);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                left: -dimensions.width * 0.021,
                justifyContent: 'center',
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
                  paddingHorizontal: dimensions.width * 0.021,
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{
            width: dimensions.width,
            alignSelf: 'center',
            marginTop: dimensions.height * 0.01,
          }} contentContainerStyle={{
            paddingBottom: dimensions.height * 0.16,
          }}>
            <Text
              style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'white',
                fontSize: dimensions.width * 0.07,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 700,
                paddingHorizontal: dimensions.width * 0.05,
                marginTop: dimensions.height * 0.01,
              }}>
              {selectedCoin?.title}
            </Text>

            <Image
              source={selectedCoin?.image}
              style={{
                width: dimensions.width * 0.4,
                height: dimensions.width * 0.4,
                marginTop: dimensions.height * 0.025,
                alignSelf: 'center',
              }}
              resizeMode='stretch'
            />

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
                {selectedCoin?.history}
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
                {selectedCoin?.approximateValue}
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
                {selectedCoin?.yearOfIssue}
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
                {selectedCoin?.country}
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
                {selectedCoin?.material}
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
                {selectedCoin?.rarity}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={defectiveCoinModalVisivle}
        onRequestClose={() => {
          setDefectiveCoinModalVisivle(!defectiveCoinModalVisivle);
        }}
      >
        <SafeAreaView style={{
          backgroundColor: '#0068B7',
          width: dimensions.width,
          height: dimensions.height,
        }}>
          <View style={{
            width: dimensions.width * 0.9,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: dimensions.height * 0.01,
          }}>
            <TouchableOpacity
              onPress={() => {
                setDefectiveCoinModalVisivle(false);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                left: -dimensions.width * 0.021,
                justifyContent: 'center',
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
                  paddingHorizontal: dimensions.width * 0.021,
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: fontSFProDisplayRegular,
              color: 'white',
              fontSize: dimensions.width * 0.07,
              textAlign: 'left',
              alignSelf: 'flex-start',
              fontWeight: 700,
              paddingHorizontal: dimensions.width * 0.05,
              marginTop: dimensions.height * 0.025,
            }}>
            {selectedCoin?.title}
          </Text>

          <Image
            source={selectedCoin?.image}
            style={{
              width: dimensions.width * 0.5,
              height: dimensions.width * 0.5,
              marginTop: dimensions.height * 0.025,
              alignSelf: 'center',
            }}
            resizeMode='contain'
          />

          <View style={{
            width: dimensions.width * 0.9,
            backgroundColor: '#2CA1F6',
            borderRadius: dimensions.width * 0.03,
            paddingVertical: dimensions.height * 0.03,
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
              }}>
              Description
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
              {selectedCoin?.description}
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default EncyclopediaScreen;
