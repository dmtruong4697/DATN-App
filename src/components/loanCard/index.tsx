import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { getAllTransactionType, getTransactionTypeById } from '../../realm/services/transactionType';
import { getWalletById } from '../../realm/services/wallets';
import { deleteTransactionById } from '../../realm/services/transactions';

type LoanType = {
    _id: Realm.BSON.ObjectId;
    name: string,
    total: number,
    isLoan: boolean,
    createAt: string,
    walletId: Realm.BSON.ObjectID,
    people:string,
    interest:number,
    cycle: string,
    note: string,
    imageUrl: string,
}

interface IProps {
    _id: Realm.BSON.ObjectId;
    name: string,
    total: number,
    isLoan: boolean,
    createAt: string,
    walletId: Realm.BSON.ObjectID,
    people:string,
    interest:number,
    cycle: string,
    note: string,
    imageUrl: string,
}

const LoanCard: React.FC<IProps>  = ({
    _id,
    createAt,
    imageUrl,
    isLoan,
    name,
    note,
    total,
    walletId,
    cycle,
    interest,
    people,
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
        onPress={() => {navigation.navigate('LoanDetail', {_id: _id})}}
    >
        <View style={styles.viewIcon}>
            <Image style={styles.imgIcon} source={require('../../../assets/icon/transactionType/14.png')}/>
        </View>

        <View style={styles.viewContent}>
            <Text style={styles.txtName}>{isLoan? 'Loan:':'Debt:'} {people}</Text>
            <Text style={styles.txtTime}>{createAt}</Text>
        </View>

        <Text style={[styles.txtTotal, {color: (!isLoan)? '#25A969':'#F95B51'}]}>{formatter.format(total)}</Text>
    </TouchableOpacity>
  )
}

export default LoanCard    