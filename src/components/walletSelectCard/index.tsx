import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { Realm } from "realm";
import { getShoppingListById, getShoppingListItemById, getShoppingListProgress, setIsDoneShoppingListItem, updateShoppingListById } from '../../realm/services/shoppingList';
import { colors } from '../../constants/colors';
import { getWalletById } from '../../realm/services/wallets';

interface IProps {
    _id: Realm.BSON.ObjectId,
    isCheck: boolean,
    onPress: () => void,
}

const WalletSelectItem: React.FC<IProps>  = ({_id, isCheck, onPress}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const [isDone, setIsDone] = useState(isCheck);

    let wallet = getWalletById(realm, _id);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: getWalletById(realm, _id)?.currencyUnit,
    });

    useEffect(() => {
        wallet = getWalletById(realm, _id);
    },[])

  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={onPress}
    >
        <TouchableOpacity
            style={[styles.viewCheck, {
                backgroundColor: (isDone)? colors.PrimaryColor: '#FFFFFF',
                borderColor: (isDone)? colors.PrimaryColor: '#CFCFCF',
            }]}
            onPress={onPress}
        >
            <Image style={styles.imgCheck} source={require('../../../assets/icon/shoppingListItemCard/check.png')}/>
        </TouchableOpacity>

        <View style={styles.viewContent}>
            <Text style={styles.txtName}>{wallet!.name}</Text>
            <Text style={styles.txtBalance}>{formatter.format(wallet!.balance)}</Text>
        </View>

    </TouchableOpacity>
  )
}

export default WalletSelectItem    