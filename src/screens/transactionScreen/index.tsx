import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
import { colors } from '../../constants/colors';
import { generateMonth, generateWeek } from '../../realm/services/dateTime';
import { SceneMap, TabBar, TabBarProps, TabView } from 'react-native-tab-view';
import TransactionListTab from '../../components/transactionListTab';
import { ScrollView } from 'react-native-gesture-handler';

interface IProps {}

const TransactionScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const tabData = generateMonth(5).reverse();
    const renderScene = SceneMap(
      tabData.reduce((scenes: any, tab) => {
        scenes[tab.id] = () =>  
          <TransactionListTab
            id={tab.id.toString()}
            name={tab.name}
            finishTime={tab.finishTime}
            navigation={navigation}
            startTime={tab.startTime}
          />;
        return scenes;
      }, {})
    );

  // Sử dụng indexState và setIndexState thay vì index và setIndex
  const [index, setIndex] = React.useState(0);

  // Tạo routes dựa trên data được truyền vào
  const routes= React.useMemo(() => (
    tabData.map((item) => ({ key: item.id, title: item.name, }))
  ), [tabData]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.PrimaryColor, }}
      style={{ backgroundColor: '#FFFFFF',}}
      labelStyle={{ textTransform: 'capitalize', fontSize: 14, fontWeight: '700', color: '#A5A7B9' }}
      activeColor={colors.PrimaryColor}
      scrollEnabled
    />
  );
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
                console.log(generateWeek(4));
              }}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
            </TouchableOpacity>
          </View>

          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex }
            initialLayout={{ width: layout.width }}
            overScrollMode={'always'}
            // style={{width: 600}}
            renderTabBar={renderTabBar}
          />
          
    </View>
  )
}

export default TransactionScreen    