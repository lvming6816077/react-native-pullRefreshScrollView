'use strict';

import React, {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    Animated,
    Easing,
    ScrollView,
    ActivityIndicatorIOS
} from 'react-native';





export default class PullRefreshScrollView extends Component {
    constructor(props) {
        super(props);
        this.base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABQBAMAAAD8TNiNAAAAJ1BMVEUAAACqqqplZWVnZ2doaGhqampoaGhpaWlnZ2dmZmZlZWVmZmZnZ2duD78kAAAADHRSTlMAA6CYqZOlnI+Kg/B86E+1AAAAhklEQVQ4y+2LvQ3CQAxGLSHEBSg8AAX0jECTnhFosgcjZKr8StE3VHz5EkeRMkF0rzk/P58k9rgOW78j+TE99OoeKpEbCvcPVDJ0OvsJ9bQs6Jxs26h5HCrlr9w8vi8zHphfmI0fcvO/ZXJG8wDzcvDFO2Y/AJj9ADE7gXmlxFMIyVpJ7DECzC9J2EC2ECAAAAAASUVORK5CYII=';
        this.dragFlag = false; //scrollview是否处于拖动状态的标志
        this.prStoryKey = 'prtimekey';

        this.state = {
            prTitle:'向下拉刷新..',
            prState:0,
            prTimeDisplay:'暂无更新',
            prLoading:false,
            prArrowDeg:new Animated.Value(0)
        };
    }
    onScroll(e){
        var y = e.nativeEvent.contentOffset.y;
      if (this.dragFlag) {
        if (y <= -70) {
          this.setState({
            prTitle:'释放立即刷新',
            prState:1
          });

          Animated.timing(this.state.prArrowDeg, {
                toValue: 1,
                duration: 100,
                easing: Easing.inOut(Easing.quad)
            }).start();

        } else {

          this.setState({
            prTitle:'下拉可以刷新',
            prState:0
          });
          Animated.timing(this.state.prArrowDeg, {
                toValue: 0,
                duration: 100,
                easing: Easing.inOut(Easing.quad)
            }).start();
        }
      }

      if (this.props.onScroll) {
        this.props.onScroll(e);
      }
    }

    // 手指离开
    onScrollEndDrag(){

      this.dragFlag = false;
      if (this.state.prState) {


        if(this.props.scrollRef) {

        }
        this.scrollView.scrollTo({x:0,y:-70,animated:true});
        // this.onRefresh();

        
        this.setState({
          prTitle:'正在刷新数据中..',
          prLoading:true,
          prArrowDeg:new Animated.Value(0),
          
        });
        var self = this;
        setTimeout(function(){
            self.onRefreshEnd();
        },2000);

      }

      if (this.props.onScrollEndDrag) {
        this.props.onScrollEndDrag();
      }

    }
    // 手指未离开
    onScrollBeginDrag(){

      this.dragFlag = true;

      if (this.props.onScrollBeginDrag) {
        this.props.onScrollBeginDrag();
      }
    }

    onRefreshEnd(){
        let now = new Date().getTime();
        this.setState({
          prTitle:'下拉可以刷新',
          prLoading:false,
          prTimeDisplay:dateFormat(now,'yyyy-MM-dd hh:mm')
        });

        // 存一下刷新时间
        AsyncStorage.setItem(this.prStoryKey, now.toString());
        this.scrollView.scrollTo({x:0,y:0,animated:true});
    }
    componentDidMount(){

        AsyncStorage.getItem(this.prStoryKey, (error, result) => {
            

            if (result) {
                result = parseInt(result);

                //将时间传入下拉刷新的state
                this.setState({
                  prTimeDisplay:dateFormat(new Date(result),'yyyy-MM-dd hh:mm'),
                });

            }
            
            
        });
    }
    render() {

        let arrowStyle = {
            position:'absolute',
            width:10,
            height:26,
            left:-50,
            top:-3,
            transform:[{rotate:this.state.prArrowDeg.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '-180deg']
                    })}]
        };
        return (
            <ScrollView
                  ref={(scrollView) => this.scrollView = scrollView}
                  {...this.props}
                  scrollEventThrottle={16}
                  onScrollEndDrag={()=>this.onScrollEndDrag()}
                  onScrollBeginDrag={()=>this.onScrollBeginDrag()}
                  onScroll={(e)=>this.onScroll(e)}>
                    <View style={styles.pullRefresh}>
                        <View style={styles.indicatorContent}>

                            {this.state.prLoading ? <ActivityIndicatorIOS style={styles.indicator} animating={true} /> : null}
                            {!this.state.prLoading ? <Animated.Image style={arrowStyle} source={{uri: this.base64Icon}}/> : null}
                            <Text style={styles.prState}>{this.state.prTitle}</Text>
                        </View>
                        <Text style={styles.prText}>上次更新时间：{this.state.prTimeDisplay}</Text>
                    </View>

                    {this.props.children}
            </ScrollView>

        );
    }

}

const dateFormat = function(dateTime, fmt) {
    var date = new Date(dateTime);
    fmt = fmt || 'yyyy-MM-dd';
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
const styles = StyleSheet.create({
    pullRefresh:{
      position:'absolute',
      top:-70,
      left:0,
      right:0,
      height:70,
      backgroundColor:'#fafafa',
      alignItems:'center',
      justifyContent:'flex-end'
    },
    prText:{
      marginBottom:4,
      color:'#000',
      fontSize:12,
    },

    prState:{
      marginBottom:4,
      fontSize:12,
    },
    indicatorContent:{
        flexDirection:'row',
        marginBottom:5
    },
    indicator:{
        position:'absolute',
        left:-40,
        top:-1
    }
});

