import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { Realm } from "realm";
import { getShoppingListById, getShoppingListItemById, getShoppingListProgress, setIsDoneShoppingListItem, updateShoppingListById } from '../../realm/services/shoppingList';
import { colors } from '../../constants/colors';

interface IProps {
    _id: Realm.BSON.ObjectId,
}

const ShoppingListItemCard: React.FC<IProps>  = ({_id}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    let item = getShoppingListItemById(realm, _id);

    useEffect(() => {
        item = getShoppingListItemById(realm, _id);
    },[])

    const [isDone, setIsDone] = useState(item!.isDone);

    const handleDone = () => {
        const updatedItem = item!;
        updatedItem!.isDone = !updatedItem!.isDone;
        setIsDoneShoppingListItem(realm, _id, !isDone);
        setIsDone(!isDone);
    }

  return (
    <TouchableOpacity
        style={styles.viewContainer}
    >
        <TouchableOpacity
            style={[styles.viewCheck, {
                backgroundColor: (isDone)? colors.PrimaryColor: '#FFFFFF',
                borderColor: (isDone)? colors.PrimaryColor: '#CFCFCF',
            }]}
            onPress={() => {
                setIsDoneShoppingListItem(realm, _id, !isDone);
                setIsDone(!isDone);
            }}
        >
            <Image style={styles.imgCheck} source={require('../../../assets/icon/shoppingListItemCard/check.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtName}>{item?.name}</Text>
        {/* <Text style={styles.txtQuantity}>{item?.quantity} {item?.unit}</Text> */}
    </TouchableOpacity>
  )
}

export default ShoppingListItemCard    