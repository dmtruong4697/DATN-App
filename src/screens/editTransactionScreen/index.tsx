import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import TransactionTypeCard from '../../components/transactionTypeCard';
import { RealmContext } from '../../realm/models';
import { getListTransactionType, getTransactionTypeById } from '../../realm/services/transactionType';
import { getTransactionById, updateTransactionById } from '../../realm/services/transactions';
import { getAllWallet, getWalletById } from '../../realm/services/wallets';
import { Realm } from "realm";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../../components/button';
import { colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface IProps {}

const FormContext = createContext<any>(null);

interface IProps {}

type TransactionType = {
  _id: Realm.BSON.ObjectId;
  name: string;
  income: boolean;
  total: number;
  createAt: string;
  transactionTypeId: Realm.BSON.ObjectID;
  walletId: Realm.BSON.ObjectID;
  note: string;
  imageUrl: string;
}

const ExpensesRoute = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {useRealm} = RealmContext;
  const realm = useRealm();
  const {t} = useTranslation();
  const {typeName, typeId, setTypeId, setTypeName, typeIcon, setTypeIcon, handleCloseTypeModal} = useContext(FormContext);

  let transactionTypes = getListTransactionType(realm, false);
  const isFocus = useIsFocused();

  useEffect(() => {
    transactionTypes = getListTransactionType(realm, false);
  }, [isFocus])

  return (
  <View style={styles.viewTypeList}>
    <TouchableOpacity
      style={styles.btnAddType}
      onPress={() => {
        navigation.navigate('AddType');
      }}
    >
      <Image style={styles.imgAddTypeButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
      <Text style={styles.txtAddTypeButton}>{t('ets-add transaction type')}</Text>
    </TouchableOpacity>

    <FlatList
      data={transactionTypes}
      keyExtractor={item => item._id.toString()}
      renderItem={({item}) => (
        <TransactionTypeCard
          _id={item._id}
          iconUrl={item.iconUrl}
          name={item.name}
          income={item.income}
          onPress={() => {
            setTypeId(item._id)
            setTypeName(item.name);
            setTypeIcon(item.iconUrl);
            handleCloseTypeModal();
          }}
        />
      )}
      style={{width: '100%',}}
      showsVerticalScrollIndicator={false}
    />
  </View>
)};

const IncomeRoute = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {useRealm} = RealmContext;
  const realm = useRealm();
  const {t} = useTranslation();
  const {typeName, typeId, setTypeId, setTypeName, typeIcon, setTypeIcon, handleCloseTypeModal} = useContext(FormContext);

  let transactionTypes = getListTransactionType(realm, true);
  const isFocus = useIsFocused();

  useEffect(() => {
    transactionTypes = getListTransactionType(realm, true);
  }, [isFocus])

  return (
  <View style={styles.viewTypeList}>
    <TouchableOpacity
      style={styles.btnAddType}
      onPress={() => {
        navigation.navigate('AddType');
      }}
    >
      <Image style={styles.imgAddTypeButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
      <Text style={styles.txtAddTypeButton}>{t('ets-add transaction type')}</Text>
    </TouchableOpacity>

    <FlatList
      data={transactionTypes}
      keyExtractor={item => item._id.toString()}
      renderItem={({item}) => (
        <TransactionTypeCard
          _id={item._id}
          iconUrl={item.iconUrl}
          name={item.name}
          income={item.income}
          onPress={() => {
            setTypeId(item._id);
            setTypeName(item.name);
            setTypeIcon(item.iconUrl);
            handleCloseTypeModal();
          }}
        />
      )}
      style={{width: '100%',}}
      showsVerticalScrollIndicator={false}
    />
  </View>
)};

const renderScene = SceneMap({
  first: ExpensesRoute,
  second: IncomeRoute,
});

const EditTransactionScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {t} = useTranslation();

    const route = useRoute<RouteProp<RootStackParamList, 'EditTransaction'>>();
    const {_id} = route.params;

    const {useRealm} = RealmContext;
    const realm = useRealm();
    const transaction = getTransactionById(realm, _id);
    
    const [typeName, setTypeName] = useState(t('ets-choose type'));
    const [typeId, setTypeId] = useState<Realm.BSON.ObjectId>(transaction!.transactionTypeId);
    const [typeIcon, setTypeIcon] = useState();
    const [total, setTotal] = useState(transaction!.total);
    const [selectedDay, setSelectedDay] = React.useState(transaction!.createAt);
    const [createTime, setCreateTime] = useState(transaction!.createTime);
    const [note, setNote] = useState(transaction!.note);
    const [walletId, setWalletId] = useState<Realm.BSON.ObjectId>(transaction!.walletId);

    let wallets = getAllWallet(realm);
    const isFocus = useIsFocused();
  
    useEffect(() => {
      wallets = getAllWallet(realm);
    }, [isFocus])

    const handleUpdateTransaction = () => {
      const updatedTransaction = {
        _id: transaction!._id,
        name: '',
        income: getTransactionTypeById(realm, typeId)!.income,
        total: Number(total),
        createAt: selectedDay,
        transactionTypeId: typeId,
        walletId: transaction!.walletId,
        note: note,
        imageUrl: '',
        createTime: createTime,
      };
  
      updateTransactionById(realm, _id, updatedTransaction);

      navigation.goBack();
    }

    // type bottom sheet tab
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: t('ets-expenses') },
      { key: 'second', title: t('ets-income') },
    ]);

    // type bottom sheet
    const typeBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const typeSnapPoints = useMemo(() => ['25%', '70%'], []);
    const handlePresentTypeModalPress = useCallback(() => {
      typeBottomSheetModalRef.current?.present();
    }, []);

    const handleCloseTypeModal = useCallback(() => {
      typeBottomSheetModalRef.current?.close();
    }, []);

    const handleTypeSheetChanges = useCallback((index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);

    const renderTypeBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseTypeModal}
      />,
      []
    );

    // date time modal
    // create time
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
    const handleTimeConfirm = (date: Date) => {
      // console.warn("A date has been picked: ", date);
      setCreateTime(convertTime(date));
      hideTimePicker();
    };

    // date time modal
    // create date
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleDateConfirm = (date: Date) => {
      setSelectedDay(date.toISOString().slice(0, 10))
      hideDatePicker();
    };

    function convertTime(isoDate: Date) {
      let date = new Date(isoDate);
  
      date.setHours(date.getHours() + 0);
  
      let hours = date.getHours();
      let minutes = date.getMinutes().toString();
  
      if (Number(minutes) < 10) {
          minutes = '0' + minutes;
      }
  
      let timeString = `${hours}:${minutes}`;
  
      return timeString;
  }

    // note bottom sheet
    const noteBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const noteSnapPoints = useMemo(() => ['25%', '60%'], []);
    const handlePresentNoteModalPress = useCallback(() => {
      noteBottomSheetModalRef.current?.present();
    }, []);
  
    const handleCloseNoteModal = useCallback(() => {
      noteBottomSheetModalRef.current?.close();
    }, []);
  
    const handleNoteSheetChanges = useCallback((index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);
  
    const renderNoteBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseNoteModal}
      />,
      []
    );

  return (
    <FormContext.Provider value={{typeName, typeId, setTypeId, setTypeName, typeIcon, setTypeIcon, walletId, setWalletId, handleCloseTypeModal}}>
    <View style={styles.viewContainer}>
      <View style={styles.viewTopContainer}>
        <View style={styles.viewHeaderBar}>
          <View
            style={{
              flex : 1,
              transform : [ { scaleX : 0.5 } ],
              flexDirection: 'row',
              padding: 15,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {navigation.goBack()}}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/back.png')}/>
            </TouchableOpacity>

            <Text style={styles.txtTitle}>{t('ets-update transaction title')}</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
              }}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/option.png')}/>
            </TouchableOpacity>
          </View>
        </View>


      </View>

      <View style={styles.viewFormContainer}>
        {/* transaction type */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ets-transaction type')}</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={handlePresentTypeModalPress}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/type.png')}/>
            <Text style={styles.txtTypeName}>{typeName}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>

        {/* total */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ets-total')}</Text>
          <View style={[styles.viewFormItem, {padding: 0,}]}>
            <Text style={styles.txtCode}>{getWalletById(realm, walletId)?.currencyUnit}</Text>
            <TextInput 
              style={[styles.txtTypeName, {flex: 1}]}
              keyboardType='numeric'
              onChangeText={(text) => {setTotal(Number(text))}}
              value={total.toString()}
            />
          </View>
        </View>

        {/* date */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ats-date')}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity 
            style={[styles.viewFormItem, {width: '60%'}]}
            onPress={() => {
              showDatePicker();
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
            <Text style={styles.txtTypeName}>{selectedDay}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.viewFormItem, {width: '35%'}]}
            onPress={() => {
              showTimePicker();
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/clock.png')}/>
            <Text style={styles.txtTypeName}>{createTime}</Text>
            {/* <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/> */}
          </TouchableOpacity>
          </View>
        </View>

        {/* wallet */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ets-wallet')}</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {
              // handlePresentWalletModalPress();
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/wallet.png')}/>
            <Text style={styles.txtTypeName}>{getWalletById(realm, walletId)?.name}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>

        {/* note */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ets-note')}</Text>
          <TouchableOpacity
            style={styles.viewFormItem}
            onPress={() => {
              handlePresentNoteModalPress();
            }}
          >
            <Text style={styles.txtTypeName}>{note}</Text>
          </TouchableOpacity>
        </View>

        <Button
          content={t('ets-update transaction button')}
          onPress={() => {
            handleUpdateTransaction();
          }}
        />
      </View>


        {/* modal pick transaction type */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={typeBottomSheetModalRef}
              index={1}
              snapPoints={typeSnapPoints}
              onChange={handleTypeSheetChanges}
              backdropComponent={renderTypeBackdrop}
            >
              <BottomSheetView style={{flex: 1}}>
                <TabView
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  renderTabBar={props =>
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: colors.PrimaryColor, }}
                        style={{ backgroundColor: '#FFFFFF',}}
                        labelStyle={{ textTransform: 'capitalize', fontSize: 14, fontWeight: '700', color: '#A5A7B9' }}
                        activeColor={colors.PrimaryColor}
                  />
                  }
                />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>

        {/* create time modal */}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode='time'
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />

        {/* create time modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          // date={new Date()}
        />

        {/* modal note */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={noteBottomSheetModalRef}
              index={1}
              snapPoints={noteSnapPoints}
              onChange={handleNoteSheetChanges}
              backdropComponent={renderNoteBackdrop}
            >
              <BottomSheetView style={{flex: 1}}>
                <TextInput
                  value={note}
                  style={{color: '#666666', fontWeight: '400', fontSize: 16,}}
                  onChangeText={(text) => {setNote(text)}}
                  multiline
                  placeholder={t('ets-note here')}
                />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
    </View>
    </FormContext.Provider>
  )
}

export default EditTransactionScreen    