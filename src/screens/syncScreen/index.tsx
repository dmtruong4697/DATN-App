import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingMenuData1, SettingMenuData2 } from '../../data/settingMenuData';
import SettingItem from '../../components/settingItem';
import { observer } from 'mobx-react'
import { colors } from '../../constants/colors';
import { SyncStore } from '../../mobx/sync';
import Button from '../../components/button';
import { uploadData } from '../../services/sync';
import { RealmContext } from '../../realm/models';
import { useTranslation } from 'react-i18next';

interface IProps {}

const SyncScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false);

    const uploadUserData = async() => {
      setIsLoading(true);
      await uploadData(realm);
      setIsLoading(false);
    }

    function formatDate(isoString: string): string {
      // Tạo một đối tượng Date từ chuỗi ISO
      const date = new Date(isoString);
  
      // Lấy các thành phần của ngày và giờ
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng trong Date object bắt đầu từ 0
      const year = date.getUTCFullYear().toString();
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  
      // Định dạng ngày tháng và giờ
      return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
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

        <Text style={styles.txtTitle}>Sync Data</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
        </TouchableOpacity>
      </View>

      <Image style={styles.imgSync} source={require('../../../assets/illustration/syncScreen/sync.png')}/>
      <Text style={styles.txtDescription}>Sync your data to our Server</Text>
      <Text style={styles.txtLastSync}>Your last sync: {formatDate(SyncStore.lastSync)}</Text>

      <View style={styles.viewButtonGroup}>
        <Button
          content='SYNC DATA'
          onPress={() => {
            uploadUserData();
            console.log(SyncStore.lastSync)
          }}
        />
      </View>
      {(isLoading) && 
        <View style={styles.viewLoading}>
            {/* <Text style={styles.txtLoading}>Loading...</Text> */}
            <ActivityIndicator color={colors.PrimaryColor} size={100}/>
        </View>
      }

    </ScrollView>
  )
}

export default observer(SyncScreen)    