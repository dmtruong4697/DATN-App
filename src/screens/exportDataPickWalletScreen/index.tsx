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
import { ExportDataStore } from '../../mobx/exportData';
import WalletSelectItem from '../../components/walletSelectCard';
import { colors } from '../../constants/colors';

interface IProps {}

const ExportDataPickWalletScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Pick Wallets</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          {/* <Text style={styles.txtEdit}>ADD</Text> */}
          <Image style={styles.imgButtonDone} source={require('../../../assets/icon/exportDataScreen/done.png')}/>
        </TouchableOpacity>
      </View>

        {/* select all button */}
        <TouchableOpacity
            style={styles.viewAllContainer}
            onPress={() => {
                ExportDataStore.selectAll();
            }}
        >
            <TouchableOpacity
                style={[styles.viewAllCheck, {
                    backgroundColor: (ExportDataStore.isAll)? colors.PrimaryColor: '#FFFFFF',
                    borderColor: (ExportDataStore.isAll)? colors.PrimaryColor: '#CFCFCF',
                }]}
                onPress={() => {
                    ExportDataStore.selectAll();
                }}
            >
                <Image style={styles.imgAllCheck} source={require('../../../assets/icon/shoppingListItemCard/check.png')}/>
            </TouchableOpacity>

            <Text style={styles.txtAll}>Select all</Text>
            <Text style={styles.txtSelected}>Selected {ExportDataStore.getSelectedWallet().length}</Text>
        </TouchableOpacity>

      <View style={styles.viewWalletList}>
        <FlatList
            data={ExportDataStore.walletData}
            // extraData={walletIds}
            keyExtractor={item => item.wallet._id.toString()}
            renderItem={({item}) => (
                <WalletSelectItem
                    _id={item.wallet._id}
                    isCheck={item.isSelected}
                    onPress={() => {
                        ExportDataStore.itemPress(item.wallet);
                    }}
                />
            )}
            style={{width: '100%',}}
            showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  )
}

export default observer(ExportDataPickWalletScreen)