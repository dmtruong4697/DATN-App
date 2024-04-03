import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { deleteTransactionById, getTransactionById } from '../../realm/services/transactions';
import { RealmContext } from '../../realm/models';
import { getTransactionTypeById } from '../../realm/services/transactionType';
import { deleteWalletById, getWalletById } from '../../realm/services/wallets';

interface IProps {

}

const WalletDetailScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const route = useRoute<RouteProp<RootStackParamList, 'WalletDetail'>>();
    const {_id} = route.params;

    let wallet = getWalletById(realm, _id);

    const isFocus = useIsFocused();
    useEffect(() => {
        let wallet = getWalletById(realm, _id);
    },[isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: wallet!.currencyUnit,
    });
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Wallet Detail</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.navigate('EditWallet', {_id: _id})}}
        >
          <Text style={styles.txtEdit}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.view1}>
          <View style={styles.imgTypeIcon}/>
          <View>
            <Text style={styles.txtType}>{wallet!.name}</Text>
            <Text style={[styles.txtTotal, {color: '#25A969'}]}>{formatter.format(Number(wallet!.balance))}</Text>
          </View>
      </View>

      {/* <TouchableOpacity
        style={styles.btnEdit}
        onPress={() => {navigation.navigate('EditWallet', {_id: _id})}}
      >
        <Text style={styles.txtEdit}>Edit Wallet</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => {
            deleteWalletById(realm, _id);
            navigation.goBack();
        }}
      >
        <Text style={styles.txtDelete}>Delete</Text>
      </TouchableOpacity>

    </View>
  )
}

export default WalletDetailScreen    