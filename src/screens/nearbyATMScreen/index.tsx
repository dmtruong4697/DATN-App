import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, SafeAreaView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { calculateTax } from '../../services/personalTax';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';
import WebView from 'react-native-webview';

interface IProps {}

const NearbyATMScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {t} = useTranslation();

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{'Nearby ATM'}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            // handleRefresh();
          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/personalTaxScreen/refresh.png')}/> */}
        </TouchableOpacity>
      </View>

      <SafeAreaView style={{flex: 1}}>
        <WebView
            source={{ uri: 'https://www.google.com/maps/search/ATM' }}
            style={{flex: 1}}
        />
      </SafeAreaView>

    </View>
  )
}

export default NearbyATMScreen    