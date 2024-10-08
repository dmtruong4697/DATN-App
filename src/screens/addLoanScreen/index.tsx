import { View, Text, TouchableOpacity, Image, ImageSourcePropType, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { colors } from '../../constants/colors';
import { RealmContext } from '../../realm/models';
import Button from '../../components/button';
import { Realm } from "realm";
import { FlatList } from 'react-native-gesture-handler';
import { getAllWallet, getWalletById } from '../../realm/services/wallets';
import WalletCard from '../../components/walletCard';
import { addLoan, getAllLoan } from '../../realm/services/loan';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

const AddLoanScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const [total, setTotal] = useState<any>();
    const [selectedDay, setSelectedDay] = React.useState(new Date().toISOString().slice(0, 10));
    const [people, setPeople] = useState('');
    const [walletId, setWalletId] = useState<Realm.BSON.ObjectId>(getAllWallet(realm)[0]._id);
    const [isLoan, setIsLoan] = useState(true);
    const [interest, setInterest] = useState(0);
    const [cycle, setCycle] = useState('Month');
    const [note, setNote] = useState('');

    let wallets = getAllWallet(realm);
    const isFocus = useIsFocused();
  
    useEffect(() => {
      wallets = getAllWallet(realm);
    }, [isFocus])

    const handleAddLoan = () => {
      const newLoan = {
        _id: new Realm.BSON.ObjectId,
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

      addLoan(realm, newLoan);
      navigation.goBack();
    }

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

            <Text style={styles.txtTitle}>{t('als-add loan title')}</Text>
            
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
          <Text style={styles.txtFormItemTitle}>{t('als-total')}</Text>
          <View style={[styles.viewFormItem, {padding: 0,}]}>
            <Text style={styles.txtCode}>{getWalletById(realm, walletId)?.currencyUnit}</Text>
            <TextInput 
              style={[styles.txtTypeName, {flex: 1}]}
              keyboardType='numeric'
              onChangeText={(text) => {setTotal(text)}}
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
            <Text style={styles.txtRadioItem}>{t('als-loan')}</Text>
          </View>

          {/* debt */}
          <View style={styles.viewRadioItem}>
            <TouchableOpacity
              style={styles.btnRadioItem}
              onPress={() => {setIsLoan(false)}}
            >
              {!isLoan && <View style={styles.btnSelectedItem}/>}
            </TouchableOpacity>
            <Text style={styles.txtRadioItem}>{t('als-debt')}</Text>
          </View>
        </View>

        {/* date */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('als-date')}</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {
              showDatePicker()
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
            <Text style={styles.txtTypeName}>{selectedDay}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>

        {/* wallet */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('als-wallet')}</Text>
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
          <Text style={styles.txtFormItemTitle}>{t('als-people')}</Text>
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
          content={t('als-add loan button')}
          onPress={() => {
            handleAddLoan();
          }}
        />
      </View>

        {/* create time modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          // date={new Date()}
        />

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

export default AddLoanScreen    