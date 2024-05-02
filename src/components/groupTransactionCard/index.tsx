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
    _id: string;
    groupId: string;
    userId: string;
    name: string;
    total: number;
    createAt: string;
    note: string;
    imageUrl: string[];
    unit: string,
}

const GroupTransactionCard: React.FC<IProps>  = ({
    _id,
    createAt,
    imageUrl,
    name,
    note,
    total,
    groupId,
    userId,
    unit,
}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });

    const [user, setUser] = useState<any>({})
    const getUserDetail = async() => {
        const u = await getUserInfo(userId);
        setUser(u);
    }

    useEffect(() => {
        getUserDetail();
    },[])

  return (
    <TouchableOpacity 
        style={styles.viewContainer}
        // onPress={() => {navigation.navigate('TransactionDetail', {_id: _id})}}
    >

        <Image style={styles.viewIcon} source={{uri: user.avatarImage}}/>

        <View style={styles.viewContent}>
            <Text style={styles.txtName}>{name}</Text>
            <Text style={styles.txtTime}>{createAt}</Text>
        </View>

        <Text style={styles.txtTotal}>{formatter.format(total)}</Text>
    </TouchableOpacity>
  )
}

export default GroupTransactionCard    