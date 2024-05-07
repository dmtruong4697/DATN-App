import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { getAllSaving } from '../../realm/services/saving';
import SavingCard from '../../components/savingCard';

interface IProps {}

type SavingType = {
    _id: Realm.BSON.ObjectId;
    name: string,
    total: number,
    createAt: string,
    profit: number,
    currencyUnit: string,
}

const SavingListScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const [lists, setLists] = useState(getAllSaving(realm));

    const isFocus = useIsFocused();
    useEffect(() => {
      setLists(getAllSaving(realm));
    },[isFocus])

  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Savings</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.navigate('AddSaving');
          }}
        >
          <Image style={styles.imgButtonAdd} source={require('../../../assets/icon/groupList/add.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.viewList}>
        <FlatList
            data={lists}
            keyExtractor={item => item._id.toString()}
            scrollEnabled={false}
            renderItem={({item}) => (
                <SavingCard _id={item._id}/>
            )}
            contentContainerStyle={{width: '100%', height: '100%', padding: 8, gap: 5,}}
        />
      </View>

    </View>
  )
}

export default SavingListScreen    