import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
    // _id: Realm.BSON.ObjectId;
    name: string;
    income: boolean;
    total: number;
    createAt: string;
    // transactionTypeId: Realm.BSON.ObjectID;
    // walletId: Realm.BSON.ObjectID;
    note: string;
    imageUrl: string;
}

const TransactionCard: React.FC<IProps>  = ({
    // _id,
    createAt,
    imageUrl,
    income,
    name,
    note,
    total,
    // transactionTypeId,
    // walletId,
}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.viewContainer}>
        <View style={styles.viewIcon}>
            
        </View>

        <View style={styles.viewContent}>
            <Text style={styles.txtName}>Youtube</Text>
            <Text style={styles.txtTime}>Today</Text>
        </View>

        <Text style={[styles.txtTotal, {color: (income)? '#25A969':'#F95B51'}]}>+ $850</Text>
    </View>
  )
}

export default TransactionCard    