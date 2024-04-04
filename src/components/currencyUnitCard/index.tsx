import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles';

interface IProps {
    id: string,
    name: string,
    symbol: string,
    code: string,
    iconUri: ImageSourcePropType,
    onPress: () => void,
}

const CurrencyUnitCard: React.FC<IProps> = ({id, name, symbol, code, onPress, iconUri}) => {
  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={onPress}
    >
        <Text style={styles.txtCode}>{code}</Text>
        <Text style={styles.txtName}>{name}</Text>
        <Image style={styles.imgFlag} source={iconUri}/>
    </TouchableOpacity>
  )
}

export default CurrencyUnitCard