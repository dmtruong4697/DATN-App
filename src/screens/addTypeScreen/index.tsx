import { View, Text, TouchableOpacity, Image, TextInput, ImageSourcePropType } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../components/button';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { TransactionType } from '../../realm/models/TransactionType';
import { Realm } from "realm";
import { addTransactionType, getAllTransactionType } from '../../realm/services/transactionType';
import { RealmContext } from '../../realm/models';
import { FlatList } from 'react-native-gesture-handler';
import { TransactionTypeIconData } from '../../constants/transactionTypeIcon';
import TransactionTypeIcon from '../../components/transactionTypeIcon';
import { useTranslation } from 'react-i18next';

interface IProps {}

type TransactionTypeType = {
  _id: Realm.BSON.ObjectId;
  name: string;
  income: boolean;
  iconUrl: string;
}

const AddTypeScreen: React.FC<IProps> = () => {

  const {useRealm} = RealmContext;
  const realm = useRealm();
  const {t} = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [isIncome, setIsIncome] = useState(false);

  const handleAddType = () => {
    const newType = {
      _id: new Realm.BSON.ObjectId(),
      name: name,
      income: isIncome,
      iconUrl: iconUrl,
    };

    addTransactionType(realm, newType);
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
              // alignItems : 'center',
              // justifyContent : 'center'
            }}
          >
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {navigation.goBack()}}
            >
              <Image style={styles.imgButtonBack} source={require('../../../assets/icon/addTransaction/back.png')}/>
            </TouchableOpacity>

            <Text style={styles.txtTitle}>{t('atts-add transaction type title')}</Text>
            
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
          <Text style={styles.txtFormItemTitle}>{t('atts-name')}</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(text) => {setName(text)}}
          />
        </View>

        {/* icon */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('atts-icon')}</Text>
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
              onPress={() => {setIsIncome(false)}}
            >
              {!isIncome && <View style={styles.btnSelectedItem}/>}
            </TouchableOpacity>
            <Text style={styles.txtRadioItem}>{t('atts-expenses')}</Text>
          </View>

          {/* income */}
          <View style={styles.viewRadioItem}>
            <TouchableOpacity
              style={styles.btnRadioItem}
              onPress={() => {setIsIncome(true)}}
            >
              {isIncome && <View style={styles.btnSelectedItem}/>}
            </TouchableOpacity>
            <Text style={styles.txtRadioItem}>{t('atts-income')}</Text>
          </View>
        </View>

        <Button
          content={t('atts-add transaction type button')}
          onPress={() => {
            handleAddType();
          }}
          containerStyle={{}}
          contentStyle={{}}
        />

        <Button
          content={t('atts-cancel')}
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

export default AddTypeScreen