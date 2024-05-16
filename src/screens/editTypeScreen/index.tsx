import { View, Text, TouchableOpacity, Image, TextInput, ImageSourcePropType } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../components/button';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { TransactionType } from '../../realm/models/TransactionType';
import { Realm } from "realm";
import { addTransactionType, getAllTransactionType, getTransactionTypeById, updateTransactionTypeById } from '../../realm/services/transactionType';
import { RealmContext } from '../../realm/models';
import { FlatList } from 'react-native-gesture-handler';
import { TransactionTypeIconData } from '../../constants/transactionTypeIcon';
import TransactionTypeIcon from '../../components/transactionTypeIcon';
import { RootStackParamList } from '../../navigator/mainNavigator';
import { useTranslation } from 'react-i18next';

interface IProps {}

type TransactionTypeType = {
  _id: Realm.BSON.ObjectId;
  name: string;
  income: boolean;
  iconUrl: string;
}

const EditTypeScreen: React.FC<IProps> = () => {

  const {useRealm} = RealmContext;
  const realm = useRealm();
  const {t} = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const route = useRoute<RouteProp<RootStackParamList, 'EditType'>>();
  const {_id} = route.params;
  const type = getTransactionTypeById(realm, _id);

  const [name, setName] = useState(type!.name);
  const [iconUrl, setIconUrl] = useState(type!.iconUrl);
  const [isIncome, setIsIncome] = useState(type!.income);

  const handleUpdateType = () => {
    const updatedType = {
      _id: _id,
      name: name,
      income: isIncome,
      iconUrl: iconUrl,
    };

    updateTransactionTypeById(realm, _id, updatedType);
    navigation.goBack();
  }

    // pick icon bottom sheet
    const iconBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const iconSnapPoints = useMemo(() => ['25%', '70%'], []);
    const handlePresentIconModalPress = useCallback(() => {
      iconBottomSheetModalRef.current?.present();
    }, []);
  
    const handleCloseIconModal = useCallback(() => {
      iconBottomSheetModalRef.current?.close();
    }, []);
  
    const handleIconSheetChanges = useCallback((index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);
  
    const renderIconBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseIconModal}
      />,
      []
    );

  return (
    <View style={styles.viewContainer}>
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

            <Text style={styles.txtTitle}>{t('etts-update transaction type title')}</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
                // console.log(getAllTransactionType(realm));
              }}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/option.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.viewFormContainer}>
        {/* name */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('etts-name')}</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(text) => {setName(text)}}
            value={name}
          />
        </View>

        {/* icon */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('etts-icon')}</Text>
          <TouchableOpacity
            style={styles.viewFormItem}
            onPress={handlePresentIconModalPress}
          >
          </TouchableOpacity>
        </View>

        {/* income */}
        <View style={styles.viewRadioGroup}>
          {/* expenses */}
          <View style={styles.viewRadioItem}>
            <TouchableOpacity
              style={styles.btnRadioItem}
            //   onPress={() => {setIsIncome(false)}}
            >
              {!isIncome && <View style={styles.btnSelectedItem}/>}
            </TouchableOpacity>
            <Text style={styles.txtRadioItem}>{t('etts-expenses')}</Text>
          </View>

          {/* income */}
          <View style={styles.viewRadioItem}>
            <TouchableOpacity
              style={styles.btnRadioItem}
            //   onPress={() => {setIsIncome(true)}}
            >
              {isIncome && <View style={styles.btnSelectedItem}/>}
            </TouchableOpacity>
            <Text style={styles.txtRadioItem}>{t('etts-income')}</Text>
          </View>
        </View>

        <Button
          content={t('etts-update transaction type button')}
          onPress={() => {
            handleUpdateType();
          }}
          containerStyle={{}}
          contentStyle={{}}
        />

        <Button
          content={t('etts-cancel')}
          onPress={() => {
            navigation.goBack();
          }}
          containerStyle={{
            backgroundColor: '#FFFFFF',
          }}
          contentStyle={{
            color: '#666666',
          }}
        />

      </View>

        {/* modal pick icon */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={iconBottomSheetModalRef}
              index={1}
              snapPoints={iconSnapPoints}
              onChange={handleIconSheetChanges}
              backdropComponent={renderIconBackdrop}
            >
              <BottomSheetView style={{flex: 1}}>
                <FlatList
                  data={TransactionTypeIconData}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <TransactionTypeIcon
                      iconUri={item.uri}
                      size={40}
                      additionStyle={{marginHorizontal: 16,}}
                      onPress={() => {}}
                    />
                  )}
                  numColumns={5}
                  style={{width: '100%',}}
                  contentContainerStyle={{alignItems: 'center', gap: 10,}}
                  showsVerticalScrollIndicator={false}
                />
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
    </View>
  )
}

export default EditTypeScreen