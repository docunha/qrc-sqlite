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

import saveUrls from '../data/services/Urls';

export const UrlsList2 = () => {
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

  async function getContent(urlTofetch: string, idCupom: number) {
    tipoCodigoCorreto(urlTofetch);
    // console.log(urlTofetch, idCupom);
    const conteudoHtmlCupon = await fetchConteudoCupom(urlTofetch);
    const informations = processInfoCupom(conteudoHtmlCupon, urlTofetch);
    const info = await serviceCupons.create2(informations);
    // console.log('Information of cupom: ', info);
    console.log('Number of urlSource: ', idCupom);
    changeIsCompleted(info.id);
  }
  const tipoCodigoCorreto = async (urlCupom: string) => {
    // console.log('Url do cupom ' + urlCupom);

    const idCupom = await saveUrls.create({ sourceUrl: urlCupom });

    // console.log('Url do cupom salvo' + idCupom);
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          ListHeaderComponent={UrlHeader}
          ItemSeparatorComponent={SeparatorItem}
          data={listUrlsCoupons}
          extraData={listUrlsCoupons}
          keyExtractor={(item) => String(item.id)}
          // renderItem={({ item }) => <Text style={styles.item}>{item.id}</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => getContent(item.sourceUrl, item.id)}
            >
              <Text style={styles.itemCompleted}>{item.id}</Text>
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

const listUrlsCoupons = [
  {
    id: 0,
    sourceUrl:
      'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29230316233389001550650030000760989001657565|2|1|26|3999|3435326b2b3064576e724e667479313824245855774137647747633d|1|344D9ECE71207DF0EDEDD8C64B0FFA33014D9927',
  },
  {
    id: 1,
    sourceUrl:
      'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29230397422620007325650050004466139244013347|2|1|25|31.90|4958436e4d415856376477714b44664f4b317166505471696241513d|1|2315e8ab5b274acc6eafe48d5c84fbdab709cf7f',
  },
  {
    id: 2,
    sourceUrl:
      'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29230306921724000154650010000993881001993887|2|1|1|F16C7A6E15E779E80882D806351CDD17BE7E71F4',
  },
  {
    id: 3,
    sourceUrl:
      'http://nfe.sefaz.ba.gov.br/servicos/nfce/Modulos/Geral/NFCEC_consulta_chave_acesso.aspx?p=29230301928075019623650090000911091212250253|2|1|1|9a76db2701beb3a50e68387aa75725559bf9230b',
  },
  {
    id: 4,
    sourceUrl:
      'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29230313207048005348650010000128941100128941|2|1|3|E951697E810A247B5D15EABD3DCE9BACD5A622B6',
  },
  {
    id: 5,
    sourceUrl:
      'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29230339346861014464651140000223671114052184|2|1|1|2C4635E2B53B9181BBC0DA0FE3CE82209C4004C1',
  },
  {
    id: 6,
    sourceUrl:
      'http://nfe.sefaz.ba.gov.br/servicos/nfce/Modulos/Geral/NFCEC_consulta_chave_acesso.aspx?p=29230303995515024422650070000079951006116033|2|1|1|967eca097dcae8210f6ce6bb127576e67d8b91cf',
  },
];
