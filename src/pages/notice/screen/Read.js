import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Message from '../components/Message';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

class Read extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '已读消息',
    };
  };

  render() {
    const { loading } = this.props
    const { navigate, state } = this.props.navigation;
    const { data } = state.params

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={{ width: width }}
          data={data}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Message navigate={navigate} item={item} />}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { loading } = state.zone;
  return { loading };
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Read);