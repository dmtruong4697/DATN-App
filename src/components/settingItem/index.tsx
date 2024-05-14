import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { Realm } from "realm";
import { observer } from 'mobx-react'

interface IProps {
    id: string,
    title: string,
    onPress: () => void,
    renderToggle: boolean,
    toggleState: boolean,
}

const SettingItem: React.FC<IProps>  = ({id, onPress, renderToggle, title, toggleState}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

  return (
   
  )
}

export default observer(SettingItem)    