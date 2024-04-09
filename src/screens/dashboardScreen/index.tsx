import { View, Text, TouchableOpacity, Image, ImageSourcePropType, TextInput, ScrollView, SafeAreaView, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TransactionCard from '../../components/transactionCard';
import { Realm } from "realm";
import { FlatList } from 'react-native-gesture-handler';
import { RealmContext } from '../../realm/models';
import { getAllTransaction, getTransactionHistory } from '../../realm/services/transactions';
import { getAllWallet, getWalletById, getWalletExpensesByWalletAndDay, getWalletIncomeByWalletAndDay } from '../../realm/services/wallets';
import Carousel from 'react-native-snap-carousel';
import { BarChart } from 'react-native-gifted-charts';
import { getDayOfWeekAnalyst, getWeekAnalyst } from '../../realm/services/analyst';
import LoanCard from '../../components/loanCard';
import { getLoanHistory } from '../../realm/services/loan';

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

    let transactions = getTransactionHistory(realm, 5);
    let loans = getLoanHistory(realm, 5);
    // let barData = getDayOfWeekAnalyst(realm);
    let barData = getWeekAnalyst(realm, 7, false);
    const isFocus = useIsFocused();
    useEffect(() => {
      transactions = getTransactionHistory(realm, 5);
      loans = getLoanHistory(realm, 5);
      // barData = getDayOfWeekAnalyst(realm);
      barData = getWeekAnalyst(realm, 7, false);
    }, [isFocus])

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
        <View style={styles.viewSlideItem}>
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

          <Text style={styles.txtTotalBalance}>Today:</Text>
          <View style={styles.viewStatic}>
            <View style={styles.viewIncome}>
              <View style={styles.viewIncomeText}>
              <Image style={styles.imgIncomeImage} source={require('../../../assets/icon/dashboard/up.png')}/>
                <Text style={styles.txtIncome}>Income</Text>
              </View>
              <Text style={styles.txtIncomeTotal}>{formatter.format(getWalletIncomeByWalletAndDay(realm, item._id, today))}</Text>
            </View>

            <View style={styles.viewExpent}>
              <View style={styles.viewExpentText}>
                <Image style={styles.imgIncomeImage} source={require('../../../assets/icon/dashboard/down.png')}/>
                <Text style={styles.txtIncome}>Expenses</Text>
              </View>
              <Text style={styles.txtIncomeTotal}>{formatter.format(getWalletExpensesByWalletAndDay(realm, item._id, today))}</Text>
            </View>
          </View>
        </View>
      );
    };

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
              <Text style={styles.txtGreeting}>Good morning,</Text>
              <Text style={styles.txtName}>Truong Duong</Text>
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
              autoplay={true}
              autoplayDelay={10000}
              autoplayInterval={10000}
              
              // onSnapToItem={(index: number) => setState({ activeIndex: index })}
            />
          </View>
        </SafeAreaView>
      </View>

      {/* transaction history */}
      <View style={styles.viewTransactionHistory}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>Transactions History</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Transaction');
            }}
          >
            <Text style={styles.txtSeeAll}>See all</Text>
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
          <Text style={styles.txtTitle}>Statistics</Text>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('Transaction');
            }}
          >
            <Text style={styles.txtSeeAll}>Detail</Text>
          </TouchableOpacity>
        </View>

        <BarChart
          noOfSections={3}
          frontColor={'#177AD5'}
          barWidth={22}
          data={barData}
          width={windowWidth - 50}
          yAxisThickness={0}
          xAxisThickness={0}
          barBorderRadius={4}
        />

      </View>

      {/* loan/debt history */}
      <View style={styles.viewTransactionHistory}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>Loans/Debts History</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoanList');
            }}
          >
            <Text style={styles.txtSeeAll}>See all</Text>
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