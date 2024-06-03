import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../constants/colors';
import { generateDay, generateMonth, generateWeek } from '../../realm/services/dateTime';
import { SceneMap, TabBar, TabBarProps, TabView } from 'react-native-tab-view';
import TransactionListTab from '../../components/transactionListTab';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import OptionButton from '../../components/optionButton';
import { RangeContext } from '../../navigator/mainNavigator';
import { useTranslation } from 'react-i18next';

interface IProps {}

const TransactionScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {startTime, setStartTime, finishTime, setFinishTime, inputType, setInputType, tabData, setTabData} = useContext(RangeContext);
    const {t} = useTranslation();

    // const tabData = generateWeek(5).reverse();
    // const [tabData, setTabData] = useState(generateWeek(5).reverse());
    const renderScene = SceneMap(
      tabData.reduce((scenes: any, tab: any) => {
        scenes[tab.id] = () =>  
          <TransactionListTab
            id={tab.id.toString()}
            name={tab.name}
            finishTime={tab.finishTime}
            navigation={navigation}
            startTime={tab.startTime}
          />;
        return scenes;
      }, {})
    );

  const [index, setIndex] = React.useState(tabData.length - 1);

  const routes= React.useMemo(() => (
    tabData.map((item: any) => ({ key: item.id, title: item.name, }))
  ), [tabData]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.PrimaryColor, }}
      style={{ backgroundColor: '#FFFFFF', width: 'auto'}}
      labelStyle={{ textTransform: 'capitalize', fontSize: 14, fontWeight: '700', color: '#A5A7B9' }}
      activeColor={colors.PrimaryColor}
      scrollEnabled
    />
  );

  // option bottom sheet
  const optionBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const optionSnapPoints = useMemo(() => ['25%', '42%'], []);
  const handlePresentOptionModalPress = useCallback(() => {
    optionBottomSheetModalRef.current?.present();
  }, []);

  const handleCloseOptionModal = useCallback(() => {
    optionBottomSheetModalRef.current?.close();
  }, []);

  const handleOptionSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const renderOptionBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      onPress={handleCloseOptionModal}
    />,
    []
  );

  // close bottom sheet when focus
  const isFocus = useIsFocused();
  useEffect(() => {
    handleCloseOptionModal();
  }, [isFocus])
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{t('ts-transactions')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            handlePresentOptionModalPress();
          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
        </TouchableOpacity>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex }
        initialLayout={{ width: layout.width }}
        overScrollMode={'always'}
        // style={{width: 600}}
        renderTabBar={renderTabBar}
      />

      {/* modal option */}
      <BottomSheetModalProvider>
        <View style={{}}>
          <BottomSheetModal
            ref={optionBottomSheetModalRef}
            index={1}
            snapPoints={optionSnapPoints}
            onChange={handleOptionSheetChanges}
            backdropComponent={renderOptionBackdrop}
          >
            <BottomSheetView style={{flex: 1}}>
              <Text style={styles.txtPeriod}>{t('ts-select time range')}</Text>
              <OptionButton
                content={t('ts-day')}
                onPress={() => {
                  setTabData(generateDay(10).reverse());
                  handleCloseOptionModal();
                }}
              />
              <OptionButton
                content={t('ts-week')}
                onPress={() => {
                  setTabData(generateWeek(5).reverse());
                  handleCloseOptionModal();
                }}
              />
              <OptionButton
                content={t('ts-month')}
                onPress={() => {
                  setTabData(generateMonth(5).reverse());
                  handleCloseOptionModal();
                }}
              />
              <OptionButton
                content={t('ts-custom')}
                onPress={() => {navigation.navigate('RangePicker')}}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
          
    </View>
  )
}

export default TransactionScreen    