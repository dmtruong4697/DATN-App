import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GroupCard from '../../components/groupCard';
import { getGroupList, joinGroup } from '../../services/group';
import { RealmContext } from '../../realm/models';
import { getAllWallet } from '../../realm/services/wallets';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../../components/button';
import { observer } from 'mobx-react'
import { TimeRangeData } from '../../data/timeRangeData';
import { ExportDataStore } from '../../mobx/exportData';
import { colors } from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface IProps {}

const ExportDataPickTimeScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    // const [start, setStart] = useState((new Date()).toISOString().slice(0, 10));
    // const [finish, setFinish] = useState((new Date()).toISOString().slice(0, 10));
    const [isCustom, setIsCustom] = useState(false);

    // date time modal
    // start date
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);

    const showStartDatePicker = () => {
      setStartDatePickerVisibility(true);
    };
  
    const hideStartDatePicker = () => {
      setStartDatePickerVisibility(false);
    };
  
    const handleStartDateConfirm = (date: Date) => {
      ExportDataStore.setStartTime(date.toISOString().slice(0, 10));
      hideStartDatePicker();
    };

    // date time modal
    // finish date
    const [isFinishDatePickerVisible, setFinishDatePickerVisibility] = useState(false);

    const showFinishDatePicker = () => {
      setFinishDatePickerVisibility(true);
    };
  
    const hideFinishDatePicker = () => {
      setFinishDatePickerVisibility(false);
    };
  
    const handleFinishDateConfirm = (date: Date) => {
      ExportDataStore.setFinishTime(date.toISOString().slice(0, 10));
      hideFinishDatePicker();
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

        <Text style={styles.txtTitle}>{t('edpts-pick time range')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          {/* <Text style={styles.txtEdit}>ADD</Text> */}
          <Image style={styles.imgButtonDone} source={require('../../../assets/icon/exportDataScreen/done.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.viewList}>
        <FlatList
            data={TimeRangeData}
            extraData={ExportDataStore.rangeType}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <TouchableOpacity
                    style={styles.viewRangeItem}
                    onPress={item.onPress}
                >
                    <Text style={styles.txtItem}>{item.name}</Text>
                    {(item.type == ExportDataStore.rangeType) && 
                        <TouchableOpacity
                            style={styles.viewCheck}
                            onPress={() => {
                                
                            }}
                        >
                            <Image style={styles.imgCheck} source={require('../../../assets/icon/shoppingListItemCard/check.png')}/>
                        </TouchableOpacity>
                    }
                </TouchableOpacity>
            )}
            style={{width: '100%',}}
            showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
            style={styles.viewCustomItem}
            onPress={() => {
                ExportDataStore.setCustomTime();
            }}
        >
            <Text style={styles.txtItem}>{t('edpts-custom')}</Text>
            {('custom' == ExportDataStore.rangeType) && 
                <TouchableOpacity
                    style={styles.viewCheck}
                    onPress={() => {
                        
                    }}
                >
                    <Image style={styles.imgCheck} source={require('../../../assets/icon/shoppingListItemCard/check.png')}/>
                </TouchableOpacity>
            }
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.viewRange}
            onPress={() => {
                // ExportDataStore.setCustomTime();
                showStartDatePicker();
            }}
        >
            <Text style={styles.txtRange}>{t('edpts-from')}:</Text>
            <Text style={styles.txtRangeDate}>{ExportDataStore.startTime}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.viewRange}
            onPress={() => {
                // ExportDataStore.setCustomTime();
                showFinishDatePicker();
            }}
        >
            <Text style={styles.txtRange}>{t('edpts-to')}:</Text>
            <Text style={styles.txtRangeDate}>{ExportDataStore.finishTime}</Text>
        </TouchableOpacity>

      </View>

        {/* start time modal */}
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode='date'
          onConfirm={handleStartDateConfirm}
          onCancel={hideStartDatePicker}
          // date={new Date()}
        />

        {/* finish time modal */}
        <DateTimePickerModal
          isVisible={isFinishDatePickerVisible}
          mode='date'
          onConfirm={handleFinishDateConfirm}
          onCancel={hideFinishDatePicker}
          // date={new Date()}
        />

    </View>
  )
}

export default observer(ExportDataPickTimeScreen)