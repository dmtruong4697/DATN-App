import { View, Text, TouchableOpacity, Image, ImageSourcePropType, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { RealmContext } from '../../realm/models';
import { RootStackParamList } from '../../navigator/mainNavigator';
import Button from '../../components/button';
import { colors } from '../../constants/colors';
import { createGroupTransaction } from '../../services/transaction';
import { UserStore } from '../../mobx/auth';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTranslation } from 'react-i18next';

interface IProps {}

const AddGroupTransactionScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const route = useRoute<RouteProp<RootStackParamList, 'AddGroupTransaction'>>();
    const {_id} = route.params;
    const {t} = useTranslation();

    const [name, setName] = useState('');
    const [total, setTotal] = useState(0);
    const [createAt, setCreateAt] = React.useState(new Date().toISOString().slice(0, 10));
    const [createTime, setCreateTime] = useState(new Date());
    const [note, setNote] = useState('');

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
      setCreateTime(date);
      hideTimePicker();
    };

    // date time modal
    // create time
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleDateConfirm = (date: Date) => {
      setCreateAt(date.toISOString().slice(0, 10))
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

    const handleAddTransaction = async() => {
      await createGroupTransaction(
        navigation,
        UserStore.user.id!.toString(),
        _id,
        name,
        total,
        createAt,
        convertTime(createTime),
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
          <Text style={styles.txtFormItemTitle}>{t('ats-date')}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity 
            style={[styles.viewFormItem, {width: '60%'}]}
            onPress={() => {
              showDatePicker();
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
            <Text style={styles.txtTypeName}>{createAt}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.viewFormItem, {width: '35%'}]}
            onPress={() => {
              showTimePicker();
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/clock.png')}/>
            <Text style={styles.txtTypeName}>{convertTime(createTime)}</Text>
            {/* <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/> */}
          </TouchableOpacity>
          </View>
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