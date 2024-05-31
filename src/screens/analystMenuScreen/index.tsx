import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView, ToastAndroid } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingMenuData1, SettingMenuData2 } from '../../data/settingMenuData';
import SettingItem from '../../components/settingItem';
import { observer } from 'mobx-react'
import Button from '../../components/button';
import { changePassword } from '../../services/auth';
import { useTranslation } from 'react-i18next';
import { AnalystMenuData } from '../../data/analystMenuData';
import AnalystMenuItem from '../../components/analystMenuItem';

interface IProps {}

const AnalystMenuScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {t} = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Analyst Menu</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
        </TouchableOpacity>
      </View>

      <View style={styles.viewList}>
      <FlatList
        data={AnalystMenuData}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        numColumns={2}
        renderItem={({item}) => (
          <AnalystMenuItem
            id={item.id}
            title={item.title}
            backgroundColor={"white"}
            onPress={() => item.onPress(navigation)}
            iconUrl={item.iconUrl}
          />
        )}
        contentContainerStyle={{width: '100%', gap: 20, alignItems: 'center', paddingVertical: 10,}}
        columnWrapperStyle={{gap: 20,}}
      />
      </View>

    </ScrollView>
  )
}

export default observer(AnalystMenuScreen)    