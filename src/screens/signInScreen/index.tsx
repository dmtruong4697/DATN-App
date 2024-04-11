import { ActivityIndicator, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { colors } from '../../constants/colors'
import { UserStore } from '../../mobx/auth'
import { observer } from 'mobx-react'
import { login } from '../../services/auth'

type User = {
    uid: string;
    userEmail: string | null,
    phoneNumber: string | null,
    photoURL: string | null,
    displayName: string | null,
    token: string,
    refreshToken: string,
    expirationTime: number,
}

const SignInScreen: FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      
      <View style={styles.title1}>
        <View style={{width: 219, height: 72,}}
        >
            <Text style={styles.txtTitle}>
                Just {""}
                <Text style={styles.txtTitle2}>Sign in</Text>
                ,we'll prepar your order
            </Text>
        </View>
      </View>

      <View style={styles.title2}>
            <View 
                style={{height: 48, width: 231,}}
            >
                <Text style={{fontSize: 16, fontWeight: '500', color: '#646982'}}>
                    If you don't have an account please {""}
                    <Text style={{fontSize: 16, fontWeight: '500', color: colors.PrimaryColor}}>Sign up here</Text>
                </Text>
            </View>
      </View>

      <View style={styles.inputForm}>
        
        <View style={styles.inputField}>
            <Text style={styles.inputFieldTitle}>Email address</Text>
            <View style={styles.textInput}>
                <TextInput 
                    placeholder='email'
                    placeholderTextColor={'#939393'}
                    style={styles.viewInput}
                    onChangeText={(text) => {setEmail(text)}}
                />
            </View>
        </View>

        <View style={styles.inputField}>
            <Text style={styles.inputFieldTitle}>Password</Text>
            <View style={styles.textInput}>
                <TextInput 
                    placeholder='password'
                    placeholderTextColor={'#939393'}
                    secureTextEntry={isShowPassword}
                    style={styles.viewInput}
                    onChangeText={(text) => {setPassword(text)}}
                />
                <TouchableOpacity
                    onPress={() => {setIsShowPassword(!isShowPassword)}}
                >
                    {/* <Image style={{width: 20, height: 16, marginLeft: 12, marginRight: 12,}} source={require('../../../assets/icon/showPassword.png')}/> */}
                </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity>
            <Text
                style={styles.btnForgotPassword}
            >Forgot password?</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.buttonGroup}>
        
        <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
                // fetchSignIn();
                // navigation.navigate('Home');
                login(navigation, email, password, UserStore.deviceToken);
            }}
        >
            <Text style={{fontSize: 16, fontWeight: '700', color: '#FFFFFF'}}
            >SIGN IN</Text>
        </TouchableOpacity>

        <Text 
            style={styles.txtOr}
        >Or</Text>

        <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: '#FBFBFB'}]}
        >
            <Image style={styles.mediaIcon} source={require('../../../assets/icon/socialMedia/facebook.png')}/>
            <Text style={styles.socialButtonText}>Connect with facebok</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.socialButton, ]}
        >
            <Image style={styles.mediaIcon} source={require('../../../assets/icon/socialMedia/google.png')}/>
            <Text style={styles.socialButtonText}>Connect with Google</Text>
        </TouchableOpacity>

      </View>

      {(UserStore.isLoading) && 
        <View style={styles.viewLoading}>
            {/* <Text style={styles.txtLoading}>Loading...</Text> */}
            <ActivityIndicator color={'#E53935'} size={100}/>
        </View>
      }

    </View>
  )
}

export default observer(SignInScreen)