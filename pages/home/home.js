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
    pageSize: 10,
    pages:-1,
    loading: false,
    total:-1,
    hasMore:true,
    navData:[
    {
      "type":0,
      "name":"全部"
    },
     {
      "type":1,
      "name":"web前端"
    },
     {
      "type":2,
      "name":"服务端"
    },
     {
      "type":3,
      "name":"构建工具"
    },
     {
      "type":4,
      "name":"数据库"
    },
     {
      "type":5,
      "name":"后端开发"
    },{
      "type":6,
      "name":"系统架构"
    }]
  },
  onLoad: function () {
    this.getArticleList()
  },
  onPullDownRefresh(e) {
    console.log(e)
    this.getArticleList();
  },
   //获取文章列表
  getArticleList: function (e,needRefresh){
    const self = this;

    if(self.data.total == self.data.artiles.length){
       self.setData({
         hasMore:false
       })
       return
     }

    let data = {
          title: self.data.title,
          type: self.data.type,
          page: self.data.page++,
          pageSize: self.data.pageSize,
    }

    request.getArticleList({
      data,
      success:(res)=>{
          if(res.data.code == 200){
               // console.log( res.data.data.list)
              let artiles = res.data.data.list;

              //处理富文本
              artiles.forEach((artile) => {
                let item = artile;
                item.content = item.content.replace(/<[^>]+>/g,'');
                return item;
              });

              let concatlist = self.data.artiles.concat(artiles)

              self.setData({
                artiles: concatlist,
                pages:res.data.data.pages,
                total:res.data.data.totalRecords
    
              })

              /*边界处理 只有一页就加载完了 没有分页*/
              if(self.data.total == self.data.artiles.length){
               self.setData({
                 hasMore:false
               })
             }

          }

      }
    })
  },
  goArticleDetail: function(e) {
      var article = e.currentTarget.dataset
      wx.navigateTo({
        url:`../article/article?articleId=${article.id}&title=${article.title}&stars=${article.stars}`
      })
  },
  changeType:function(e){
    var self = this
    var type = e.currentTarget.dataset.type
    if(type == self.data.type){
      return
    }
    self.setData({
      type:type
    })
    setTimeout(function(){
       self.setData({
          page: 1,
          artiles: [],
          total:-1,
          hasMore:true
       })
      self.getArticleList()
    },300)
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
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: (res) => {
    return {
      title: '西门互联博客',
      path: '/pages/home/home',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }

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
