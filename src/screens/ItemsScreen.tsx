import { Layout, Divider, Text, Icon, TopNavigation, TopNavigationAction, Spinner } from '@ui-kitten/components';
import { MemoizedModalAndFormItem, MemoizedRenderItems } from '../components/itemsComponents';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { MemoizedCreateButton } from '../components/commonComponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsRequest } from '../redux/actions';
import { RootStackParamList } from '../../App';
import { RootState } from '../redux/reducer';
import React, { useEffect, useMemo } from 'react';


type Props = NativeStackScreenProps<RootStackParamList, 'Items'>;

const ItemsScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState<boolean>(false);
  const { pending, items, error } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    console.log('ItemsScreen');
    dispatch(fetchItemsRequest(route.params?.id == undefined ? '0' : route.params?.id));
  }, []);

  const memoizedItems = useMemo(() => items, [items]);
  const showModalAndForm = React.useCallback((isVisible: boolean) => setVisible(isVisible), [visible]);

  const BackActionTopNavigation = () => (
    <TopNavigationAction onPress={() => { navigation.reset({ index: 0, routes: [{ name: 'Lists' }] }); }} icon={<Icon name='arrow-back' />} />
  )


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} />
      <TopNavigation accessoryLeft={BackActionTopNavigation} title={route.params?.nameList} />
      <Divider />

      {pending ? (<Layout style={styles.container}><Spinner size='giant' /></Layout>) :
        error ? (<Layout><Text>Error</Text></Layout>) :
          (
            <Layout level='4'>

              <MemoizedCreateButton showModalAndForm={showModalAndForm} />
              <MemoizedRenderItems items={memoizedItems} />
              <MemoizedModalAndFormItem visible={visible} setVisible={showModalAndForm} parrentListID={route.params?.id == undefined ? '0' : route.params.id} />

            </Layout>
          )}

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ItemsScreen;