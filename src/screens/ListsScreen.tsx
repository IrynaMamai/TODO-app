import { MemoizedModalAndFormNewList, MemoizedSearchingAndRenderLists } from '../components/listsComponents';
import { Layout, Divider, Text, Tab, Spinner } from '@ui-kitten/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { MemoizedCreateButton } from '../components/commonComponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListsRequest } from '../redux/actions';
import { RootStackParamList } from '../../App';
import { RootState } from '../redux/reducer';
import React, { useEffect } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Items'>;

const ListsScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState<boolean>(false);
  const { pending, lists, error } = useSelector(
    (state: RootState) => state.lists
  );

  const showModalAndForm = React.useCallback((isVisible : boolean) => setVisible(isVisible), []);
  const memoizedLists = React.useMemo(() => lists, [lists]);

  useEffect(() => {
    console.log('-------------');
    console.log('ListsScreen');
    
    dispatch(fetchListsRequest());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} />
      <Tab title='Todo app' />
      <Divider />

      {pending ? (<Layout style={styles.container}><Spinner size='giant' /></Layout>) :
        error ? (<Layout><Text>Error</Text></Layout>) : (
          <Layout level='4'>

            <MemoizedCreateButton showModalAndForm={showModalAndForm} />
            <MemoizedSearchingAndRenderLists lists={memoizedLists} navigation={navigation} />
            <MemoizedModalAndFormNewList visible={visible} setVisible={showModalAndForm} />

          </Layout>
        )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ListsScreen;