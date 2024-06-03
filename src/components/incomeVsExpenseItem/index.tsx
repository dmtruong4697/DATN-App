import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import { observer } from 'mobx-react'
import i18n from '../../i18n/i18n';
import { SettingStore } from '../../mobx/setting';
import { useTranslation } from 'react-i18next';

interface IProps {
    id: string,
    title: string,
    income: number,
    expense: number,
    currencyUnit: string,
}

const IncomeVsExpenseItem: React.FC<IProps>  = ({id, expense, income, title, currencyUnit}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const {t} = useTranslation(); 

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyUnit,
    });

  return (
    <View style={styles.viewContainer}>
        <Text style={styles.txtTitle}>{title}</Text>
        <View style={styles.viewTotal}>
            <Text style={styles.txtIncome}>{formatter.format(income)}</Text>
            <Text style={styles.txtExpense}>{formatter.format(expense)}</Text>
            <Text style={styles.txtTotal}>{formatter.format(income - expense)}</Text>
        </View>
    </View>
  )
}

export default IncomeVsExpenseItem
