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

interface IProps {}

const ExportDataScreen: React.FC<IProps>  = () => {

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

        <Text style={styles.txtTitle}>Export Data</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            // navigation.navigate('AddGroup');
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
        <Text style={styles.txtItem}>All Wallet</Text>
        <Image style={styles.imgIcon} source={require('../../../assets/icon/menu/right.png')}/>
    </TouchableOpacity>

    <TouchableOpacity
        style={styles.viewItem}
        onPress={() => {
            navigation.navigate('ExportDataPickTime');
        }}
    >
        <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
        <Text style={styles.txtItem}>This month</Text>
        <Image style={styles.imgIcon} source={require('../../../assets/icon/menu/right.png')}/>
    </TouchableOpacity>

    <View style={styles.viewButtonGroup}>
        <Button
            content='Export Excel File'
            onPress={() => {

            }}
        />
    </View>

    </View>
  )
}

export default observer(ExportDataScreen)    