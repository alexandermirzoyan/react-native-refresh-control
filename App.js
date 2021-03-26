import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';

const widthConst = Dimensions.get('screen').width;

const initialData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Susan Bert',
    image: '1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Neil Arms',
    image: '2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Carla Neice',
    image: '3',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53cbb28ba',
    title: 'Janice Hanner',
    image: '4',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fcd91aa97f63',
    title: 'James Sullivan',
    image: '5',
  },
];

const IMAGES = {
  image1: require('./assets/1.png'),
  image2: require('./assets/2.png'),
  image3: require('./assets/3.png'),
  image4: require('./assets/4.png'),
  image5: require('./assets/5.png'),
  image6: require('./assets/6.png'),
  image7: require('./assets/7.png'),
  image8: require('./assets/8.png'),
  image9: require('./assets/9.png'),
  image10: require('./assets/10.png'),
};

const Item = ({title, image}) => {
  return (
    <View style={styles.item}>
      <Image source={IMAGES['image' + image]} style={styles.thumbnail} />
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );
};

const App = () => {
  const [listData, setListData] = useState(initialData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (listData.length < 10) {
      try {
        let response = await fetch(
          'https://run.mocky.io/v3/8ecb0f96-a590-4522-ba4b-e7ff5309c40d',
        );
        let responseJson = await response.json();
        console.log(responseJson);
        setListData(responseJson.result.concat(initialData));
        setRefreshing(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listData}
        renderItem={({item}) => <Item title={item.title} image={item.image} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: widthConst,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  itemText: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 18,
  },
});

export default App;
