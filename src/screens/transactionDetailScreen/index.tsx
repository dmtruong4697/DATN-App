import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { deleteTransactionById, getTransactionById } from '../../realm/services/transactions';
import { RealmContext } from '../../realm/models';
import { getTransactionTypeById } from '../../realm/services/transactionType';
import { getWalletById } from '../../realm/services/wallets';

interface IProps {

}

const TransactionDetailScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const route = useRoute<RouteProp<RootStackParamList, 'TransactionDetail'>>();
    const {_id} = route.params;

    let transaction = getTransactionById(realm, _id);
    let transactionType = getTransactionTypeById(realm, transaction!.transactionTypeId);
    let wallet = getWalletById(realm, transaction!.walletId);

    const isFocus = useIsFocused();
    useEffect(() => {
        transaction = getTransactionById(realm, _id);
        transactionType = getTransactionTypeById(realm, transaction!.transactionTypeId);
        wallet = getWalletById(realm, transaction!.walletId);
    },[isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: getWalletById(realm, transaction!.walletId)?.currencyUnit,
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

        <Text style={styles.txtTitle}>Transaction Detail</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.view1}>
          <View style={styles.imgTypeIcon}/>
          <View>
            <Text style={styles.txtType}>{transactionType?.name}</Text>
            <Text style={[styles.txtTotal, {color: (transaction?.income)? '#25A969':'#F95B51'}]}>{formatter.format(Number(transaction?.total))}</Text>
          </View>
      </View>

      <View style={styles.view2}>
        <Image style={styles.imgDateIcon} source={require('../../../assets/icon/transactionDetail/calendar.png')}/>
        <View style={{gap: 10,}}>
            <Text style={styles.txtDate}>{transaction?.createAt}</Text>
            <Text style={styles.txtDate}>Note: {transaction?.note}</Text>
            <Text style={styles.txtDate}>{wallet?.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnEdit}
        onPress={() => {navigation.navigate('EditTransaction', {_id: _id})}}
      >
        <Text style={styles.txtEdit}>Edit Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => {
            deleteTransactionById(realm, _id);
            navigation.goBack();
        }}
      >
        <Text style={styles.txtDelete}>Delete</Text>
      </TouchableOpacity>

    </View>
  )
}

export default TransactionDetailScreen    