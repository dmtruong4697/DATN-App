import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, Platform, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Button from '../../components/button';
import { colors } from '../../constants/colors';
import { validateEmail } from '../../services/auth';

interface IProps {}

const ValidateEmailScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ValidateEmail'>>();
    const {email} = route.params;

    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    const showToast = (message: string) => {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    };

    const handleValidate = async()=> {
      setIsLoading(false);
      await validateEmail(navigation, email, value)
          .then((message: string) => {
              // setMessage(message);
              showToast(message);
          });
      setIsLoading(true);
    };

  return (
    <View style={styles.viewContainer}>
      <Image style={styles.imgEmail} source={require('../../../assets/illustration/validateEmailScreen/mail.png')}/> 
      <Text style={styles.txtTitle}>Email Verification</Text> 
      <Text style={styles.txtDescription}>Please enter the 6-digit verification code that was sent to your email</Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        // autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />

      <View style={styles.viewButtonGroup}>
        <Button
          content='Continue'
          onPress={() => {
            handleValidate();
          }}
          containerStyle={{
            borderRadius: 5,
          }}
        />
      </View>

      <Text style={styles.txtDescription}>Didn't receive an email? 
          <Text 
            style={[styles.txtDescription, {color: colors.PrimaryColor}]}
            onPress={() => {}}
          > Resend</Text>
      </Text>

      {(isLoading) && 
        <View style={styles.viewLoading}>
            {/* <Text style={styles.txtLoading}>Loading...</Text> */}
            <ActivityIndicator color={colors.PrimaryColor} size={100}/>
        </View>
      }
    </View>
  )
}

export default ValidateEmailScreen    