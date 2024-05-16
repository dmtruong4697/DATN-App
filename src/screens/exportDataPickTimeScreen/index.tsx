import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GroupCard from '../../components/groupCard';
import { getGroupList, joinGroup } from '../../services/group';
import { RealmContext } from '../../realm/models';
import { getAllWallet } from '../../realm/services/wallets';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../../components/button';
import { observer } from 'mobx-react'
import { TimeRangeData } from '../../data/timeRangeData';
import { ExportDataStore } from '../../mobx/exportData';
import { Calendar } from 'react-native-calendars';
import { colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';

interface IProps {}

const ExportDataPickTimeScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    // const [start, setStart] = useState((new Date()).toISOString().slice(0, 10));
    // const [finish, setFinish] = useState((new Date()).toISOString().slice(0, 10));
    const [isCustom, setIsCustom] = useState(false);

    // start date bottom sheet
    const startBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const startSnapPoints = useMemo(() => ['25%', '60%'], []);
    const handlePresentStartModalPress = useCallback(() => {
        startBottomSheetModalRef.current?.present();
    }, []);
    
    const handleCloseStartModal = useCallback(() => {
        startBottomSheetModalRef.current?.close();
    }, []);
    
    const handleStartSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    
    const renderStartBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseStartModal}
        />,
        []
    );

    // finish date bottom sheet
    const finishBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const finishSnapPoints = useMemo(() => ['25%', '60%'], []);
    const handlePresentFinishModalPress = useCallback(() => {
        finishBottomSheetModalRef.current?.present();
    }, []);
    
    const handleCloseFinishModal = useCallback(() => {
        finishBottomSheetModalRef.current?.close();
    }, []);
    
    const handleFinishSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    
    const renderFinishBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseFinishModal}
        />,
        []
    );
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{t('edpts-pick time range')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          {/* <Text style={styles.txtEdit}>ADD</Text> */}
          <Image style={styles.imgButtonDone} source={require('../../../assets/icon/exportDataScreen/done.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.viewList}>
        <FlatList
            data={TimeRangeData}
            extraData={ExportDataStore.rangeType}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <TouchableOpacity
                    style={styles.viewRangeItem}
                    onPress={item.onPress}
                >
                    <Text style={styles.txtItem}>{item.name}</Text>
                    {(item.type == ExportDataStore.rangeType) && 
                        <TouchableOpacity
                            style={styles.viewCheck}
                            onPress={() => {
                                
                            }}
                        >
                            <Image style={styles.imgCheck} source={require('../../../assets/icon/shoppingListItemCard/check.png')}/>
                        </TouchableOpacity>
                    }
                </TouchableOpacity>
            )}
            style={{width: '100%',}}
            showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
            style={styles.viewCustomItem}
            onPress={() => {
                ExportDataStore.setCustomTime();
            }}
        >
            <Text style={styles.txtItem}>{t('edpts-custom')}</Text>
            {('custom' == ExportDataStore.rangeType) && 
                <TouchableOpacity
                    style={styles.viewCheck}
                    onPress={() => {
                        
                    }}
                >
                    <Image style={styles.imgCheck} source={require('../../../assets/icon/shoppingListItemCard/check.png')}/>
                </TouchableOpacity>
            }
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.viewRange}
            onPress={() => {
                ExportDataStore.setCustomTime();
                handlePresentStartModalPress();
            }}
        >
            <Text style={styles.txtRange}>{t('edpts-from')}:</Text>
            <Text style={styles.txtRangeDate}>{ExportDataStore.startTime}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.viewRange}
            onPress={() => {
                ExportDataStore.setCustomTime();
                handlePresentFinishModalPress();
            }}
        >
            <Text style={styles.txtRange}>{t('edpts-to')}:</Text>
            <Text style={styles.txtRangeDate}>{ExportDataStore.finishTime}</Text>
        </TouchableOpacity>

      </View>

        {/* modal pick start date */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={startBottomSheetModalRef}
              index={1}
              snapPoints={startSnapPoints}
              onChange={handleStartSheetChanges}
              backdropComponent={renderStartBackdrop}
            >
              <BottomSheetView style={{flex: 1}}>
              <Calendar
                initialDate={ExportDataStore.startTime}
                minDate={'2002-03-02'}
                maxDate={'2102-03-02'}
                onDayPress={day => {
                  ExportDataStore.setStartTime(day.dateString);
                  console.log('selected day', day);
                  handleCloseStartModal();
                }}
                markedDates={{
                  [ExportDataStore.startTime]: {selected: true, selectedColor: colors.PrimaryColor, },
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

        {/* modal pick finish date */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={finishBottomSheetModalRef}
              index={1}
              snapPoints={finishSnapPoints}
              onChange={handleFinishSheetChanges}
              backdropComponent={renderFinishBackdrop}
            >
              <BottomSheetView style={{flex: 1}}>
              <Calendar
                initialDate={ExportDataStore.finishTime}
                minDate={'2002-03-02'}
                maxDate={'2102-03-02'}
                onDayPress={day => {
                  ExportDataStore.setFinishTime(day.dateString);
                  console.log('selected day', day);
                  handleCloseFinishModal();
                }}
                markedDates={{
                  [ExportDataStore.finishTime]: {selected: true, selectedColor: colors.PrimaryColor, },
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

export default observer(ExportDataPickTimeScreen)