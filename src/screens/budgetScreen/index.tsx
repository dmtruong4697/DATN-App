import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, ScrollView, Dimensions, Alert } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { getBudgetAnalyst } from '../../realm/services/analyst';
import { LineChart } from 'react-native-gifted-charts';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { transaction } from 'mobx';

interface IProps {}

const BudgetScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [budget, setBudget] = useState<any>(getAllBudget(realm)[0]);
    const [result, setResult] = useState<any>((getAllBudget(realm)[0])? getBudgetDetail(realm, getAllBudget(realm)[0]._id, getAllBudget(realm)[0].startTime, getAllBudget(realm)[0].finishTime):{
      transactions: undefined,
      total: 0,
    });
    const [outstandingDay, setOutstandingDay] = useState<number>(0);
    const [passedDay, setPassedDay] = useState<number>(0)
    const isFocus = useIsFocused();
  
    useEffect(() => {
        setBudget(getAllBudget(realm)[0]);
        // renewBudgetById(realm, budget._id);
        if(budget) {
        setResult(getBudgetDetail(realm, getAllBudget(realm)[0]._id, getAllBudget(realm)[0].startTime, getAllBudget(realm)[0].finishTime));
        const n = new Date();
        const f = new Date(budget!.finishTime);
        const s = new Date(budget!.startTime);

        setOutstandingDay(Number(f.getDate()) - Number(n.getDate()));
        setPassedDay(Number(n.getDate()) - Number(s.getDate()) +1);
        }
    }, [isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: (budget)? budget!.unitCurrency:'VND',
    });

    //option bottom sheet
    const bottomSheetOptionModalRef = useRef<BottomSheetModal>(null);
    const optionSnapPoints = useMemo(() => ['25%', '50%'], []);
    const handlePresentOptionModalPress = useCallback(() => {
        bottomSheetOptionModalRef.current?.present();
    }, []);
    
    const handleCloseOptionModal = useCallback(() => {
        bottomSheetOptionModalRef.current?.close();
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

    // delete alert
    const showDeleteAlert = () =>
      Alert.alert('Delete Budget', 'Are you sure to delete this budget?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'SURE', onPress: () => {
          deleteBudgetById(realm, budget._id);
          handleCloseOptionModal();
          setBudget(getAllBudget(realm)[0]);
        }},
    ]);

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
              handlePresentOptionModalPress();
            }}
          >
            <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
            style={styles.btnDate}
            onPress={() => {
              // console.log(result)
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
              tintColor={(budget.total < result.total)? colors.ErrorColor:colors.PrimaryColor}
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
                    {(budget.total < result.total) && <Text style={styles.txtOver}>Over</Text>}
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
              <Text style={styles.txtItemInfo}>{outstandingDay} days</Text>
              <Text style={styles.txtItemTitle}>End of {budget!.repeatType}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnTransactions}
          onPress={() => {
            console.log(result)
          }}
        >
          <Text style={styles.txtTransactions}>Transactions</Text>
          <Image style={styles.imgRight} source={require('../../../assets/icon/menu/right.png')}/>
        </TouchableOpacity>

        <View style={styles.viewChart}>
          <Text style={styles.txtChartTitle}>Expense chart</Text>
          <LineChart
            data={getBudgetAnalyst(realm, budget._id, budget.startTime, budget.finishTime)}
            color={colors.PrimaryColor}
            thickness={3}
            dataPointsColor={'#2a4a35'}
            yAxisThickness={0}
            hideYAxisText
            xAxisThickness={0}
            initialSpacing={10}
            backgroundColor={"#FFFFFF"}
            scrollToIndex={Number((new Date()).getDate()) - 3}
          />
        </View>

        <View style={styles.viewSuggest}>
          <View style={styles.viewSuggestItem}>
            <Text style={styles.txtSuggestTitle}>Actual expense</Text>
            <Text style={styles.txtSuggest}>{formatter.format(result.total/passedDay)} / day</Text>
          </View>
          {((outstandingDay > 0) && (budget.total - result.total >= 0)) &&
            <View style={styles.viewSuggestItem}>
              <Text style={styles.txtSuggestTitle}>Recommend spend</Text>
              <Text style={styles.txtSuggest}>{formatter.format((budget.total - result.total)/outstandingDay)} / day</Text>
            </View>
          }
        </View>
      </View>
      }

      {/* <TouchableOpacity onPress={() => {deleteBudgetById(realm, budget._id)}}><Text>delete</Text></TouchableOpacity> */}
      {/* <TouchableOpacity onPress={() => {console.log(getBudgetAnalyst(realm, budget._id, budget.startTime, budget.finishTime))}}><Text>delete</Text></TouchableOpacity> */}

      {/* bottom option modal */}
      <BottomSheetModalProvider>
        <View style={{}}>
          <BottomSheetModal
            ref={bottomSheetOptionModalRef}
            index={1}
            snapPoints={optionSnapPoints}
            onChange={handleOptionSheetChanges}
            backdropComponent={renderOptionBackdrop}
            handleIndicatorStyle={{
              backgroundColor: 'transparent',
            }}
          >
            <BottomSheetView style={styles.viewModal}>
              <Text style={styles.txtModalTitle}>Manage Budget</Text>
              {/* edit */}
              <TouchableOpacity
                style={styles.btnOption}
                onPress={() => {
                  // handleCloseOptionModal();
                }}
              >
                <Image style={styles.imgOptionIcon} source={require('../../../assets/icon/shoppingListScreen/edit.png')}/>
                <Text style={styles.txtOptionButton}>Edit</Text>
              </TouchableOpacity>

              {/* delete */}
              <TouchableOpacity
                style={styles.btnOption}
                onPress={() => {
                  showDeleteAlert();
                }}
              >
                <Image style={[styles.imgOptionIcon]} source={require('../../../assets/icon/shoppingListScreen/delete.png')}/>
                <Text style={[styles.txtOptionButton, {color: '#CD3131'}]}>Delete</Text>
              </TouchableOpacity>

            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </ScrollView>
  )
}

export default BudgetScreen    