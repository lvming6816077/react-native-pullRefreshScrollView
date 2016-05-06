# react-native-pullRefreshScrollView
React Native下拉刷新组件 ios 平台 支持ScrollView,ListView

##效果展示
####ScrollView:
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ScrollView.gif" />


####ListView:
<img src="http://7jpp2v.com1.z0.glb.clouddn.com/ListView.gif" />

##如何引入

#####从npm上下载组件
<pre>npm install react-native-pullrefresh-scrollview</pre>

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
        renderScrollComponent={(props) => <PullRefreshScrollView ref="PullRefresh" onRefresh={()=>this.onRefresh()} {...props}     />}

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
#####props

<pre>
onRefresh：当触发刷新时的回调
refreshedText: '释放立即刷新'
refreshingText: '正在刷新数据中..'
refreshText:'下拉可以刷新'
indicatorArrowImg: { 下拉箭头图片和样式 default arrow.png
    style:{},
    url:''
}
indicatorImg: {  loading图片和样式 default <ActivityIndicatorIOS />
    style:{},
    url:''
},
</pre>

#####收回下拉刷新
```javascript
onRefresh(){
        this.refs.PullRefresh.onRefreshEnd();
}
```
##建议和反馈
此组件还在不断更新中，如有需求欢迎提出反馈441403517@qq.com

