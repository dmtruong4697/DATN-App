import { View, Text, TouchableOpacity, Image, ImageSourcePropType, FlatList, TextInput, useWindowDimensions, ScrollView } from 'react-native'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingMenuData1, SettingMenuData2 } from '../../data/settingMenuData';
import SettingItem from '../../components/settingItem';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import { RealmContext } from '../../realm/models';
import TransactionCard from '../../components/transactionCard';

interface IProps {}

const SearchScreen: React.FC<IProps>  = () => {

    const {t} = useTranslation();
    const layout = useWindowDimensions();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
    const {useRealm} = RealmContext;
    const realm = useRealm();

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<any>([]);
  
    useEffect(() => {
      const transactions = searchTransactionsByTypeName(searchQuery);
      setResults(transactions);
    }, [searchQuery]);
  
    const searchTransactionsByTypeName = (name: string) => {
        // Tìm các loại giao dịch theo tên
        const types = realm.objects('TransactionType').filtered(`name CONTAINS[c] "${name}"`);
        
        // Lấy danh sách các ID loại giao dịch
        const typeIds = types.map(type => type._id);

        // Nếu không có loại giao dịch nào thì trả về mảng rỗng
        if (typeIds.length === 0) {
        return [];
        }

        // Tìm các giao dịch có typeId trong danh sách ID loại giao dịch
        const transactions = realm.objects('Transaction').filtered(`transactionTypeId IN $0`, typeIds);

        return transactions;
    };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {navigation.goBack()}}
        >
          <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/back.png')}/>
        </TouchableOpacity>

        <Text style={styles.txtTitle}>Search</Text>
        
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {

          }}
        >
          {/* <Image style={styles.imgButtonBack} source={require('../../../assets/icon/transaction/option.png')}/> */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.viewSearch}
        onPress={() => {

        }}
      >
        <TextInput
          style={styles.inputSearch}
          placeholder={t('ts-search')+'...'}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        //   editable={false}
        />
      </TouchableOpacity>

      <View style={{flex: 1, padding: 10}}>
      <FlatList
          data={results}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <TransactionCard
              _id={item._id}
              createAt={item.createAt}
              imageUrl={item.imageUrl}
              income={item.income}
              name={item.name}
              note={item.note}
              total={item.total}
              transactionTypeId={item.transactionTypeId}
              walletId={item.walletId}
            />
          )}
          style={{width: '100%',}}
          showsVerticalScrollIndicator={false}
        />
        </View>

    </View>
  )
}

export default SearchScreen  