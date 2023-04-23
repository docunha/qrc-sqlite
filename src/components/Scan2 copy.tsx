import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  Text,
  Vibration,
  View,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import { useTimeout } from '../data/hooks/useTimeout';
import saveUrls from '../data/services/Urls';

export const Scanner2 = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // const [hasPermission, setHasPermission] = useState(null);
  // const [scanned, setScanned] = useState(null);
  const [scanned, setScanned] = useState(false);

  const finderWidth: number = 280;
  const finderHeight: number = 230;
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   };

  //   getBarCodeScannerPermissions();
  // }, []);

  useEffect(() => {
    loopFor();
  }, []);
  
  function toSaveInformations(idCupom: number) {
    useTimeout(() => {
      console.log('Called after 1 sec!');
    }, 1000);

    return showToast(idCupom);
  }

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    const { type, data, bounds: { origin } = {} } = scanningResult;

    setScanned(true);
    Vibration.vibrate(80);
    tipoCodigoCorreto(data);
    // let data2 =
    //   'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29230345997539000103650010000693351867459223|2|1|1|3DE2EE5EA95250039677A1095952BF8452D78727';
    // tipoCodigoCorreto(data2);
    return;
  };
  const tipoCodigoCorreto = async (urlCupom: string) => {
    console.log('Url do cupom ' + urlCupom);

    const idCupom = await saveUrls.create({ sourceUrl: urlCupom });

    showToast(idCupom);
    return;
  };

  function showToast(idCupom: number) {
    let message = 'Cupom ' + idCupom;
    // setDelay(idCupom);
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => console.log('Hello, World!'), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  // import { useTimeout } from '@hooks'

  const loopFor = () => {
    for (const [key, value] of Object.entries(listUrlsCoupons)) {
      // console.log(`${key}: ${value}`);
      let idCupom = parseInt(key);
      toSaveInformations(idCupom);
      // showToast(idCupom);
      // console.log(`${key}`);
    }
    // for (let item of listUrlsCoupons) {
    //   // content.push(<li key={item.id}>{item.animal}</li>);
    //   showToast(item.id)
    // }
  };
  // for (i = 1; i <= 5; ++i) {
  //   setDelay(i);
  // }

  // async function setDelay(idCupom: number) {
  //   await setTimeout(function () {
  //     console.log(idCupom);
  //   }, 2000);
  // }

  // return showToast();

  // return listUrlsCoupons.map((url: string) => {
  //   showToast(145);
  // });
  return <></>;
};

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },
});

const listUrlsCoupons = {
  0: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29220131549146000114650010000259131200259139|2|1|1|A2C1AA375A456E4C4966E7EF1C7286EC5E61262A',
  1: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29220435060725000150650010000072831068886108|2|1|1|A3EBF1D4922CD8CE95DE03677B920A0835971E81',
  2: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29220435060725000150650050000055501892457331|2|1|1|27144ECE8FF841C3D38F2942035908B8D652B299',
  3: 'http://nfe.sefaz.ba.gov.br/NFCE/CA/Modulos/Geral/NFCEC_consulta_chave_acesso.aspx',
  4: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29200313569064002608650030002056101006670934|2|1|1|DBAD762AC721B35050CF18D265954F0300B36DAF',
  5: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29210213569064002608650030002751561007415496|2|1|1|545B1F8770A636C1F5A9C06FD12D6B068DDC34DD',
  6: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29210313569064002608650030002818751007494968|2|1|1|5B2160BBA12A83BE2647A4CECBB8BD7A63B562C8',
  7: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29200913569064002608650030002400991007013179|2|1|1|DF5F72B564C1B8B66855A3223DFAA7ABD55FCD04',
  8: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29200813569064002608650030002363081006970392|2|1|1|96EFB14CC85A17A60501118B1DBE66527BD0A1F5',
  9: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29190716808525000198650010000126501000126507|2|1|1|C01945FF1652056F6365D3461F62FFAEBA26E4B5',
  10: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29190627190532000195650030000322769651945946|2|1|25|112,70|5757453233735534745668655355714F2F4B70623065706C2F4C593D|1|e8c58eeedbb7a3e4d4a2452111c757fd7399916b',
  11: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29190547960950094002650030000071651026408317|2|1|1|adeeea4e8b3e6793ddf9adec4769195248c07cc6',
  12: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29200875315333008355655010002606361048579175|2|1|1|CADA92BC64CC24EE779AA047C0107D4C62B0EB77',
  13: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29200701293480000199650460000120791730195643|2|1|1|706B87336C4ED76654B91A8C82AA84822DF96B80',
  14: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29200307932971000119650010000088451147860076|2|1|1|C07250ACCBA4501055C82D3332D275327552C465',
  15: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29190731686519000107650020000075591000075590|2|1|1|76CCE326BED03A37EEE3FD28F00CA82353087D2A',
  16: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29201173734428000212650430001922401733254692|2|1|2|4938775665D027B4B96AFC832917D6F7C935C246',
  17: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29201143283811021076650010001088051001088128|2|1|1|B27B0566987212336B8682AB9BF7D07DD75C93E0',
  18: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29201175315333008355655110001383181048579176|2|1|1|D8D92862D727A3CF5BF8FA1312614DF6F592FC7E',
  19: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29201197422620007325650070003034001130245041|2|1|1|959C63BCF76D52E393740FBE1B7AD0D908A3227D',
  20: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29201113569064002608650030002532151007168379|2|1|1|83CD604D452F0A054320EF96BF4BF73211BB44DF',
};
