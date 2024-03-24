import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {}

type TransactionType = {
  _id: Realm.BSON.ObjectId;
  name: string;
  income: boolean;
  total: number;
  createAt: string;
  transactionTypeId: Realm.BSON.ObjectID;
  walletId: Realm.BSON.ObjectID;
  note: string;
  imageUrl: string;
}

const AddTransactionScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewTopContainer}>
        <View style={styles.viewHeaderBar}>
          <View
            style={{
              flex : 1,
              transform : [ { scaleX : 0.5 } ],
              flexDirection: 'row',
              padding: 15,
              justifyContent: 'space-between',
              // alignItems : 'center',
              // justifyContent : 'center'
            }}
          >
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {navigation.goBack()}}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/back.png')}/>
            </TouchableOpacity>

            <Text style={styles.txtTitle}>Add Transaction</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/option.png')}/>
            </TouchableOpacity>
          </View>
        </View>


      </View>

      <View style={styles.viewFormContainer}>

        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>TRANSACTION TYPE</Text>
          <View style={styles.viewFormItem}>
          </View>
        </View>
        
      </View>
    </View>
  )
}

export default AddTransactionScreen    