import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles';

interface IProps {
    _id: Realm.BSON.ObjectId;
    name: string;
    currencyUnit: string,
    balance: number,
    onPress: () => void,
}

const WalletCard: React.FC<IProps> = ({_id, name, balance, currencyUnit, onPress}) => {
  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={onPress}
    >
        <Text style={styles.txtCode}>{currencyUnit}</Text>
        <View style={styles.viewDetail}>
            <Text style={styles.txtName}>{name}</Text>
            <Text style={styles.txtBalance}>{balance} {currencyUnit}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default WalletCard