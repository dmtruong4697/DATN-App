import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarList } from 'react-native-calendars';
import { colors } from '../../constants/colors';
import { RangeContext } from '../../navigator/mainNavigator';

interface IProps {}

const CalendarListScreen: React.FC<IProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {startTime, finishTime, setStartTime, setFinishTime, inputType} = useContext(RangeContext);

  return (
    <View>
        <CalendarList
            pastScrollRange={10}
            futureScrollRange={10}
            scrollEnabled={true}
            showScrollIndicator={true}
            onDayPress={day => {
                if(inputType == 0) setStartTime(day.dateString);
                    else setFinishTime(day.dateString);
                console.log('selected day', day);
                navigation.goBack();
            }}
            markedDates={{
                [(inputType == 0)? startTime:finishTime]: {selected: true, selectedColor: colors.PrimaryColor, },
            }}
        />
    </View>
  )
}

export default CalendarListScreen