import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, PermissionsAndroid, ToastAndroid, Dimensions } from 'react-native'
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
import { ExportDataStore, WalletSelectList } from '../../mobx/exportData';
import { getTransactionByWalletListAndTime } from '../../realm/services/transactions';
import RNFetchBlob from 'rn-fetch-blob';
import XLSX from 'xlsx'
import { writeFile, CachesDirectoryPath, DownloadDirectoryPath } from 'react-native-fs';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';
import { CurrencyUnitData } from '../../constants/currencyUnit';
import { formatNumber, getDayOfWeekAnalyst, getDebtsTotalByUnit, getLoansTotalByUnit, getQuarterAnalyst, getSavingsTotalByUnit, getWalletsTotalByUnit, getMonthOfYearAnalyst, getYearAnalyst } from '../../realm/services/analyst';
import { colors } from '../../constants/colors';
import { BarChart } from 'react-native-gifted-charts';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import IncomeVsExpenseItem from '../../components/incomeVsExpenseItem';

interface IProps {}
const windowWidth = Dimensions.get('window').width;
const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

const WeekRoute = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const isFocus = useIsFocused();
  
    useEffect(() => {

    }, [isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
      });
  
    return (
    <View style={styles.viewTabContainer}>
    <View style={styles.viewTab}>
        <View style={styles.viewType}>
            <View style={styles.viewTypeItem}>
                <View style={[styles.viewTypeColor, {backgroundColor: colors.PrimaryColor}]}/>
                <Text style={styles.txtType}>Income</Text>
            </View>

            <View style={styles.viewTypeItem}>
                <View style={[styles.viewTypeColor, {backgroundColor: colors.ErrorColor}]}/>
                <Text style={styles.txtType}>Expense</Text>
            </View>
        </View>
        <BarChart
          noOfSections={3}
          frontColor={'#177AD5'}
          barWidth={26}
          data={getDayOfWeekAnalyst(realm, false, 'VND').result}
          width={windowWidth - 50}
          formatYLabel={(item) => (formatNumber(Number(item)))}
        //   yAxisLabelWidth={40}
          yAxisThickness={0}
          xAxisThickness={0}
          barBorderRadius={4}
          onPress={(item) => {showToast(formatter.format(item.value))}}
          renderTooltip={() => {}}
          scrollToIndex={Number((new Date()).getDate()) - 3}
        />


    </View>

      <FlatList
        data={getDayOfWeekAnalyst(realm, false, 'VND').resultList}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <IncomeVsExpenseItem
            id={item.title}
            currencyUnit={'VND'}
            expense={item.expense}
            income={item.income}
            title={item.title}
          />
        )}
        style={{width: '100%',}}
        showsVerticalScrollIndicator={false}
      />
    </View>
)};

const MonthRoute = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const isFocus = useIsFocused();
  
    useEffect(() => {

    }, [isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
      });
  
    return (
    <View style={styles.viewTabContainer}>
    <View style={styles.viewTab}>
        <View style={styles.viewType}>
            <View style={styles.viewTypeItem}>
                <View style={[styles.viewTypeColor, {backgroundColor: colors.PrimaryColor}]}/>
                <Text style={styles.txtType}>Income</Text>
            </View>

            <View style={styles.viewTypeItem}>
                <View style={[styles.viewTypeColor, {backgroundColor: colors.ErrorColor}]}/>
                <Text style={styles.txtType}>Expense</Text>
            </View>
        </View>
        <BarChart
          noOfSections={3}
          frontColor={'#177AD5'}
          barWidth={10}
          data={getMonthOfYearAnalyst(realm, 'VND').result}
          width={windowWidth - 50}
          formatYLabel={(item) => (formatNumber(Number(item)))}
        //   yAxisLabelWidth={5}
          yAxisThickness={0}
          xAxisThickness={0}
          barBorderRadius={4}
          onPress={(item) => {showToast(formatter.format(item.value))}}
          renderTooltip={() => {}}
          scrollToIndex={Number((new Date()).getDate()) - 3}
        />
    </View>

      <FlatList
        data={getMonthOfYearAnalyst(realm, 'VND').resultList}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <IncomeVsExpenseItem
            id={item.title}
            currencyUnit={'VND'}
            expense={item.expense}
            income={item.income}
            title={item.title}
          />
        )}
        style={{width: '100%',}}
        showsVerticalScrollIndicator={false}
      />
    </View>
)};

