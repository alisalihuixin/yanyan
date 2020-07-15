var t = getApp(),
    a = t.requirejs("core"),
    o = (t.requirejs("jquery"), t.requirejs("foxui"),
        t.requirejs("wxParse/wxParse")),
    e = 0;

Page({
    data: {
        goods_id: 0,
        advHeight: 1,
        count: "",
    },
    imageLoad: function (t) {
        var a = t.detail.height,
            o = t.detail.width,
            e = Math.floor(750 * a / o);
        a == o ? this.setData({
            advHeight: 750
        }) : this.setData({
            advHeight: e
        });
    },
    onLoad: function (e) {
        this.setData({
            count: e.id
        })
        var i = this;
        t.getCache("isIpx") ? i.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : i.setData({
            isIpx: !1,
            iphonexnavbar: ""
        });
        var s = e.id;
        this.setData({
            goods_id: s
        }), a.post("groups.goods", {
            id: s,
        }, function (t) {
            i.setData({
                data: t.data
            }), o.wxParse("wxParseData", "html", t.data.content, i, "0");
            console.log(t.data.like.id)
            console.log(t.data.likeCount)
            i.setData({
                likecount: t.data.likeCount
            })
            if (t.data.like.id == 0) {
                i.setData({
                    shoucang: i.data.shoucang
                })
            } else {
                i.setData({
                    shoucang: !i.data.shoucang,
                    careID: t.data.like.id
                })
            }
        });

    },
    singlebuy: function (t) {
        var o = this;
        a.post("groups/goods/goodsCheck", {
            id: o.data.goods_id,
            type: "single"
        }, function (t) {
            if (1 != t.error)
                if (0 == o.data.data.more_spec) wx.navigateTo({
                    url: "../confirm/index?id=" + o.data.goods_id + "&type=single"
                });
                else {
                    o.setData({
                        layershow: !0,
                        options: !0
                    }), o.setData({
                        optionarr: [],
                        selectSpecsarr: []
                    });
                    var e = o.data.data.id;
                    a.get("groups.goods.get_spec", {
                        id: e
                    }, function (t) {
                        o.setData({
                            spec: t.data
                        });
                    }), o.setData({
                        layershow: !0,
                        options: !0
                    });
                }
            else a.alert(t.message);
        });
    },
    bindcomment: function (e) {
        let userinfo = wx.getStorageSync('userinfowxc6e37c5fb16d6eca').value;
        if (!userinfo) {
            wx.navigateTo({
                url: '/pages/auth/index',
            })
        } else {
            wx.navigateTo({
                url: '/care/comment/comment?id=' + e.currentTarget.dataset.id,
            })
        }

    },
    getshou: function (e) {
        let userinfo = wx.getStorageSync('userinfowxc6e37c5fb16d6eca').value;
        if (!userinfo) {
            wx.navigateTo({
                url: '/pages/auth/index',
            })
        }else{
            
        // console.log(this.data.shoucang)
        // console.log(getApp().getCache('userinfo_openid'))
        if (!this.data.shoucang) {
            wx.request({
                url: 'https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&r=api.interaction.save',
                method: "POST",
                data: {
                    openid: getApp().getCache('userinfo_openid'),
                    targetId: e.currentTarget.dataset.id,
                    targetType: 1,
                    actionType: 2
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: (r) => {
                    if (r.data.status == 0) {
                        this.setData({
                            shoucang: !this.data.shoucang,
                            likecount: this.data.likecount + 1
                        })
                        console.log(r)
                        if (r.data.payload) {
                            this.setData({
                                careID: r.data.payload.interaction.id
                            })
                        }
                    } 
                    if (r.data.status == 2) {
                        wx.showToast({
                            title: '您已经点赞',
                        })
                    }
                    if (r.data.status == 1) {
                        wx.showToast({
                            title: '操作失败',
                            icon: "none"
                        })
                    }
                   
                }
            })
        } else {
            wx.request({
                url: 'https://yanyan.chocei.com/app/ewei_shopv2_api.php?i=2&r=api.interaction.delete',
                method: "POST",
                data: {
                    id: this.data.careID,
                    openid: getApp().getCache('userinfo_openid')
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: (e) => {
                    if (e.data.status == 0) {
                        console.log(e)
                        this.setData({
                            shoucang: !this.data.shoucang,
                            likecount: this.data.likecount - 1
                        })
                    }
                    if (e.data.status == 2) {
                        wx.showToast({
                            title: '您已经点赞',
                        })
                    }
                    if (e.data.status == 1) {
                        wx.showToast({
                            title: '操作失败',
                            icon: "none"
                        })

                    }

                }
            })
        }
        
    }
    },
    call: function (e) {
        console.log(this.data.data.merch.mobile)
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
        })
    },
    chuan: function (e) {
        console.log(e.currentTarget.dataset.merchid)
        wx.navigateTo({
            url: '/groups/index/index?merchid=' + e.currentTarget.dataset.merchid,
        })
    },
    close: function () {
        this.setData({
            layershow: !1,
            options: !1
        });
    },
    specsTap: function (t) {
        e++;
        var o = this,
            i = o.data.spec,
            s = a.pdata(t).spedid,
            n = a.pdata(t).id,
            d = a.pdata(t).specindex;
        a.pdata(t).idx;
        i[d].item.forEach(function (t, a) {
            t.id == n ? i[d].item[a].status = "active" : i[d].item[a].status = "";
        }), o.setData({
            spec: i
        });
        var r = o.data.optionarr,
            p = o.data.selectSpecsarr;
        1 == e ? (r.push(n), p.push(s)) : p.indexOf(s) > -1 ? r.splice(d, 1, n) : (r.push(n),
            p.push(s)), o.data.optionarr = r, o.data.selectSpecsarr = p, a.post("groups.goods.get_option", {
            spec_id: o.data.optionarr,
            groups_goods_id: o.data.goods_id
        }, function (t) {
            o.setData({
                optiondata: t.data
            });
        });
    },
    buy: function (t) {
        var o = this,
            e = (a.pdata(t).op, o.data.goods_id),
            i = o.data.optiondata;
        o.data.optiondata ? i.stock > 0 ? wx.navigateTo({
            url: "../confirm/index?id=" + e + "&option_id=" + i.id + " &type=single",
            success: function () {
                o.setData({
                    layershow: !1,
                    chosenum: !1,
                    options: !1
                });
            }
        }) : wx.showToast({
            title: "库存不足",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请选择规格",
            icon: "none",
            duration: 2e3
        });
    },
    onReady: function (e) {

    },
    onShow: function (e) {
        
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {
        return {
            title: this.data.data.title
        };
    },
    check: function () {}
});