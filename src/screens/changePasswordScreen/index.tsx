import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView, ToastAndroid } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingMenuData1, SettingMenuData2 } from '../../data/settingMenuData';
import SettingItem from '../../components/settingItem';
import { observer } from 'mobx-react'
import Button from '../../components/button';
import { changePassword } from '../../services/auth';

interface IProps {}

const ChangePasswordScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const showToast = (message: string) => {
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
    };
  
    const handleChangePassword = async() => {
      await changePassword(navigation, password)
          .then((message: string) => {
              // setMessage(message);
              showToast(message);
          });
    }
  
  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Change Password</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
        </TouchableOpacity>
      </View>

      <Image style={styles.imgPassword} source={require('../../../assets/illustration/changePasswordScreen/password.png')}/>
      <Text style={styles.txtDescription}>Your new Password must be diffrent from Previously used Password</Text>

      <View style={styles.viewInputContainer}>
        <Text style={styles.txtInputTitle}>New Password</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType='default'
          onChangeText={(text) => {setPassword(text)}}
          value={password}
          secureTextEntry
        />
      </View>

      <View style={styles.viewInputContainer}>
        <Text style={styles.txtInputTitle}>Confirm Password</Text>
        <TextInput
          style={styles.txtInput}
          keyboardType='default'
          onChangeText={(text) => {setConfirmPassword(text)}}
          value={confirmPassword}
          secureTextEntry
        />
      </View>
      
      <View style={styles.viewButtonGroup}>
        <Button
          content={'SAVE'}
          onPress={() => {
            handleChangePassword();
          }}
          containerStyle={{
            borderRadius: 5,
          }}
        />
      </View>

    </ScrollView>
  )
}

export default observer(ChangePasswordScreen)    