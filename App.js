import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import allReducers from './src/reducers/index.js';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {Provider} from 'react-redux';
import List from './src/components/list.js';

const middleware = applyMiddleware(promise(),thunk)
const store = createStore(allReducers, middleware);

export default class App extends React.Component {
  render() {
    return (
      <Provider store= {store}>
        <List />
     </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
