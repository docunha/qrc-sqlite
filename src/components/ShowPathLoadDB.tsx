import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const data = [
  { quarter: 'Dom', earnings: 190 },
  { quarter: 'Seg', earnings: 130 },
  { quarter: 'Ter', earnings: 165 },
  { quarter: 'Quar', earnings: 0 },
  { quarter: 'Qui', earnings: 142 },
  { quarter: 'Sex', earnings: 0 },
  { quarter: 'Sab', earnings: 150 },
];

// import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export const ShowPathLoadDB = () => {
  // load DB for expo
  FileSystem.downloadAsync(
    'http://172.16.5.60:8080/QRCupons.db',
    FileSystem.documentDirectory + 'SQLite/QRCupons.db'
  )
    .then(({ uri }) => {
      console.log('Finished downloading to ', uri);
    })
    .catch((error) => {
      console.error(error);
    });
  // const showPath = async () => {
  //   await console.log(FileSystem.documentDirectory);
  // };

  // showPath();

  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar
          horizontal
          data={data}
          x="quarter"
          y="earnings"
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressOut: (event, data) => {
                  //           this.logEvent("onPressOut "+data.key);
                  console.log('onPressOut => ' + data.key);
                },
              },
            },
          ]}

          // events={[
          //   {
          //     target: "data",
          //     eventHandlers: {
          //       onClick: () => {
          //         return [{
          //           target: "labels",
          //           mutation: (props) => {
          //             return props.text === "clicked" ?
          //               null : { text: "clicked" }
          //           }
          //         }];
          //       }
          //     }
          //   }
          // ]}
        />
      </VictoryChart>
    </View>
  );
};

// export default class App extends React.Component {
//   render() {
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
