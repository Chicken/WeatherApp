import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, StatusBar} from 'react-native';
import config from './config.js';

function App() {
  let [weather, setWeather] = useState({});
  async function updateWeather() {
    try {
      let res = await fetch('https://weather.antti.codes/api/weather');
      let data = await res.json();
      setWeather(data);
    } catch (e) {
      // ignore
    }
  }
  function renderItem(item) {
    return (
      <Text style={styles.entry} key={item.key}>
        {(config.legend[item.key]?.label ?? item.key) + ': '}
        <Text style={styles.value}>
          {item.val}
          {config.legend[item.key]?.unit ?? ''}
        </Text>
      </Text>
    );
  }
  updateWeather();
  setInterval(updateWeather, 10000);
  return (
    <>
      <StatusBar barStyle="dark-light" />
      <ScrollView style={styles.view}>
        <Text style={styles.header}>Koti - Sää</Text>
        {Object.entries(weather)
          .map(([key, val]) => ({key, val}))
          .filter((item) => !config.disabled.includes(item.key))
          .map((item) => renderItem(item))}
        <Text>{'\n\n\n'}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  value: {
    color: '#eeeeee',
  },
  entry: {
    marginBottom: 5,
    color: '#cccccc',
    fontSize: 20,
  },
  view: {
    backgroundColor: '#444444',
    height: '100%',
    padding: '2%',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff',
    fontSize: 50,
  },
});

export default App;
