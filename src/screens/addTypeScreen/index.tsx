import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../components/button';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

interface IProps {}

type TransactionTypeType = {
  _id: Realm.BSON.ObjectId;
  name: string;
  income: boolean;
  iconUrl: string;
}

const AddTypeScreen: React.FC<IProps> = () => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isIncome, setIsIncome] = useState(false);

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

            <Text style={styles.txtTitle}>Add Transaction Type</Text>
            
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
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
          <Text style={styles.txtFormItemTitle}>NAME</Text>
          <TextInput 
            style={styles.viewFormItem}
          />
        </View>

        {/* icon */}
        <View style={styles.viewFormItemContainer}>
          <Text style={styles.txtFormItemTitle}>ICON</Text>
          <TouchableOpacity
            style={styles.viewFormItem}
            onPress={handlePresentIconModalPress}
          >
          </TouchableOpacity>
        </View>

        {/* income */}
        <View style={styles.viewRadioGroup}>
          
        </View>

        <Button
          content='ADD TRANSACTION TYPE'
          onPress={() => {

          }}
          containerStyle={{}}
          contentStyle={{}}
        />

        <Button
          content='CANCEL'
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
                <Text>icon</Text>
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
    </View>
  )
}

export default AddTypeScreen