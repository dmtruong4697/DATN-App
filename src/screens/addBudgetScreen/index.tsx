import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
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
import { BudgetType, addBudget } from '../../realm/services/budgets';
import { getMonthEnd, getMonthStart, getWeekEnd, getWeekStart } from '../../realm/services/dateTime';
import OptionButton from '../../components/optionButton';

interface IProps {}

type SavingType = {
    _id: Realm.BSON.ObjectId;
    name: string,
    total: number,
    createAt: string,
    profit: number,
    currencyUnit: string,
}

const AddBudgetScreen: React.FC<IProps> = () => {

  const {useRealm} = RealmContext;
  const realm = useRealm();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [name, setName] = useState('');
  const [total, setTotal] = useState<number|any>(0);
  const [currencyUnitCode, setCurrencyUnitCode] = useState(CurrencyUnitData[1].code);
  const [currencyUnitName, setCurrencyUnitName] = useState(CurrencyUnitData[1].name);
  const [profit, setProfit] = useState<number|any>(0);
  const [createAt, setCreateAt] = useState(new Date().toISOString().slice(0, 10));
  const [repeatType, setRepeatType] = useState('day');
  const [startTime, setStartTime] = useState(new Date().toISOString().slice(0, 10));
  const [finishTime, setFinishTime] = useState(new Date().toISOString().slice(0, 10));

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

    // type bottom sheet
    const typeBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const typeSnapPoints = useMemo(() => ['25%', '50%'], []);
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

  const handleAddBudget = () => {
    const newBudget: BudgetType = {
      _id: new Realm.BSON.ObjectId(),
      name: name,
      unitCurrency: currencyUnitCode,
      total: total,
    };

    addBudget(realm, newBudget);
    navigation.goBack();
  }

  const handleSetTime = (type: string) => {
    setRepeatType(type);
    if(type == 'week') {
        const m = getWeekStart(new Date());
        const s = getWeekEnd(new Date());
        setStartTime(m.toISOString().slice(0, 10));
        setFinishTime(s.toISOString().slice(0, 10));
    } else if(type == 'month') {
        const m = getMonthStart(new Date());
        const s = getMonthEnd(new Date());
        setStartTime(m.toISOString().slice(0, 10));
        setFinishTime(s.toISOString().slice(0, 10));
    }

    handleCloseTypeModal();
  }

  return (
    <ScrollView contentContainerStyle={styles.viewContainer} scrollEnabled>
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

            <Text style={styles.txtTitle}>Add Budget</Text>
            
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

        {/* repeat type */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>REPEAT</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {
                handlePresentTypeModalPress();
            }}
          >
            <Text style={styles.txtTypeName}>{repeatType}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>

        {/* start time */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>START DATE</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {}}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
            <Text style={styles.txtTypeName}>{startTime}</Text>
            <Image style={[styles.imgIcon, {marginRight: 0,}]} source={require('../../../assets/icon/addTransaction/down-1.png')}/>
          </TouchableOpacity>
        </View>

        {/* finish time */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>FINISH DATE</Text>
          <TouchableOpacity 
            style={styles.viewFormItem}
            onPress={() => {}}
          >
            <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/calendar.png')}/>
            <Text style={styles.txtTypeName}>{finishTime}</Text>
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
          content='ADD BUDGET'
          onPress={() => {
            // handleAddBudget();
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

        {/* modal pick repeat type */}
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
                    <Text style={styles.txtPeriod}>Select repeat type</Text>
                    <OptionButton
                        content='Day'
                        onPress={() => {
                            handleSetTime('day');
                        }}
                    />
                    <OptionButton
                        content='Week'
                        onPress={() => {
                            handleSetTime('week');
                        }}
                    />
                    <OptionButton
                        content='Month'
                        onPress={() => {
                            handleSetTime('month');
                        }}
                    />
                    <OptionButton
                        content='Year'
                        onPress={() => {}}
                    />
                </BottomSheetView>
            </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    </ScrollView>
  )
}

export default AddBudgetScreen