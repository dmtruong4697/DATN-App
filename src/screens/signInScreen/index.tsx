import { ActivityIndicator, Image, Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { colors } from '../../constants/colors'
import { UserStore } from '../../mobx/auth'
import { observer } from 'mobx-react'
import { login } from '../../services/auth'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
    const {t} = useTranslation();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');

    const showToast = (message: string) => {
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
    };

    const handleLogin = async() => {
        await login(navigation, email, password, UserStore.deviceToken)
            .then((message: string) => {
                // setMessage(message);
                showToast(message);
            });
    }

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
      } = useForm();

    const onSubmit = async(data: any)=> {
        await login(navigation, getValues().email, getValues().password, UserStore.deviceToken)
            .then((message: string) => {
                // setMessage(message);
                showToast(message);
            });
    };

  return (
    <View style={styles.container}>
      
      <View style={styles.title1}>
        <View style={{width: 219, height: 72,}}
        >
            <Text style={styles.txtTitle}>
                {t('sis-just')} {""}
                <Text style={styles.txtTitle2}>{t('sis-sign in')}</Text>
                {t('sis-we will')}
            </Text>
        </View>
      </View>

      <View style={styles.title2}>
            <View 
                style={{height: 48, width: 231,}}
            >
                <Text style={{fontSize: 16, fontWeight: '500', color: '#646982'}}>
                    {t('sis-if you dont')} {""}
                    <Text   
                        style={{fontSize: 16, fontWeight: '500', color: colors.PrimaryColor}}
                        onPress={() => {navigation.navigate('SignUp')}}
                    >{t('sis-sign up here')}</Text>
                </Text>
            </View>
      </View>

      <View style={styles.inputForm}>
        
        <View style={styles.inputField}>
            <Text style={styles.inputFieldTitle}>{t('sis-email address')}</Text>
            <View style={styles.textInput}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder={t('sis-email')}
                            placeholderTextColor={'#939393'}
                            style={styles.viewInput}
                            value={value}
                            onChangeText={value => onChange(value)}
                            onBlur={onBlur}
                    />
                    )}
                    name='email'
                    rules={{
                        required: true,
                    }}
                />
            </View>
            {errors.email && <Text style={{color: colors.ErrorColor}}>{t('sis-email error')}</Text>}
        </View>

        <View style={styles.inputField}>
            <Text style={styles.inputFieldTitle}>{t('sis-password title')}</Text>
            <View style={styles.textInput}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder={t('sis-password')}
                            placeholderTextColor={'#939393'}
                            secureTextEntry={isShowPassword}
                            style={styles.viewInput}
                            value={value}
                            onChangeText={value => onChange(value)}
                            onBlur={onBlur}
                    />
                    )}
                    name='password'
                    rules={{
                        required: true,
                    }}
                />
                <TouchableOpacity
                    onPress={() => {setIsShowPassword(!isShowPassword)}}
                >
                    {/* <Image style={{width: 20, height: 16, marginLeft: 12, marginRight: 12,}} source={require('../../../assets/icon/showPassword.png')}/> */}
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={{color: colors.ErrorColor}}>{t('sis-password error')}</Text>}
        </View>

        <TouchableOpacity>
            <Text
                style={styles.btnForgotPassword}
            >{t('sis-forgot password')}</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.buttonGroup}>
        
        <TouchableOpacity
            style={styles.signInButton}
            // onPress={() => {
            //     // fetchSignIn();
            //     // navigation.navigate('Home');
            //     // login(navigation, email, password, UserStore.deviceToken);
            //     // handleLogin();
            //     // handleSubmit(onSubmit);
            // }}
            onPress={handleSubmit(onSubmit)}
        >
            <Text style={{fontSize: 16, fontWeight: '700', color: '#FFFFFF'}}
            >{t('sis-sign in button')}</Text>
        </TouchableOpacity>

        <Text 
            style={styles.txtOr}
        >{t('sis-or')}</Text>

        <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: '#FBFBFB'}]}
        >
            <Image style={styles.mediaIcon} source={require('../../../assets/icon/socialMedia/facebook.png')}/>
            <Text style={styles.socialButtonText}>{t('sis-connect with')} facebok</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.socialButton, ]}
        >
            <Image style={styles.mediaIcon} source={require('../../../assets/icon/socialMedia/google.png')}/>
            <Text style={styles.socialButtonText}>{t('sis-connect with')} Google</Text>
        </TouchableOpacity>

      </View>

      {(UserStore.isLoading) && 
        <View style={styles.viewLoading}>
            {/* <Text style={styles.txtLoading}>Loading...</Text> */}
            <ActivityIndicator color={colors.PrimaryColor} size={100}/>
        </View>
      }

    </View>
  )
}

export default observer(SignInScreen)