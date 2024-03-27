import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles';

interface IProps {
    _id: Realm.BSON.ObjectId;
    name: string;
    income: boolean;
    iconUrl: string;
    onPress: () => void;
}

const TransactionTypeCard: React.FC<IProps> = ({_id, iconUrl, income, name, onPress}) => {
  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={onPress}
    >
        <Image style={styles.imgIcon} source={require('../../../assets/icon/addTransaction/addType.png')}/>
        <Text style={styles.txtName}>{name}</Text>
    </TouchableOpacity>
  )
}

export default TransactionTypeCard