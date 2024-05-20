import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { getAllTransactionType, getTransactionTypeById } from '../../realm/services/transactionType';
import { getWalletById } from '../../realm/services/wallets';
import { deleteTransactionById } from '../../realm/services/transactions';
import { TypeIconData } from '../../data/typeIconData';
// import image from '../../../assets/icon/socialMedia/google.png';

// const DEFAULT_IMAGE = Image.resolveAssetSource(image).uri;
export type TransactionType = {
    _id: Realm.BSON.ObjectId;
    name: string;
    income: boolean;
    total: number;
    createAt: string;
    transactionTypeId: Realm.BSON.ObjectID;
    walletId: Realm.BSON.ObjectID;
    note: string;
    imageUrl: string;
}

interface IProps {
    _id: Realm.BSON.ObjectId;
    name: string;
    income: boolean;
    total: number;
    createAt: string;
    transactionTypeId: Realm.BSON.ObjectID;
    walletId: Realm.BSON.ObjectID;
    note: string;
    imageUrl: string;
}

const TransactionCard: React.FC<IProps>  = ({
    _id,
    createAt,
    imageUrl,
    income,
    name,
    note,
    total,
    transactionTypeId,
    walletId,
}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: getWalletById(realm, walletId)?.currencyUnit,
    });

  return (
    <TouchableOpacity 
        style={styles.viewContainer}
        onPress={() => {navigation.navigate('TransactionDetail', {_id: _id})}}
    >
        <View style={styles.viewIcon}>
            <Image style={styles.imgIcon} source={TypeIconData[Number(getTransactionTypeById(realm, transactionTypeId)?.iconUrl)].iconUrl}/>
        </View>

        <View style={styles.viewContent}>
            <Text style={styles.txtName}>{getTransactionTypeById(realm, transactionTypeId)?.name}</Text>
            <Text style={styles.txtTime}>{createAt}</Text>
        </View>

        <Text style={[styles.txtTotal, {color: (income)? '#25A969':'#F95B51'}]}>{formatter.format(total)}</Text>
    </TouchableOpacity>
  )
}

export default TransactionCard    