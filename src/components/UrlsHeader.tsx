import { useWindowDimensions, StyleSheet, View, Text } from 'react-native';

const dimensions = {
  with: 900,
  height: 450,
};

const ratio = dimensions.height / dimensions.with;

export const UrlHeader = () => {
  const window = useWindowDimensions();

  const width = window.width;
  const height = width * ratio;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>My Urls</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7575ff',
    paddingVertical: 8,
    marginBottom: 16,
  },

  title: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
