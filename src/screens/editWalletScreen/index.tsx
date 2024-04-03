import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { RealmContext } from '../../realm/models';
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Realm } from "realm";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { styles } from './styles';
import Button from '../../components/button';
import { addWallet, getAllWallet, getWalletById, updateWalletById } from '../../realm/services/wallets';
import { CurrencyUnitData } from '../../constants/currencyUnit';
import CurrencyUnitCard from '../../components/currencyUnitCard';
import { FlatList } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../navigator/mainNavigator';

interface IProps {}

type WalletType = {
  _id: Realm.BSON.ObjectId;
  name: string;
  balance: number;
  currencyUnit: string;
}

const EditWalletScreen: React.FC<IProps> = () => {

  const {useRealm} = RealmContext;
  const realm = useRealm();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const route = useRoute<RouteProp<RootStackParamList, 'EditWallet'>>();
  const {_id} = route.params;
  const wallet = getWalletById(realm, _id);

  const [name, setName] = useState(wallet!.name);
  const [balance, setBalance] = useState(wallet!.balance);
  const [currencyUnitCode, setCurrencyUnitCode] = useState(wallet!.currencyUnit);
//   const [currencyUnitName, setCurrencyUnitName] = useState(CurrencyUnitData[1].name);

  const handleUpdateWallet = () => {
    const updatedWallet = {
      _id: wallet!._id,
      name: name,
      currencyUnit: wallet!.currencyUnit,
      balance: balance,
    };

    updateWalletById(realm, _id, updatedWallet);
    navigation.goBack();
  }

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
            }}
          >
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {navigation.goBack()}}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/back.png')}/>
            </TouchableOpacity>

            <Text style={styles.txtTitle}>Update Wallet</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
                // console.log(getAllWallet(realm))
              }}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/option.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.viewFormContainer}>
        {/* name */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>NAME</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(text) => {setName(text)}}
            value={name}
          />
        </View>

        {/* balance */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>BALANCE</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(number) => {setBalance(Number(number))}}
            keyboardType='numeric'
            value={balance.toString()}
          />
        </View>

        {/* currency unit */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>UNIT</Text>
          <TouchableOpacity
            style={styles.viewFormItem}
          >
            <Text style={styles.txtTypeName}>{currencyUnitCode}</Text>
          </TouchableOpacity>
        </View>

        <Button
          content='UPDATE WALLET'
          onPress={() => {
            handleUpdateWallet();
          }}
          containerStyle={{}}
          contentStyle={{}}
        />

        <Button
          content='CANCEL'
          onPress={() => {
            navigation.goBack();
          }}
          containerStyle={{
            backgroundColor: '#FFFFFF',
          }}
          contentStyle={{
            color: '#666666',
          }}
        />

      </View>

    </View>
  )
}

export default EditWalletScreen