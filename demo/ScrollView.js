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
    AppRegistry,
} from 'react-native';


import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';





export default class Projects extends Component {
    constructor(props) {
        super(props);

    }

    onRefresh(){
        console.log('refresh');
        var self = this;
        setTimeout(function(){
            self.refs.PullRefresh.onRefreshEnd();
        },2000);
    }

    render() {


        return (
            <View style={styles.container}>
                <View style={styles.header}>
                </View>

                <PullRefreshScrollView ref="PullRefresh" onRefresh={()=>this.onRefresh()}>
                    <View style={styles.scrollItem}><Text>Scroll1</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll2</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll3</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll4</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll5</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll6</Text></View>
                </PullRefreshScrollView>


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
    scrollItem:{
        flex:1,
        height:80,
        marginBottom:10,
        backgroundColor: '#ccc',
        alignItems:'center',
      justifyContent:'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
      },
});
AppRegistry.registerComponent('demo', () => Projects);
