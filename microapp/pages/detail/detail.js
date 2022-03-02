Page({
    /**
   * 页面的初始数据
   */
data: {
  art: {},
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
onReady () {
  // setNavigationBarTitle--动态设置当前页面标题
  wx.setNavigationBarTitle({
    title: '详情页面'
  })
},
// 获取数据,并处理数据
onLoad (options) {
  var that = this;
  wx.request({
    // 请求api,后面加上id来指明某个数据的唯一性
    url: 'http://news-at.zhihu.com/api/4/news/' + options.id,
    headers: {
      'Content-Type': 'application/json'
    },
    // 接口调用成功的回调函数
    success :res=>{
      console.log(res); //控制台里返回的数据;打印出来
      //处理获取到的混乱数据
      if (res.data.body) {
        var body = res.data.body;
        body = body.match( /<p>.*?<\/p>/g ); //match()--在字符串内检索指定的值,或找到一个或者多个正则表达式的匹配
        var ss = []; //定义数组来接收获取到的数据
        if (body) {
          for( var i = 0, len = body.length; i < len;i++ ) { //遍历获取到的数据body里的数组
          ss[ i ] = /<img.*?>/.test( body[ i ] ); //test()--用于检测一个字符串是否匹配某个模式.
          if( ss[ i ] ) {
            body[ i ] = body[ i ].match( /(http:|https:).*?\.(jpg|jpeg|gif|png)/ );
          } else {
            body[ i ] = body[ i ].replace( /<p>/g, '' ) //替换匹配到的符号,用空白替换
            .replace( /<\/p>/g, '' )
            .replace( /<strong>/g, '' )
            .replace( /<\/strong>/g, '' )
            .replace( /<a.*?\/a>/g, '' )
            .replace( /&nbsp;/g, ' ' )
            .replace( /&ldquo;/g, '"' )
            .replace( /&rdquo;/g, '"' );
          }
        }
        }
        res.data.body = body;
      }
       that.setData({
         art: res.data
       })
    }
  })
}
})