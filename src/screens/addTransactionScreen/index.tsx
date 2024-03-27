import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
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

  return (
  <View style={styles.viewTypeList}>
    <TouchableOpacity
      style={styles.btnAddType}
      onPress={() => {
        navigation.navigate('AddType');
      }}
    >
      <Image style={styles.imgAddTypeButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
      <Text style={styles.txtAddTypeButton}>Add Transaction Type</Text>
    </TouchableOpacity>

    <TransactionTypeCard
      _id={new Realm.BSON.ObjectId()}
      iconUrl={require('../../../assets/icon/addTransaction/addType.png')}
      income
      name='Phone Bill'
      onPress={() => {}}
    />
  </View>
)};

const IncomeRoute = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
  <View style={styles.viewTypeList}>
    <TouchableOpacity
      style={styles.btnAddType}
      onPress={() => {
        navigation.navigate('AddType');
      }}
    >
      <Image style={styles.imgAddTypeButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
      <Text style={styles.txtAddTypeButton}>Add Transaction Type</Text>
    </TouchableOpacity>
  </View>
)};

const renderScene = SceneMap({
  first: ExpensesRoute,
  second: IncomeRoute,
});

const AddTransactionScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [typeName, setTypeName] = useState<any>('Transaction Type');
    const [typeIcon, setTypeIcon] = useState<any>();
    const [total, setTotal] = useState<any>();
    const [selectedDay, setSelectedDay] = React.useState(new Date().toISOString().slice(0, 10))
    const [note, setNote] = useState<any>();
    const [walletId, setWalletId] = useState<Realm.BSON.ObjectId>();

    const {useRealm} = RealmContext;
    const realm = useRealm();

    // type bottom sheet tab
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Expenses' },
      { key: 'second', title: 'Income' },
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
      walletBottomSheetModalRef.current?.close();
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

            <Text style={styles.txtTitle}>Add Transaction</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
                // addTransaction(
                //   realm,
                //   {
                //     _id: new BSON.ObjectId(),
                //     name: 'transaction 1',
                //     income: true,
                //     total: 1234,
                //     createAt: selectedDay,
                //     transactionTypeId: new BSON.ObjectId(),
                //     walletId: new BSON.ObjectId(),
                //     note: note,
                //     imageUrl: 'example.com',
                //   }
                // )
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
          <Text style={styles.txtFormItemTitle}>TRANSACTION TYPE</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={handlePresentTypeModalPress}
          >
            <Text style={styles.txtTypeName}>{typeName}</Text>
          </TouchableOpacity>
        </View>

        {/* total */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>TOTAL</Text>
          <TextInput 
            style={styles.viewFormItem}
            keyboardType='numeric'
          />
        </View>

        {/* date */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>DATE</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={handlePresentDateModalPress}
          >
            <Text style={styles.txtTypeName}>{selectedDay}</Text>
          </TouchableOpacity>
        </View>

        {/* wallet */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>WALLET</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {
              handlePresentWalletModalPress();
            }}
          >
            <Text style={styles.txtTypeName}>Default</Text>
          </TouchableOpacity>
        </View>

        {/* note */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>NOTE</Text>
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
          content='ADD TRANSACTION'
          onPress={() => {

          }}
          containerStyle={{}}
          contentStyle={{}}
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
              <BottomSheetView style={{flex: 1}}>
                <Text>wallet</Text>
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
                  placeholder='Note here'
                />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
    </View>
  )
}

export default AddTransactionScreen    