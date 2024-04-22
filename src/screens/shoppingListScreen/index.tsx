import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GroupCard from '../../components/groupCard';
import { getGroupList } from '../../services/group';
import { RealmContext } from '../../realm/models';
import { getAllWallet } from '../../realm/services/wallets';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../../components/button';

interface IProps {}

const ShoppingListScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    // bottom sheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['35%', '40%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    
    const handleCloseModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);
    
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    
    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseModal}
        />,
        []
    );
    
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Shopping Lists</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
          }}
        >
          <Image style={styles.imgButtonAdd} source={require('../../../assets/icon/groupList/add.png')}/>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.viewList}>

      </View> */}

      <View style={styles.viewGroup}>
        <Image style={styles.imgShopping} source={require('../../../assets/illustration/shoppingListScreen/add-to-cart.png')}/>
        <Text style={styles.txtEmptyTitle}>Let's plan your shopping!</Text>
        <Text style={styles.txtDescription}>Tap the plus button to create your first list</Text>
      </View>

      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => {
            handlePresentModalPress();
        }}
      >
        <Text style={styles.txtButtonAdd}>+ NEW LIST</Text>
      </TouchableOpacity>

    {/* bottom modal */}
    <BottomSheetModalProvider>
        <View style={{}}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
          >
            <BottomSheetView style={{flex: 1}}>
                <Text>text</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    

    </View>
  )
}

export default ShoppingListScreen    