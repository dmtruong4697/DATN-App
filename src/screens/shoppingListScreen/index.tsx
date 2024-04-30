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
import { addShoppingList, deleteShoppingListById, getAllShoppingList, getShoppingListById, updateShoppingListNameById } from '../../realm/services/shoppingList';
import ShoppingListCard from '../../components/shoppingListCard';
import { colors } from '../../constants/colors';


interface IProps {}

const ShoppingListScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    //add list bottom sheet
    const bottomSheetAddModalRef = useRef<BottomSheetModal>(null);
    const addSnapPoints = useMemo(() => ['25%', '30%'], []);
    const handlePresentAddModalPress = useCallback(() => {
        bottomSheetAddModalRef.current?.present();
    }, []);
    
    const handleCloseAddModal = useCallback(() => {
        bottomSheetAddModalRef.current?.close();
    }, []);
    
    const handleAddSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    
    const renderAddBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseAddModal}
        />,
        []
    );

    //option bottom sheet
    const bottomSheetOptionModalRef = useRef<BottomSheetModal>(null);
    const optionSnapPoints = useMemo(() => ['25%', '30%'], []);
    const handlePresentOptionModalPress = useCallback(() => {
        bottomSheetOptionModalRef.current?.present();
    }, []);
    
    const handleCloseOptionModal = useCallback(() => {
        bottomSheetOptionModalRef.current?.close();
    }, []);
    
    const handleOptionSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    
    const renderOptionBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseOptionModal}
        />,
        []
    );

    //rename list bottom sheet
    const bottomSheetRenameModalRef = useRef<BottomSheetModal>(null);
    const renameSnapPoints = useMemo(() => ['25%', '35%'], []);
    const handlePresentRenameModalPress = useCallback(() => {
        bottomSheetRenameModalRef.current?.present();
    }, []);
    
    const handleCloseRenameModal = useCallback(() => {
        bottomSheetRenameModalRef.current?.close();
    }, []);
    
    const handleRenameSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    
    const renderRenameBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseRenameModal}
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
  
      addShoppingList(realm, newList);
      setName('');
      setNewId(new Realm.BSON.ObjectId());
      navigation.navigate('ShoppingListDetail', {_id: newId});
    }

    const [lists, setLists] = useState(getAllShoppingList(realm));
    const [sellectedList, setSellectedList] = useState(new Realm.BSON.ObjectId);
    const [newName, setNewName] = useState('');

    const isFocus = useIsFocused();
    useEffect(() => {
      handleCloseAddModal();
      setLists(getAllShoppingList(realm));
    },[isFocus])

    const handleDelete = () => {
      deleteShoppingListById(realm, sellectedList);
      setLists(getAllShoppingList(realm));
      handleCloseOptionModal();
      setSellectedList(new Realm.BSON.ObjectId);
    }

    const handleUpdate = () => {
      updateShoppingListNameById(realm, sellectedList, newName);
      handleCloseRenameModal();
      setLists(getAllShoppingList(realm));
    }
  
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
      
      {
        (lists.length != 0) &&
        <View style={styles.viewList}>
          <FlatList
            data={lists}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => (
              <ShoppingListCard
                _id={item._id}
                onPressOption={() => {
                  setSellectedList(item._id);
                  setNewName(item.name);
                  handlePresentOptionModalPress();
                }}
              />
            )}
            contentContainerStyle={{width: '100%', height: '100%', padding: 15, gap: 10, }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      }

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
            handlePresentAddModalPress();
        }}
      >
        <Text style={styles.txtButtonAdd}>+ NEW LIST</Text>
      </TouchableOpacity>

    {/* add list bottom modal */}
    <BottomSheetModalProvider>
      <View style={{}}>
        <BottomSheetModal
          ref={bottomSheetAddModalRef}
          index={1}
          snapPoints={addSnapPoints}
          onChange={handleAddSheetChanges}
          backdropComponent={renderAddBackdrop}
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

    {/* rename bottom modal */}
    <BottomSheetModalProvider>
      <View style={{}}>
        <BottomSheetModal
          ref={bottomSheetRenameModalRef}
          index={1}
          snapPoints={renameSnapPoints}
          onChange={handleRenameSheetChanges}
          backdropComponent={renderRenameBackdrop}
          handleIndicatorStyle={{
            backgroundColor: 'transparent',
          }}
        >
          <BottomSheetView style={styles.viewModal}>
              <Text style={styles.txtModalTitle}>Rename list</Text>
              <TextInput
                style={styles.inputName}
                // placeholder='New List'
                value={newName}
                onChangeText={(text) => {setNewName(text)}}
              />
            <Button
              containerStyle={{
                alignSelf: 'center',
                height: 45,
                borderRadius: 1000,
              }}
              content='SAVE'
              onPress={() => {
                handleUpdate();
              }}
            />
            <Button
              containerStyle={{
                alignSelf: 'center',
                height: 45,
                borderRadius: 1000,
                backgroundColor: 'transparent',
              }}
              contentStyle={{
                color: '#555555',
              }}
              content='CANCEL'
              onPress={() => {
                handleCloseRenameModal();
              }}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>

    {/* bottom option modal */}
    <BottomSheetModalProvider>
        <View style={{}}>
          <BottomSheetModal
            ref={bottomSheetOptionModalRef}
            index={1}
            snapPoints={optionSnapPoints}
            onChange={handleOptionSheetChanges}
            backdropComponent={renderOptionBackdrop}
            handleIndicatorStyle={{
              backgroundColor: 'transparent',
            }}
          >
            <BottomSheetView style={styles.viewModal}>
              <Text style={styles.txtModalTitle}>Manage List</Text>
              {/* rename */}
              <TouchableOpacity
                style={styles.btnOption}
                onPress={() => {
                  handleCloseOptionModal();
                  handlePresentRenameModalPress();
                }}
              >
                <Image style={styles.imgOptionIcon} source={require('../../../assets/icon/shoppingListScreen/edit.png')}/>
                <Text style={styles.txtOptionButton}>Rename</Text>
              </TouchableOpacity>

              {/* delete */}
              <TouchableOpacity
                style={styles.btnOption}
                onPress={() => {
                  handleDelete();
                }}
              >
                <Image style={[styles.imgOptionIcon]} source={require('../../../assets/icon/shoppingListScreen/delete.png')}/>
                <Text style={[styles.txtOptionButton, {color: '#CD3131'}]}>Delete</Text>
              </TouchableOpacity>

            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>

    </View>
  )
}

export default ShoppingListScreen    