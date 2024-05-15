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
    state?: string,
    onPress: () => void,
    renderToggle: boolean,
    toggleState?: boolean,
    onPressToggle?: () => void,
}

const SettingItem: React.FC<IProps>  = ({id, onPress, renderToggle, title, toggleState, state}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

  return (
    <TouchableOpacity
      style={styles.viewContainer}
      onPress={onPress}
    >
      <Text style={styles.txtTitle}>{title}</Text>
      {(!renderToggle) && <Text style={styles.txtState}>{state}</Text>}
      {(!renderToggle) && <Image style={styles.imgRight} source={require('../../../assets/icon/menu/right.png')}/>}
    </TouchableOpacity>
  )
}

export default observer(SettingItem)    