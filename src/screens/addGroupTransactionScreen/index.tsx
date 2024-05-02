import { View, Text, TouchableOpacity, Image, ImageSourcePropType, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { RealmContext } from '../../realm/models';
import { RootStackParamList } from '../../navigator/mainNavigator';
import Button from '../../components/button';
import { Calendar } from 'react-native-calendars';
import { colors } from '../../constants/colors';
import { createGroupTransaction } from '../../services/transaction';
import { UserStore } from '../../mobx/auth';

interface IProps {}

const AddGroupTransactionScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const route = useRoute<RouteProp<RootStackParamList, 'AddGroupTransaction'>>();
    const {_id} = route.params;

    const [name, setName] = useState('');
    const [total, setTotal] = useState(0);
    const [createAt, setCreateAt] = useState(new Date().toISOString());
    const [note, setNote] = useState('');

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

    const handleAddTransaction = async() => {
      await createGroupTransaction(
        navigation,
        UserStore.user.id!.toString(),
        _id,
        name,
        total,
        createAt,
        note,
        '',
      );
    }

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

            <Text style={styles.txtTitle}>Add Group Transaction</Text>
            
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
        {/* name */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>NAME</Text>
          <View style={[styles.viewFormItem, {padding: 0,}]}>
            <TextInput 
              style={[styles.txtTypeName, {flex: 1}]}
              onChangeText={(text) => {setName(text)}}
            />
          </View>
        </View>

        {/* total */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>TOTAL</Text>
          <View style={[styles.viewFormItem, {padding: 0,}]}>
            {/* <Text style={styles.txtCode}>{getWalletById(realm, walletId)?.currencyUnit}</Text> */}
            <TextInput 
              style={[styles.txtTypeName, {flex: 1}]}
              keyboardType='numeric'
              onChangeText={(text) => {setTotal(Number(text))}}
            />
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
            <Text style={styles.txtTypeName}>{createAt}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
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
            handleAddTransaction();
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
              initialDate={createAt}
              minDate={'2002-03-02'}
              maxDate={'2102-03-02'}
              onDayPress={day => {
                setCreateAt(day.dateString);
                console.log('selected day', day);
                handleCloseDateModal();
              }}
              markedDates={{
                [createAt]: {selected: true, selectedColor: colors.PrimaryColor, },
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
                placeholder='note here ...'
              />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>

    </View>
  )
}

export default AddGroupTransactionScreen    