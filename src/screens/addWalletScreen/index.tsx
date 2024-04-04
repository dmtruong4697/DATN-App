import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { RealmContext } from '../../realm/models';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Realm } from "realm";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { styles } from './styles';
import Button from '../../components/button';
import { addWallet, getAllWallet } from '../../realm/services/wallets';
import { CurrencyUnitData } from '../../constants/currencyUnit';
import CurrencyUnitCard from '../../components/currencyUnitCard';
import { FlatList } from 'react-native-gesture-handler';

interface IProps {}

type WalletType = {
  _id: Realm.BSON.ObjectId;
  name: string;
  balance: number;
  currencyUnit: string;
}

const AddWalletScreen: React.FC<IProps> = () => {

  const {useRealm} = RealmContext;
  const realm = useRealm();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [name, setName] = useState('');
  const [balance, setBalance] = useState<number|any>(0);
  const [currencyUnitCode, setCurrencyUnitCode] = useState(CurrencyUnitData[1].code);
  const [currencyUnitName, setCurrencyUnitName] = useState(CurrencyUnitData[1].name);

  // pick currency unit bottom sheet
  const unitBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const unitSnapPoints = useMemo(() => ['25%', '70%'], []);
  const handlePresentUnitModalPress = useCallback(() => {
    unitBottomSheetModalRef.current?.present();
  }, []);
  
  const handleCloseUnitModal = useCallback(() => {
    unitBottomSheetModalRef.current?.close();
  }, []);
  
  const handleUnitSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);
  
  const renderUnitBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      onPress={handleCloseUnitModal}
    />,[]);

  const handleAddWallet = () => {
    const newWallet = {
      _id: new Realm.BSON.ObjectId(),
      name: name,
      currencyUnit: currencyUnitCode,
      balance: balance,
    };

    addWallet(realm, newWallet);
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

            <Text style={styles.txtTitle}>Add Wallet</Text>
            
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
          />
        </View>

        {/* balance */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>BALANCE</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(number) => {setBalance(Number(number))}}
            keyboardType='numeric'
          />
        </View>

        {/* currency unit */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>UNIT</Text>
          <TouchableOpacity
            style={styles.viewFormItem}
            onPress={handlePresentUnitModalPress}
          >
            <Text style={styles.txtTypeName}>{currencyUnitCode} - {currencyUnitName}</Text>
          </TouchableOpacity>
        </View>

        <Button
          content='ADD WALLET'
          onPress={() => {
            handleAddWallet();
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

        {/* modal pick unit */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={unitBottomSheetModalRef}
              index={1}
              snapPoints={unitSnapPoints}
              onChange={handleUnitSheetChanges}
              backdropComponent={renderUnitBackdrop}
            >
              <BottomSheetView style={{flex: 1, padding: 10,}}>
                <FlatList
                  data={CurrencyUnitData}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <CurrencyUnitCard
                      id={item.id}
                      code={item.code}
                      symbol={item.symbol}
                      iconUri={item.iconUri}
                      name={item.name}
                      onPress={() => {
                        setCurrencyUnitCode(item.code);
                        setCurrencyUnitName(item.name);
                        handleCloseUnitModal();
                      }}
                    />
                  )}
                  style={{width: '100%',}}
                  showsVerticalScrollIndicator={false}
                />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
    </View>
  )
}

export default AddWalletScreen