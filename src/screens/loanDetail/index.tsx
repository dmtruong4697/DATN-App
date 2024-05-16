import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { RealmContext } from '../../realm/models';
import { getWalletById } from '../../realm/services/wallets';
import { deleteLoanById, getLoanById } from '../../realm/services/loan';
import { useTranslation } from 'react-i18next';

interface IProps {}

const LoanDetailScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const route = useRoute<RouteProp<RootStackParamList, 'LoanDetail'>>();
    const {_id} = route.params;

    let loan = getLoanById(realm, _id);
    let wallet = getWalletById(realm, loan!.walletId);

    const isFocus = useIsFocused();
    useEffect(() => {
        loan = getLoanById(realm, _id);
        wallet = getWalletById(realm, loan!.walletId);
    },[isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: getWalletById(realm, loan!.walletId)?.currencyUnit,
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

        <Text style={styles.txtTitle}>{t('lds-loan debt detail')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.navigate('EditLoan', {_id: _id})
          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
          <Text style={styles.txtEdit}>{t('lds-edit')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.view1}>
          <View style={styles.imgTypeIcon}/>
          <View>
            <Text style={styles.txtType}>{loan?.people}</Text>
            <Text style={[styles.txtTotal, {color: (!loan?.isLoan)? '#25A969':'#F95B51'}]}>{formatter.format(Number(loan?.total))}</Text>
          </View>
      </View>

      <View style={styles.view2}>
        <Image style={styles.imgDateIcon} source={require('../../../assets/icon/transactionDetail/calendar.png')}/>
        <View style={{gap: 10,}}>
            <Text style={styles.txtDate}>{loan?.createAt}</Text>
            <Text style={styles.txtDate}>{wallet?.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => {
            deleteLoanById(realm, _id);
            navigation.goBack();
        }}
      >
        <Text style={styles.txtDelete}>{t('lds-delete')}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoanDetailScreen    