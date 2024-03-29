import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import { styles } from './styles'

interface IProps {
    id: string,
    backgroundColor?: string,
    iconUrl?: ImageSourcePropType,
    title?: string,
    onPress?: () => void,
}

const MenuItem: React.FC<IProps> = ({backgroundColor, iconUrl, id, onPress, title}) => {
  return (
    <View style={styles.viewContainer}>
        <TouchableOpacity 
            style={[styles.btnContainer, {backgroundColor: backgroundColor}]}
            onPress={onPress}
        >
            <Text>MenuItem</Text>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{title}</Text>
    </View>
  )
}

export default MenuItem