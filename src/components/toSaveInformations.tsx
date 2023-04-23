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

export const toSaveInformations = (idCupom: number) => {
  useTimeout(() => {
    showToast(idCupom);

    console.log('Called after 5 sec!');
  }, 5000);

  // return

  const tipoCodigoCorreto = async (urlCupom: string) => {
    console.log('Url do cupom ' + urlCupom);
    const idCupom = await saveUrls.create({ sourceUrl: urlCupom });
    showToast(idCupom);
    return;
  };

  function showToast(idCupom: number) {
    let message = 'Cupom ' + idCupom;
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  }
};
