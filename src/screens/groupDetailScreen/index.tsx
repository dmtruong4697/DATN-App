import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView, ToastAndroid, RefreshControl } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { RealmContext } from '../../realm/models';
import { getWalletById } from '../../realm/services/wallets';
import { deleteLoanById, getLoanById } from '../../realm/services/loan';
import { deleteGroup, getGroupDetail, getGroupTotal, getGroupTransactions, resetGroup, splitMoney } from '../../services/group';
import { getUserInfo } from '../../services/user';
import Clipboard from '@react-native-clipboard/clipboard';
import TransactionCard from '../../components/transactionCard';
import { Realm, UserState } from "realm";
import GroupTransactionCard from '../../components/groupTransactionCard';
import { useTranslation } from 'react-i18next';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import OptionButton from '../../components/optionButton';
import { UserStore } from '../../mobx/auth';


interface IProps {}

const GroupDetailScreen: React.FC<IProps>  = () => {

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
  const [ownerDetail, setOwnerDetail] = useState<any>({});
  const [transactions, setTransactions] = useState<any>([]);
  const [total, setTotal] = useState(0);
  // const [ownerDetail, setOwnerDetail] = useState<any>();

  const fetchGroupInfo = async() => {
    const group = await getGroupDetail(_id);
    const owner = await getUserInfo(group.groupOwnerId);
    const transaction = await getGroupTransactions(_id);
    const tot = await getGroupTotal(_id);
    // console.log(owner)
    setOwnerDetail(owner);
    setGroupDetail(group);
    setTransactions(transaction);
    setTotal(tot);
  }

  const isFocus = useIsFocused();
  useEffect(() => {
    fetchGroupInfo();
  },[isFocus])

  const showToast = (message: string) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const handleSplitMoney = async() => {
    const data = await splitMoney(_id);
    console.log(data);
  }

  const handlereset = async() => {
    await resetGroup(_id)
    .then((message: string) => {
        fetchGroupInfo();
        showToast(message);
    });
  }

  const handlerDelete = async() => {
    await deleteGroup(navigation, _id)
    .then((message: string) => {
        showToast(message);
    });
  }

    // option bottom sheet
    const optionBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const optionSnapPoints = useMemo(() => ['25%', '32%'], []);
    const handlePresentOptionModalPress = useCallback(() => {
      optionBottomSheetModalRef.current?.present();
    }, []);
  
    const handleCloseOptionModal = useCallback(() => {
      optionBottomSheetModalRef.current?.close();
    }, []);
  
    const handleOptionSheetChanges = useCallback((index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);
  
    const renderOptionBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseOptionModal}
      />,
      []
    );

    // refresh
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await fetchGroupInfo();
      setRefreshing(false);
    }, []);
  
  return (
    <ScrollView contentContainerStyle={styles.viewContainer}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{groupDetail.name}</Text>
        
        {(UserStore.user.id == groupDetail.groupOwnerId) &&
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            // navigation.navigate('EditLoan', {_id: _id})
            // console.log(groupDetail);
            handlePresentOptionModalPress();
          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
          {/* <Text style={styles.txtEdit}>Edit</Text> */}
        </TouchableOpacity>
        }
      </View>

      {/* top group */}
      <View style={styles.viewTopGroup}>

        <View style={styles.viewMember}>
          <Text style={styles.txtOwnerText}>{t('gds-total')}: </Text>
          <Text style={styles.txtTotal}>{formatter.format(total)}</Text>
          <Text style={styles.txtOwnerText}>{transactions.length} {t('gds-transactions')}</Text>
          <TouchableOpacity
            style={styles.btnAddTransaction}
            onPress={() => {
              navigation.navigate('AddGroupTransaction', {_id: _id});
            }}
          >
            <Text style={styles.txtButton}>{t('gds-add transaction')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewMember}>

          <TouchableOpacity>
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
          </TouchableOpacity>

          <Text style={styles.txtOwnerText}>{t('gds-invite code')}: </Text>
          <TouchableOpacity
            style={styles.viewInviteCode}
            onPress={() => {
              Clipboard.setString(groupDetail.inviteCode);
              showToast("Copied to clipboard!");
            }}
          >
            <Text style={styles.txtInviteCode}>{groupDetail.inviteCode}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnAddTransaction}
            onPress={() => {
              // handleSplitMoney();
              navigation.navigate('SplitMoney', {_id: _id})
            }}
          >
            <Text style={styles.txtButton}>{t('gds-split money')}</Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* transaction history */}
      <View style={styles.viewTransactionHistory}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{t('gds-transactions history')}</Text>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('Transaction');
            }}
          >
            <Text style={styles.txtSeeAll}>{t('gds-see all')}</Text>
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


      {/* modal option */}
      <BottomSheetModalProvider>
        <View style={{}}>
          <BottomSheetModal
            ref={optionBottomSheetModalRef}
            index={1}
            snapPoints={optionSnapPoints}
            onChange={handleOptionSheetChanges}
            backdropComponent={renderOptionBackdrop}
          >
            <BottomSheetView style={{flex: 1}}>
              <Text style={styles.txtPeriod}>{t('gds-option')}</Text>
              <OptionButton
                content={t('gds-reset')}
                onPress={() => {
                  handlereset();
                  handleCloseOptionModal();
                }}
              />
              <OptionButton
                content={t('gds-delete')}
                onPress={() => {
                  handlerDelete();
                  handleCloseOptionModal();
                }}
              />

            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </ScrollView>
  )
}

export default GroupDetailScreen    