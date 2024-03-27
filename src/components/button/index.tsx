import { View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import { styles } from './styles';

interface IProps {
  content: string;
  containerStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<TextStyle>;
  onPress: () => void;
}

const Button: React.FC<IProps> = ({content, onPress, containerStyle, contentStyle}) => {

  return (
    <View style={styles.viewAddButton}>
        <TouchableOpacity
            style={[styles.btnAddButton, containerStyle]}
            onPress={onPress}
        >
            <Text style={[styles.txtAddButton, contentStyle]}>{content}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Button