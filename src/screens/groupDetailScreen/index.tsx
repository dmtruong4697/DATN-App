import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView, ToastAndroid } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { RealmContext } from '../../realm/models';
import { getWalletById } from '../../realm/services/wallets';
import { deleteLoanById, getLoanById } from '../../realm/services/loan';
import { getGroupDetail, getGroupTransactions } from '../../services/group';
import { getUserInfo } from '../../services/user';
import Clipboard from '@react-native-clipboard/clipboard';
import TransactionCard from '../../components/transactionCard';
import { Realm } from "realm";
import GroupTransactionCard from '../../components/groupTransactionCard';

interface IProps {}

const GroupDetailScreen: React.FC<IProps>  = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {useRealm} = RealmContext;
  const realm = useRealm();

  const route = useRoute<RouteProp<RootStackParamList, 'GroupDetail'>>();
  const {_id} = route.params;

  const [groupDetail, setGroupDetail] = useState<any>({});
  const [ownerDetail, setOwnerDetail] = useState<any>({});
  const [transactions, setTransactions] = useState<any>([]);
  // const [ownerDetail, setOwnerDetail] = useState<any>();

  const fetchGroupInfo = async() => {
    const group = await getGroupDetail(_id);
    const owner = await getUserInfo(group.groupOwnerId);
    const transaction = await getGroupTransactions(_id);
    // console.log(owner)
    setOwnerDetail(owner);
    setGroupDetail(group);
    setTransactions(transaction);
  }

  const isFocus = useIsFocused();
  useEffect(() => {
    fetchGroupInfo();
  },[isFocus])

  const showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Copied to clipboard!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  
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
            // navigation.navigate('EditLoan', {_id: _id})
            console.log(groupDetail);
          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
          {/* <Text style={styles.txtEdit}>Edit</Text> */}
        </TouchableOpacity>
      </View>

      {/* top group */}
      <View style={styles.viewTopGroup}>

        <View style={styles.viewMember}>
          <Text style={styles.txtOwnerText}>Total: </Text>
          <TouchableOpacity
            style={styles.btnAddTransaction}
            onPress={() => {
              navigation.navigate('AddGroupTransaction', {_id: _id});
            }}
          >
            <Text style={styles.txtButton}>Add Transaction</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewMember}>

          {/* <TouchableOpacity>
            <FlatList
              data={groupDetail.memberIds}
              keyExtractor={item => item.toString()}
              scrollEnabled={false}
              horizontal
              renderItem={({item}) => (
                <View style={styles.viewMemberImage}></View>
              )}
              // contentContainerStyle={{width: layout.width-18, gap: 5,}}
            />
          </TouchableOpacity> */}

          <Text style={styles.txtOwnerText}>Invite Code: </Text>
          <TouchableOpacity
            style={styles.viewInviteCode}
            onPress={() => {
              Clipboard.setString(groupDetail.inviteCode);
              showToast();
            }}
          >
            <Text style={styles.txtInviteCode}>{groupDetail.inviteCode}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnAddTransaction}
          >
            <Text style={styles.txtButton}>Split Money</Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* transaction history */}
      <View style={styles.viewTransactionHistory}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>Transactions History</Text>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('Transaction');
            }}
          >
            <Text style={styles.txtSeeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={item => item.toString()}
          scrollEnabled={false}
          renderItem={({item}) => (
            <GroupTransactionCard
              _id={item._id}
              createAt={item.createAt}
              groupId={item.groupId}
              imageUrl={item.imageUrl}
              name={item.name}
              note={item.note}
              total={item.total}
              unit={groupDetail.currencyUnit}
              userId={item.userId}
            />
          )}
          // contentContainerStyle={{width: layout.width-18, gap: 5,}}
        />

      </View>
    </ScrollView>
  )
}

export default GroupDetailScreen    