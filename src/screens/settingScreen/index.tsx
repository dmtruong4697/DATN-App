import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingMenuData1, SettingMenuData2, SettingMenuData3 } from '../../data/settingMenuData';
import SettingItem from '../../components/settingItem';
import { observer } from 'mobx-react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SettingStore } from '../../mobx/setting';

interface IProps {}

const SettingScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [createTime, setCreateTime] = useState(new Date());
    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (date: Date) => {
      console.warn("A date has been picked: ", date.getTime());
      SettingStore.setNotificationTime(date.getTime());
      setCreateTime(date);
      hideTimePicker();
    };

    function convertTime(isoDate: Date) {
      let date = new Date(isoDate);
  
      date.setHours(date.getHours() + 0);
  
      let hours = date.getHours();
      let minutes = date.getMinutes().toString();
  
      if (Number(minutes) < 10) {
          minutes = '0' + minutes;
      }
  
      let timeString = `${hours}:${minutes}`;
  
      return timeString;
  }
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

      {/* security */}
      <Text style={styles.txtGroupTitle}>SECURITY</Text>
      <View style={styles.viewGroup}>
        <FlatList
          data={SettingMenuData2}
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

      {/* security */}
      <Text style={styles.txtGroupTitle}>NOTIFICATION</Text>
      <View style={styles.viewGroup}>
        {/* <FlatList
          data={SettingMenuData3}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({item}) => (
            <SettingItem
              id={item.id}
              title={item.title}
              state={item.state}
              // onPress={() => item.onPress(navigation)}
              onPress={() => {}}
              renderToggle={item.renderToggle}
              onPressToggle={item.onPressToggle}
              toggleState={item.toggleState}
            />
          )}
          // contentContainerStyle={{width: layout.width-18, gap: 5,}}
        /> */}
        <SettingItem
          id={'1234'}
          title={'Enable Notification'}
          // state={convertTime(createTime)}
          // state={SettingStore.setNotificationEnable}
          onPress={() => {}}
          renderToggle={true}
          toggleState={SettingStore.notificationEnable}
          onPressToggle={() => SettingStore.setNotificationEnable(!SettingStore.notificationEnable)}
        />
        <SettingItem
          id={'123'}
          title={'Notification Time'}
          // state={convertTime(createTime)}
          state={SettingStore.formattedNotificationTime()}
          onPress={() => {showTimePicker()}}
          renderToggle={false}
        />
      </View>

        {/* create time modal */}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode='time'
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />

    </ScrollView>
  )
}

export default observer(SettingScreen)    