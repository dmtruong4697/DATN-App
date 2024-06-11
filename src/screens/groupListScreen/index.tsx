import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GroupCard from '../../components/groupCard';
import { getGroupList, joinGroup } from '../../services/group';
import { RealmContext } from '../../realm/models';
import { getAllWallet } from '../../realm/services/wallets';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../../components/button';
import { useTranslation } from 'react-i18next';

interface IProps {}

const GroupListScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const [groupIds, setGroupIds] = useState<any[]>([]);
    const fetchGroupList = async() => {
      let groupIds = await getGroupList();
      setGroupIds(groupIds);
    }

    const isFocus = useIsFocused();
    useEffect( () => {
      fetchGroupList();
    },[isFocus])

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

    const [inviteCode, setCode] = useState<any>('');
    const handleJoinGroup = async() => {
      await joinGroup(navigation, inviteCode);
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

        <Text style={styles.txtTitle}>{t('gls-groups')}</Text>
        
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
                <Text style={styles.txtButton}>{t('gls-create a new group')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnBottomSheet}
              >
                <Image style={styles.imgButtomIcon} source={require('../../../assets/icon/groupList/hastag.png')}/>
                <Text style={styles.txtButton}>{t('gls-join')}</Text>
              </TouchableOpacity>

              <TextInput 
                style={styles.inputCode}
                // inputMode='numeric'
                placeholder={t('gls-enter code')}
                value={inviteCode}
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
                content={t('gls-join group')}
                onPress={() => {
                  handleJoinGroup();
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