import { ActivityIndicator, Image, Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { colors } from '../../constants/colors'
import { UserStore } from '../../mobx/auth'
import { observer } from 'mobx-react'
import { googleLogin, login } from '../../services/auth'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { syncData } from '../../services/sync'
import { RealmContext } from '../../realm/models'
import { GoogleSignin } from '@react-native-community/google-signin'
import { API } from '../../constants/api'
// import { GoogleSignin } from '@react-native-community/google-signin';

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
    const {useRealm} = RealmContext;
    const realm = useRealm();

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

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
      } = useForm();

    const onSubmit = async(data: any)=> {
        await login(navigation, getValues().email, getValues().password, UserStore.deviceToken)
            .then(async(message: string) => {
                // setMessage(message);
                await syncData(realm, navigation)
                .then((message: string) => {
                    showToast(message);
                })
                showToast(message);
            });
    };

    const GoogleLogin = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // console.log(userInfo);
        return userInfo;
    };

    const handleGoogleLogin = async () => {
		// setLoading(true);
		try {
			const response = await GoogleLogin();
			const { idToken, user } = response;

			if (idToken) {
				// const resp = await authAPI.validateToken({
				// 	token: idToken,
				// 	email: user.email,
				// });
				// await handlePostLoginData(resp.data);
                console.log(user);
			}
            // Gửi token tới server để xác thực
            // const res = await fetch(API + '/google-auth', {
            //     method: 'POST',
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ token: idToken }),
            // });
        
            // const data = await res.json();
            // console.log(data); 
            await googleLogin(navigation, idToken, UserStore.deviceToken)
            .then(async(message: string) => {
                // setMessage(message);
                await syncData(realm, navigation)
                .then((message: string) => {
                    showToast(message);
                })
                showToast(message);
            });
		} catch (apiError) {
			// setError(
			// 	apiError?.response?.data?.error?.message || 'Something went wrong'
			// );
		}
	};

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '159333030534-3cqvdt5pvtvrgmate5plem0tcl5o1e5p.apps.googleusercontent.com',
            androidClientId: '159333030534-leh4cepddkcns39m3j7h319vfp69r1fm.apps.googleusercontent.com',
            // iosClientId: GOOGLE_IOS_CLIENT_ID,
            scopes: ['profile', 'email'],
          });
    },[])
  return (
    <View style={styles.container}>
      
      <View style={styles.title1}>
        <View style={{width: 300, height: 72,}}
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
                            secureTextEntry={!isShowPassword}
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
            onPress={handleGoogleLogin}
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