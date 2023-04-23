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
} from 'react-native';
import saveUrls from '../data/services/Urls';

export const Scanner = () => {
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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  // const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
  //   const { type, data, bounds: { origin } = {} } = scanningResult;

  //   const { x, y } = origin;
  //   if (
  //     x >= viewMinX &&
  //     y >= viewMinY &&
  //     x <= viewMinX + finderWidth / 2 &&
  //     y <= viewMinY + finderHeight / 2
  //   ) {
  //     setScanned(true);
  //     Vibration.vibrate(80);
  //     tipoCodigoCorreto(data);
  //     return;
  //   }
  // };

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    const { type, data, bounds: { origin } = {} } = scanningResult;

    setScanned(true);
    Vibration.vibrate(80);
    tipoCodigoCorreto(data);
    // let data2 =
    //   'http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx?p=29230345997539000103650010000693351867459223|2|1|1|3DE2EE5EA95250039677A1095952BF8452D78727';
    // tipoCodigoCorreto(data2);
    return;

    // @ts-ignore
    const { x, y } = origin;
    if (
      x >= viewMinX &&
      y >= viewMinY &&
      x <= viewMinX + finderWidth / 2 &&
      y <= viewMinY + finderHeight / 2
    ) {
      //Verifica se o typo do codigo é de url
      //A sintaxe é: [ condição a testar ] ? [ resposta se verdadeiro ] : [ resposta se não verdadeiro ]
      // tipoCodigo === 256 ? tipoCodigoCorreto(data) : tipoCodigoErrado();
      //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
  };
  const tipoCodigoCorreto = async (urlCupom: string) => {
    console.log('Url do cupom ' + urlCupom);

    const idCupom = await saveUrls.create({ sourceUrl: urlCupom });
    // const conteudoHtmlCupon = await fetchConteudoCupom(urlCupom)
    // const informations = processInfoCupom(conteudoHtmlCupon, urlCupom)

    // const idCupom = await registerCupom(informations)
    // const idCupom = 123;
    Alert.alert(
      //title
      // "Informação Salva\nDeseja scannear outro cupom?",
      // `${uuid}`,
      'Informação do cupom salvas!\nDeseja scannear outro cupom?',
      //body
      `${idCupom}`,
      [
        { text: 'Não', onPress: () => setScanned(true) },
        { text: 'Sim', onPress: () => setScanned(false) },
      ]
      //{ cancelable: false }
    );
    return;
  };
  function showToast() {
    ToastAndroid.show('Requesting for camera permission!', ToastAndroid.SHORT);
  }
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    // return showToast();
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={[StyleSheet.absoluteFill, styles.container]}
    >
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom} />
    </BarCodeScanner>
  );

  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //   <Text>Home!</Text>
  //   <Text>Numero total de cupons </Text>

  //   <StatusBar style="auto" />
  // </View>
  // )
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
