import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuItem from '../../components/menuItem';

interface IProps {}

const BudgetScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View>
        <Text>budget screen</Text>
        <MenuItem
        id='1'
        title='convert'
        backgroundColor='pink'
        onPress={() => {}}
      />
    </View>
  )
}

export default BudgetScreen    