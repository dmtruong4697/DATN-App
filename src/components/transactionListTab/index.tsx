import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { NavigationProp } from '@react-navigation/native';
import Button from '../button';
import { getTransactionByTime } from '../../realm/services/transactions';
import { RealmContext } from '../../realm/models';
import { FlatList } from 'react-native-gesture-handler';
import TransactionCard from '../transactionCard';
import { useTranslation } from 'react-i18next';

interface IProps {
    navigation: NavigationProp<any, any>,
    id: string,
    startTime: string,
    finishTime: string,
    name: string,
}

const TransactionListTab: React.FC<IProps> = ({id, finishTime, name, navigation, startTime}) => {

  const {useRealm} = RealmContext;
  const realm = useRealm();
  const {t} = useTranslation();
  const transactions = getTransactionByTime(realm, startTime, finishTime);

  return (
    <View style={styles.viewContainer}>
        {(transactions.length > 0) &&
        <FlatList
          data={transactions}
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
        }

        {(transactions.length == 0) && 
          <View>
            <Image style={styles.imgEmpty} source={require('../../../assets/illustration/transactionScreen/empty-box.png')}/>
            <Text style={styles.txtEmpty}>{t('ts-no transactions')}</Text>
          </View>
        }
    </View>
  )
}

export default TransactionListTab