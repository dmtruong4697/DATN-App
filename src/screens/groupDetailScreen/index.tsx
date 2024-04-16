import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { RealmContext } from '../../realm/models';
import { getWalletById } from '../../realm/services/wallets';
import { deleteLoanById, getLoanById } from '../../realm/services/loan';
import { getGroupDetail } from '../../services/group';
import { getUserInfo } from '../../services/user';

interface IProps {}

const GroupDetailScreen: React.FC<IProps>  = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const route = useRoute<RouteProp<RootStackParamList, 'GroupDetail'>>();
    const {_id} = route.params;

    const [groupDetail, setGroupDetail] = useState<any>({});
    // const [ownerDetail, setOwnerDetail] = useState<any>();

    const fetchGroupInfo = async() => {
      const group = await getGroupDetail(_id);
      setGroupDetail(group);
    }

    useEffect(() => {
      fetchGroupInfo();
    },[])
  
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
            // console.log(groupDetail);
          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
          {/* <Text style={styles.txtEdit}>Edit</Text> */}
        </TouchableOpacity>
      </View>

      {/* top group */}
      <View style={styles.viewTopGroup}>

        <View style={styles.viewMember}>
          <TouchableOpacity
            style={styles.btnAddTransaction}
          >
            <Text style={styles.txtButton}>Add Transaction</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewMember}>

          <TouchableOpacity>
            <View style={styles.viewMemberImage}></View>
          </TouchableOpacity>

          <Text style={styles.txtTotalText}>Members: </Text>
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

      </View>
    </ScrollView>
  )
}

export default GroupDetailScreen    