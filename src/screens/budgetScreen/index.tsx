import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuItem from '../../components/menuItem';
import { deleteBudgetById, getAllBudget, getBudgetDetail, } from '../../realm/services/budgets';
import { RealmContext } from '../../realm/models';
import Button from '../../components/button';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors } from '../../constants/colors';
import { Circle } from 'react-native-svg';

interface IProps {}

const BudgetScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    let budget = getAllBudget(realm)[0];
    let result = getBudgetDetail(realm, budget!._id, budget!.startTime, budget!.finishTime);
    const [num, setNum] = useState<number>()
    const isFocus = useIsFocused();
  
    useEffect(() => {
        budget = getAllBudget(realm)[0];
        // renewBudgetById(realm, budget._id);
        if(budget) result = getBudgetDetail(realm, budget._id, budget.startTime, budget.finishTime);
        const n = new Date();
        const f = new Date(budget!.finishTime);

        setNum(Number(f.getDate()) - Number(n.getDate()));
    }, [isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budget!.unitCurrency,
    });

  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      {(!budget) && 
        <View style={styles.viewEmpty}>
          <Image style={styles.imgEmpty} source={require('../../../assets/illustration/transactionScreen/empty-box.png')}/>
          <Text style={styles.txtEmptyTitle}>You have no budget</Text>
          <Text style={styles.txtEmptyDescription}>Start saving money by creating a budget and we will help you stick to it</Text>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => {
              navigation.navigate('AddBudget');
            }}
          >
            <Text style={styles.txtAdd}>+ Add budget</Text>
          </TouchableOpacity>
        </View>
      }

      {(budget) && 
      <View>
        <View style={styles.viewHeader}>
          <TouchableOpacity
            style={styles.btnBack}
            // onPress={() => {navigation.goBack()}}
          >
            {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/> */}
          </TouchableOpacity>

          <Text style={styles.txtTitle}>{budget!.name}</Text>
          
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {

            }}
          >
            <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
            style={styles.btnDate}
            onPress={() => {
              console.log(result)
            }}
        >
          <Text style={styles.txtDate}>{budget!.startTime}  -  {budget!.finishTime}</Text>
        </TouchableOpacity>

        <View style={styles.viewProgressContainer}>
          <View style={styles.viewProgress}>
            <AnimatedCircularProgress
              size={windowWidth - 50}
              width={10}
              style={{height: windowWidth/2,}}
              fill={(result.total/budget.total)*100}
              tintColor={colors.PrimaryColor}
              backgroundColor="#d1d1d1"
              arcSweepAngle={180}
              rotation={270}
              lineCap='round'
              renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="#2a4a35"/>}
            >
              {
                (fill) => (
                  <View style={{
                    width: '70%',
                    height: '70%',
                    // backgroundColor: 'pink',
                    paddingTop: 20,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <Text style={styles.txtItemTitle}>Amount you can spend</Text>
                    <Text style={styles.txtAmount}>{formatter.format(budget.total - result.total)}</Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
          </View>
          <View style={styles.viewInfo}>
            <View style={styles.viewInfoItem}>
              <Text style={styles.txtItemInfo}>{formatter.format(budget!.total)}</Text>
              <Text style={styles.txtItemTitle}>Total budget</Text>
            </View>
            <View style={styles.viewDevine}/>
            <View style={styles.viewInfoItem}>
              <Text style={styles.txtItemInfo}>{formatter.format(result!.total)}</Text>
              <Text style={styles.txtItemTitle}>Total spent</Text>
            </View>
            <View style={styles.viewDevine}/>
            <View style={styles.viewInfoItem}>
              <Text style={styles.txtItemInfo}>{num} days</Text>
              <Text style={styles.txtItemTitle}>End of {budget!.repeatType}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnTransactions}
          onPress={() => {}}
        >
          <Text style={styles.txtTransactions}>Transactions</Text>
          <Image style={styles.imgRight} source={require('../../../assets/icon/menu/right.png')}/>
        </TouchableOpacity>
      </View>
      }
    </ScrollView>
  )
}

export default BudgetScreen    