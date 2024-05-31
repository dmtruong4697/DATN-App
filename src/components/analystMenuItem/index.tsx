import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { getAllTransactionType, getTransactionTypeById } from '../../realm/services/transactionType';
import { getWalletById } from '../../realm/services/wallets';
import { getUserInfo } from '../../services/user';

interface IProps {
    id: string,
    backgroundColor?: string,
    iconUrl?: ImageSourcePropType,
    title?: string,
    onPress?: () => void,
}

const AnalystMenuItem: React.FC<IProps>  = ({id, backgroundColor, iconUrl, onPress, title}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });

  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={onPress}
    >
        <Image style={styles.imgIcon} source={iconUrl}/>
        <Text style={styles.txtTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AnalystMenuItem    