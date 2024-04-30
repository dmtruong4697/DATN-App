import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { Realm } from "realm";
import { RootStackParamList } from '../../navigator/mainNavigator';
import { getShoppingListById, getShoppingListItems } from '../../realm/services/shoppingList';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../../components/button';


interface IProps {}

const ShoppingListDetailScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const route = useRoute<RouteProp<RootStackParamList, 'ShoppingListDetail'>>();
    const {_id} = route.params;

    //add item bottom sheet
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

    const [list, setList] = useState(getShoppingListById(realm, _id));
    const [items, setItems] = useState(getShoppingListItems(realm, _id));

    const isFocus = useIsFocused();
    useEffect(() => {
        setList(getShoppingListById(realm, _id));
        setItems(getShoppingListItems(realm, _id));
    },[isFocus])

    const [name, setName] = useState('');
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{list!.name}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/groupList/add.png')}/> */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => {
            handlePresentAddModalPress();
        }}
      >
        <Text style={styles.txtButtonAdd}>+ ADD</Text>
      </TouchableOpacity>

      {
        (items.length == 0) &&
        <View style={styles.viewGroup}>
          <Image style={styles.imgShopping} source={require('../../../assets/illustration/shoppingListScreen/add-to-cart.png')}/>
          <Text style={styles.txtEmptyTitle}>Let's plan your shopping!</Text>
          <Text style={styles.txtDescription}>Tap the plus button to start adding products</Text>
        </View>
      }

      {/* add item bottom modal */}
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
                <Text style={styles.txtModalTitle}>Add a new item</Text>
                <TextInput
                  style={styles.inputName}
                  placeholder='New Item'
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
                  // handleAddShoppingList();
                }}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>

    </View>
  )
}

export default ShoppingListDetailScreen    