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
import { Calendar } from 'react-native-calendars';
import { colors } from '../../constants/colors';

interface IProps {}

type SavingType = {
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
  const [createAt, setCreateAt] = useState(new Date().toISOString());

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
            onPress={handlePresentDateModalPress}
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
    </View>
  )
}

export default AddSavingScreen