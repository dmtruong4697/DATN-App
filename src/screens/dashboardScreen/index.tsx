import { View, Text, TouchableOpacity, Image, ImageSourcePropType, TextInput, ScrollView, SafeAreaView, Dimensions, ToastAndroid, Pressable } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TransactionCard from '../../components/transactionCard';
import { Realm, User } from "realm";
import { FlatList } from 'react-native-gesture-handler';
import { RealmContext } from '../../realm/models';
import { getAllTransaction, getTransactionHistory } from '../../realm/services/transactions';
import { getAllWallet, getWalletById, getWalletExpensesByWalletAndDay, getWalletIncomeByWalletAndDay } from '../../realm/services/wallets';
import Carousel from 'react-native-snap-carousel';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { formatNumber, getDayOfWeekAnalyst, getMonthAnalyst} from '../../realm/services/analyst';
import LoanCard from '../../components/loanCard';
import { getLoanHistory } from '../../realm/services/loan';
import { UserStore } from '../../mobx/auth';
import { colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';

interface IProps {}

type WalletType = {
  _id: Realm.BSON.ObjectId;
  name: string;
  balance: number;
  currencyUnit: string;
}

interface State {
  activeIndex: number;
  carouselItems: WalletType[];
}

const DashboardScreen: React.FC<IProps>  = () => {

    const [today, setToday] = React.useState(new Date().toISOString().slice(0, 10));
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    let transactions = getTransactionHistory(realm, 5);
    let loans = getLoanHistory(realm, 5);
    const [barData, setBarData] = useState(getMonthAnalyst(realm, false, 'VND'));
    const [analystType, setAnalystType] = useState('Week');
    const isFocus = useIsFocused();
    useEffect(() => {
      transactions = getTransactionHistory(realm, 5);
      loans = getLoanHistory(realm, 5);
      setBarData(getMonthAnalyst(realm, false, 'VND'));
    }, [isFocus]);

    const ref = React.createRef<any>();
    const state = {
      activeIndex: 0,
      carouselItems: getAllWallet(realm),
    };
    const renderItem = ({ item, index }: { item: WalletType; index: number }) => {

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: item.currencyUnit,
      });

      return (
        <Pressable 
          style={styles.viewSlideItem}
          onPress={() => {navigation.navigate('WalletDetail', {_id: item._id})}}
        >
          <View style={styles.viewTotal}>
            <View style={styles.viewTotalContent}>
              <Text style={styles.txtTotalBalance}>{item.name}</Text>
              <Text style={styles.txtBalance}>{formatter.format(item.balance)}</Text>
            </View>

            <TouchableOpacity 
              style={styles.btnOption}
              onPress={() => {
                // console.log(getWalletIncomeByWalletAndDay(realm, item._id, '2024-03-27'))
              }}
            >
              <Image style={styles.imgButtonOption} source={require('../../../assets/icon/dashboard/option.png')}/>
            </TouchableOpacity>
          </View>

          <Text style={styles.txtTotalBalance}>{t('dbs-today')}:</Text>
          <View style={styles.viewStatic}>
            <View style={styles.viewIncome}>
              <View style={styles.viewIncomeText}>
              <Image style={styles.imgIncomeImage} source={require('../../../assets/icon/dashboard/up.png')}/>
                <Text style={styles.txtIncome}>{t('dbs-income')}</Text>
              </View>
              <Text style={styles.txtIncomeTotal}>{formatter.format(getWalletIncomeByWalletAndDay(realm, item._id, today))}</Text>
            </View>

            <View style={styles.viewExpent}>
              <View style={styles.viewExpentText}>
                <Image style={styles.imgIncomeImage} source={require('../../../assets/icon/dashboard/down.png')}/>
                <Text style={styles.txtIncome}>{t('dbs-expenses')}</Text>
              </View>
              <Text style={styles.txtIncomeTotal}>{formatter.format(getWalletExpensesByWalletAndDay(realm, item._id, today))}</Text>
            </View>
          </View>
        </Pressable>
      );
    };

    useEffect(() => {
      if(UserStore.user.id == null) {
        navigation.navigate('SignIn');
      }
    },[])

    const showToast = (message: string) => {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    };

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
    });

    const setWeekAnalyst = () => {
      // setAnalystType('Week');
      setBarData(getDayOfWeekAnalyst(realm, false, 'VND'));
    };

    const setMonthAnalyst = () => {
      setBarData(getMonthAnalyst(realm, false, 'VND'));
      setAnalystType('Month');
    }

  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <View style={styles.viewTopContainer}>
        <View style={styles.viewHeaderBar}>
          <View
            style={{
              flex : 1,
              transform : [ { scaleX : 0.5 } ],
              flexDirection: 'row',
              padding: 15,
              // alignItems : 'center',
              // justifyContent : 'center'
            }}
          >
            <View style={styles.viewHeaderText}>
              <Text style={styles.txtGreeting}>{t('dbs-good morning')},</Text>
              <Text style={styles.txtName}>{UserStore.user.userName}</Text>
            </View>

            <TouchableOpacity
              style={styles.btnNotification}
            >
              <Image style={styles.imgButtonNotification} source={require('../../../assets/icon/dashboard/bell.png')}/>
            </TouchableOpacity>
          </View>
        </View>

        <SafeAreaView style={{ flex: 1, position: 'absolute', bottom: 0, zIndex: 1,}}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
            <Carousel
              layout={"default"}
              ref={ref}
              data={state.carouselItems}
              sliderWidth={windowWidth}
              itemWidth={windowWidth*0.84}
              renderItem={renderItem}
              enableSnap={true}
              // loop={true}
              // autoplay={true}
              // autoplayDelay={10000}
              // autoplayInterval={10000}
              
              // onSnapToItem={(index: number) => setState({ activeIndex: index })}
            />
          </View>
        </SafeAreaView>
      </View>

      {/* transaction history */}
      <View style={styles.viewTransactionHistory}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{t('dbs-transactions history')}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Transaction');
            }}
          >
            <Text style={styles.txtSeeAll}>{t('dbs-see all')}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <TransactionCard
              _id={item._id}
              createAt={item.createAt}
              imageUrl={item.imageUrl}
              income={item.income}
              name={item.name}
              note={item.note}
              total={item.total}
              transactionTypeId={item.transactionTypeId}
              walletId={item.walletId}
            />
          )}
          style={{width: '100%',}}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* chart */}
      <View style={styles.viewTransactionHistory}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{t('dbs-statistics')}</Text>
          <TouchableOpacity
            onPress={() => {
              setBarData(getDayOfWeekAnalyst(realm, false, 'VND'));
            }}
          >
            <Text style={styles.txtSeeAll}>{t('dbs-detail')}</Text>
          </TouchableOpacity>
        </View>

        {/* analyst */}
        <BarChart
          noOfSections={3}
          frontColor={'#177AD5'}
          barWidth={22}
          data={barData}
          width={windowWidth - 50}
          formatYLabel={(item) => (formatNumber(Number(item)))}
          yAxisLabelWidth={40}
          yAxisThickness={0}
          xAxisThickness={0}
          barBorderRadius={4}
          onPress={(item) => {showToast(formatter.format(item.value))}}
          renderTooltip={() => {}}
          scrollToIndex={Number((new Date()).getDate()) - 3}
        />

        {/* month analyst
        {(analystType == 'month') &&
        <LineChart
          data={barData}
          color={colors.PrimaryColor}
          thickness={3}
          dataPointsColor={'#2a4a35'}
          yAxisThickness={0}
          hideYAxisText
          xAxisThickness={0}
          initialSpacing={10}
          backgroundColor={"#FFFFFF"}
          scrollToIndex={Number((new Date()).getDate()) - 3}
          curved
          curvature={0.1}
          overflowBottom={15}
          onPress={(item) => {showToast(formatter.format(item.value))}}
          noOfSections={4}
        />
        } */}

      </View>

      {/* loan/debt history */}
      <View style={styles.viewTransactionHistory}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{t('dbs-loan history')}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoanList');
            }}
          >
            <Text style={styles.txtSeeAll}>{t('dbs-see all')}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={loans}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <LoanCard
              _id={item._id}
              createAt={item.createAt}
              imageUrl={item.imageUrl}
              isLoan={item.isLoan}
              name={item.name}
              note={item.note}
              total={item.total}
              walletId={item.walletId}
              cycle={item.cycle}
              interest={item.interest}
              people={item.people}
            />
          )}
          style={{width: '100%',}}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </ScrollView>
  )
}

export default DashboardScreen    