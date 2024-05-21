import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getUserInfo } from '../../services/user';
import { getGroupDetail } from '../../services/group';

interface IProps {
    groupId: string,
    iconUri?: ImageSourcePropType,
}

const GroupCard: React.FC<IProps> = ({groupId, iconUri}) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [groupDetail, setGroupDetail] = useState<any>({});
  const [ownerDetail, setOwnerDetail] = useState<any>({});
  // const [ownerDetail, setOwnerDetail] = useState<any>();

  const fetchGroupInfo = async() => {
    const group = await getGroupDetail(groupId);
    const owner = await getUserInfo(group.groupOwnerId);
    // console.log(owner)
    setOwnerDetail(owner);
    setGroupDetail(group);
  }

  useEffect(() => {
    fetchGroupInfo();
  },[])

  return (
    <TouchableOpacity
        style={styles.viewContainer}
        onPress={() => {navigation.navigate('GroupDetail', {_id: groupId})}}
    >
        <View style={styles.viewIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon/groupCard/group.png')}/>
        </View>

        <View style={styles.viewContent}>
            <Text style={styles.txtName}>{groupDetail?.name}</Text>
            <Text style={styles.txtOwner}>{ownerDetail?.userName}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default GroupCard