const QuarterRoute = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const isFocus = useIsFocused();
  
    useEffect(() => {

    }, [isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
      });
  
    return (
    <View style={styles.viewTabContainer}>
    <View style={styles.viewTab}>
        <View style={styles.viewType}>
            <View style={styles.viewTypeItem}>
                <View style={[styles.viewTypeColor, {backgroundColor: colors.PrimaryColor}]}/>
                <Text style={styles.txtType}>Income</Text>
            </View>

            <View style={styles.viewTypeItem}>
                <View style={[styles.viewTypeColor, {backgroundColor: colors.ErrorColor}]}/>
                <Text style={styles.txtType}>Expense</Text>
            </View>
        </View>

        <BarChart
          noOfSections={3}
          frontColor={'#177AD5'}
          barWidth={40}
          data={getQuarterAnalyst(realm, 'VND').result}
          width={windowWidth - 50}
          formatYLabel={(item) => (formatNumber(Number(item)))}
        //   yAxisLabelWidth={80}
          yAxisThickness={0}
          xAxisThickness={0}
          barBorderRadius={4}
          onPress={(item) => {showToast(formatter.format(item.value))}}
          renderTooltip={() => {}}
          scrollToIndex={Number((new Date()).getDate()) - 3}
        />
    </View>

      <FlatList
        data={getQuarterAnalyst(realm, 'VND').resultList}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <IncomeVsExpenseItem
            id={item.title}
            currencyUnit={'VND'}
            expense={item.expense}
            income={item.income}
            title={item.title}
          />
        )}
        style={{width: '100%',}}
        showsVerticalScrollIndicator={false}
      />
    </View>
)};

const YearRoute = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const isFocus = useIsFocused();
  
    useEffect(() => {

    }, [isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
      });
  
    return (
    <View style={styles.viewTabContainer}>
    <View style={styles.viewTab}>
        <View style={styles.viewType}>
            <View style={styles.viewTypeItem}>
                <View style={[styles.viewTypeColor, {backgroundColor: colors.PrimaryColor}]}/>
                <Text style={styles.txtType}>Income</Text>
            </View>

            <View style={styles.viewTypeItem}>
                <View style={[styles.viewTypeColor, {backgroundColor: colors.ErrorColor}]}/>
                <Text style={styles.txtType}>Expense</Text>
            </View>
        </View>

        <BarChart
          noOfSections={3}
          frontColor={'#177AD5'}
          barWidth={40}
          data={getYearAnalyst(realm, 'VND').result}
          width={windowWidth - 50}
          formatYLabel={(item) => (formatNumber(Number(item)))}
        //   yAxisLabelWidth={80}
          yAxisThickness={0}
          xAxisThickness={0}
          barBorderRadius={4}
          onPress={(item) => {showToast(formatter.format(item.value))}}
          renderTooltip={() => {}}
          scrollToIndex={Number((new Date()).getDate()) - 3}
        />
    </View>

      <FlatList
        data={getYearAnalyst(realm, 'VND').resultList}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <IncomeVsExpenseItem
            id={item.title}
            currencyUnit={'VND'}
            expense={item.expense}
            income={item.income}
            title={item.title}
          />
        )}
        style={{width: '100%',}}
        showsVerticalScrollIndicator={false}
      />
    </View>
)};
  

  
const renderScene = SceneMap({
    first: WeekRoute,
    second: MonthRoute,
    third: QuarterRoute,
    fourth: YearRoute,
});

const ExpenseVsIncomeScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Week' },
        { key: 'second', title: 'Month' },
        { key: 'third', title: 'Quarter'},
        { key: 'fourth', title: 'Year'},
    ]);

    const [unit, setUnit] = useState(CurrencyUnitData[1].code);

  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: unit,
  });
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Expense Vs Income</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            // navigation.navigate('AddGroup');
            // console.log(getYearAnalyst(realm, unit));
          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/> */}
        </TouchableOpacity>
      </View>

      {/* <BarChart
          data={getYearAnalyst(realm, unit)}
          barWidth={8}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'gray'}}
          noOfSections={3}
          maxValue={75}
        /> */}

    <View style={{flex: 1}}>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props =>
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: colors.PrimaryColor, }}
                style={{ backgroundColor: '#FFFFFF',}}
                labelStyle={{ textTransform: 'capitalize', fontSize: 14, fontWeight: '700', color: '#A5A7B9' }}
                activeColor={colors.PrimaryColor}
            />
            }
        />
      </View>

    </View>
  )
}

export default ExpenseVsIncomeScreen