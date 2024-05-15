import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingMenuData1 } from '../../data/settingMenuData';
import SettingItem from '../../components/settingItem';
import { observer } from 'mobx-react'
import { LanguageData } from '../../data/languageData';
import LanguageItem from '../../components/languageItem';

interface IProps {}

const ChangeLanguageScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Select language</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
        </TouchableOpacity>
      </View>

      {/* list */}
      <View style={styles.viewGroup}>
        <FlatList
          data={LanguageData}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({item}) => (
            <LanguageItem
                id={item.id}
                code={item.code}
                eName={item.eName}
                iconUrl={item.iconUrl}
                name={item.name}
            />
          )}
          // contentContainerStyle={{width: layout.width-18, gap: 5,}}
        />
      </View>

    </View>
  )
}

export default observer(ChangeLanguageScreen)    