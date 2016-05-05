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

#####在代码中使用
```javascript
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

render() {

        return (
                <PullRefreshScrollView ref="PullRefresh" onRefresh={()=>this.onRefresh()}>
                    <View style={styles.scrollItem}><Text>Scroll1</Text></View>
                </PullRefreshScrollView>
        );
  }
```
#####props

<pre>onRefresh：当出发刷新时的回调</pre>

#####收回下拉刷新
```javascript
onRefresh(){
        this.refs.PullRefresh.onRefreshEnd();
}
```

