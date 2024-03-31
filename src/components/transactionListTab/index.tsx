import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { NavigationProp } from '@react-navigation/native';

interface IProps {
    navigation: NavigationProp<any, any>,
    id: string,
    startTime: string,
    finishTime: string,
    name: string,
}

const TransactionListTab: React.FC<IProps> = ({id, finishTime, name, navigation, startTime}) => {
  return (
    <View style={styles.viewContainer}>
        <Text>{name}</Text>
    </View>
  )
}

export default TransactionListTab