import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { getAllWallet } from '../../realm/services/wallets';
import WalletCard from '../../components/walletCard';
import { getAllTransactionType, getListTransactionType } from '../../realm/services/transactionType';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { colors } from '../../constants/colors';
import TransactionTypeCard from '../../components/transactionTypeCard';
import { getAllLoan, getListLoanByType } from '../../realm/services/loan';
import LoanCard from '../../components/loanCard';
import { useTranslation } from 'react-i18next';

interface IProps {}

const LoanRoute = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    let loans = getListLoanByType(realm, true);
    const isFocus = useIsFocused();
  
    useEffect(() => {
        loans = getListLoanByType(realm, true);
    }, [isFocus])
  
    return (
    <View style={styles.viewTypeList}>
      <TouchableOpacity
        style={styles.btnAddType}
        onPress={() => {
          navigation.navigate('AddLoan');
        }}
      >
        <Image style={styles.imgAddTypeButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
        <Text style={styles.txtAddTypeButton}>{t('lds-add loan')}</Text>
      </TouchableOpacity>
  
      <FlatList
        data={loans}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <LoanCard
            _id={item._id}
            name={item.name}
            createAt={item.createAt}
            cycle={item.cycle}
            imageUrl={item.imageUrl}
            interest={item.interest}
            isLoan={item.isLoan}
            note={item.note}
            people={item.people}
            total={item.total}
            walletId={item.walletId}
          />
        )}
        style={{width: '100%',}}
        showsVerticalScrollIndicator={false}
      />
    </View>
)};
  
const DebtRoute = () => {
  
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    let debts = getListLoanByType(realm, false);
    const isFocus = useIsFocused();
  
    useEffect(() => {
        debts = getListLoanByType(realm, false);
    }, [isFocus])
  
    return (
    <View style={styles.viewTypeList}>
      <TouchableOpacity
        style={styles.btnAddType}
        onPress={() => {
          navigation.navigate('AddLoan');
        }}
      >
        <Image style={styles.imgAddTypeButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
        <Text style={styles.txtAddTypeButton}>{t('lds-add debt')}</Text>
      </TouchableOpacity>
  
      <FlatList
        data={debts}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
            <LoanCard
            _id={item._id}
            name={item.name}
            createAt={item.createAt}
            cycle={item.cycle}
            imageUrl={item.imageUrl}
            interest={item.interest}
            isLoan={item.isLoan}
            note={item.note}
            people={item.people}
            total={item.total}
            walletId={item.walletId}
          />
        )}
        style={{width: '100%',}}
        showsVerticalScrollIndicator={false}
      />
    </View>
)};
  
const renderScene = SceneMap({
    first: LoanRoute,
    second: DebtRoute,
});

const LoanListScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    // type bottom sheet tab
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: t('lds-loan') },
        { key: 'second', title: t('lds-Debt')  },
    ]);

    let types = getAllTransactionType(realm);
    const isFocus = useIsFocused();
  
    useEffect(() => {
        types = getAllTransactionType(realm);
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

        <Text style={styles.txtTitle}>{t('lds-loan debt')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
        </TouchableOpacity>
      </View>

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

export default LoanListScreen    