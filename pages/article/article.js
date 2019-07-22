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
    username: '3',
    email: "45@QQ.COM",
    website:"66.COM",
    stars:5,
    content:'67',
    page:1,
    pageSize:10
   },

   bindKeyInputUserName: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

   bindKeyInputEmail: function(e) {
    this.setData({
      email: e.detail.value
    })
  },

   bindKeyInputWebsite: function(e) {
    this.setData({
      website: e.detail.value
    })
  },
  bindKeyInputContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  

   showEmoji:  function() {
      console.log(33)
      var self = this
      this.setData({
        flag: !self.data.flag
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title || '',
      username:options.username
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
     
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: (res) => {
    return {
      title: '文章详情',
      path: '/pages/article/article',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }

})