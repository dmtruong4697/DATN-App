import { View, Text, TouchableOpacity, ImageSourcePropType, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'

interface IProps {
    id: string,
    backgroundColor?: string,
    iconUrl?: ImageSourcePropType,
    title?: string,
    onPress?: () => void,
}

const MenuItem1: React.FC<IProps> = ({backgroundColor, iconUrl, id, onPress, title}) => {
  return (
    <TouchableOpacity style={styles.viewContainer}>
        <Image style={styles.imgIcon} source={iconUrl}/>
        <Text style={styles.txtTitle}>{title}</Text>
        <Image style={styles.imgIcon} source={require('../../../assets/icon/menu/edit.png')}/>
    </TouchableOpacity>
  )
}

export default MenuItem1