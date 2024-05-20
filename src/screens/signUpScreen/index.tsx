import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';

interface IProps {}

const SignUpScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const {
      register,
      handleSubmit,
      control,
      getValues,
      formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async(data: any)=> {
      setIsLoading(true);
      await signIn(navigation, getValues().email, getValues().password)
          .then((user) => {
              dispatch(loginSuccess(user));
          });
      setIsLoading(false);
      console.log(getValues());
    };

  return (
    <View style={styles.viewContainer}>
        <Text>signup screen</Text>
    </View>
  )
}

export default SignUpScreen    