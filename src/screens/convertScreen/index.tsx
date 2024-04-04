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

interface IProps {}

const ConvertScreen: React.FC<IProps>  = () => {

    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [baseCurrency, setBaseCurrency] = useState(CurrencyUnitData[0].code);
    const [convertCurrency, setConvertCurrency] = useState(CurrencyUnitData[1].code);
    const [baseTotal, setBaseTotal] = useState(0);
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
  
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Converter</Text>
        
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
            <Text style={styles.txtItemTitle}>Amount</Text>
            <View style={styles.viewInfo}>
                <TouchableOpacity
                    style={styles.btnCurrency}
                    onPress={() => {
                        setType(true);
                        handlePresentCurrencyModalPress();
                    }}
                >
                    <Image style={styles.imgFlag} source={require('../../../assets/illustration/transactionScreen/empty-box.png')}/>
                    <Text style={styles.txtCurrency}>{baseCurrency}</Text>
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
            <Text style={styles.txtItemTitle}>Converted Amount</Text>
            <View style={styles.viewInfo}>
                <TouchableOpacity
                    style={styles.btnCurrency}
                    onPress={() => {
                        setType(false);
                        handlePresentCurrencyModalPress();
                    }}
                >
                    <Image style={styles.imgFlag} source={require('../../../assets/illustration/transactionScreen/empty-box.png')}/>
                    <Text style={styles.txtCurrency}>{convertCurrency}</Text>
                    <Image style={styles.imgDown} source={require('../../../assets/icon/convertScreen/down.png')}/>
                </TouchableOpacity>

                <TextInput 
                    style={styles.viewInput}
                    editable={false}
                />
            </View>
        </View>
      </View>

      <Button
        content='Convert'
        onPress={() => {}}
        containerStyle={{backgroundColor: 'transparent'}}
        contentStyle={{color: colors.PrimaryColor}}
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
                      name={item.name}
                      onPress={() => {
                        handleCloseCurrencyModal();
                        (type)? setBaseCurrency(item.code): setConvertCurrency(item.code);
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