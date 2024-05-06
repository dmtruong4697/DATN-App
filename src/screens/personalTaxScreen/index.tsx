import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { calculateTax } from '../../services/personalTax';
import Button from '../../components/button';

interface IProps {}

const PersonalTaxScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
    });

    const [tn, setTn] = useState(0);
    const [tns, setTns] = useState(formatter.format(tn));
    const [bh, setBh] = useState(0);
    const [bhs, setBhs] = useState(formatter.format(bh));
    const [zone, setZone] = useState('Zone 1');
    const [snpt, setSnpt] = useState(0);

    const handleRefresh = () => {
      setTn(0);
      setBh(0);
      setZone('Zone 1');
      setSnpt(0);

      setTns(formatter.format(tn));
      setBhs(formatter.format(bh));
      setSnpt(0);
    }

    const handleCalculate = () => {
      const result = calculateTax(tn, bh, snpt, zone);
      navigation.navigate('TaxResult', {result: result});
    }

    const handleIncomeChange = (text: string): void => {
      const numericValue = parseFloat(text.replace(/[^0-9]/g, '')); 
      setTn(numericValue); 
  
      const formattedValue = formatter.format(numericValue); 
      setTns(formattedValue); 
    };

    const handleBhChange = (text: string): void => {
      const numericValue = parseFloat(text.replace(/[^0-9]/g, '')); 
      setBh(numericValue); 
  
      const formattedValue = formatter.format(numericValue); 
      setBhs(formattedValue); 
    };

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

      <View style={styles.viewGroup1}>
        <View style={styles.viewInputContainer}>
          <Text style={styles.txtInputTitle}>Income</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => {
              handleIncomeChange(text);
            }}
            value={tns}
            keyboardType='numeric'
          />
        </View>

        <View style={styles.viewInputContainer}>
          <Text style={styles.txtInputTitle}>Insurance Amount</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => {
              handleBhChange(text);
            }}
            value={bhs}
            keyboardType='numeric'
          />
        </View>
      </View>

      <View style={styles.viewGroup1}>
        <View style={styles.viewInput2Container}>
          <Text style={styles.txtInputTitle}>Number of dependents</Text>
          <TextInput
            style={styles.input2Field}
            onChangeText={(text) => {setSnpt(Number(text))}}
            value={snpt.toString()}
            keyboardType='numeric'
          />
        </View>
      </View>

      <Button
        content='Calculate'
        onPress={() => {
          handleCalculate();
        }}
        containerStyle={{
          width: '96%',
          borderRadius: 5,
        }}
      />
    </View>
  )
}

export default PersonalTaxScreen    