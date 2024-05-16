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
import { useTranslation } from 'react-i18next';

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
  const {t} = useTranslation();

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

            <Text style={styles.txtTitle}>{t('ews-update wallet title')}</Text>
            
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
          <Text style={styles.txtFormItemTitle}>{t('ews-name')}</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(text) => {setName(text)}}
            value={name}
          />
        </View>

        {/* balance */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ews-balance')}</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(number) => {setBalance(Number(number))}}
            keyboardType='numeric'
            value={balance.toString()}
          />
        </View>

        {/* currency unit */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ews-unit')}</Text>
          <TouchableOpacity
            style={styles.viewFormItem}
          >
            <Text style={styles.txtTypeName}>{currencyUnitCode}</Text>
          </TouchableOpacity>
        </View>

        <Button
          content={t('ews-update wallet button')}
          onPress={() => {
            handleUpdateWallet();
          }}
          containerStyle={{}}
          contentStyle={{}}
        />

        <Button
          content={t('ews-cancel')}
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