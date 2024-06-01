import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, PermissionsAndroid, ToastAndroid } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GroupCard from '../../components/groupCard';
import { getGroupList, joinGroup } from '../../services/group';
import { RealmContext } from '../../realm/models';
import { getAllWallet } from '../../realm/services/wallets';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../../components/button';
import { observer } from 'mobx-react'
import { ExportDataStore, WalletSelectList } from '../../mobx/exportData';
import { getTransactionByWalletListAndTime } from '../../realm/services/transactions';
import RNFetchBlob from 'rn-fetch-blob';
import XLSX from 'xlsx'
import { writeFile, CachesDirectoryPath, DownloadDirectoryPath } from 'react-native-fs';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';
import { CurrencyUnitData } from '../../constants/currencyUnit';
import { getDebtsTotalByUnit, getLoansTotalByUnit, getSavingsTotalByUnit, getWalletsTotalByUnit } from '../../realm/services/analyst';
import { colors } from '../../constants/colors';

interface IProps {}

const FinancialStatementScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const [unit, setUnit] = useState(CurrencyUnitData[1].code);
    let walletTotal = getWalletsTotalByUnit(realm, unit);
    let savingTotal = getSavingsTotalByUnit(realm, unit);
    let loanTotal = getLoansTotalByUnit(realm, unit);
    let debtTotal = getDebtsTotalByUnit(realm, unit);

  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: unit,
  });

  useEffect(() => {
    walletTotal = getWalletsTotalByUnit(realm, unit);
    savingTotal = getSavingsTotalByUnit(realm, unit);
    loanTotal = getLoansTotalByUnit(realm, unit);
    debtTotal = getDebtsTotalByUnit(realm, unit);
  }, [])
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Financial Statement</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            // navigation.navigate('AddGroup');
            // console.log(ExportDataStore.startTime,'   ',ExportDataStore.finishTime);
          }}
        >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/option.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.viewGroup}>
        <View style={styles.viewItem}>
            <Text style={styles.txtItemTitle}>Tai chinh hien tai</Text>
            <Text style={[styles.txtTotal, {color: '#111111'}]}>{formatter.format(walletTotal + savingTotal + loanTotal - debtTotal)}</Text>
        </View>
      </View>

      <View style={styles.viewGroup}>
        <View style={styles.viewItem}>
            <Text style={styles.txtItemTitle}>Tong co</Text>
            <Text style={[styles.txtTotal, {color: '#111111'}]}>{formatter.format(walletTotal + savingTotal + loanTotal)}</Text>
        </View>

        <TouchableOpacity 
            style={styles.viewItem}
            onPress={() => {
                navigation.navigate('MyWallet');
            }}
        >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/financialStateScreen/wallet.png')}/>
            <Text style={styles.txtItemTitle}>Tien trong vi</Text>
            <Text style={[styles.txtTotal, {color: colors.PrimaryColor}]}>{formatter.format(walletTotal)}</Text>
            <Image style={styles.imgRight} source={require('../../../assets/icon/menu/right.png')}/>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.viewItem}
            onPress={() => {
                navigation.navigate('SavingList');
            }}
        >
        <Image style={styles.imgIcon} source={require('../../../assets/icon/financialStateScreen/saving.png')}/>
            <Text style={styles.txtItemTitle}>Tai khoan tiet kiem</Text>
            <Text style={[styles.txtTotal, {color: colors.PrimaryColor}]}>{formatter.format(savingTotal)}</Text>
            <Image style={styles.imgRight} source={require('../../../assets/icon/menu/right.png')}/>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.viewItem}
            onPress={() => {
                navigation.navigate('LoanList');
            }}
        >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/financialStateScreen/loan.png')}/>
            <Text style={styles.txtItemTitle}>Cho vay</Text>
            <Text style={[styles.txtTotal, {color: colors.PrimaryColor}]}>{formatter.format(loanTotal)}</Text>
            <Image style={styles.imgRight} source={require('../../../assets/icon/menu/right.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.viewGroup}>
        <TouchableOpacity 
            style={styles.viewItem}
            onPress={() => {
                navigation.navigate('LoanList');
            }}
        >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/financialStateScreen/debt.png')}/>
            <Text style={styles.txtItemTitle}>Tong no</Text>
            <Text style={[styles.txtTotal, {color: colors.ErrorColor}]}>{formatter.format(debtTotal)}</Text>
            <Image style={styles.imgRight} source={require('../../../assets/icon/menu/right.png')}/>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default FinancialStatementScreen