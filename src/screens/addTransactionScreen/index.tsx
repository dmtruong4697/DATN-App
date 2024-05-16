import { View, Text, TouchableOpacity, Image, ImageSourcePropType, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { colors } from '../../constants/colors';
import DatePicker from 'react-native-date-picker';
import { Calendar } from 'react-native-calendars';
import { Transaction } from '../../realm/models/Transaction';
import { RealmContext } from '../../realm/models';
import { addTransaction, getAllTransaction } from '../../realm/services/transactions';
import { BSON } from 'realm';
import Button from '../../components/button';
import TransactionTypeCard from '../../components/transactionTypeCard';
import { getAllTransactionType, getListTransactionType, getTransactionTypeById } from '../../realm/services/transactionType';
import { Realm } from "realm";
import { FlatList } from 'react-native-gesture-handler';
import { getAllWallet, getWalletById } from '../../realm/services/wallets';
import WalletCard from '../../components/walletCard';
import { useTranslation } from 'react-i18next';

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
      <Text style={styles.txtAddTypeButton}>{t('ats-add transaction type')}</Text>
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
      <Text style={styles.txtAddTypeButton}>{t('ats-add transaction type')}</Text>
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

const AddTransactionScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const [typeName, setTypeName] = useState(t('ats-choose type'));
    const [typeId, setTypeId] = useState<Realm.BSON.ObjectId>(new Realm.BSON.ObjectId);
    // const [typeId, setTypeId] = useState<Realm.BSON.ObjectId>(new Realm.BSON.ObjectId());
    const [typeIcon, setTypeIcon] = useState();
    const [total, setTotal] = useState<any>();
    const [selectedDay, setSelectedDay] = React.useState(new Date().toISOString().slice(0, 10));
    const [createTime, setCreateTime] = useState('createTime');
    const [note, setNote] = useState('');
    const [walletId, setWalletId] = useState<Realm.BSON.ObjectId>(getAllWallet(realm)[0]._id);
    // const [walletId, setWalletId] = useState<Realm.BSON.ObjectId>(new Realm.BSON.ObjectId());

    let wallets = getAllWallet(realm);
    const isFocus = useIsFocused();
  
    useEffect(() => {
      wallets = getAllWallet(realm);
    }, [isFocus])

    const handleAddTransaction = () => {
      const newTransaction = {
        _id: new Realm.BSON.ObjectId(),
        name: '',
        income: getTransactionTypeById(realm, typeId)!.income,
        total: Number(total),
        createAt: selectedDay,
        transactionTypeId: typeId,
        walletId: walletId,
        note: note,
        imageUrl: '',
        createTime: createTime,
      };
  
      addTransaction(realm, newTransaction);

      navigation.goBack();
    }

  // type bottom sheet tab
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: t('ats-expenses') },
    { key: 'second', title: t('ats-income') },
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

    // date bottom sheet
    const dateBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const dateSnapPoints = useMemo(() => ['25%', '60%'], []);
    const handlePresentDateModalPress = useCallback(() => {
      dateBottomSheetModalRef.current?.present();
    }, []);
  
    const handleCloseDateModal = useCallback(() => {
      dateBottomSheetModalRef.current?.close();
    }, []);
  
    const handleDateSheetChanges = useCallback((index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);
  
    const renderDateBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseDateModal}
      />,
      []
    );

    // wallet bottom sheet
    const walletBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const walletSnapPoints = useMemo(() => ['25%', '60%'], []);
    const handlePresentWalletModalPress = useCallback(() => {
      walletBottomSheetModalRef.current?.present();
    }, []);
  
    const handleCloseWalletModal = useCallback(() => {
      walletBottomSheetModalRef.current?.close();
    }, []);
  
    const handleWalletSheetChanges = useCallback((index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);
  
    const renderWalletBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseWalletModal}
      />,
      []
    );

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
              // alignItems : 'center',
              // justifyContent : 'center'
            }}
          >
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {navigation.goBack()}}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/back.png')}/>
            </TouchableOpacity>

            <Text style={styles.txtTitle}>{t('ats-add transaction title')}</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
                // console.log(getAllTransaction(realm));
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
          <Text style={styles.txtFormItemTitle}>{t('ats-transaction type')}</Text>
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
          <Text style={styles.txtFormItemTitle}>{t('ats-total')}</Text>
          <View style={[styles.viewFormItem, {padding: 0,}]}>
            <Text style={styles.txtCode}>{getWalletById(realm, walletId)?.currencyUnit}</Text>
            <TextInput 
              style={[styles.txtTypeName, {flex: 1}]}
              keyboardType='numeric'
              onChangeText={(text) => {setTotal(text)}}
            />
          </View>
        </View>

        {/* date */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ats-date')}</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={handlePresentDateModalPress}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
            <Text style={styles.txtTypeName}>{selectedDay}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>

        {/* wallet */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ats-wallet')}</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {
              handlePresentWalletModalPress();
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/wallet.png')}/>
            <Text style={styles.txtTypeName}>{getWalletById(realm, walletId)?.name}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>

        {/* note */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ats-note')}</Text>
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
          content={t('ats-add transaction button')}
          onPress={() => {
            handleAddTransaction();
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

        {/* modal pick transaction date */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={dateBottomSheetModalRef}
              index={1}
              snapPoints={dateSnapPoints}
              onChange={handleDateSheetChanges}
              backdropComponent={renderDateBackdrop}
            >
              <BottomSheetView style={{flex: 1}}>
              <Calendar
                initialDate={selectedDay}
                minDate={'2002-03-02'}
                maxDate={'2102-03-02'}
                onDayPress={day => {
                  setSelectedDay(day.dateString);
                  console.log('selected day', day);
                  handleCloseDateModal();
                }}
                markedDates={{
                  [selectedDay]: {selected: true, selectedColor: colors.PrimaryColor, },
                }}
                onDayLongPress={day => {
                  console.log('selected day', day);
                }}
                monthFormat={'yyyy MM'}
                // onMonthChange={month => {
                //   console.log('month changed', month);
                // }}
                // hideArrows={true}
                hideExtraDays={true}
                disableMonthChange={true}
                firstDay={1}
                // hideDayNames={true}
                showWeekNumbers={true}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                // disableArrowLeft={true}
                // disableArrowRight={true}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
              />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>

        {/* modal pick transaction wallet */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={walletBottomSheetModalRef}
              index={1}
              snapPoints={walletSnapPoints}
              onChange={handleWalletSheetChanges}
              backdropComponent={renderWalletBackdrop}
            >
              <BottomSheetView style={{flex: 1, padding: 10,}}>
                <TouchableOpacity
                  style={styles.btnAddType}
                  onPress={() => {
                    navigation.navigate('AddWallet');
                  }}
                >
                  <Image style={styles.imgAddTypeButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
                  <Text style={styles.txtAddTypeButton}>{t('ats-add wallet')}</Text>
                </TouchableOpacity>

                <FlatList
                  data={wallets}
                  keyExtractor={item => item._id.toString()}
                  renderItem={({item}) => (
                    <WalletCard
                      _id={item._id}
                      balance={item.balance}
                      currencyUnit={item.currencyUnit}
                      name={item.name}
                      onPress={() => {
                        setWalletId(item._id);
                        handleCloseWalletModal();
                      }}
                    />
                  )}
                  style={{width: '100%',}}
                  showsVerticalScrollIndicator={false}
                />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>

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
                  placeholder={t('ats-note here')}
                />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
    </View>
    </FormContext.Provider>
  )
}

export default AddTransactionScreen    