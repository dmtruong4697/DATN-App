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

    function formatDate(isoString: string): string {
        // Tạo một đối tượng Date từ chuỗi ISO
        const date = new Date(isoString);
    
        // Lấy các thành phần của ngày và giờ
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng trong Date object bắt đầu từ 0
        const year = date.getUTCFullYear().toString();
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    
        // Định dạng ngày tháng và giờ
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    }

  return (
    <TouchableOpacity 
        style={styles.viewContainer}
        onPress={() => {navigation.navigate('GroupTransactionDetail', {transactionId: _id, userId: userId, groupId: groupId})}}
    >

        <Image style={styles.viewIcon} source={{uri: user.avatarImage}}/>

        <View style={styles.viewContent}>
            <Text style={styles.txtName}>{name}</Text>
            <Text style={styles.txtTime}>{formatDate(createAt)}</Text>
        </View>

        <Text style={styles.txtTotal}>{formatter.format(total)}</Text>
    </TouchableOpacity>
  )
}

export default GroupTransactionCard    