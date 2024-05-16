import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView, ToastAndroid } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { RealmContext } from '../../realm/models';
import { getWalletById } from '../../realm/services/wallets';
import { deleteLoanById, getLoanById } from '../../realm/services/loan';
import { getGroupDetail, getGroupTotal, getGroupTransactions, splitMoney } from '../../services/group';
import { getUserInfo } from '../../services/user';
import Clipboard from '@react-native-clipboard/clipboard';
import TransactionCard from '../../components/transactionCard';
import { Realm } from "realm";
import GroupTransactionCard from '../../components/groupTransactionCard';
import SplitDataItem from '../../components/splitDataItem';
import { useTranslation } from 'react-i18next';

interface IProps {}

const SplitMoneyScreen: React.FC<IProps>  = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {useRealm} = RealmContext;
  const realm = useRealm();
  const {t} = useTranslation();

  const route = useRoute<RouteProp<RootStackParamList, 'GroupDetail'>>();
  const {_id} = route.params;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });

  const [groupDetail, setGroupDetail] = useState<any>({});
  const [total, setTotal] = useState(0);
  const [members, setMembers] = useState<any>([]);
  const [splitData, setSplitData] = useState<any>([]);

  const fetchGroupInfo = async() => {
    const group = await getGroupDetail(_id);
    const tot = await getGroupTotal(_id);
    const data = await splitMoney(_id);
      
    setGroupDetail(group);
    setMembers(group.memberIds);
    setTotal(tot);
    setSplitData(data);
  }

  const isFocus = useIsFocused();
  useEffect(() => {
    fetchGroupInfo();
  },[isFocus])

  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{groupDetail.name}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            console.log(splitData);
          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.viewTopInfo}>
        <View style={styles.viewInfo}>
            <Text style={styles.txtInfoTitle}>{t('sms-total')}</Text>
            <Text style={styles.txtInfo}>{formatter.format(total)}</Text>
        </View>
        <View style={styles.viewInfo}>
            <Text style={styles.txtInfoTitle}>{t('sms-members')}</Text>
            <Text style={styles.txtInfo}>{members.length}</Text>
        </View>
      </View>

      <View style={styles.viewList}>
        <FlatList
            data={splitData}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({item}) => (
                <SplitDataItem
                    id={item.id}
                    total={item.amountOwed}
                    avatarImage={item.image}
                    userName={item.name}
                />
            )}
            contentContainerStyle={{width: '100%'}}
        />
      </View>

    </ScrollView>
  )
}

export default SplitMoneyScreen    