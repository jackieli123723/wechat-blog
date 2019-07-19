const app = getApp()
const util = require('../../utils/util.js')
const request = require('../../utils/request.js');
const WxParse = require('../../wxParse/wxParse.js');

Page({
   
   data:{
    detailArticle:null,
    title:"",
    comment_count:0,
    creat_date:"",
    pv:"",
    stars:"",
    type:'',
    id:"",
    placeholder_img:"",
    commentTotal:0,
    commentList:[
     // {
     //    "content": "[qq_102]",
     //    "creat_date": "1563445382225",
     //    "id": "5d3048864fd6125d8b30efe1",
     //    "stars": 5,
     //    "username": "niwwce",
     //    "_id": "5d3048864fd6125d8b30efe1"
     // },
     // {
     //    "content": "[qq_102]",
     //    "creat_date": "1563445382225",
     //    "id": "5d3048864fd6125d8b30efe1",
     //    "stars": 53,
     //    "username": "nice",
     //    "_id": "5d3048864fd6125d8b30efe1"
     // }
    ],
    flag:false,
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    // this.setData({
    // 	id:options.articleId
    // })
    
    // this.getArticleDetail(options.articleId)
    // this.getArticleDetailCommentList(options.articleId)

    this.getArticleDetail('5d287ad94fd6125d8b30efe0')
    this.getArticleDetailCommentList('5d287ad94fd6125d8b30efe0')

  },

   //隐藏Emoji
    hideEmoji: function () {
      this.setData({
        flag: !this.data.flag
      })
    },

  getArticleDetail: function(id){
     const self = this;
     let data = {
          articleId:id 
      }

    request.getArticleDetail({
      data,
      success:(res)=>{
           // console.log( res.data.data.content)
            let detailArticle = res.data.data;
             //处理富文本
            WxParse.wxParse('article', 'html', detailArticle.content, self, 5);
            self.setData({
              detailArticle: res.data.data.content,
              title:res.data.data.title,
              comment_count:res.data.data.comment_count,
              creat_date:res.data.data.creat_date,
              pv:res.data.data.pv,
              stars:res.data.data.stars,
              type:res.data.data.type,
              placeholder_img:res.data.data.placeholder_img,
            })
      }
    })
  },

  getArticleDetailCommentList: function(id){
     const self = this;
     let data = {
          articleId:id 
      }

    request.getArticleDetailCommentList({
      data,
      success:(res)=>{
            self.setData({
              commentTotal: res.data.data.totalRecords,
              commentList: res.data.data.list
            })
           
      }
    })
     
  }

})