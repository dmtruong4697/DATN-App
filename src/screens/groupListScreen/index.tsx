import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GroupCard from '../../components/groupCard';
import { getGroupList } from '../../services/group';
import { RealmContext } from '../../realm/models';
import { getAllWallet } from '../../realm/services/wallets';

interface IProps {}

const GroupListScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const [groupIds, setGroupIds] = useState<any[]>([]);
    const fetchGroupList = async() => {
      let groupIds = await getGroupList();
      setGroupIds(groupIds);
      // console.log(groupIds)
    }

    const fetchData = async() => {
      // const formsResult = getAllWallet(realm);
      // await makeFile(formsResult);
      // console.log(formsResult.toJSON());
    }

    useEffect( () => {
      fetchGroupList();
      fetchData();
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

        <Text style={styles.txtTitle}>Groups</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          <Text style={styles.txtEdit}>ADD</Text>
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
        </TouchableOpacity>
      </View>

      <View style={styles.viewGroupList}>
        {/* <TextInput  
          style={styles.viewSearchInput}
          placeholder='search'
        /> */}
        <FlatList
          data={groupIds}
          keyExtractor={item => item._id.toString()}
          scrollEnabled={false}
          renderItem={({item}) => (
            <GroupCard
              groupId={item._id.toString()}

            />
          )}
          // contentContainerStyle={{width: layout.width-18, gap: 5,}}
        />
      </View>

    </View>
  )
}

export default GroupListScreen    