import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import CurrencyUnitCard from '../../components/currencyUnitCard';
import { CurrencyUnitData } from '../../constants/currencyUnit';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../../components/button';
import { createGroup } from '../../services/group';
import { useTranslation } from 'react-i18next';

interface IProps {}

const AddGroupScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {useRealm} = RealmContext;
    const realm = useRealm();
    const {t} = useTranslation();

    const [name, setName] = useState('');
    const [currencyUnit, setCurrencyUnit] = useState(CurrencyUnitData[1].code);
    const [currencyUnitName, setCurrencyUnitName] = useState(CurrencyUnitData[1].name)

    // pick currency unit bottom sheet
    const unitBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const unitSnapPoints = useMemo(() => ['25%', '70%'], []);
    const handlePresentUnitModalPress = useCallback(() => {
      unitBottomSheetModalRef.current?.present();
    }, []);
    
    const handleCloseUnitModal = useCallback(() => {
      unitBottomSheetModalRef.current?.close();
    }, []);
    
    const handleUnitSheetChanges = useCallback((index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);
    
    const renderUnitBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseUnitModal}
    />,[]);

    const handleCreateGroup = async() => {
      await createGroup(
        navigation,
        name,
        currencyUnit
      );
    }

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

            <Text style={styles.txtTitle}>{t('ags-create new group')}</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
                // console.log(getAllWallet(realm))
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
          <Text style={styles.txtFormItemTitle}>{t('ags-name')}</Text>
          <TextInput 
            style={styles.viewFormItem}
            onChangeText={(text) => {setName(text)}}
          />
        </View>

        {/* currency unit */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>{t('ags-unit')}</Text>
          <TouchableOpacity
            style={styles.viewFormItem}
            onPress={handlePresentUnitModalPress}
          >
            <Text style={styles.txtTypeName}>{currencyUnit} - {currencyUnitName}</Text>
          </TouchableOpacity>
        </View>

        <Button
          content={t('ags-save')}
          onPress={() => {
            handleCreateGroup();
          }}
          containerStyle={{}}
          contentStyle={{}}
        />

        <Button
          content={t('ags-cancel')}
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

      {/* modal pick unit */}
      <BottomSheetModalProvider>
        <View style={{}}>
          <BottomSheetModal
            ref={unitBottomSheetModalRef}
            index={1}
            snapPoints={unitSnapPoints}
            onChange={handleUnitSheetChanges}
            backdropComponent={renderUnitBackdrop}
          >
            <BottomSheetView style={{flex: 1, padding: 10,}}>
              <FlatList
                data={CurrencyUnitData}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <CurrencyUnitCard
                    id={item.id}
                    code={item.code}
                    symbol={item.symbol}
                    iconUri={item.iconUri}
                    name={item.name}
                    onPress={() => {
                      setCurrencyUnit(item.code);
                      setCurrencyUnitName(item.name);
                      handleCloseUnitModal();
                    }}
                  />
                )}
                style={{width: '100%',}}
                showsVerticalScrollIndicator={false}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  )
}

export default AddGroupScreen    