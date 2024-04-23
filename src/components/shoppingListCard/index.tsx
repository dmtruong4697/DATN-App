import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { getAllTransactionType, getTransactionTypeById } from '../../realm/services/transactionType';
import { getWalletById } from '../../realm/services/wallets';
import { deleteTransactionById } from '../../realm/services/transactions';

interface IProps {
    
}

const ShoppingListCard: React.FC<IProps>  = ({

}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

  return (
    <TouchableOpacity
        style={styles.viewContainer}
    >

    </TouchableOpacity>
  )
}

export default ShoppingListCard    