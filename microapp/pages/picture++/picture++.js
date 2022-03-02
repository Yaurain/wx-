// pages/picture++/picture++.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic:null,
    picChoosed:false
  },
  onReady () {
    // setNavigationBarTitle--动态设置当前页面标题
    wx.setNavigationBarTitle({
      title: '制作圣诞帽'
    })
  },
//   判断是否已经添加图片
  assignPicChoosed() {
    if (this.data.bgPic) {
      this.setData({
        picChoosed: true
      })
    } else {
      this.setData({
        picChoosed: false
      })
    }
  },
//   选择图片
  chooseImage(from){
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [from.target.dataset.way],
      success:(res)=> {
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          bgPic:res.tempFilePaths[0]
        });
        this.assignPicChoosed();
      },
      fail: (res)=>{
        this.assignPicChoosed();
        },
      complete: (res)=>{
        this.assignPicChoosed();
        },
    })
  },
  nextPage(){
      app.globalData.bgPic=this.data.bgPic;
    // 需要跳转的应用内非 tabBar 的页面的路径 (代码包路径)
      wx.navigateTo({
        url: '../imageeditor/imageeditor',
      })
  }
})