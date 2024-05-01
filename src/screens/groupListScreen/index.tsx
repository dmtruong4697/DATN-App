import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GroupCard from '../../components/groupCard';
import { getGroupList } from '../../services/group';
import { RealmContext } from '../../realm/models';
import { getAllWallet } from '../../realm/services/wallets';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../../components/button';

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
    }

    useEffect( () => {
      fetchGroupList();
    },[])

    // bottom sheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['35%', '40%'], []);
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);
  
    const handleCloseModal = useCallback(() => {
      bottomSheetModalRef.current?.close();
    }, []);
  
    const handleSheetChanges = useCallback((index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);
  
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseModal}
      />,
      []
    );

    const [code, setCode] = useState<any>('');
  
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
            // navigation.navigate('AddGroup');
            handlePresentModalPress();
          }}
        >
          {/* <Text style={styles.txtEdit}>ADD</Text> */}
          <Image style={styles.imgButtonAdd} source={require('../../../assets/icon/groupList/add.png')}/>
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
          contentContainerStyle={{width: '100%', height: '100%', padding: 5, gap: 5,}}
        />
      </View>

      {/* bottom modal */}
      <BottomSheetModalProvider>
        <View style={{}}>
          <BottomSheetModal
            handleIndicatorStyle={{
            }}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
          >
            <BottomSheetView style={{flex: 1}}>
              <TouchableOpacity
                style={styles.btnBottomSheet}
                onPress={() => {
                  navigation.navigate('AddGroup');
                }}
              >
                <Image style={styles.imgButtomIcon} source={require('../../../assets/icon/groupList/create.png')}/>
                <Text style={styles.txtButton}>Create a new Group</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnBottomSheet}
              >
                <Image style={styles.imgButtomIcon} source={require('../../../assets/icon/groupList/hastag.png')}/>
                <Text style={styles.txtButton}>Join a Group via invite code</Text>
              </TouchableOpacity>

              <TextInput 
                style={styles.inputCode}
                inputMode='numeric'
                placeholder='Enter Code'
                value={code}
                onChangeText={(text) => {
                  setCode(text);
                }}
              />

              <Button
                containerStyle={{
                  alignSelf: 'center',
                  width: '35%',
                  height: 45,
                  borderRadius: 5,
                }}
                content='Join Group'
                onPress={() => {

                }}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>

    </View>
  )
}

export default GroupListScreen    