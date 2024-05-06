import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { calculateTax } from '../../services/personalTax';

interface IProps {}

const PersonalTaxScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
    });

    const [tn, setTn] = useState(0);
    const [bh, setBh] = useState(0);
    const [zone, setZone] = useState('Zone 1');
    const [snpt, setSnpt] = useState(0);

    const handleRefresh = () => {
      setTn(0);
      setBh(0);
      setZone('Zone 1');
      setSnpt(0);
    }

    const handleCalculate = () => {
      const result = calculateTax(tn, bh, snpt, zone);
      navigation.navigate('TaxResult', {result: result});
    }

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Personal Tax</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            handleRefresh();
          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/personalTaxScreen/refresh.png')}/>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default PersonalTaxScreen    