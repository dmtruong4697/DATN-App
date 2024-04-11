import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GroupCard from '../../components/groupCard';
import { getGroupList } from '../../services/group';

interface IProps {}

const GroupListScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [groupIds, setGroupIds] = useState([]);
    const fetchGroupList = async() => {
      let groupIds = await getGroupList();
      setGroupIds(groupIds);
      // console.log(groupIds)
    }

    useEffect( () => {
      fetchGroupList();
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
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/>
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
              name='name'
              onPress={() => {}}
              ownerId='id'
            />
          )}
          // contentContainerStyle={{width: layout.width-18, gap: 5,}}
        />
      </View>

    </View>
  )
}

export default GroupListScreen    