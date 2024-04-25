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
import { Realm } from "realm";
import { CurrencyUnitData } from '../../constants/currencyUnit';
import { addShoppingList, getAllShoppingList } from '../../realm/services/shoppingList';
import ShoppingListCard from '../../components/shoppingListCard';


interface IProps {}

const ShoppingListScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    // bottom sheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '30%'], []);
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

    const [name, setName] = useState('');
    const [createAt, setCreateAt] = React.useState(new Date().toISOString().slice(0, 10));
    const [newId, setNewId] = useState(new Realm.BSON.ObjectId());
    const handleAddShoppingList = () => {
      const newList = {
        _id: newId,
        name: name,
        createAt: createAt,
        currencyUnit: CurrencyUnitData[1].code,
        note: '',
      };
  
      addShoppingList(realm, newList)
      navigation.navigate('ShoppingListDetail', {_id: newId});
    }

    let lists = getAllShoppingList(realm);

    const isFocus = useIsFocused();
    useEffect(() => {
      handleCloseModal();
      lists = getAllShoppingList(realm);
    },[isFocus])
  
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

      <View style={styles.viewList}>
        <FlatList
          data={lists}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <ShoppingListCard
              _id={item._id}
            />
          )}
          contentContainerStyle={{width: '100%', height: '100%', padding: 15, gap: 10, }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {
        (lists.length == 0) &&
        <View style={styles.viewGroup}>
          <Image style={styles.imgShopping} source={require('../../../assets/illustration/shoppingListScreen/add-to-cart.png')}/>
          <Text style={styles.txtEmptyTitle}>Let's plan your shopping!</Text>
          <Text style={styles.txtDescription}>Tap the plus button to create your first list</Text>
        </View>
      }

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
            handleIndicatorStyle={{
              backgroundColor: 'transparent',
            }}
          >
            <BottomSheetView style={styles.viewModal}>
                <Text style={styles.txtModalTitle}>Create a new list</Text>
                <TextInput
                  style={styles.inputName}
                  placeholder='New List'
                  value={name}
                  onChangeText={(text) => {setName(text)}}
                />
              <Button
                containerStyle={{
                  alignSelf: 'center',
                  height: 45,
                  borderRadius: 1000,
                }}
                content='SAVE'
                onPress={() => {
                  handleAddShoppingList();
                }}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    

    </View>
  )
}

export default ShoppingListScreen    