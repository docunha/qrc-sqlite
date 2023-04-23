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
import { dataSource } from '../data/configs/db';
import { Cupons2 } from '../data/models/Cupons2';
import { Urls } from '../data/models/Urls';
// import { dataSource } from '../configs/db';

// import * as SQLite from 'expo-sqlite';

export const DeleteBD = () => {
  //   function openDatabase() {
  //     const db = SQLite.openDatabase('QRCupons.db');
  //     return db;
  //   }

  //   const db = openDatabase();
  async function afterEach() {
    // const CuponsRepository = dataSource.getRepository(Cupons2);
    const CuponsRepository = dataSource.getRepository(Urls);

    await CuponsRepository.clear(); // Clear each entity table's content
    // Fetch all the entities
    // const entities = dataSource().entityMetadatas;
    // for (const entity of entities) {
    //   const repository = dataSource().getRepository(entity.name); // Get repository
    //   await repository.clear(); // Clear each entity table's content
    // }
  }

  // async function afterEach(async () => {
  // });

  useEffect(() => {
    afterEach();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.item}>BD Apagado</Text>
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
