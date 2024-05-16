import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RealmContext } from '../../realm/models';
import Button from '../../components/button';
import { colors } from '../../constants/colors';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { CurrencyUnitData } from '../../constants/currencyUnit';
import CurrencyUnitCard from '../../components/currencyUnitCard';
import { convert } from '../../services/currencyConvert';
import { useTranslation } from 'react-i18next';

interface IProps {}

const ConvertScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {t} = useTranslation();

    const [baseCurrency, setBaseCurrency] = useState({
        code: CurrencyUnitData[0].code,
        iconUri: CurrencyUnitData[0].iconUri,
    });
    const [convertCurrency, setConvertCurrency] = useState({
        code: CurrencyUnitData[1].code,
        iconUri: CurrencyUnitData[1].iconUri,
    });
    const [baseTotal, setBaseTotal] = useState(0);
    const [convertTotal, setConvertTotal] = useState<number>(0);
    const [type, setType] = useState(true);

    const handleSwap = () => {
        let tmp = baseCurrency;
        setBaseCurrency(convertCurrency);
        setConvertCurrency(tmp);
    }

    // currency bottom sheet
    const currencyBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const currencySnapPoints = useMemo(() => ['25%', '60%'], []);
    const handlePresentCurrencyModalPress = useCallback(() => {
        currencyBottomSheetModalRef.current?.present();
    }, []);
    
    const handleCloseCurrencyModal = useCallback(() => {
        currencyBottomSheetModalRef.current?.close();
    }, []);
    
    const handleCurrencySheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    
    const renderCurrencyBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} 
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseCurrencyModal}
        />,
        []
    );
  
    const formatter = (currency: any) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    });

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>{t('ccs-converter')}</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
        </TouchableOpacity>
      </View>

      <View style={styles.viewConvertCard}>
        <View style={styles.viewCardItem}>
            <Text style={styles.txtItemTitle}>{t('ccs-amount')}</Text>
            <View style={styles.viewInfo}>
                <TouchableOpacity
                    style={styles.btnCurrency}
                    onPress={() => {
                        setType(true);
                        handlePresentCurrencyModalPress();
                    }}
                >
                    <Image style={styles.imgFlag} source={baseCurrency.iconUri}/>
                    <Text style={styles.txtCurrency}>{baseCurrency.code}</Text>
                    <Image style={styles.imgDown} source={require('../../../assets/icon/convertScreen/down.png')}/>
                </TouchableOpacity>

                <TextInput 
                    style={styles.viewInput}
                    value={baseTotal.toString()}
                    onChangeText={(text) => {setBaseTotal(Number(text))}}
                    inputMode='numeric'
                />
            </View>
        </View>

        <View style={styles.viewSwap}>
            <View style={styles.viewLine}/>
            <TouchableOpacity
                style={styles.btnSwap}
                onPress={() => {handleSwap()}}
            >
                <Image style={styles.imgSwap} source={require('../../../assets/icon/convertScreen/swap.png')}/>
            </TouchableOpacity>
        </View>

        <View style={styles.viewCardItem}>
            <Text style={styles.txtItemTitle}>{t('ccs-converted amount')}</Text>
            <View style={styles.viewInfo}>
                <TouchableOpacity
                    style={styles.btnCurrency}
                    onPress={() => {
                        setType(false);
                        handlePresentCurrencyModalPress();
                    }}
                >
                    <Image style={styles.imgFlag} source={convertCurrency.iconUri}/>
                    <Text style={styles.txtCurrency}>{convertCurrency.code}</Text>
                    <Image style={styles.imgDown} source={require('../../../assets/icon/convertScreen/down.png')}/>
                </TouchableOpacity>

                <TextInput 
                    style={styles.viewInput}
                    editable={false}
                    value={convertTotal.toString()}
                />
            </View>
        </View>
      </View>

      <Button
        content={t('ccs-convert')}
        onPress={() => {
            convert(baseTotal, baseCurrency.code, convertCurrency.code)
                .then((result) => {setConvertTotal(Math.round(Number(result) * 100) / 100)});

        }}
        containerStyle={{backgroundColor: colors.PrimaryColor, width: '95%'}}
        contentStyle={{color: '#ffffff'}}
      />

        {/* modal pick currency */}
        <BottomSheetModalProvider>
          <View style={{}}>
            <BottomSheetModal
              ref={currencyBottomSheetModalRef}
              index={1}
              snapPoints={currencySnapPoints}
              onChange={handleCurrencySheetChanges}
              backdropComponent={renderCurrencyBackdrop}
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
                        handleCloseCurrencyModal();
                        (type)? setBaseCurrency({iconUri: item.iconUri, code: item.code}): setConvertCurrency({iconUri: item.iconUri, code: item.code});
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

export default ConvertScreen    