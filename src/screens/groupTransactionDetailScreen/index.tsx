import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ToastAndroid } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { deleteTransactionById, getTransactionById } from '../../realm/services/transactions';
import { RealmContext } from '../../realm/models';
import { getTransactionTypeById } from '../../realm/services/transactionType';
import { getWalletById } from '../../realm/services/wallets';
import { useTranslation } from 'react-i18next';
import { TypeIconData } from '../../data/typeIconData';
import { deleteTransaction, getGroupTransaction } from '../../services/transaction';
import { getUserInfo } from '../../services/user';
import { UserStore } from '../../mobx/auth';

interface IProps {

}

const GroupTransactionDetailScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const route = useRoute<RouteProp<RootStackParamList, 'GroupTransactionDetail'>>();
    const {transactionId, userId, groupId} = route.params;

    const [transactionDetail, setTransactionDetail] = useState<any>({});
  
    const fetchTransactionInfo = async() => {
      const transaction = await getGroupTransaction(transactionId);
      setTransactionDetail(transaction);
    }

    const [user, setUser] = useState<any>({})
    const getUserDetail = async() => {
        const u = await getUserInfo(userId);
        setUser(u);
    }

    const isFocus = useIsFocused();
    useEffect(() => {
        fetchTransactionInfo();
        getUserDetail();
    },[isFocus])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    });

    const showToast = (message: string) => {
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
    };

    const handleDelete = async() => {
        await deleteTransaction(navigation, transactionId, groupId)
        .then((message: string) => {
            showToast(message);
        });
    }


  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{t('tds-transaction detail')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.view1}>
          <Image style={styles.imgTypeIcon} source={{uri: user.avatarImage}}/>
          <View>
            {/* <Text style={styles.txtType}>{transactionType?.name}</Text> */}
            <Text style={[styles.txtTotal, {color: '#F95B51'}]}>{formatter.format(Number(transactionDetail.total))}</Text>
          </View>
      </View>

      <View style={styles.view2}>
        <Image style={styles.imgDateIcon} source={require('../../../assets/icon/transactionDetail/calendar.png')}/>
        <View style={{gap: 10,}}>
            <Text style={styles.txtDate}>{transactionDetail?.createAt}</Text>
            <Text style={styles.txtDate}>{t('tds-note')}: {transactionDetail.note}</Text>
            {/* <Text style={styles.txtDate}>{wallet?.name}</Text> */}
        </View>
      </View>

    {(UserStore.user.id == userId) && 
      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => {
            handleDelete();
            // navigation.goBack();
        }}
      >
        <Text style={styles.txtDelete}>{t('tds-delete')}</Text>
      </TouchableOpacity>
    }
    </View>
  )
}

export default GroupTransactionDetailScreen    