import { View, Text, TouchableOpacity, Image, ImageSourcePropType, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
import { Calendar } from 'react-native-calendars';
import { RealmContext } from '../../realm/models';
import Button from '../../components/button';
import { Realm } from "realm";
import { FlatList } from 'react-native-gesture-handler';
import { getAllWallet, getWalletById } from '../../realm/services/wallets';
import WalletCard from '../../components/walletCard';
import { addLoan, getAllLoan, getLoanById, updateLoanById } from '../../realm/services/loan';
import { RootStackParamList } from '../../navigator/mainNavigator';

const FormContext = createContext<any>(null);

interface IProps {}

type LoanType = {
    _id: Realm.BSON.ObjectId;
    name: string,
    total: number,
    isLoan: boolean,
    createAt: string,
    walletId: Realm.BSON.ObjectID,
    people:string,
    interest:number,
    cycle: string,
    note: string,
    imageUrl: string,
}

const EditLoanScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const route = useRoute<RouteProp<RootStackParamList, 'LoanDetail'>>();
    const {_id} = route.params;

    let loan = getLoanById(realm, _id);
    let wallet = getWalletById(realm, loan!.walletId);

    const [total, setTotal] = useState(loan!.total);
    const [selectedDay, setSelectedDay] = React.useState(loan!.createAt);
    const [people, setPeople] = useState(loan!.people);
    const [walletId, setWalletId] = useState(loan!.walletId);
    const [isLoan, setIsLoan] = useState(loan!.isLoan);
    const [interest, setInterest] = useState(loan!.interest);
    const [cycle, setCycle] = useState(loan!.cycle);
    const [note, setNote] = useState(loan!.note);

    let wallets = getAllWallet(realm);
    const isFocus = useIsFocused();
  
    useEffect(() => {
      wallets = getAllWallet(realm);
    }, [isFocus])

    const handleUpdateLoan = () => {
      const updatedLoan = {
        _id: _id,
        name: '', 
        total: Number(total),
        isLoan: isLoan,
        createAt: selectedDay,
        walletId: walletId,
        people: people,
        interest: Number(interest),
        cycle: cycle,
        note: note,
        imageUrl: '',
      };

      updateLoanById(realm, _id, updatedLoan);
      navigation.goBack();
    }

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
            }}
          >
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {navigation.goBack()}}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/back.png')}/>
            </TouchableOpacity>

            <Text style={styles.txtTitle}>Add Loan/Debt</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
                console.log(getAllLoan(realm));
              }}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/option.png')}/>
            </TouchableOpacity>
          </View>
        </View>


      </View>

      <View style={styles.viewFormContainer}>

        {/* total */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>TOTAL</Text>
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

        {/* income */}
        <View style={styles.viewRadioGroup}>
          {/* loan */}
          <View style={styles.viewRadioItem}>
            <TouchableOpacity
              style={styles.btnRadioItem}
              onPress={() => {setIsLoan(true)}}
            >
              {isLoan && <View style={styles.btnSelectedItem}/>}
            </TouchableOpacity>
            <Text style={styles.txtRadioItem}>Loan</Text>
          </View>

          {/* debt */}
          <View style={styles.viewRadioItem}>
            <TouchableOpacity
              style={styles.btnRadioItem}
              onPress={() => {setIsLoan(false)}}
            >
              {!isLoan && <View style={styles.btnSelectedItem}/>}
            </TouchableOpacity>
            <Text style={styles.txtRadioItem}>Debt</Text>
          </View>
        </View>

        {/* date */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>DATE</Text>
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
          <Text style={styles.txtFormItemTitle}>WALLET</Text>
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
          <Text style={styles.txtFormItemTitle}>PEOPLE</Text>
          <TouchableOpacity
            style={styles.viewFormItem}
            onPress={() => {
              handlePresentNoteModalPress();
            }}
          >
            <Text style={styles.txtTypeName}>{people}</Text>
          </TouchableOpacity>
        </View>

        <Button
          content='SUBMIT'
          onPress={() => {
            handleUpdateLoan();
          }}
        />
      </View>

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
                hideExtraDays={true}
                disableMonthChange={true}
                firstDay={1}
                showWeekNumbers={true}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
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
                  <Text style={styles.txtAddTypeButton}>Add Wallet</Text>
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
                  value={people}
                  style={{color: '#666666', fontWeight: '400', fontSize: 16,}}
                  onChangeText={(text) => {setPeople(text)}}
                  multiline
                  placeholder='note here ...'
                />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
    </View>
  )
}

export default EditLoanScreen    