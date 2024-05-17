import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { UserStore } from '../../mobx/auth';
import Button from '../../components/button';
import * as ImagePicker from 'react-native-image-picker';
// import { updateProfile } from '../../services/user';

interface IProps {}

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    },
  },
]

const EditProfileScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {t} = useTranslation();
    const [name, setName] = useState<string>(UserStore.user.userName!);
    const [number, setNumber] = useState<string>(UserStore.user.phoneNumber!);
    const [response, setResponse] = React.useState<any>(null);
    const [image, setImage] = useState<any>(UserStore.user.avatarImage);

    const onButtonPress = React.useCallback((type: any, options: any) => {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, setResponse);
      } else {
        ImagePicker.launchImageLibrary(options, setResponse);
      }
    }, []);

    const showToast = (message: string) => {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
  };

  const handleUpdate = async() => {

  }

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Edit Profile</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          // onPress={() => {navigation.navigate('EditWallet', {_id: _id})}}
        >
          <Image style={styles.imgButtonDone} source={require('../../../assets/icon/exportDataScreen/done.png')}/>
        </TouchableOpacity>
      </View>

      {/* avatar */}
      <TouchableOpacity
        style={styles.viewAvatar}
        onPress={() => {
          onButtonPress(actions[1].type, actions[1].options);
        }}
      >
        {(!response) && <Image style={styles.imgAvatar} source={{uri: UserStore.user.avatarImage!}}/>}
        {(response) && <Image style={styles.imgAvatar} source={{uri: response?.assets[0].uri}}/>}
        <View style={styles.viewEdit}>
          <Image style={styles.imgEdit} source={require('../../../assets/icon/menu/edit.png')}/>
        </View>
      </TouchableOpacity>

      <View style={styles.viewInputContainer}>
        <Text style={styles.txtInputTitle}>Display name</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType='default'
          onChangeText={(text) => {setName(text)}}
          value={name!}
        />
      </View>

      <View style={styles.viewInputContainer}>
        <Text style={styles.txtInputTitle}>Phone number</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType='phone-pad'
          onChangeText={(text) => {setNumber(text)}}
          value={number!}
        />
      </View>
      
      <View style={styles.viewButtonGroup}>
        <Button
          content='SAVE'
          onPress={() => {
            // console.log(response);
            handleUpdate();
          }}
          containerStyle={{
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  )
}

export default EditProfileScreen    