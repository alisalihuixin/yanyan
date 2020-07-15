var n = getApp(), t = n.requirejs("core");
n.requirejs("jquery"), n.requirejs("foxui");
Page({
    onPullDownRefresh: function() {
        var n = this;
        t.get("groups", {merchid:this.data.merchid}, function(t) {
            0 == t.error && (n.setData({
                res: t
            }), wx.stopPullDownRefresh());
        });
    },
    data: {
        care:true
    },
    get:function(e) {
        console.log(this.data.care)
        if(this.data.care){
            wx.request({
              url: 'https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&r=api.interaction.save',
              method:"POST",
              header:{
                "content-type":"application/x-www-form-urlencoded"
               },
               data:{
                openid:getApp().getCache('userinfo_openid'),
                targetId:e.currentTarget.dataset.merchid,
                targetType:2,
                actionType:1
               },
               success:(t)=>{
                console.log(t)
                if(t.data.status==0){
                    this.setData({
                        care:!this.data.care
                    })
                    if(t.data.payload){
                        this.setData({
                            careId:t.data.payload.interaction.id
                        })
                    }
                }else{
                    wx.showToast({
                      title: '操作失败,请登录',
                      icon:"none"
                    })
                    wx.navigateTo({
                      url: '/pages/auth/index',
                    })
                }
               }
            })
        }else{
            wx.request({
              url: 'https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&r=api.interaction.delete',
              method:"POST",
              header:{
                "content-type":"application/x-www-form-urlencoded"
               },
              data:{
                id:this.data.careId,
                openid:getApp().getCache('userinfo_openid')
              },
              success:(t)=>{
                  console.log(t)
                  if(t.data.status==0){
                      wx.showToast({
                        title: '取消关注',
                        icon:"success"
                      })
                      this.setData({
                        care:!this.data.care
                    })
                  }else{
                      wx.showToast({
                        title: '操作失败,请登录',
                        icon:"none"
                      })
                  }
              }
            })
        }
    },
    onLoad: function(e) {
       this.setData({
           merchid:e.merchid
       })
        wx.request({
            url: 'https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&r=api.merch.detail&id='+ e.merchid,
            data:{
                openid:getApp().getCache('userinfo_openid')
            },
            success:(e)=>{
                // console.log("id",e)
                this.setData({
                    data:e.data.payload
                })
                // console.log("collection",this.data.merch.collection.id)
                console.log("collection",this.data.data.merch.collection.id)
                if(this.data.data.merch.collection.id==0){
                    this.setData({
                        care:this.data.care
                    })
                }else{
                    this.setData({
                        care:!this.data.care,
                        careId:this.data.data.merch.collection.id
                    })
                }
            }
          })
        // console.log(e.merchid)
        this.setData({
            merchid:e.merchid
        })
        var a = this;
        n.getCache("isIpx") ? a.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : a.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), t.get("groups", {merchid:this.data.merchid}, function(n) {
            a.setData({
                res: n
            });
        });
    },
    advheight: function(n) {
        var t = n.detail.width / n.detail.height;
        this.setData({
            advheight: 750 / t
        });
    },
    navigate: function(n) {
        var e = t.pdata(n).link;
        wx.navigateTo({
            url: e,
            fail: function() {
                wx.switchTab({
                    url: e
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        this.onPullDownRefresh();
    },
    onShareAppMessage: function() {}
});