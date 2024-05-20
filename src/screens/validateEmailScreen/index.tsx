import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';

interface IProps {}

const ValidateEmailScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ValidateEmail'>>();
    const {email} = route.params;

  return (
    <View>
        <Text>validate email screen</Text>
    </View>
  )
}

export default ValidateEmailScreen    