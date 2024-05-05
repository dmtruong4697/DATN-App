import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { getAllTransactionType, getTransactionTypeById } from '../../realm/services/transactionType';
import { getWalletById } from '../../realm/services/wallets';

interface IProps {
    id: string,
    userName: string,
    avatarImage: string,
    total: number,
}

const SplitDataItem: React.FC<IProps>  = ({id, avatarImage, total, userName}) => {

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
    >
        <Image style={styles.imgAvatar} source={{uri: avatarImage}}/>
        <View style={styles.viewName}>
            <Text style={styles.txtName}>{userName}</Text>
        </View>
        <View style={styles.viewMoney}>
            {(total < 0) && <Text style={styles.txtTitle}>Earn:</Text>}
            {(total >= 0) && <Text style={styles.txtTitle}>Pay:</Text>}

            {(total < 0) && <Text style={[styles.txtMoney, {color: '#25A969'}]}>{formatter.format(-total)}</Text>}
            {(total >= 0) && <Text style={[styles.txtMoney, {color: '#F95B51'}]}>{formatter.format(total)}</Text>}
        </View>
    </TouchableOpacity>
  )
}

export default SplitDataItem    