import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuItem from '../../components/menuItem';
import { getAllBudget } from '../../realm/services/budgets';
import { RealmContext } from '../../realm/models';
import Button from '../../components/button';

interface IProps {}

const BudgetScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    let budget = getAllBudget(realm)[0];
    const isFocus = useIsFocused();
  
    useEffect(() => {
        budget = getAllBudget(realm)[0];
    }, [isFocus])

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
    </ScrollView>
  )
}

export default BudgetScreen    