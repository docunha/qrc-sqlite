// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Urls, infoUrls } from '../data/models/Urls';
import serviceUrls from '../data/services/Urls';
import { SeparatorItem } from './SeparatorItem';
import { UrlHeader } from './UrlsHeader';

// type infoUrls = {
//   id: number;
//   sourceUrl: string;
//   isCompleted: boolean;
// };

export const UrlOne = () => {
  // const [singleItems, setSingleItems] = useState<any | null>(null);
  const [singleItems, setSingleItems] = useState<infoUrls>();

  // const [singleItems, setSingleItems] = useState<Urls[]>([]);

  useEffect(() => {
    findOneBy();
  }, []);

  const numberOne = 11;
  async function findOneBy() {
    const sourceUrl = await serviceUrls.findOneBy({ id: numberOne });
    setSingleItems(sourceUrl);
    console.log('Info useState: ', singleItems);
  }
  //{"id": 12, "isCompleted": true, "sourceUrl": "https://qr.io/?gclid=EAIaIQobChMI55n2su7R_QIVBcKRCh2vCQYuEAAYAiAAEgI0-vD_BwE"}
  const singleItem = () => {};

  const oneUrl = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <UrlHeader />

        {/* <Text style={styles.item}>{singleItems.id}</Text>
        <Text style={styles.item}>{singleItems.isCompleted}</Text>
        <Text style={styles.item}>{singleItems.sourceUrl}</Text> */}

        {/* <FlatList
          ListHeaderComponent={UrlHeader}
          ItemSeparatorComponent={SeparatorItem}
          data={singleItems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Text style={styles.item}>{item.id}</Text>}
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#7575ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
