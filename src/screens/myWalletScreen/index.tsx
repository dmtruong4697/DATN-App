import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { getAllWallet } from '../../realm/services/wallets';
import WalletCard from '../../components/walletCard';

interface IProps {}

const MyWalletScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    let wallets = getAllWallet(realm);
    const isFocus = useIsFocused();
  
    useEffect(() => {
      wallets = getAllWallet(realm);
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

        <Text style={styles.txtTitle}>My Wallets</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
        </TouchableOpacity>
      </View>

      <View style={styles.viewWalletList}>
      <TouchableOpacity
        style={styles.btnAddWallet}
        onPress={() => {
          navigation.navigate('AddWallet');
        }}
      >
        <Image style={styles.imgAddWalletButton} source={require('../../../assets/icon/addTransaction/addType.png')}/>
        <Text style={styles.txtAddWalletButton}>Add Wallet</Text>
      </TouchableOpacity>

      <FlatList
        data={wallets}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <WalletCard
            _id={item._id}
            balance={item.balance}
            currencyUnit={item.currencyUnit}
            name={item.name}
            onPress={() => {
                navigation.navigate('WalletDetail', {_id: item._id})
            }}
          />
        )}
        style={{width: '100%',}}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </View>
  )
}

export default MyWalletScreen    