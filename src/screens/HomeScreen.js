import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Modal,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsScreen from './SettingsScreen';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import CardsScreen from './CardsScreen';
import DreamBoardScreen from './DreamBoardScreen';
import * as ImagePicker from 'react-native-image-picker';
import CollectionDetailsScreen from './CollectionDetailsScreen';

const fontSFProDisplayRegular = 'SF-Pro-Display-Regular';
const fontSFProTextRegular = 'SFProText-Regular';

const bottomBtns = [
  {
    id: 1,
    screen: 'Home',
    coinCollectorScreenTitle: 'My collection',
    coinCollectorWhiteIcon: require('../assets/icons/whiteCoinCollBtnIcons/collectionIcon.png'),
    coinCollectorBlueIcon: require('../assets/icons/blueCoinCollBtnIcons/collectionIcon.png'),
  },
  {
    id: 2,
    screen: 'Encyclopedia',
    coinCollectorScreenTitle: 'Encyclopedia',
    coinCollectorWhiteIcon: require('../assets/icons/whiteCoinCollBtnIcons/encyclopediaIcon.png'),
    coinCollectorBlueIcon: require('../assets/icons/blueCoinCollBtnIcons/encyclopediaIcon.png'),
  },
  {
    id: 3,
    screen: 'Game',
    coinCollectorScreenTitle: 'Game',
    coinCollectorWhiteIcon: require('../assets/icons/whiteCoinCollBtnIcons/gameIcon.png'),
    coinCollectorBlueIcon: require('../assets/icons/blueCoinCollBtnIcons/gameIcon.png'),
  },
  {
    id: 4,
    screen: 'Settings',
    coinCollectorScreenTitle: 'Settings',
    coinCollectorWhiteIcon: require('../assets/icons/whiteCoinCollBtnIcons/settingsIcon.png'),
    coinCollectorBlueIcon: require('../assets/icons/blueCoinCollBtnIcons/settingsIcon.png'),
  },
]

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedCoinCollectorScreen, setSelectedCoinCollectorScreen] = useState('Home');

  const [coinCollection, setCoinCollection] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [collectionImage, setCollectionImage] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');

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

  const saveCollection = async () => {
    const collections = JSON.parse(await AsyncStorage.getItem('coinCollection')) || [];
    const newCollectionId = collections.length > 0 ? Math.max(...collections.map(e => e.id)) + 1 : 1;
    const newCollection = {
      id: newCollectionId, 
      image: collectionImage,
      title: collectionTitle,
      description: collectionDescription !== '' ? collectionDescription : 'No description',
      coins: [],
    };

    try {
      const updatedCollections = [newCollection, ...coinCollection];
      await AsyncStorage.setItem('coinCollection', JSON.stringify(updatedCollections));
      setCoinCollection(updatedCollections);
      setModalVisible(false);

      setSelectedCollection(newCollection);
      setSelectedCoinCollectorScreen('CollectionDetails');

      setCollectionImage('');
      setCollectionTitle('');
      setCollectionDescription('');
    } catch (err) {
      console.error("Error saving collection:", err);
    }
  };


  const handleCoinCollectionImagePicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setCollectionImage(response.assets[0].uri);
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
            setCollectionImage('');
          },
          style: "destructive"
        }
      ]
    );
  };

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
            My collection
          </Text>
          {coinCollection.length === 0 ? (
            <View style={{
              width: dimensions.width * 0.9,
              backgroundColor: '#2CA1F6',
              borderRadius: dimensions.width * 0.04,
              paddingHorizontal: dimensions.width * 0.05,
              paddingVertical: dimensions.height * 0.01,
              alignSelf: 'center',
              paddingBottom: dimensions.height * 0.03,
            }}>
              <Image
                source={require('../assets/images/emptyCollectionImage.png')}
                style={{
                  width: dimensions.width * 0.44,
                  height: dimensions.width * 0.44,
                  alignSelf: 'center',
                }}
                resizeMode='contain'
              />

              <Text
                style={{
                  fontFamily: fontSFProDisplayRegular,
                  color: 'white',
                  fontSize: dimensions.width * 0.05,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 500,
                  paddingHorizontal: dimensions.width * 0.05,
                }}>
                You don't have any collection yet
              </Text>

              <Text
                style={{
                  fontFamily: fontSFProDisplayRegular,
                  color: 'white',
                  fontSize: dimensions.width * 0.034,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 300,
                  paddingHorizontal: dimensions.width * 0.021,
                  marginTop: dimensions.height * 0.01,
                }}>
                Click on the button below to add the collection
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  width: dimensions.width * 0.77,
                  alignSelf: 'center',
                  backgroundColor: '#FFEA1F',
                  borderRadius: dimensions.width * 0.016,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: dimensions.height * 0.05,
                  marginTop: dimensions.height * 0.023,
                }}>
                <Text
                  style={{
                    fontFamily: fontSFProDisplayRegular,
                    color: 'black',
                    fontSize: dimensions.width * 0.04,
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: 700,
                  }}>
                  Create a collection
                </Text>
              </TouchableOpacity>

            </View>
          ) : (
            <View style={{
              width: dimensions.width,
              alignSelf: 'center',
              height: dimensions.height,
            }}>
              <ScrollView style={{
                width: dimensions.width,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.01,
              }} contentContainerStyle={{
                paddingBottom: dimensions.height * 0.16
              }}>
                {coinCollection.map((collection, index) => (
                  <TouchableOpacity key={collection.id} 
                    onPress={() => {
                      setSelectedCollection(collection);
                      setSelectedCoinCollectorScreen('CollectionDetails');
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
                        source={{ uri: collection.image }}
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
                        {collection.title}
                      </Text>
                    </View>
                    <ChevronRightIcon size={dimensions.height * 0.025} color='white' />
                  </TouchableOpacity>
                ))}
              </ScrollView>

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
                  height: dimensions.height * 0.05,
                  marginTop: dimensions.height * 0.023,
                  position: 'absolute',
                  bottom: dimensions.height * 0.25,
                }}>
                <Text
                  style={{
                    fontFamily: fontSFProDisplayRegular,
                    color: 'black',
                    fontSize: dimensions.width * 0.04,
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: 700,
                  }}>
                  Create a collection
                </Text>
              </TouchableOpacity>
            </View>
          )}


        </SafeAreaView>
      ) : selectedCoinCollectorScreen === 'Settings' ? (
        <SettingsScreen setSelectedCoinCollectorScreen={setSelectedCoinCollectorScreen} selectedCoinCollectorScreen={selectedCoinCollectorScreen} />
      ) : selectedCoinCollectorScreen === 'CollectionDetails' ? (
        <CollectionDetailsScreen setSelectedCoinCollectorScreen={setSelectedCoinCollectorScreen} selectedCollection={selectedCollection} setSelectedCollection={setSelectedCollection} coinCollection={coinCollection} setCoinCollection={setCoinCollection}/>
      ) : selectedCoinCollectorScreen === 'DreamBoard' ? (
        <DreamBoardScreen setSelectedCoinCollectorScreen={setSelectedCoinCollectorScreen} selectedCoinCollectorScreen={selectedCoinCollectorScreen} />
      ) : selectedCoinCollectorScreen === 'Cards' ? (
        <CardsScreen setSelectedCoinCollectorScreen={setSelectedCoinCollectorScreen} selectedCoinCollectorScreen={selectedCoinCollectorScreen} />
      ) : null}


      {selectedCoinCollectorScreen !== 'CollectionDetails' && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#2CA1F6',
            width: dimensions.width,
            flexDirection: 'row',
            justifyContent: 'space-evenly', // змінено на space-evenly
            alignItems: 'center',
            alignSelf: 'center',
            paddingTop: dimensions.height * 0.004,
            paddingBottom: dimensions.height * 0.019,
            paddingHorizontal: dimensions.width * 0.05,
            zIndex: 4000,
            height: dimensions.height * 0.1,
          }}
        >
          {bottomBtns.map((button, index) => (
            <TouchableOpacity
              key={button.id}
              onPress={() => setSelectedCoinCollectorScreen(button.screen)}
              style={{
                padding: dimensions.height * 0.01,
                alignItems: 'center',
              }}
            >
              <Image
                source={selectedCoinCollectorScreen === button.screen ? button.coinCollectorWhiteIcon : button.coinCollectorBlueIcon}
                style={{
                  width: dimensions.height * 0.028,
                  height: dimensions.height * 0.028,
                  textAlign: 'center'
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: fontSFProDisplayRegular,
                  color: selectedCoinCollectorScreen === button.screen ? 'white' : '#0068B7',
                  fontSize: dimensions.width * 0.03,
                  textAlign: 'center',
                  fontWeight: 500,
                  marginTop: dimensions.height * 0.01,
                }}>
                {button.coinCollectorScreenTitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}



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
                  setCollectionImage('');
                  setCollectionTitle('');
                  setCollectionDescription('');
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
                disabled={collectionImage === '' || !collectionImage || collectionTitle === ''}
                onPress={saveCollection}
                style={{
                  opacity: collectionImage === '' || !collectionImage || collectionTitle === '' ? 0.5 : 1,
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
              Create collection
            </Text>

            {collectionImage === '' || !collectionImage ? (
              <TouchableOpacity
                onPress={() => handleCoinCollectionImagePicker()}
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
                  source={{ uri: collectionImage }}
                  style={{
                    width: dimensions.width * 0.9,
                    height: dimensions.height * 0.23,
                    borderRadius: dimensions.width * 0.025,
                    alignSelf: 'center',
                  }}
                  resizeMode='stretch'
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
              placeholder="Name of the collection"
              value={collectionTitle}
              onChangeText={setCollectionTitle}
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
              placeholder="Description of the collection (optional)"
              value={collectionDescription}
              onChangeText={setCollectionDescription}
              placeholderTextColor="rgba(210, 210, 210, 0.91)"
              placeholderTextSize={dimensions.width * 0.03}
              multiline={true}
              textAlignVertical="top"
              style={{
                backgroundColor: '#2CA1F6',
                padding: dimensions.width * 0.03,
                fontFamily: fontSFProDisplayRegular,
                fontSize: dimensions.width * 0.043,
                fontWeight: 600,
                color: 'white',
                height: dimensions.height * 0.14,
                alignSelf: 'center',
                width: dimensions.width * 0.9,
                borderRadius: dimensions.width * 0.025,
                marginTop: dimensions.height * 0.012,
              }}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default HomeScreen;
