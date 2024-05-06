import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';

interface IProps {}

const TaxResultScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const route = useRoute<RouteProp<RootStackParamList, 'TaxResult'>>();
    const {result} = route.params;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
    });

    const [tn, setTn] = useState(0);
    const [bh, setBh] = useState(0);
    const [zone, setZone] = useState('Zone 1');
    const [snpt, setSnpt] = useState(0);
    
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Result</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default TaxResultScreen    