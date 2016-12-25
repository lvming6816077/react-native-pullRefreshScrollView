# react-native-pullRefreshScrollView
React Native Pull To Refresh Component for ios platform  support ScrollView,ListView

##Demo
####ScrollView:
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ScrollView.gif" />


####ListView:
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ListView.gif" />

##How to use

#####Download from npm
<pre>npm install --save react-native-pullrefresh-scrollview</pre>

#####Use in Scrollview
```javascript
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

render() {

        return (
                <PullRefreshScrollView ref="PullRefresh" onRefresh={()=>this.onRefresh()}>
                    <View><Text>Scroll1</Text></View>
                </PullRefreshScrollView>
        );
  }
```
#####Use in Listview
```javascript
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

render() {
   return (
      <ListView
        renderScrollComponent={(props) => <PullRefreshScrollView onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} {...props}     />}

        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
       />
   );
}

```
#####image
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ListViewImage.gif" />

#####Only text
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ListViewText.gif" />
#####Only image
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ListViewImage2.gif" />
#####LoadMore
<img src="https://oc5n93kni.qnssl.com/Simulator%20Screen%20Shot%202016%E5%B9%B412%E6%9C%8825%E6%97%A5%2019.49.44.png?imageView2/2/w/318" />
#####End LoadMore
<img src="https://oc5n93kni.qnssl.com/Simulator%20Screen%20Shot%202016%E5%B9%B412%E6%9C%8825%E6%97%A5%2019.49.46.png?imageView2/2/w/318" />
#####props

<pre>
onRefresh：
refreshedText: ''
refreshingText: ''
refreshText:''
useLoadMore:false
endText:''
endingText:''
indicatorArrowImg: { //  default arrow.png
    style:{},
    url:''
}
indicatorImg: {  //  default <ActivityIndicatorIOS />
    style:{},
    url:''
}
refreshType:'normal'  // normal  image  text
</pre>

#####Regain the PullRefresh
```javascript
onRefresh(PullRefresh){
        PullRefresh.onRefreshEnd();
}
```
#####End the LoadMore
```javascript
onLoadMore(PullRefresh){
        PullRefresh.onLoadMoreEnd();
}
```
##Advice
mail:441403517@qq.com


# react-native-pullRefreshScrollView
React Native下拉刷新组件 ios 平台 支持ScrollView,ListView

##效果展示
####ScrollView:
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ScrollView.gif" />


####ListView:
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ListView.gif" />

##如何引入

#####从npm上下载组件
<pre>npm install --save react-native-pullrefresh-scrollview</pre>

#####在ScrollView中使用
```javascript
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

render() {

        return (
                <PullRefreshScrollView ref="PullRefresh" onRefresh={()=>this.onRefresh()}>
                    <View><Text>Scroll1</Text></View>
                </PullRefreshScrollView>
        );
  }
```
#####在ListView中使用
```javascript
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

render() {
   return (
      <ListView
        renderScrollComponent={(props) => <PullRefreshScrollView onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} {...props}     />}

        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
       />
   );
}

```
#####定制图片
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ListViewImage.gif" />

#####纯文字
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ListViewText.gif" />
#####纯图片
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ListViewImage2.gif" />
#####上拉加载
<img src="https://oc5n93kni.qnssl.com/Simulator%20Screen%20Shot%202016%E5%B9%B412%E6%9C%8825%E6%97%A5%2019.49.44.png?imageView2/2/w/318" />
#####上拉加载完成
<img src="https://oc5n93kni.qnssl.com/Simulator%20Screen%20Shot%202016%E5%B9%B412%E6%9C%8825%E6%97%A5%2019.49.46.png?imageView2/2/w/318" />
#####props

<pre>
onRefresh：当触发刷新时的回调
refreshedText: '释放立即刷新'
refreshingText: '正在刷新数据中..'
refreshText:'下拉可以刷新'
useLoadMore:false //是否使用滚动加载功能 即上拉加载
endText:'已经加载完成'
endingText:'加载更多数据'
indicatorArrowImg: { // 下拉箭头图片和样式 default arrow.png
    style:{},
    url:''
}
indicatorImg: {  // loading图片和样式 default <ActivityIndicatorIOS />
    style:{},
    url:''
}
refreshType:'normal'  // normal  image  text
</pre>

#####收回下拉刷新
```javascript
onRefresh(PullRefresh){
        PullRefresh.onRefreshEnd();
}
```
#####结束滚动加载
```javascript
onLoadMore(PullRefresh){
        PullRefresh.onLoadMoreEnd();
}
```
##建议和反馈
此组件还在不断更新中，如有需求欢迎提出反馈441403517@qq.com
