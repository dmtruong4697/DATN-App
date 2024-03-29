import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import { colors } from '../../constants/colors';

interface IProps {}

const TransactionScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [selectedDay, setSelectedDay] = React.useState(new Date().toISOString().slice(0, 10));

  return (
    <View style={styles.viewContainer}>
          <View style={styles.viewHeader}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {navigation.goBack()}}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
            </TouchableOpacity>

            <Text style={styles.txtTitle}>Transactions</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
                // console.log(getAllTransaction(realm));
              }}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
            </TouchableOpacity>
          </View>
          
          <CalendarProvider style={{flex: 1,}} date={new Date().toISOString()}>

          </CalendarProvider>
    </View>
  )
}

export default TransactionScreen    