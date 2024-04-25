import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { Realm } from "realm";
import { RootStackParamList } from '../../navigator/mainNavigator';
import { getShoppingListById } from '../../realm/services/shoppingList';


interface IProps {}

const ShoppingListDetailScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const route = useRoute<RouteProp<RootStackParamList, 'ShoppingListDetail'>>();
    const {_id} = route.params;

    let list = getShoppingListById(realm, _id);

    const isFocus = useIsFocused();
    useEffect(() => {
        list = getShoppingListById(realm, _id);
    },[isFocus])
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{list!.name}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/groupList/add.png')}/> */}
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ShoppingListDetailScreen    