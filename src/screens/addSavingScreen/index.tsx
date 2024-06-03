import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { RealmContext } from '../../realm/models';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Realm } from "realm";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { styles } from './styles';
import Button from '../../components/button';
import { addWallet, getAllWallet } from '../../realm/services/wallets';
import { CurrencyUnitData } from '../../constants/currencyUnit';
import CurrencyUnitCard from '../../components/currencyUnitCard';
import { FlatList } from 'react-native-gesture-handler';
import { addSaving } from '../../realm/services/saving';
import { colors } from '../../constants/colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface IProps {}

export type SavingType = {
    _id: Realm.BSON.ObjectId;
    name: string,
    total: number,
    createAt: string,
    profit: number,
    currencyUnit: string,
}

const AddSavingScreen: React.FC<IProps> = () => {

  const {useRealm} = RealmContext;
  const realm = useRealm();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [name, setName] = useState('');
  const [total, setTotal] = useState<number|any>(0);
  const [currencyUnitCode, setCurrencyUnitCode] = useState(CurrencyUnitData[1].code);
  const [currencyUnitName, setCurrencyUnitName] = useState(CurrencyUnitData[1].name);
  const [profit, setProfit] = useState<number|any>(0);
  const [createAt, setCreateAt] = React.useState(new Date().toISOString().slice(0, 10));

  // pick currency unit bottom sheet
  const unitBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const unitSnapPoints = useMemo(() => ['25%', '70%'], []);
  const handlePresentUnitModalPress = useCallback(() => {
    unitBottomSheetModalRef.current?.present();
  }, []);
  
  const handleCloseUnitModal = useCallback(() => {
    unitBottomSheetModalRef.current?.close();
  }, []);
  
  const handleUnitSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);
  
  const renderUnitBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      onPress={handleCloseUnitModal}
    />,[]);

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
      setCreateAt(date.toISOString().slice(0, 10))
      hideDatePicker();
    };

  const handleAddSaving = () => {
    const newSaving: SavingType = {
      _id: new Realm.BSON.ObjectId(),
      name: name,
      currencyUnit: currencyUnitCode,
      total: total,
      createAt: createAt,
      profit: profit,
    };

    addSaving(realm, newSaving);
    navigation.goBack();
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

            <Text style={styles.txtTitle}>Add Saving</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
                // console.log(getAllWallet(realm))
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
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(text) => {setName(text)}}
          />
        </View>

        {/* total */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>TOTAL</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(number) => {setTotal(Number(number))}}
            keyboardType='numeric'
          />
        </View>

        {/* profit */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>PROFIT PERCENT</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(number) => {setProfit(Number(number))}}
            keyboardType='numeric'
          />
        </View>

        {/* date */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>DATE</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {
              showDatePicker()
            }}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
            <Text style={styles.txtTypeName}>{createAt}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>

        {/* currency unit */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>UNIT</Text>
          <TouchableOpacity
            style={styles.viewFormItem}
            onPress={handlePresentUnitModalPress}
          >
            <Text style={styles.txtTypeName}>{currencyUnitCode} - {currencyUnitName}</Text>
          </TouchableOpacity>
        </View>

        <Button
          content='ADD SAVING'
          onPress={() => {
            handleAddSaving();
          }}
          containerStyle={{}}
          contentStyle={{}}
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

        {/* modal pick unit */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={unitBottomSheetModalRef}
              index={1}
              snapPoints={unitSnapPoints}
              onChange={handleUnitSheetChanges}
              backdropComponent={renderUnitBackdrop}
            >
              <BottomSheetView style={{flex: 1, padding: 10,}}>
                <FlatList
                  data={CurrencyUnitData}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <CurrencyUnitCard
                      id={item.id}
                      code={item.code}
                      symbol={item.symbol}
                      iconUri={item.iconUri}
                      name={item.name}
                      onPress={() => {
                        setCurrencyUnitCode(item.code);
                        setCurrencyUnitName(item.name);
                        handleCloseUnitModal();
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

        {/* create time modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          // date={new Date()}
        />
    </View>
  )
}

export default AddSavingScreen