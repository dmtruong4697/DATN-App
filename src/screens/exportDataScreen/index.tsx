import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
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

interface IProps {}

const ExportDataScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

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

    useEffect(() => {
        initWalletList();
    },[])
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Export Data</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            // navigation.navigate('AddGroup');
            console.log(ExportDataStore.startTime,'   ',ExportDataStore.finishTime);
          }}
        >
          {/* <Text style={styles.txtEdit}>ADD</Text> */}
          <Image style={styles.imgButtonAdd} source={require('../../../assets/icon/groupList/add.png')}/>
        </TouchableOpacity>
      </View>

    <TouchableOpacity
        style={styles.viewItem}
        onPress={() => {
            navigation.navigate('ExportDataPickWallet');
        }}
    >
        <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/wallet.png')}/>
        <Text style={styles.txtItem}>{ExportDataStore.getSelectedWallet().length} wallets</Text>
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
            content='Export Excel File'
            onPress={() => {
                console.log(getTransactionByWalletListAndTime(realm, ExportDataStore.walletData, ExportDataStore.startTime, ExportDataStore.finishTime))
            }}
        />
    </View>

    </View>
  )
}

export default observer(ExportDataScreen)    