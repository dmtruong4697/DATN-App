import { View, Text, ImageSourcePropType, Image, StyleProp, ViewProps, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'

interface IProps {
    size: number,
    iconUri: any,
    additionStyle?: StyleProp<ViewStyle>,
    onPress?: () => void,
}

const TransactionTypeIcon: React.FC<IProps> = ({size, iconUri, additionStyle, onPress}) => {

  return (
    <TouchableOpacity 
        style={[styles.viewContainer, {height: size, width: size}, additionStyle]}
        onPress={onPress}
    >
      <Image style={[styles.imgIcon, {height: size*0.7}]} source={iconUri}/>
    </TouchableOpacity>
  )
}

export default TransactionTypeIcon