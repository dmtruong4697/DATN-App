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
    name: string,
    eName: string,
    code: string,
    iconUrl: ImageSourcePropType,
}

const LanguageItem: React.FC<IProps>  = ({id, code, eName, iconUrl, name}) => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const changeLanguage = (value: string) => { 
         i18n 
          .changeLanguage(value) 
          .then(() => {}) 
          .catch(err => console.log(err)); 

          SettingStore.setLanguage(value)
      }; 

    const {t} = useTranslation(); 

  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={() => {
            changeLanguage(code);
            // console.log(SettingStore.language)
        }}
    >
        <Image style={styles.imgFlag} source={iconUrl}/>
        <View style={styles.viewText}>
            <Text style={styles.txtName}>{name}</Text>
            <Text style={styles.txtEName}>{eName}</Text>
            {/* <Text>{t('hello')}</Text> */}
        </View>

        {(SettingStore.language == code) && 
            <TouchableOpacity
                style={styles.viewCheck}
                onPress={() => {
                    
                }}
            >
                <Image style={styles.imgCheck} source={require('../../../assets/icon/shoppingListItemCard/check.png')}/>
            </TouchableOpacity>
        }
    </TouchableOpacity>
  )
}

export default observer(LanguageItem)
