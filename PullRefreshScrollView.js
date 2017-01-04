'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    Animated,
    Easing,
    ScrollView,
    ListView,
    ActivityIndicator,
    AppRegistry,
} from 'react-native';

import ScrollableMixin from './ScrollableMixin';

export default class PullRefreshScrollView extends Component {
    constructor(props) {
        super(props);
         // = this.scrollView;
        this.refreshedText = props.refreshedText;
        this.refreshingText = props.refreshingText;
        this.refreshText = props.refreshText;
        this.endText = props.endText;
        this.endingText = props.endingText;
        this.useLoadMore = props.useLoadMore;
        this.state = {
            prTitle:this.refreshText,
            prState:0,
            prTimeDisplay:'暂无更新',
            prLoading:false,
            prArrowDeg:new Animated.Value(0),
            lmState:0
        };


        this.base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABQBAMAAAD8TNiNAAAAJ1BMVEUAAACqqqplZWVnZ2doaGhqampoaGhpaWlnZ2dmZmZlZWVmZmZnZ2duD78kAAAADHRSTlMAA6CYqZOlnI+Kg/B86E+1AAAAhklEQVQ4y+2LvQ3CQAxGLSHEBSg8AAX0jECTnhFosgcjZKr8StE3VHz5EkeRMkF0rzk/P58k9rgOW78j+TE99OoeKpEbCvcPVDJ0OvsJ9bQs6Jxs26h5HCrlr9w8vi8zHphfmI0fcvO/ZXJG8wDzcvDFO2Y/AJj9ADE7gXmlxFMIyVpJ7DECzC9J2EC2ECAAAAAASUVORK5CYII=';
        this.dragFlag = false; //scrollview是否处于拖动状态的标志
        this.prStoryKey = 'prtimekey';



    }
    // 滚动触发
    onScroll(e){
      let target = e.nativeEvent;
      let y = target.contentOffset.y;

      if (this.dragFlag) {
        if (y <= -70) {
          this.upState();

        } else {
          this.downState();
        }
      }

      this.onCheckEndReached(target);


      if (this.props.onScroll) {
        this.props.onScroll(e);
      }
    }
    // 高于临界值状态
    upState(){
      this.setState({
            prTitle:this.refreshedText,
            prState:1
          });

      Animated.timing(this.state.prArrowDeg, {
            toValue: 1,
            duration: 100,
            easing: Easing.inOut(Easing.quad)
        }).start();
    }
    // 低于临界值状态
    downState(){
      this.setState({
            prTitle:this.refreshText,
            prState:0
          });
      Animated.timing(this.state.prArrowDeg, {
            toValue: 0,
            duration: 100,
            easing: Easing.inOut(Easing.quad)
        }).start();
    }

