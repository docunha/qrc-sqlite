// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Urls, IdParameter } from '../data/models/Urls';
import serviceUrls from '../data/services/Urls';
import serviceCupons from '../data/services/Cupons';
import fetchConteudoCupom from '../fetchConteudoCupom';
import processInfoCupom from '../processInfoCupom';
import { SeparatorItem } from './SeparatorItem';
import { UrlHeader } from './UrlsHeader';

export const UrlsList = () => {
  const [list, setList] = useState<Urls[]>([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  async function fetchUrls() {
    const urls = await serviceUrls.fetchAll();
    setList(urls);
  }

  async function changeIsCompleted(id: number) {
    const info = await serviceUrls.changeIsCompleted(id);
    fetchUrls();
    console.log('Information returned', info);
  }

  async function deleteOne(id: number) {
    const info = await serviceUrls.deleteOne(id);
    fetchUrls();
    console.log('Information returned', info);
  }

  async function findOneBy(id: number) {
    const sourceUrl = await serviceUrls.findOneBy({ id: id });
    console.log('Info useState: ', sourceUrl);
  }

  async function getContent(urlTofetch: string, idCupom: number) {
    // const urlTofetch = 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29200701293480000199650460000120791730195643|2|1|1|706B87336C4ED76654B91A8C82AA84822DF96B80';
    console.log(urlTofetch, idCupom);
    // return;
    const conteudoHtmlCupon = await fetchConteudoCupom(urlTofetch);

    const informations = processInfoCupom(conteudoHtmlCupon, urlTofetch);
    // const info = await serviceCupons.create(informations);
    // console.log('Information of cupom: ', informations);

    const info = await serviceCupons.create2(informations);
    // const info = await serviceCupons.fetchAll2();
    console.log('Information of cupom: ', informations);
    console.log('Information of register cupom: ', info);
    changeIsCompleted(idCupom);

    // const sourceUrl = await serviceUrls.findOneBy({ id: id });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          ListHeaderComponent={UrlHeader}
          ItemSeparatorComponent={SeparatorItem}
          data={list}
          extraData={list}
          keyExtractor={(item) => String(item.id)}
          // renderItem={({ item }) => <Text style={styles.item}>{item.id}</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => getContent(item.sourceUrl, item.id)}
            >
              {item.isCompleted ? (
                <Text style={styles.itemCompleted}>{item.id}</Text>
              ) : (
                <Text style={styles.item}>{item.id}</Text>
              )}
            </TouchableOpacity>
          )}
        />
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
  itemCompleted: {
    backgroundColor: '#969A9D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
