//home.js
const util = require('../../utils/util.js')
const request = require('../../utils/request.js');

Page({
  data: {
    title:"xxxxx",
    artiles: []
  },
  onLoad: function () {
    this.getArticleList()
  },

  getArticleList: function () {
      const self = this;
      wx.request({
        url: 'https://textnuxt.lilidong.cn/api/article/front/list', 
        data: {
         
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
            console.log( res.data.data.list)
            let artiles = res.data.data.list;

            //处理富文本
            artiles.forEach((artile) => {
              let item = artile;
              item.content = item.content.replace(/<[^>]+>/g,'');
              return item;
            });


            self.setData({
              artiles:artiles
            });

        },
        fail: function (res) {
            console.log(res);
        }
    })

  }



})
