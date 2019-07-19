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
    hasMore:true

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
          }

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
