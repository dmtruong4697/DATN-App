import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';

interface IProps {}

const TaxResultScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {t} = useTranslation();

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

    const [insurance, setInsurance] = useState(false);
    const [deduction, setDeduction] = useState(false);

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{t('trs-result')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            console.log(result)
          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.viewGroup}>
        <View style={styles.viewItem}>
          <Text style={styles.txtBold}>{t('trs-income')} </Text>
          <Text style={styles.txtBold}>{formatter.format(result.tn)}</Text>
        </View>
      </View>

      <View style={styles.viewGroup}>
        {/* luong dong bao hiem */}
        <View style={styles.viewItem}>
          <Text style={styles.txtDefault}>{t('trs-insurance amount')}</Text>
          <Text style={styles.txtDefault}>{formatter.format(result.bh)}</Text>
        </View>

        {/* trich nop bao hiem */}
        <TouchableOpacity
          style={styles.viewItem}
          onPress={() => {setInsurance(!insurance)}}
        >
          {(!insurance) && <Image style={styles.imgDown} source={require('../../../assets/icon/taxResultScreen/down.png')}/>}
          {(insurance) && <Image style={styles.imgDown} source={require('../../../assets/icon/taxResultScreen/up.png')}/>}
          <Text style={styles.txtDefaultTitle}>{t('trs-insurance deduction')}</Text>
          <Text style={styles.txtDefault}>{formatter.format(result.tnbh)}</Text>
        </TouchableOpacity>
        {(insurance) &&
        <View>
          <View style={styles.viewSub}>
            <Text style={styles.txtSub}>{t('trs-social insurance')}</Text>
            <Text style={styles.txtSub}>{formatter.format(result.bhxh)}</Text>
          </View>

          <View style={styles.viewSub}>
            <Text style={styles.txtSub}>{t('trs-health insurance')}</Text>
            <Text style={styles.txtSub}>{formatter.format(result.bhyt)}</Text>
          </View>

          <View style={styles.viewSub}>
            <Text style={styles.txtSub}>{t('trs-unemployment insurance')}</Text>
            <Text style={styles.txtSub}>{formatter.format(result.bhtn)}</Text>
          </View>
        </View>
        
        }
        {/* giam tru */}
        <TouchableOpacity 
          style={styles.viewItem}
          onPress={() => {setDeduction(!deduction)}}
        >
          {(!deduction) && <Image style={styles.imgDown} source={require('../../../assets/icon/taxResultScreen/down.png')}/>}
          {(deduction) && <Image style={styles.imgDown} source={require('../../../assets/icon/taxResultScreen/up.png')}/>}
          <Text style={styles.txtDefaultTitle}>{t('trs-deductions')}</Text>
          <Text style={styles.txtDefault}>{formatter.format(result.gt)}</Text>
        </TouchableOpacity>

        {(deduction) && 
        <View>
          {/* giam tru ban than */}
          <View style={styles.viewSub}>
            <Text style={styles.txtSub}>{t('trs-personal deduction')}</Text>
            <Text style={styles.txtSub}>{formatter.format(result.gtbt)}</Text>
          </View>
          {/* giam tru nguoi phu thuoc */}
          <View style={styles.viewSub}>
            <Text style={styles.txtSub}>{t('trs-dependent deduction')}</Text>
            <Text style={styles.txtSub}>{formatter.format(result.gtnpt)}</Text>
          </View>
        </View>
        }
      </View>

      <View style={styles.viewGroup}>
        <View style={styles.viewItem}>
          <Text style={styles.txtBoldTitle}>{t('trs-taxable income')}</Text>
          <Text style={styles.txtBold}>{formatter.format(result.tntt)}</Text>
        </View>
      </View>

      <View style={styles.viewGroup}>
        <View style={styles.viewTax}>
          <Text style={styles.txtDefault}>{t('trs-personal income tax')}</Text>
          <Text style={styles.txtTax}>{formatter.format(result.t)}</Text>
        </View>
        <View style={styles.viewItem}>
          <Text style={styles.txtBoldTitle}>{t('trs-income after tax')}</Text>
          <Text style={styles.txtBold}>{formatter.format(result.tnst)}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.viewButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={[styles.txtBold, {color: colors.PrimaryColor,}]}>{t('trs-done')}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default TaxResultScreen    