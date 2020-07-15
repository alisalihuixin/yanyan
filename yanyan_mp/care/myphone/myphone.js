// care//myphone/myphone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    mycomment:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  newPhone:function(e){
    console.log(e.detail.value)
   this.data.newPhone = e.detail.value
  },
  load:function(e){
    console.log(this.data.newPhone)
    wx.request({
      url:"https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&openid="+getApp().getCache('userinfo_openid')+"&targetType=1&page="+this.data.page+"&r=api.comment",
      success:(t)=>{
        console.log(t)
        var articles = t.data.payload.comments
        // 将新一页的数据添加到原数据后面
        var originArticles = this.data.mycomment;
        var newArticles = originArticles.concat(articles);
        this.setData({
          mycomment:newArticles,
          page:this.data.page+1
        })
      }
    })
  },
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