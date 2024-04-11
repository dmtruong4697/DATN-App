import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles';

interface IProps {
    groupId: string,
    name: string,
    ownerId: string,
    iconUri?: ImageSourcePropType,
    onPress: () => void,
}

const GroupCard: React.FC<IProps> = ({groupId, name, onPress, iconUri, ownerId}) => {
  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={onPress}
    >
        <View style={styles.viewIcon}>

        </View>

        <View style={styles.viewContent}>
            <Text style={styles.txtName}>{groupId}</Text>
            <Text style={styles.txtOwner}>Owner Name</Text>
        </View>
    </TouchableOpacity>
  )
}

export default GroupCard