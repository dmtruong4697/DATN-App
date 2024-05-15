import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingMenuData1 } from '../../data/settingMenuData';
import SettingItem from '../../components/settingItem';

interface IProps {}

const SettingScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Setting</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
        </TouchableOpacity>
      </View>

      {/* display */}
      <Text style={styles.txtGroupTitle}>DISPLAY</Text>
      <View style={styles.viewGroup}>
        <FlatList
          data={SettingMenuData1}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({item}) => (
            <SettingItem
              id={item.id}
              title={item.title}
              state={item.state}
              onPress={() => item.onPress(navigation)}
              renderToggle={item.renderToggle}
              onPressToggle={item.onPressToggle}
              toggleState={item.toggleState}
            />
          )}
          // contentContainerStyle={{width: layout.width-18, gap: 5,}}
        />
      </View>

    </ScrollView>
  )
}

export default SettingScreen    