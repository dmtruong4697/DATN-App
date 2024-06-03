import { View, Text, TouchableOpacity, Image, TextInput, ImageSourcePropType } from 'react-native'
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../components/button';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { TransactionType } from '../../realm/models/TransactionType';
import { Realm } from "realm";
import { addTransactionType, getAllTransactionType } from '../../realm/services/transactionType';
import { RealmContext } from '../../realm/models';
import { FlatList } from 'react-native-gesture-handler';
import { TransactionTypeIconData } from '../../constants/transactionTypeIcon';
import TransactionTypeIcon from '../../components/transactionTypeIcon';
import { RangeContext } from '../../navigator/mainNavigator';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface IProps {}

type TransactionTypeType = {
  _id: Realm.BSON.ObjectId;
  name: string;
  income: boolean;
  iconUrl: string;
}

const AddTypeScreen: React.FC<IProps> = () => {

  const {useRealm} = RealmContext;
  const realm = useRealm();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {startTime, setStartTime, finishTime, setFinishTime, inputType, setInputType, tabData, setTabData} = useContext(RangeContext);

      // date time modal
    // start date
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);

    const showStartDatePicker = () => {
      setStartDatePickerVisibility(true);
    };
  
    const hideStartDatePicker = () => {
      setStartDatePickerVisibility(false);
    };
  
    const handleStartDateConfirm = (date: Date) => {
      setStartTime(date.toISOString().slice(0, 10));
      hideStartDatePicker();
    };

    // date time modal
    // finish date
    const [isFinishDatePickerVisible, setFinishDatePickerVisibility] = useState(false);

    const showFinishDatePicker = () => {
      setFinishDatePickerVisibility(true);
    };
  
    const hideFinishDatePicker = () => {
      setFinishDatePickerVisibility(false);
    };
  
    const handleFinishDateConfirm = (date: Date) => {
      setFinishTime(date.toISOString().slice(0, 10));
      hideFinishDatePicker();
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

            <Text style={styles.txtTitle}>Select time range</Text>
            
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
        {/* start time */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>START TIME</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {
                showStartDatePicker();
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
            <Text style={styles.txtTypeName}>{startTime}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>

        {/* finish time */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>FINISH TIME</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {
                showFinishDatePicker();
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
            <Text style={styles.txtTypeName}>{finishTime}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>


        <Button
          content='SUBMIT'
          onPress={() => {
            setTabData([{
                id: '1',
                startTime: startTime,
                finishTime: finishTime,
                name: startTime + ' ~ ' + finishTime,
            }]);
            navigation.goBack();
          }}
        />

        <Button
          content='CANCEL'
          onPress={() => {
            navigation.goBack();
          }}
          containerStyle={{
            backgroundColor: '#FFFFFF',
          }}
          contentStyle={{
            color: '#666666',
          }}
        />

      </View>

        {/* create time modal */}
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode='date'
          onConfirm={handleStartDateConfirm}
          onCancel={hideStartDatePicker}
          // date={new Date()}
        />

        {/* create time modal */}
        <DateTimePickerModal
          isVisible={isFinishDatePickerVisible}
          mode='date'
          onConfirm={handleFinishDateConfirm}
          onCancel={hideFinishDatePicker}
          // date={new Date()}
        />
    </View>
  )
}

export default AddTypeScreen