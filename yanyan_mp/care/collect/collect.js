// care//collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[]
  },

    load:function(){
      wx.request({
        url: 'https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&r=api.interaction&openid='+ getApp().getCache('userinfo_openid') +'&targetType=1&actionType=2&page=' + this.data.page,
        method:"GET",
        success:(t)=>{
          console.log(t)
          var articles = t.data.payload.interactions
          // 将新一页的数据添加到原数据后面
          var originArticles = this.data.list;
          var newArticles = originArticles.concat(articles);
          this.setData({
            list:newArticles,
            page:this.data.page+1
          })
        }
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.load()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})