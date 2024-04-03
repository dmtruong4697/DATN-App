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

interface IProps {}

const ExpensesRoute = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
  
    let transactionTypes = getListTransactionType(realm, false);
    const isFocus = useIsFocused();
  
    useEffect(() => {
      transactionTypes = getListTransactionType(realm, false);
    }, [isFocus])
  
    return (
    <View style={styles.viewTypeList}>
      <TouchableOpacity
        style={styles.btnAddType}
        onPress={() => {
          navigation.navigate('AddType');
        }}
      >
        <Image style={styles.imgAddTypeButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
        <Text style={styles.txtAddTypeButton}>Add Transaction Type</Text>
      </TouchableOpacity>
  
      <FlatList
        data={transactionTypes}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <TransactionTypeCard
            _id={item._id}
            iconUrl={item.iconUrl}
            name={item.name}
            income={item.income}
            onPress={() => {
                navigation.navigate('TypeDetail', {_id: item._id});
            }}
          />
        )}
        style={{width: '100%',}}
        showsVerticalScrollIndicator={false}
      />
    </View>
)};
  
const IncomeRoute = () => {
  
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    let transactionTypes = getListTransactionType(realm, true);
    const isFocus = useIsFocused();
  
    useEffect(() => {
      transactionTypes = getListTransactionType(realm, true);
    }, [isFocus])
  
    return (
    <View style={styles.viewTypeList}>
      <TouchableOpacity
        style={styles.btnAddType}
        onPress={() => {
          navigation.navigate('AddType');
        }}
      >
        <Image style={styles.imgAddTypeButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
        <Text style={styles.txtAddTypeButton}>Add Transaction Type</Text>
      </TouchableOpacity>
  
      <FlatList
        data={transactionTypes}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <TransactionTypeCard
            _id={item._id}
            iconUrl={item.iconUrl}
            name={item.name}
            income={item.income}
            onPress={() => {
                navigation.navigate('TypeDetail', {_id: item._id});
            }}
          />
        )}
        style={{width: '100%',}}
        showsVerticalScrollIndicator={false}
      />
    </View>
)};
  
const renderScene = SceneMap({
    first: ExpensesRoute,
    second: IncomeRoute,
});

const TypeListScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    // type bottom sheet tab
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Expenses' },
        { key: 'second', title: 'Income' },
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

        <Text style={styles.txtTitle}>Transaction Types</Text>
        
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

export default TypeListScreen    