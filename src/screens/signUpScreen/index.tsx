import { ActivityIndicator, Image, Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { styles } from './styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { colors } from '../../constants/colors'
import { UserStore } from '../../mobx/auth'
import { observer } from 'mobx-react'
import { login, signUp } from '../../services/auth'
import { Controller, useForm } from 'react-hook-form'

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

const SignUpScreen: FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        watch,
        formState: { errors },
      } = useForm();

    const onSubmit = async(data: any)=> {
      // if(getValues().password != getValues().confirmPassword) {
      //   showToast('')
      // }
      setIsLoading(true);
        await signUp(navigation,getValues().userName, getValues().email, getValues().password, getValues().phoneNumber)
            .then((message: string) => {
                // setMessage(message);
                showToast(message);
            });
      setIsLoading(false);
    };

  return (
    <View style={styles.viewContainer}>
      
      <View style={styles.title1}>
        <View style={{width: 219, height: 72,}}
        >
            <Text style={styles.txtTitle}>
                Just {""}
                <Text style={styles.txtTitle2}>Sign up</Text>
                ,we'll prepar your order
            </Text>
        </View>
      </View>

      <View style={styles.title2}>
            <View 
                style={{height: 48, width: 231,}}
            >
                <Text style={{fontSize: 16, fontWeight: '500', color: '#646982'}}>
                    If you already have an account please {""}
                    <Text   
                        style={{fontSize: 16, fontWeight: '500', color: colors.PrimaryColor}}
                        // onPress={() => {navigation.navigate('SignIn')}}
                        onPress={() => {navigation.navigate('ValidateEmail', {email: getValues().email})}}
                    >Sign in here</Text>
                </Text>
            </View>
      </View>

      <View style={styles.inputForm}>

        {/* user name */}
        <View style={styles.inputField}>
            <Text style={styles.inputFieldTitle}>Display name</Text>
            <View style={styles.textInput}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder='display name'
                            placeholderTextColor={'#939393'}
                            style={styles.viewInput}
                            value={value}
                            onChangeText={value => onChange(value)}
                            onBlur={onBlur}
                    />
                    )}
                    name='userName'
                    rules={{
                        required: true,
                    }}
                />
            </View>
            {errors.userName && <Text style={{color: colors.ErrorColor}}>Display name is required.</Text>}
        </View>
        
        {/* email */}
        <View style={styles.inputField}>
            <Text style={styles.inputFieldTitle}>Email address</Text>
            <View style={styles.textInput}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder='email'
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
            {errors.email && <Text style={{color: colors.ErrorColor}}>Email is required.</Text>}
        </View>

        {/* password */}
        <View style={styles.inputField}>
            <Text style={styles.inputFieldTitle}>Password</Text>
            <View style={styles.textInput}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder='password'
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
            {errors.password && <Text style={{color: colors.ErrorColor}}>Password is required.</Text>}
          </View>

          {/* confirm password */}
          <View style={styles.inputField}>
            <Text style={styles.inputFieldTitle}>Confirm Password</Text>
            <View style={styles.textInput}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder='confirm password'
                            placeholderTextColor={'#939393'}
                            secureTextEntry={isShowPassword}
                            style={styles.viewInput}
                            value={value}
                            onChangeText={value => onChange(value)}
                            onBlur={onBlur}
                    />
                    )}
                    name='confirmPassword'
                    rules={{
                        // required: true,
                        validate: (val: string) => {
                          if (watch('password') != val) {
                            return "Your passwords do no match";
                          }
                    }}}
                />
                <TouchableOpacity
                    onPress={() => {setIsShowPassword(!isShowPassword)}}
                >
                    {/* <Image style={{width: 20, height: 16, marginLeft: 12, marginRight: 12,}} source={require('../../../assets/icon/showPassword.png')}/> */}
                </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={{color: colors.ErrorColor}}>Password and Confirm Password does not match.</Text>}
        </View>

      </View>

      <View style={styles.buttonGroup}>
        
        <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSubmit(onSubmit)}
        >
            <Text style={{fontSize: 16, fontWeight: '700', color: '#FFFFFF'}}
            >SIGN UP</Text>
        </TouchableOpacity>

      </View>

      {(isLoading) && 
        <View style={styles.viewLoading}>
            {/* <Text style={styles.txtLoading}>Loading...</Text> */}
            <ActivityIndicator color={colors.PrimaryColor} size={100}/>
        </View>
      }

    </View>
  )
}

export default observer(SignUpScreen)