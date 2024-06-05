import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { UserStore } from '../../mobx/auth';
import Button from '../../components/button';
import { updateAvatar, updateProfile } from '../../services/user';
// import { updateProfile } from '../../services/user';
import ImagePicker from 'react-native-image-crop-picker';

interface IProps {}

const EditProfileScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {t} = useTranslation();
    const [name, setName] = useState<string>(UserStore.user.userName!);
    const [number, setNumber] = useState<string>(UserStore.user.phoneNumber!);
    const [image, setImage] = useState<any>();

    const handlePickImage = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
        setImage(image);
      });
    }

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
    await updateProfile(name, number)
        .then((message: string) => {
            // setMessage(message);
            showToast(message);
        });
  }

  const handleUpdateAvatar = async() => {
    const form = new FormData();
    form.append('file', {
      uri: image.path,
      type: "image/jpeg",
      name: `${(new Date()).toISOString()}.jpg`,
    });
    await updateAvatar(form)
        .then((message: string) => {
            // setMessage(message);
            showToast(message);
        });
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

        <Text style={styles.txtTitle}>{t('eps-edit profile')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonDone} source={require('../../../assets/icon/exportDataScreen/done.png')}/>
        </TouchableOpacity>
      </View>

      {/* avatar */}
      <TouchableOpacity
        style={styles.viewAvatar}
        onPress={() => {
          handlePickImage()
        }}
      >
        {(!image) && <Image style={styles.imgAvatar} source={{uri: UserStore.user.avatarImage!}}/>}
        {(image) && <Image style={styles.imgAvatar} source={{uri: image.path}}/>}
        <View style={styles.viewEdit}>
          <Image style={styles.imgEdit} source={require('../../../assets/icon/menu/edit.png')}/>
        </View>
      </TouchableOpacity>

      <View style={styles.viewInputContainer}>
        <Text style={styles.txtInputTitle}>{t('eps-display name')}</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType='default'
          onChangeText={(text) => {setName(text)}}
          value={name!}
        />
      </View>

      <View style={styles.viewInputContainer}>
        <Text style={styles.txtInputTitle}>{t('eps-phone number')}</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType='phone-pad'
          onChangeText={(text) => {setNumber(text)}}
          value={number!}
        />
      </View>
      
      <View style={styles.viewButtonGroup}>
        <Button
          content={t('eps-save')}
          onPress={() => {
            // console.log(response);
            handleUpdate();
            if(image) {
            handleUpdateAvatar();
            }
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