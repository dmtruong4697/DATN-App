import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../constants/colors';
import { RangeContext } from '../../navigator/mainNavigator';

interface IProps {}

const CalendarListScreen: React.FC<IProps> = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {startTime, finishTime, setStartTime, setFinishTime, inputType} = useContext(RangeContext);

  return (
    <View>

    </View>
  )
}

export default CalendarListScreen