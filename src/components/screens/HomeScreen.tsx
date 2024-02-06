import React from 'react';
import {Text} from 'react-native';
import {Container, List} from '../elements';
import styles from './styles.ts';
import {Product, User} from '../../data';
import {mockUsersList} from '../../data/dao/User.ts';
import ListRowItem from '../elements/List/ListRowItem.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks.ts';
import {fetchProducts} from '../../actions/productActions.ts';
import ListItem from '../elements/List/ListItem.tsx';

type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const mockUsers = mockUsersList;

  const {loading, error, products} = useAppSelector(state => state.products);

  const [productsData, setProductsData] = React.useState(new Array<Product>());

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  React.useEffect(() => {
    setProductsData(products);
  }, [products]);

  const _prepareListData = (users: User[]) => {
    return users.map(item => {
      const {id, full_name, address} = item;
      return {
        id,
        title: full_name,
        subTitle: address,
      };
    });
  };

  return (
    <Container style={styles.root}>
      <Text>HOME SCREEN</Text>
      <List
        numColumns={2}
        data={productsData}
        renderItem={({item}) => {
          return (
            <ListItem title={item.title} />
            /*<ListRowItem
              onPress={item => {
                console.log(item);
              }}
              id={item.id}
              title={item.title}
              subTitle={item.price}
            />*/
          );
        }}
      />
    </Container>
  );
};
export default HomeScreen;