    // 手指离开
    onScrollEndDrag(){

      this.dragFlag = false;
      if (this.state.prState) {

        // 回到待收起状态
        this.scrollView.scrollTo({x:0,y:-70,animated:true});



        this.setState({
          prTitle:this.refreshingText,
          prLoading:true,
          prArrowDeg:new Animated.Value(0),

        });

        // 触发外部的下拉刷新方法
        if (this.props.onRefresh) {
          this.props.onRefresh(this);
        }
      }

    }
    // 手指未离开
    onScrollBeginDrag(){
      this.setState({
        beginScroll: true
      });
      this.dragFlag = true;

      if (this.props.onScrollBeginDrag) {
        this.props.onScrollBeginDrag();
      }
    }
    onCheckEndReached(target){
      if (!this.useLoadMore || this.state.lmState) {
        return;
      }
      let contentSize = target.contentSize;
      let layoutMeasurement = target.layoutMeasurement;
      let y = target.contentOffset.y;

      if (contentSize.height - layoutMeasurement.height - y < 40) {

        // 触发外部的滚动加载方法
        if (this.props.onLoadMore && this.lastContentHeight != contentSize.height) {
          this.lastContentHeight = contentSize.height;
          this.props.onLoadMore(this);
        }
        
      }
      
    }
    onLoadMoreEnd(target){
      this.setState({
        lmState:1
      });
      
    }
    onRefreshEnd(){
        let now = new Date().getTime();
        this.setState({
          prTitle:this.refreshText,
          prLoading:false,
          beginScroll: false,
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
    renderNormalContent(){
      this.transform = [{rotate:this.state.prArrowDeg.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '-180deg']
                    })}];
      let jsxarr = [];
        let arrowStyle = {
            position:'absolute',
            width:14,
            height:23,
            left:-50,
            top:-4,
            transform:this.transform
        };
        let indicatorStyle = {
            position:'absolute',
            left:-40,
            top:-1,
            width:16,
            height:16
        };

        if (this.props.indicatorImg.url) {
          if (this.props.indicatorImg.style) {
            indicatorStyle = this.props.indicatorImg.style;
          }
          if (this.state.prLoading) {
            jsxarr.push(<Image style={indicatorStyle} source={{uri:this.props.indicatorImg.url}}/>);
          } else {
            jsxarr.push(null);
          }
        } else {
          if (this.state.prLoading) {
            jsxarr.push(<ActivityIndicator style={indicatorStyle} animated={true}/>);
          } else {
            jsxarr.push(null);
          }
        }

        if (this.props.indicatorArrowImg.url) {
          if (this.props.indicatorArrowImg.style) {
            arrowStyle = this.props.arrowStyle.style;
          }
          arrowStyle.transform = this.transform;
          if (!this.state.prLoading) {
            jsxarr.push(<Animated.Image style={arrowStyle} resizeMode={'contain'} source={{uri: this.props.indicatorArrowImg.url}}/>);
          } else {
            jsxarr.push(null);
          }
        } else {
          if (!this.state.prLoading) {
            jsxarr.push(<Animated.Image style={arrowStyle} resizeMode={'contain'} source={{uri: this.base64Icon}}/>);
          } else {
            jsxarr.push(null);
          }
        }
        jsxarr.push(<Text style={styles.prState}>{this.state.prTitle}</Text>)

        return (
          <View style={{alignItems:'center'}}>
          <View style={styles.indicatorContent}>

              {jsxarr.map((item,index)=>{
                return <View key={index}>{item}</View>
              })}

          </View>
          <Text style={styles.prText}>上次更新时间：{this.state.prTimeDisplay}</Text>
          </View>
          );

    }
    renderBottomContent(){
      let jsx = [];
      let indicatorStyle = {
            position:'absolute',
            left:-40,
            top:-1,
            width:16,
            height:16
        };
      
      if (this.state.lmState) {
        jsx.push(<Text key={2}>{this.endText}</Text>);
      } else {
        jsx.push(<ActivityIndicator key={1} style={indicatorStyle} animated={true}/>);
        jsx.push(<Text key={2}>{this.endingText}</Text>);
      }
      
      return (jsx);
    }
    rendeTextContent(){

      let prStateStyle = {
            marginBottom:20,
            fontSize:12,
          };
      return (<Text style={prStateStyle}>{this.state.prTitle}</Text>);
    }
    rendeImgContent(){
      this.transform = [{rotate:this.state.prArrowDeg.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '-180deg']
                    })}];
      let jsxarr = [];
      let arrowStyle = {
          width:14,
          height:23,
          marginBottom:20,
          transform:this.transform
      };
      let indicatorStyle = {
          width:16,
          height:16,
          marginBottom:20,
      };
      if (this.props.indicatorImg.url) {
          if (this.props.indicatorImg.style) {
            indicatorStyle = this.props.indicatorImg.style;
          }
          if (this.state.prLoading) {
            jsxarr.push(<Image style={indicatorStyle} source={{uri:this.props.indicatorImg.url}}/>);
          } else {
            jsxarr.push(null);
          }
        } else {
          if (this.state.prLoading) {
            jsxarr.push(<ActivityIndicatorIOS style={indicatorStyle} animated={true}/>);
          } else {
            jsxarr.push(null);
          }
        }

        if (this.props.indicatorArrowImg.url) {
          if (this.props.indicatorArrowImg.style) {
            arrowStyle = this.props.arrowStyle.style;
          }
          arrowStyle.transform = this.transform;
          if (!this.state.prLoading) {
            jsxarr.push(<Animated.Image style={arrowStyle} resizeMode={'contain'} source={{uri: this.props.indicatorArrowImg.url}}/>);
          } else {
            jsxarr.push(null);
          }
        } else {
          if (!this.state.prLoading) {
            jsxarr.push(<Animated.Image style={arrowStyle} resizeMode={'contain'} source={{uri: this.base64Icon}}/>);
          } else {
            jsxarr.push(null);
          }
        }

      return jsxarr;
    }
    renderIndicatorContent(){
      if (!this.state.beginScroll) {
        //return null;
      }

      let type = this.props.refreshType;
      let jsx;

      if (type == 'normal') {
        jsx = [this.renderNormalContent()];
      }
      if (type == 'text') {
        jsx = [this.rendeTextContent()];
      }

      if (type == 'image') {
        jsx = this.rendeImgContent();
      }

      return (
              <View style={styles.pullRefresh}>

                  {jsx.map((item,index)=>{
                    return <View key={index}>{item}</View>
                  })}
              </View>
              );
    }
    renderIndicatorContentBottom(){
      let jsx = [this.renderBottomContent()];
      return (
              <View style={styles.loadMore}>

                  {jsx.map((item,index)=>{
                    return <View key={index}>{item}</View>
                  })}
              </View>
              );
    }
    getScrollResponder() {
      return this.scrollView.getScrollResponder();
    }

    setNativeProps(props) {
      this.scrollView.setNativeProps(props);
    }
    fixSticky() {
      let stickyHeaderIndices = [];
      let propsStickHeader = this.props.stickyHeaderIndices || [];
      for (let i = 0 ; i < propsStickHeader.length ; i++) {
        if (i > 0) {
          stickyHeaderIndices.push(propsStickHeader[i]+1);
        }
        
      }
      return stickyHeaderIndices;
    }
    render() {

        return React.cloneElement(<ScrollView
                  ref={(scrollView) => this.scrollView = scrollView}
                  {...this.props}
                  stickyHeaderIndices={this.fixSticky()}
                  scrollEventThrottle={16}
                  onScrollEndDrag={()=>this.onScrollEndDrag()}
                  onScrollBeginDrag={()=>this.onScrollBeginDrag()}
                  onScroll={(e)=>this.onScroll(e)}

                  >


                    {this.renderIndicatorContent()}
                    {this.props.children}
                    {this.useLoadMore ? this.renderIndicatorContentBottom() : null}
            </ScrollView>, {
            ref: component => {
            this.scrollView = component;
          },
        });

    }

}

