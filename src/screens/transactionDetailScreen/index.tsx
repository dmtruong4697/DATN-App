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
import { useTranslation } from 'react-i18next';
import { TypeIconData } from '../../data/typeIconData';

interface IProps {

}

const TransactionDetailScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

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

        <Text style={styles.txtTitle}>{t('tds-transaction detail')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.view1}>
          <Image style={styles.imgTypeIcon} source={TypeIconData[Number(transactionType?.iconUrl)].iconUrl}/>
          <View>
            <Text style={styles.txtType}>{transactionType?.name}</Text>
            <Text style={[styles.txtTotal, {color: (transaction?.income)? '#25A969':'#F95B51'}]}>{formatter.format(Number(transaction?.total))}</Text>
          </View>
      </View>

      <View style={styles.view2}>
        <Image style={styles.imgDateIcon} source={require('../../../assets/icon/transactionDetail/calendar.png')}/>
        <View style={{gap: 10,}}>
            <Text style={styles.txtDate}>{transaction?.createAt}</Text>
            <Text style={styles.txtDate}>{t('tds-note')}: {transaction?.note}</Text>
            <Text style={styles.txtDate}>{wallet?.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnEdit}
        onPress={() => {navigation.navigate('EditTransaction', {_id: _id})}}
      >
        <Text style={styles.txtEdit}>{t('tds-edit transaction')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => {
            deleteTransactionById(realm, _id);
            navigation.goBack();
        }}
      >
        <Text style={styles.txtDelete}>{t('tds-delete')}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default TransactionDetailScreen    