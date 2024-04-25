import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { Realm } from "realm";
import { getShoppingListById, getShoppingListProgress } from '../../realm/services/shoppingList';

interface IProps {
    _id: Realm.BSON.ObjectId,
}

const ShoppingListCard: React.FC<IProps>  = ({_id}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    let list = getShoppingListById(realm, _id);
    let progress = getShoppingListProgress(realm, _id);

    useEffect(() => {
        list = getShoppingListById(realm, _id);
        progress = getShoppingListProgress(realm, _id);
    },[])

  return (
    <TouchableOpacity
        style={styles.viewContainer}
    >
      <View style={styles.viewName}>
        <Text style={styles.txtName}>{list!.name}</Text>
        <TouchableOpacity
          style={styles.btnOption}
        >
          <Image style={styles.btnOption} source={require('../../../assets/icon/shoppingListCard/option.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.viewProgress}>
        <View style={styles.viewProgressBar}>
          <View style={[styles.viewDoneBar, {width: `${progress.percent*100}%`}]}/>
        </View>
        <Text style={styles.txtProgress}>{progress.done}/{progress.total}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ShoppingListCard    