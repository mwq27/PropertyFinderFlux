/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SearchPage = require('./SearchPage');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#ff0000',
  },
}); 


class PropertyFinderApp extends React.Component {
  render() {
    return (
        <React.NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Property Finder',
            component: SearchPage,
          }}/>
    );
  }
}


AppRegistry.registerComponent('PropertyFinderApp', () => PropertyFinderApp);
