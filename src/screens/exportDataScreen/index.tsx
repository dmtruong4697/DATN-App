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

interface IProps {}

const ExportDataScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const initWalletList = () => {
        const wallets = getAllWallet(realm);
        const array: WalletSelectList[] = [];

        wallets.map((item) => {
            array.push({
                wallet: item,
                isSelected: false,
            })
        })

        ExportDataStore.initList(array);
    }

    const permit = async() => {
      let permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]    
      await PermissionsAndroid.requestMultiple(permissions)
    }

    useEffect(() => {
        initWalletList();
        permit();
    },[])

    const download = async() => {
      var data = getTransactionByWalletListAndTime(realm, ExportDataStore.walletData, ExportDataStore.startTime, ExportDataStore.finishTime);
      if(!data) {showToast('No Data')} else {
         var ws = XLSX.utils.json_to_sheet(data);
        
          var wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb,ws,"Prova");

          const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
          var RNFS = require('react-native-fs');
          var file = DownloadDirectoryPath + '/transactions.xlsx';
          writeFile(file, wbout, 'ascii').then((r)=>{/* :) */}).catch((e)=>{/* :( */})
          .then(() =>{
              showToast('Saved to Download Directory Path');
          })
      }
    }

    const share = async() => {
      var data = getTransactionByWalletListAndTime(realm, ExportDataStore.walletData, ExportDataStore.startTime, ExportDataStore.finishTime);

      if(!data) {showToast('No Data')} else {
         var ws = XLSX.utils.json_to_sheet(data);
        
          var wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb,ws,"Prova");

          const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
          var RNFS = require('react-native-fs');
          var file = RNFS.ExternalStorageDirectoryPath + '/transaction.xlsx';
          writeFile(file, wbout, 'ascii').then((r)=>{/* :) */}).catch((e)=>{/* :( */});

          await Share.open({
            title: 'open pdf',
            url: `file://${file}`,
          })

      }
    }

  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{t('eds-export data')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            // navigation.navigate('AddGroup');
            // console.log(ExportDataStore.startTime,'   ',ExportDataStore.finishTime);
          }}
        >
          {/* <Text style={styles.txtEdit}>ADD</Text> */}
          {/* <Image style={styles.imgButtonAdd} source={require('../../../assets/icon/groupList/add.png')}/> */}
        </TouchableOpacity>
      </View>

    <TouchableOpacity
        style={styles.viewItem}
        onPress={() => {
            navigation.navigate('ExportDataPickWallet');
        }}
    >
        <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/wallet.png')}/>
        <Text style={styles.txtItem}>{ExportDataStore.getSelectedWallet().length} {t('eds-wallets')}</Text>
        <Image style={styles.imgIcon} source={require('../../../assets/icon/menu/right.png')}/>
    </TouchableOpacity>

    <TouchableOpacity
        style={styles.viewItem}
        onPress={() => {
            navigation.navigate('ExportDataPickTime');
        }}
    >
        <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
        <Text style={styles.txtItem}>{ExportDataStore.rangeName}</Text>
        <Image style={styles.imgIcon} source={require('../../../assets/icon/menu/right.png')}/>
    </TouchableOpacity>

    <View style={styles.viewButtonGroup}>
        <Button
            content={t('eds-export excel file')}
            onPress={() => {
                // console.log(getTransactionByWalletListAndTime(realm, ExportDataStore.walletData, ExportDataStore.startTime, ExportDataStore.finishTime))
                // share();
                download();
            }}
            containerStyle={{
              borderRadius: 5,
            }}
        />

        <Button
            content={t('eds-share file')}
            onPress={() => {
                share();
            }}
            containerStyle={{
              borderRadius: 5,
            }}
        />
    </View>

    </View>
  )
}

export default observer(ExportDataScreen)    