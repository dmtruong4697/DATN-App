import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TransactionCard from '../../components/transactionCard';

interface IProps {}

const DashboardScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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

        <View style={styles.viewBalanceCard}>
          <View style={styles.viewTotal}>
            <View style={styles.viewTotalContent}>
              <Text style={styles.txtTotalBalance}>Total Balance:</Text>
              <Text style={styles.txtBalance}>$ 2548.00</Text>
            </View>

            <TouchableOpacity 
              style={styles.btnOption}
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
              <Text style={styles.txtIncomeTotal}>$ 1840</Text>
            </View>

            <View style={styles.viewExpent}>
              <View style={styles.viewExpentText}>
                <Image style={styles.imgIncomeImage} source={require('../../../assets/icon/dashboard/down.png')}/>
                <Text style={styles.txtIncome}>Expenses</Text>
              </View>
              <Text style={styles.txtIncomeTotal}>$ 1840</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.viewTransactionHistory}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>Transactions History</Text>
          <TouchableOpacity
          >
            <Text style={styles.txtSeeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <TransactionCard
        // _id={}
          createAt=''
          imageUrl=''
          income={false}
          name=''
          note=''
          total={123}
          // transactionTypeId={'123'}
          // walletId={}
        />
      </View>
    </ScrollView>
  )
}

export default DashboardScreen    