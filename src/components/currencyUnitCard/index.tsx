import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles';

interface IProps {
    id: string,
    name: string,
    symbol: string,
    code: string,
    onPress: () => void,
}

const CurrencyUnitCard: React.FC<IProps> = ({id, name, symbol, code, onPress}) => {
  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={onPress}
    >
        <Text style={styles.txtCode}>{code}</Text>
        <Text style={styles.txtName}>{name}</Text>
    </TouchableOpacity>
  )
}

export default CurrencyUnitCard