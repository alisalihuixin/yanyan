// care//index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  chuan:function(e){
    console.log(e.currentTarget.dataset.merchid)
    wx.navigateTo({
      url: '/groups/index/index?merchid='+e.currentTarget.dataset.merchid,
    })
  },
  loadMoreData:function(){
    var that = this
    wx.request({
      url: 'https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&r=api.interaction&openid='+getApp().getCache('userinfo_openid')+'&targetType=2&actionType=1&page='+this.data.currentPage,
      method:"GET",
      success:(r)=>{
        console.log(r)
        var articles = r.data.payload.interactions

        // 将新一页的数据添加到原数据后面
        var originArticles = this.data.list;
        var newArticles = originArticles.concat(articles);
        this.setData({
          list:newArticles,
          currentPage:this.data.currentPage+1
        })
      }
    })
  },

  onLoad: function (options) {
   this.loadMoreData()
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
    this.loadMoreData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})