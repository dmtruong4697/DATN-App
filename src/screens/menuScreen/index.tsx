import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuItem from '../../components/menuItem';
import { ScrollView } from 'react-native-gesture-handler';
import MenuItem1 from '../../components/menuItem1';
// import { MenuData1, MenuData2, MenuData3 } from '../../data/menuData';
import { UserStore } from '../../mobx/auth';
import { uploadData } from '../../services/sync';
import { RealmContext } from '../../realm/models';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import { SyncStore } from '../../mobx/sync';
import { MenuDataWrapper } from '../../data/menuData';

interface IProps {}

const MenuScreen: React.FC<IProps>  = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const windowWidth = Dimensions.get('window').width;
  const {useRealm} = RealmContext;
  const realm = useRealm();
  const {t} = useTranslation();

  const uploadUserData = async() => {
    await uploadData(realm);
  }

  return (
    <ScrollView contentContainerStyle={styles.viewContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={styles.viewTopContainer}>
        <View style={styles.viewHeaderBar}>
          <View
            style={{
              flex : 1,
              transform : [ { scaleX : 0.5 } ],
              flexDirection: 'row',
              padding: 15,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {navigation.goBack()}}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/back.png')}/>
            </TouchableOpacity>

            <Text style={styles.txtTitle}>{t('ms-menu')}</Text>

            <TouchableOpacity
              style={styles.btnNotification}
              onPress={() => {
                // uploadUserData();
                navigation.navigate('Sync');
              }}
            >
              <Image style={styles.imgButtonNotification} source={require('../../../assets/icon/menu/sync.png')}/>
              {(SyncStore.syncStatus) && <Image style={styles.viewSyncNoti} source={require('../../../assets/icon/menu/sync-noti.png')}/>}
            </TouchableOpacity>
          </View>
        </View>

        {/* user info */}
        <View style={styles.viewInfo}>
          <Image style={styles.imgAvatar} source={{uri: UserStore.user.avatarImage}}/>
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 27,}}>
            <Text style={styles.txtName}>{UserStore.user.userName}</Text>
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => {
                navigation.navigate('EditProfile');
                // console.log(UserStore.user)
              }}
            >
              <Image style={styles.imgEdit} source={require('../../../assets/icon/menu/edit.png')}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.txtEmail}>{UserStore.user.email}</Text>
        </View>
      </View>

      <FlatList
        data={MenuDataWrapper().MenuData1}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({item}) => (
          <MenuItem1
            id={item.id}
            title={item.title}
            iconUrl={item.iconUrl}
            onPress={() => item.onPress(navigation)}
          />
        )}
        // contentContainerStyle={{width: layout.width-18, gap: 5,}}
      />

      <View style={styles.viewList}>
      <FlatList
        data={MenuDataWrapper().MenuData2}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        numColumns={4}
        renderItem={({item}) => (
          <MenuItem
            id={item.id}
            title={item.title}
            backgroundColor={item.backgroundColor}
            onPress={() => item.onPress(navigation)}
            iconUrl={item.iconUrl}
          />
        )}
        contentContainerStyle={{width: '100%', gap: 10,}}
      />
      </View>

      <FlatList
        data={MenuDataWrapper().MenuData3}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({item}) => (
          <MenuItem1
            id={item.id}
            title={item.title}
            iconUrl={item.iconUrl}
            onPress={() => item.onPress(navigation, realm)}
          />
        )}
        // contentContainerStyle={{width: layout.width-18, gap: 5,}}
      />

    </ScrollView>
  )
}

export default observer(MenuScreen)