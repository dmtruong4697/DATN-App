import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { styles } from './styles';
import {
  ParamListBase,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { Realm } from 'realm';
import { RootStackParamList } from '../../navigator/mainNavigator';
import {
  addShoppingListItem,
  getShoppingListById,
  getShoppingListItems,
} from '../../realm/services/shoppingList';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Button from '../../components/button';
import ShoppingListItemCard from '../../components/shoppingListItemCard';
import { useTranslation } from 'react-i18next';

interface IProps {}

const ShoppingListDetailScreen: React.FC<IProps> = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { useRealm } = RealmContext;
  const realm = useRealm();
  const { t } = useTranslation();

  const route = useRoute<RouteProp<RootStackParamList, 'ShoppingListDetail'>>();
  const { _id } = route.params;

  // add item bottom sheet
  const bottomSheetAddModalRef = useRef<BottomSheetModal>(null);
  const addSnapPoints = useMemo(() => ['25%', '30%'], []);
  const handlePresentAddModalPress = useCallback(() => {
    bottomSheetAddModalRef.current?.present();
  }, []);

  const handleCloseAddModal = useCallback(() => {
    bottomSheetAddModalRef.current?.close();
  }, []);

  const renderAddBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseAddModal}
      />
    ),
    []
  );

  const [list, setList] = useState(getShoppingListById(realm, _id));
  const [items, setItems] = useState(getShoppingListItems(realm, _id));

  const isFocus = useIsFocused();
  useEffect(() => {
    setList(getShoppingListById(realm, _id));
    setItems(getShoppingListItems(realm, _id));
  }, [isFocus]);

  const [name, setName] = useState('');
  const [createAt, setCreateAt] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleAddShoppingListItem = () => {
    const newItem = {
      _id: new Realm.BSON.ObjectId(),
      name: name,
      createAt: createAt,
      note: '',
      quantity: 0,
      unit: '',
      price: 0,
      iconUrl: '',
      isDone: false,
      listId: _id,
    };

    addShoppingListItem(realm, newItem);
    setName('');
    setItems(getShoppingListItems(realm, _id));
    // handleCloseAddModal();
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={styles.imgButtonBack}
            source={require('../../../assets/icon/transaction/back.png')}
          />
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{list?.name}</Text>

        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {}}
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
        <Text style={styles.txtButtonAdd}>+ {t('slds-add')}</Text>
      </TouchableOpacity>

      {items.length !== 0 ? (
        <View style={styles.viewList}>
          <FlatList
            data={items}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <ShoppingListItemCard _id={item._id} />
            )}
            contentContainerStyle={{ width: '100%', padding: 15, gap: 10 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.viewGroup}>
          <Image
            style={styles.imgShopping}
            source={require('../../../assets/illustration/shoppingListScreen/add-to-cart.png')}
          />
          <Text style={styles.txtEmptyTitle}>{t('slds-let plan')}</Text>
          <Text style={styles.txtDescription}>{t('slds-tap')}</Text>
        </View>
      )}

      {/* add item bottom modal */}
      <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            ref={bottomSheetAddModalRef}
            index={1}
            snapPoints={addSnapPoints}
            onChange={() => {}}
            backdropComponent={renderAddBackdrop}
            handleIndicatorStyle={{
              backgroundColor: 'transparent',
            }}
          >
            <BottomSheetView style={styles.viewModal}>
              <Text style={styles.txtModalTitle}>{t('slds-add a new item')}</Text>
              <TextInput
                style={styles.inputName}
                placeholder={t('slds-new item')}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
              <Button
                containerStyle={{
                  alignSelf: 'center',
                  height: 45,
                  borderRadius: 1000,
                }}
                content={t('slds-save')}
                onPress={() => {
                  handleAddShoppingListItem();
                  // handleCloseAddModal();
                }}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
};

export default ShoppingListDetailScreen;