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
    placeholder_img:""
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
    this.getArticleDetail(options.articleId)
    console.log(options.articleId)
    console.log(options.title)
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

})