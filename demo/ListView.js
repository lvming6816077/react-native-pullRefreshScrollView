
'use strict';
import React, { Component } from 'react';
import {
    View,
    ListView,
    Image,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Alert,
    ScrollView,
    Dimensions,
    InteractionManager,
    AppRegistry
} from 'react-native';


import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';;





export default class Projects extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.data = ['有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊'];
        this.state = {
            dataSource: ds.cloneWithRows(this.data),

        }
    }

    onRefresh(PullRefresh){
        console.log('refresh');


        setTimeout(function(){
            PullRefresh.onRefreshEnd();
        },2000);

    }

    onLoadMore(PullRefresh) {
      var self = this;
      setTimeout(function(){

            self.data = self.data.concat(['有种你滑我啊(新)']);
            self.setState({
              dataSource: self.state.dataSource.cloneWithRows(self.data)
            });
            // PullRefresh.onLoadMoreEnd(); uncomment to end loadmore
        },2000);
      
      console.log('onLoadMore');
    }

    render() {


        return (
            <View style={styles.container}>
                <View style={styles.header}>
                </View>

                <ListView

                    renderScrollComponent={(props) => <PullRefreshScrollView onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} onLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} useLoadMore={1}{...props} />}

                    dataSource={this.state.dataSource}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                    renderRow={(rowData) => <View style={styles.rowItem}><Text style={{fontSize:16}}>{rowData}</Text></View>}
                />
            </View>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header:{
        height:64,
        backgroundColor: '#293447',
    },
    rowItem:{
        flex:1,
        height:50,
        alignItems:'center',
        justifyContent:'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
      },
});
AppRegistry.registerComponent('ReactnativeIOS', () => Projects);
