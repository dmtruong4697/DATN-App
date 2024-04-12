import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
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

    const [groupDetail, setGroupDetail] = useState<any>();
    const [ownerDetail, setOwnerDetail] = useState<any>();

    const fetchGroupInfo = async() => {
      await getGroupDetail(_id)
        .then (async(group) => {
          setGroupDetail(group);
          // console.log(groupDetail)
          let owner = await getUserInfo(groupDetail.groupOwnerId);
          setOwnerDetail(owner);
        });
    }

    useEffect(() => {
      fetchGroupInfo();
    },[])
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Group Detail</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            // navigation.navigate('EditLoan', {_id: _id})
          }}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
          {/* <Text style={styles.txtEdit}>Edit</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GroupDetailScreen    