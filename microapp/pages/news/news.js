//news.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
  },
  onReady () {
    // setNavigationBarTitle--动态设置当前页面标题
    wx.setNavigationBarTitle({
      title: '有趣的知识！'
    })
  },
  // 自定义函数,加载更多方法,获取的是之前的新闻数据
  loadMore (e) {
    if (this.data.list.length === 0) return;
    var date = this.getNextDate();
    var that = this;
    that.setData({ loading: true })
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      data:{},
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
      success:res=>{
        console.log(res.data);
         that.setData({
           loading: false,
           list: that.data.list.concat([]).concat(res.data.stories)
         })
      }
    })
  },
//自定义函数,获取之前的日期
  getNextDate (){
    const now = new Date();
    now.setDate(now.getDate() - this.index++);
    return now
  },
  //获取显示最新的新闻数据
  onLoad () {
    let that = this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      data:{},
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
      success:res=>{
        console.log(res.data);
         that.setData({
           banner: res.data.top_stories,//顶部滑动的内容
           list: [].concat(res.data.stories) //连接
         })
      }
    })
    this.index = 1  //最新的页面定义为1,加载一下更多就将最新的日期减去index++,
    
  }
})
