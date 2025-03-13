import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import * as ImagePicker from 'react-native-image-picker';

const fontSFProDisplayRegular = 'SF-Pro-Display-Regular';

const CollectionDetailsScreen = ({ setSelectedCoinCollectorScreen, selectedCollection, coinCollection, setCoinCollection, setSelectedCollection }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [coinDetailsModalVisible, setCoinDetailsModalVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinImage, setCoinImage] = useState('');
  const [coinTitle, setCoinTitle] = useState('');
  const [yearOfIssue, setYearOfIssue] = useState('');
  const [denomination, setDenomination] = useState('');
  const [country, setCountry] = useState('');
  const [material, setMaterial] = useState('');
  const [originNotes, setOriginNotes] = useState('');

  const saveCoin = async () => {
    try {
      const storageData = await AsyncStorage.getItem('coinCollection');
      const collections = storageData ? JSON.parse(storageData) : [];

      const collectionIndex = collections.findIndex(
        (col) => col.id === selectedCollection.id
      );
      if (collectionIndex === -1) {
        console.error('Колекцію не знайдено');
        return;
      }

      const newCoin = {
        id: Date.now(),
        id: selectedCollection.coins.length > 0 ? Math.max(...selectedCollection.coins.map(coin => coin.id)) + 1 : 1,
        image: coinImage,
        title: coinTitle,
        yearOfIssue,
        denomination,
        country,
        material,
        originNotes,
      };

      collections[collectionIndex].coins = [
        newCoin,
        ...collections[collectionIndex].coins,
      ];

      setSelectedCollection(collections[collectionIndex]);

      await AsyncStorage.setItem('coinCollection', JSON.stringify(collections));

      setModalVisible(false);
      setCoinImage('');
      setCoinTitle('');
      setYearOfIssue('');
      setDenomination('');
      setCountry('');
      setMaterial('');
      setOriginNotes('');
    } catch (error) {
      console.error("Error saving coin:", error);
    }
  };

  const handleDeleteCollection = async (id) => {
    const updatedCollection = coinCollection.filter(item => item.id !== id);
    setCoinCollection(updatedCollection);
    await AsyncStorage.setItem('coinCollection', JSON.stringify(updatedCollection));
    setSelectedCoinCollectorScreen('Home');

  };

  const handleCoinImagePicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setCoinImage(response.assets[0].uri);
      }
    });
  };

  const handleDeleteCollectionImage = () => {
    Alert.alert(
      "Delete image",
      "Are you sure you want to delete image of collection?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            setCoinImage('');
          },
          style: "destructive"
        }
      ]
    );
  };

  const removeCoin = (collectionForDeleteCoin, coin) => {
    const updatedCollection = {
      ...collectionForDeleteCoin,
      coins: collectionForDeleteCoin.coins.filter(item => item.id !== coin.id)
    };
    const updatedCollections = coinCollection.map(item =>
      item.id === collectionForDeleteCoin.id ? updatedCollection : item
    );
    setCoinCollection(updatedCollections);
    setSelectedCollection(updatedCollection);
    setCoinDetailsModalVisible(false); 
    AsyncStorage.setItem('coinCollection', JSON.stringify(updatedCollections))
      .then(() => {
        console.log('coinCollection updated in AsyncStorage');
      })
      .catch(error => {
        console.error('Error updating coinCollection in AsyncStorage:', error);
      });
  };

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
            setSelectedCoinCollectorScreen('Home');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
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
              paddingHorizontal: dimensions.width * 0.03,
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
        <Image
          source={{ uri: selectedCollection.image }}
          style={{
            width: dimensions.width * 0.9,
            height: dimensions.height * 0.23,
            borderRadius: dimensions.width * 0.025,
            alignSelf: 'center',
            marginTop: dimensions.height * 0.021,
          }}
          resizeMode='stretch'
        />

        <View
          style={{
            backgroundColor: '#2CA1F6',
            fontWeight: 600,
            width: dimensions.width * 0.9,
            padding: dimensions.width * 0.03,
            height: dimensions.height * 0.07,
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: dimensions.width * 0.025,
            marginTop: dimensions.height * 0.025,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: fontSFProDisplayRegular,
              color: 'white',
              fontSize: dimensions.width * 0.043,
              textAlign: 'left',
              alignSelf: 'flex-start',
              fontWeight: 600,
            }}>
            {selectedCollection.title}
          </Text>
        </View>

        <View
          textAlignVertical="top"
          style={{
            backgroundColor: '#2CA1F6',
            padding: dimensions.width * 0.03,
            fontFamily: fontSFProDisplayRegular,
            paddingVertical: dimensions.height * 0.016,
            minHeight: dimensions.height * 0.14,
            alignSelf: 'center',
            width: dimensions.width * 0.9,
            borderRadius: dimensions.width * 0.025,
            marginTop: dimensions.height * 0.01,
          }}
        >
          <Text style={{
            fontFamily: fontSFProDisplayRegular,
            color: 'white',
            fontSize: dimensions.width * 0.043,
            textAlign: 'left',
            alignSelf: 'flex-start',
            fontWeight: 600,
          }}>
            {selectedCollection.description}
          </Text>
        </View>

        <Text style={{
          fontFamily: fontSFProDisplayRegular,
          color: 'white',
          fontSize: dimensions.width * 0.043,
          textAlign: 'left',
          alignSelf: 'flex-start',
          fontWeight: 500,
          paddingHorizontal: dimensions.width * 0.05,
          marginTop: dimensions.height * 0.021,
          marginBottom: dimensions.height * 0.01,
        }}>
          Coins
        </Text>

        {selectedCollection.coins.length === 0 ? (
          <>
            <View style={{
              width: dimensions.width * 0.9,
              backgroundColor: '#2CA1F6',
              borderRadius: dimensions.width * 0.014,
              marginTop: dimensions.height * 0.01,
              paddingVertical: dimensions.height * 0.025,
              paddingHorizontal: dimensions.width * 0.03,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
              <Text style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'white',
                fontSize: dimensions.width * 0.05,
                textAlign: 'center',
                alignSelf: 'center',
                alignSelf: 'center',
                fontWeight: 700,
                paddingHorizontal: dimensions.width * 0.05,
              }}>
                You have no coins in this collection
              </Text>
            </View>
          </>
        ) : (
          <>
            {selectedCollection.coins.map((coin, index) => (
              <TouchableOpacity key={coin.id}
                onPress={() => {
                  setSelectedCoin(coin);
                  setCoinDetailsModalVisible(true);
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
                  marginBottom: dimensions.height * 0.019,
                }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Image
                    source={{ uri: coin.image }}
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
                    ellipsizeMode='tail'
                    numberOfLines={1}
                  >
                    {coin.title}
                  </Text>
                </View>
                <ChevronRightIcon size={dimensions.height * 0.025} color='white' />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>

      <View style={{
        width: dimensions.width,
        alignSelf: 'center',
        position: 'absolute',
        bottom: dimensions.height * 0.05,
      }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            backgroundColor: '#FFEA1F',
            borderRadius: dimensions.width * 0.016,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: dimensions.height * 0.05,
            height: dimensions.height * 0.062,
          }}>
          <Image
            source={require('../assets/icons/blackPlusIcon.png')}
            style={{
              width: dimensions.width * 0.04,
              height: dimensions.width * 0.04,
              marginRight: dimensions.width * 0.021,
            }}
            resizeMode='contain'
          />
          <Text
            style={{
              fontFamily: fontSFProDisplayRegular,
              color: 'black',
              fontSize: dimensions.width * 0.04,
              textAlign: 'center',
              alignSelf: 'center',
              fontWeight: 700,
            }}>
            Add coin
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setDeleteModalVisible(true);
          }}
          style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            backgroundColor: '#FF1F1F',
            borderRadius: dimensions.width * 0.016,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: dimensions.height * 0.05,
            marginTop: dimensions.height * 0.01,
            height: dimensions.height * 0.062,
          }}>
          <Image
            source={require('../assets/icons/whiteTrashCollectorIcon.png')}
            style={{
              width: dimensions.width * 0.04,
              height: dimensions.width * 0.04,
              marginRight: dimensions.width * 0.021,
            }}
            resizeMode='contain'
          />
          <Text
            style={{
              fontFamily: fontSFProDisplayRegular,
              color: 'white',
              fontSize: dimensions.width * 0.04,
              textAlign: 'center',
              alignSelf: 'center',
              fontWeight: 700,
            }}>
            Delete a collection
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                  setModalVisible(false);
                  setCoinImage('');
                  setCoinTitle('');
                  setYearOfIssue('');
                  setDenomination('');
                  setCountry('');
                  setMaterial('');
                  setOriginNotes('');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  justifyContent: 'center'
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
                    paddingHorizontal: dimensions.width * 0.03,
                  }}>
                  Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={coinImage === '' || !coinImage || coinTitle === '' || yearOfIssue === ''
                  || denomination === '' || country === '' || material === '' || originNotes === ''}
                onPress={saveCoin}
                style={{
                  opacity: coinImage === '' || !coinImage || coinTitle === '' || yearOfIssue === ''
                    || denomination === '' || country === '' || material === '' || originNotes === '' ? 0.5 : 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fontSFProDisplayRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.05,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 400,
                    paddingHorizontal: dimensions.width * 0.03,
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'white',
                fontSize: dimensions.width * 0.088,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 700,
                paddingHorizontal: dimensions.width * 0.05,
                marginTop: dimensions.height * 0.016,
              }}>
              Add coin
            </Text>

            {coinImage === '' || !coinImage ? (
              <TouchableOpacity
                onPress={() => handleCoinImagePicker()}
                style={{
                  borderRadius: dimensions.width * 0.04,
                  backgroundColor: '#2CA1F6',
                  width: dimensions.width * 0.9,
                  height: dimensions.height * 0.23,
                  alignSelf: 'center',
                  marginTop: dimensions.height * 0.01,
                }}>
                <Image
                  source={require('../assets/images/addImageImage.png')}
                  style={{
                    width: dimensions.width * 0.16,
                    height: dimensions.width * 0.16,
                    alignSelf: 'center',
                    position: 'absolute',
                    top: '34%',
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handleDeleteCollectionImage();
                }}
                style={{
                  alignSelf: 'center',
                  marginTop: dimensions.height * 0.01,
                }}>
                <Image
                  source={{ uri: coinImage }}
                  style={{
                    width: dimensions.width * 0.9,
                    height: dimensions.height * 0.23,
                    borderRadius: dimensions.width * 0.025,
                    alignSelf: 'center',
                  }}
                  resizeMode='contain'
                />
                <Image
                  source={require('../assets/images/deleteImage.png')}
                  style={{
                    width: dimensions.width * 0.16,
                    height: dimensions.width * 0.16,
                    alignSelf: 'center',
                    position: 'absolute',
                    top: '34%',
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            )}

            <TextInput
              placeholder="Name of the coin"
              value={coinTitle}
              onChangeText={setCoinTitle}
              placeholderTextColor="rgba(210, 210, 210, 0.91)"
              placeholderTextSize={dimensions.width * 0.03}
              style={{
                backgroundColor: '#2CA1F6',
                fontWeight: 600,
                width: dimensions.width * 0.9,
                padding: dimensions.width * 0.03,
                fontFamily: fontSFProDisplayRegular,
                fontSize: dimensions.width * 0.043,
                color: 'white',
                height: dimensions.height * 0.07,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.025,
                marginTop: dimensions.height * 0.025,
              }}
            />

            <TextInput
              placeholder="Year of Issue"
              keyboardType='numeric'
              value={yearOfIssue}
              onChangeText={setYearOfIssue}
              placeholderTextColor="rgba(210, 210, 210, 0.91)"
              placeholderTextSize={dimensions.width * 0.03}
              style={{
                backgroundColor: '#2CA1F6',
                fontWeight: 600,
                width: dimensions.width * 0.9,
                padding: dimensions.width * 0.03,
                fontFamily: fontSFProDisplayRegular,
                fontSize: dimensions.width * 0.043,
                color: 'white',
                height: dimensions.height * 0.07,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.025,
                marginTop: dimensions.height * 0.01,
              }}
            />

            <TextInput
              placeholder="Denomination"
              value={denomination}
              onChangeText={setDenomination}
              placeholderTextColor="rgba(210, 210, 210, 0.91)"
              placeholderTextSize={dimensions.width * 0.03}
              style={{
                backgroundColor: '#2CA1F6',
                fontWeight: 600,
                width: dimensions.width * 0.9,
                padding: dimensions.width * 0.03,
                fontFamily: fontSFProDisplayRegular,
                fontSize: dimensions.width * 0.043,
                color: 'white',
                height: dimensions.height * 0.07,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.025,
                marginTop: dimensions.height * 0.01,
              }}
            />

            <TextInput
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
              placeholderTextColor="rgba(210, 210, 210, 0.91)"
              placeholderTextSize={dimensions.width * 0.03}
              style={{
                backgroundColor: '#2CA1F6',
                fontWeight: 600,
                width: dimensions.width * 0.9,
                padding: dimensions.width * 0.03,
                fontFamily: fontSFProDisplayRegular,
                fontSize: dimensions.width * 0.043,
                color: 'white',
                height: dimensions.height * 0.07,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.025,
                marginTop: dimensions.height * 0.01,
              }}
            />

            <TextInput
              placeholder="Material"
              value={material}
              onChangeText={setMaterial}
              placeholderTextColor="rgba(210, 210, 210, 0.91)"
              placeholderTextSize={dimensions.width * 0.03}
              style={{
                backgroundColor: '#2CA1F6',
                fontWeight: 600,
                width: dimensions.width * 0.9,
                padding: dimensions.width * 0.03,
                fontFamily: fontSFProDisplayRegular,
                fontSize: dimensions.width * 0.043,
                color: 'white',
                height: dimensions.height * 0.07,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.025,
                marginTop: dimensions.height * 0.01,
              }}
            />

            <TextInput
              placeholder="Origin Notes"
              value={originNotes}
              onChangeText={setOriginNotes}
              placeholderTextColor="rgba(210, 210, 210, 0.91)"
              placeholderTextSize={dimensions.width * 0.03}
              style={{
                backgroundColor: '#2CA1F6',
                fontWeight: 600,
                width: dimensions.width * 0.9,
                padding: dimensions.width * 0.03,
                fontFamily: fontSFProDisplayRegular,
                fontSize: dimensions.width * 0.043,
                color: 'white',
                height: dimensions.height * 0.07,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.025,
                marginTop: dimensions.height * 0.01,
              }}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(!deleteModalVisible);
        }}
      >
        <View style={{
          backgroundColor: 'rgba(7, 7, 7, 0.55)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: dimensions.width * 0.048,
            paddingTop: dimensions.width * 0.073,
            width: dimensions.width * 0.82,
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: dimensions.width * 0.05,
              textAlign: 'center',
              fontFamily: fontSFProDisplayRegular,
              marginBottom: dimensions.height * 0.016,
              paddingHorizontal: dimensions.width * 0.066,
              fontWeight: 500,
              alignSelf: 'center',
            }}>
              Delete collection
            </Text>
            <Text style={{
              paddingHorizontal: dimensions.width * 0.07,
              textAlign: 'center',
              fontFamily: fontSFProDisplayRegular,
              fontSize: dimensions.width * 0.037,
              marginBottom: dimensions.height * 0.016,
            }}>
              Are you sure you want to delete your coin collection?
            </Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: dimensions.width * 0.82,
              borderTopColor: 'silver',
              borderTopWidth: dimensions.width * 0.0019,
              paddingHorizontal: dimensions.width * 0.07,
            }}>
              <TouchableOpacity
                style={{
                  paddingVertical: dimensions.height * 0.021,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '44%',
                }}
                onPress={() => {
                  setDeleteModalVisible(false);
                }}
              >
                <Text style={{
                  color: '#090814',
                  fontSize: dimensions.width * 0.046,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 400,
                  fontFamily: fontSFProDisplayRegular,
                }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <View style={{
                height: '100%',
                borderLeftWidth: dimensions.width * 0.0021,
                paddingVertical: dimensions.height * 0.021,
                borderLeftColor: 'silver',
              }} />
              <TouchableOpacity
                style={{
                  paddingVertical: dimensions.height * 0.021,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '44%',
                }}
                onPress={() => {
                  handleDeleteCollection(selectedCollection.id);
                  setModalVisible(false);
                }}
              >
                <Text style={{
                  color: '#FF1F1F',
                  textAlign: 'center',
                  fontFamily: fontSFProDisplayRegular,
                  fontSize: dimensions.width * 0.046,
                  alignSelf: 'center',
                  fontWeight: 600,
                }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
                left: -dimensions.width * 0.021
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
              marginTop: dimensions.height * 0.01,
            }}>
            {selectedCoin?.title}
          </Text>

          <Image
            source={{ uri: selectedCoin?.image }}
            style={{
              width: dimensions.width * 0.9,
              height: dimensions.height * 0.23,
              borderRadius: dimensions.width * 0.025,
              marginTop: dimensions.height * 0.025,
              alignSelf: 'center',
            }}
            resizeMode='contain'
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
              Year of Issue
            </Text>
            <Text
              style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'white',
                fontSize: dimensions.width * 0.055,
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
              Denomination
            </Text>
            <Text
              style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'white',
                fontSize: dimensions.width * 0.055,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 600,
                marginTop: dimensions.height * 0.01,
              }}>
              {selectedCoin?.denomination}
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
                fontSize: dimensions.width * 0.055,
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
                fontSize: dimensions.width * 0.055,
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
              Origin Notes
            </Text>
            <Text
              style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'white',
                fontSize: dimensions.width * 0.055,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 600,
                marginTop: dimensions.height * 0.01,
              }}>
              {selectedCoin?.originNotes}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              removeCoin(selectedCollection, selectedCoin);
            }}
            style={{
              width: dimensions.width * 0.9,
              alignSelf: 'center',
              backgroundColor: '#FF1F1F',
              borderRadius: dimensions.width * 0.016,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: dimensions.height * 0.05,
              position: 'absolute',
              bottom: dimensions.height * 0.05,
              height: dimensions.height * 0.062,
            }}>
            <Image
              source={require('../assets/icons/whiteTrashCollectorIcon.png')}
              style={{
                width: dimensions.width * 0.04,
                height: dimensions.width * 0.04,
                marginRight: dimensions.width * 0.021,
              }}
              resizeMode='contain'
            />
            <Text
              style={{
                fontFamily: fontSFProDisplayRegular,
                color: 'white',
                fontSize: dimensions.width * 0.046,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 700,
              }}>
              Delete coin
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default CollectionDetailsScreen;
