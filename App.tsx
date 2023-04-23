import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { SqliteExemple } from './sqlite';
import { CuponsList } from './src/components/CuponsList';
// import { DeleteBD } from './src/components/DeleteBD';
import { UrlOne } from './src/components/UrlOne';
import { UrlsList } from './src/components/UrlsList';
import { useDatabaseInitialize } from './src/data/hooks/use-database-initialize';
import { Scanner } from './src/components/Scan';
import { Scanner2 } from './src/components/Scan2';
import { UrlsList2 } from './src/components/UrlsList2';
import {CuponsList2} from './src/components/CuponsList2';

export default function App() {
  const { ready } = useDatabaseInitialize();

  if (!ready) {
    return (
      <View style={styles.container}>
        <Text>Loading....</Text>
      </View>
    );
  }

  // return <CuponsList2 />;
  return <CuponsList />;
  // return <UrlsList />;
  return <UrlsList2 />;
  // return <Scanner />;
  return <Scanner2 />;
  return <UrlOne />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
