//home.js
const util = require('../../utils/util.js')
const request = require('../../utils/request.js');

Page({
  data: {
    scrollTop: 0,
    floorstatus: !false,
    artiles: [],
    title: '',
    type: 0,
    page: 1,
    pageSize: 9,
    loading: false
  },
  onLoad: function () {
    this.getArticleList()
  },
  // onPullDownRefresh() {
  //   this.loadMore(null, true);
  // },
   //获取文章列表
  getArticleList: function (){
    const self = this;
    request.getArticleList({
      success:(res)=>{
           console.log( res.data.data.list)
            let artiles = res.data.data.list;

            //处理富文本
            artiles.forEach((artile) => {
              let item = artile;
              item.content = item.content.replace(/<[^>]+>/g,'');
              return item;
            });

            self.setData({
              artiles: artiles
            })
      }
    })
  },
   goArticleDetail: function(e) {
    var article = e.currentTarget.dataset
    wx.navigateTo({
      url:`../article/article?articleId=${article.id}&title=${article.title}`
    })
  },
   goTop: function(e){
     wx.pageScrollTo({
      scrollTop: 0,
      duration: 200
    });

    this.setData({
      scrollTop: 0
    })
  },
  scroll: function(e) {
    if(e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  getMore: function() {
    this.getArticleList()
  },

  // getArticleList: function () {
  //     const self = this;
  //     wx.request({
  //       url: 'https://textnuxt.lilidong.cn/api/article/front/list', 
  //       data: {
         
  //       },
  //       method:'POST',
  //       header: {
  //         'content-type': 'application/json' // 默认值
  //       },
  //       success (res) {
  //           console.log( res.data.data.list)
  //           let artiles = res.data.data.list;

  //           //处理富文本
  //           artiles.forEach((artile) => {
  //             let item = artile;
  //             item.content = item.content.replace(/<[^>]+>/g,'');
  //             return item;
  //           });


  //           self.setData({
  //             artiles:artiles
  //           });

  //       },
  //       fail: function (res) {
  //           console.log(res);
  //       }
  //   })
  // },



})