const dateFormat = function(dateTime, fmt) {
    let date = new Date(dateTime);
    fmt = fmt || 'yyyy-MM-dd';
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
const styles = StyleSheet.create({
    pullRefresh:{
      position:'absolute',
      top:-69,
      left:0,
      backfaceVisibility: 'hidden',
      right:0,
      height:70,
      backgroundColor:'#fafafa',
      alignItems:'center',
      justifyContent:'flex-end'
    },
    loadMore: {
      height:35,
      backgroundColor:'#fafafa',
      alignItems:'center',
      justifyContent:'center'
    },
    text: {
      height:70,
      backgroundColor:'#fafafa',
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
    lmState:{
      fontSize:12,
    },
    indicatorContent:{
        flexDirection:'row',
        marginBottom:5
    },

});


PullRefreshScrollView.defaultProps = {
    refreshedText: '释放立即刷新',
    refreshingText: '正在刷新数据中..',
    refreshText:'下拉可以刷新',
    endText:'已加载完成',
    endingText:'加载更多数据',
    indicatorArrowImg: {
      style:'',
      url:''
    },
    indicatorImg: {
      style:'',
      url:''
    },
    refreshType:'normal',
    onRefresh:''
};
Object.assign(PullRefreshScrollView.prototype, ScrollableMixin);
