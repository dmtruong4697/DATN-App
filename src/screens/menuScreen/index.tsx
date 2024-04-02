import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuItem from '../../components/menuItem';
import { ScrollView } from 'react-native-gesture-handler';
import MenuItem1 from '../../components/menuItem1';
import { MenuData1 } from '../../data/menuData';

interface IProps {}

const MenuScreen: React.FC<IProps>  = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
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

            <Text style={styles.txtTitle}>Menu</Text>

            <TouchableOpacity
              style={styles.btnNotification}
            >
              <Image style={styles.imgButtonNotification} source={require('../../../assets/icon/dashboard/bell.png')}/>
            </TouchableOpacity>
          </View>
        </View>

        {/* user info */}
        <View style={styles.viewInfo}>
          <Image style={styles.imgAvatar} source={{uri: ''}}/>
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 27,}}>
            <Text style={styles.txtName}>User Name</Text>
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => {
                navigation.navigate('EditProfile');
              }}
            >
              <Image style={styles.imgEdit} source={require('../../../assets/icon/menu/edit.png')}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.txtEmail}>useremail@gmail.com</Text>
        </View>
      </View>

      <FlatList
        data={MenuData1}
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

    </ScrollView>
  )
}

export default MenuScreen    