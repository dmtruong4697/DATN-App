import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getUserInfo } from '../../services/user';
import { getGroupDetail } from '../../services/group';
import { RealmContext } from '../../realm/models';
import { getSavingById } from '../../realm/services/saving';

interface IProps {
    _id: Realm.BSON.ObjectId;
}

const SavingCard: React.FC<IProps> = ({_id}) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {useRealm} = RealmContext;
  const realm = useRealm();

  let saving = getSavingById(realm, _id);

  useEffect(() => {
      saving = getSavingById(realm, _id);
  },[])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: saving!.currencyUnit,
});

  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={() => {navigation.navigate('SavingDetail', {_id: _id})}}
    >
        <View style={styles.viewIcon}>

        </View>

        <View style={styles.viewContent}>
            <Text style={styles.txtName}>{saving?.name}</Text>
            <Text style={styles.txtOwner}>{formatter.format(saving!.total)}</Text>
        </View>

        <Text style={styles.txtProfit}>{saving!.profit}%</Text>
    </TouchableOpacity>
  )
}

export default SavingCard