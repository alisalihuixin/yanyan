// care//comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  newcommment:function(e){
    this.data.newcommment = e.detail.value
  },

  tijiao:function(e){
    console.log(this.data.newcommment)
    wx.request({
      url: 'https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&r=api.comment.save',
      method:"POST",
      header:{
        "content-type":"application/x-www-form-urlencoded"
      },
      data:{  
        openid:getApp().getCache('userinfo_openid'),
        targetId:this.data.targetId,
        targetType:1,
        comment:this.data.newcommment
      },
      success:(t)=>{
        console.log(t)
        if(t.data.status==0){
          this.setData({
            nick:this.data.nick,
            com:this.data.newcommment
          })
        }
       if(t.data.status==2){
         wx.showToast({
           title: '每天只能评论一次',
           icon:"none"
         })
       } 
       if(t.data.status==1){
        wx.showToast({
          title: '发布失败，请登录',
          icon:"none"
        })
      } 
      }
    })
  },
  load:function(){
    wx.request({
      url: 'https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&targetId='+this.data.targetId+'&targetType=1&r=api.comment&page='+this.data.page,
      success:(e)=>{
        console.log(e)
        var articles = e.data.payload.comments

         // 将新一页的数据添加到原数据后面
         var originArticles = this.data.comments;
         var newArticles = originArticles.concat(articles);
        this.setData({
          comments:newArticles,
          page:this.data.page+1
        })
      }
    })
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'userinfowxc6e37c5fb16d6eca',
      success: (result) => {
        console.log(result.data.value.nickName)
        this.setData({
          nick:result.data.value.nickName
        })
      },
    })
    console.log(options.id)
    this.setData({
      targetId:options.id
    })
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
    console.log(111111111111)
    this.load()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})