const app = getApp()
const util = require('../../utils/util.js')
const request = require('../../utils/request.js');
const WxParse = require('../../wxParse/wxParse.js');
const hljs = require('../../hljs/index.js');



 // 拆分富文本文章内容中的文字和代码块（以适应前端代码高亮）
function dismantle(cont) {
      let dismantleCont = [];
      while (cont.length > 0) {
          let flag = '<pre class="ql-syntax" spellcheck="false">';
          if (cont.indexOf(flag) >= 0) {
              if (cont.indexOf(flag) !== 0) {
                  let codeOrigin = cont.indexOf(flag);
                  dismantleCont.push({
                      isCode: false,
                      cont: cont.substring(0, codeOrigin)
                  });
                  cont = cont.substring(codeOrigin);
              } else {
                  let destination = cont.indexOf('</pre>');
                  dismantleCont.push({
                      isCode: true,
                      cont: cont.substring(flag.length, destination).replace(/\&gt;/g, '>').replace(/\&lt;/g, '<')
                  });
                  cont = cont.substring(destination + 6);
              }
          } else {
              dismantleCont.push({
                  isCode: false,
                  cont: cont
              });
              cont = '';
          }
      }
      return dismantleCont;
  }

Page({
   
   data:{
    comment_content:[],
    detailArticle:null,
    title:"",
    comment_count:0,
    creat_date:"",
    pv:"",
    type:'',
    id:"5d287ad94fd6125d8b30efe0",
    placeholder_img:"",
    commentTotal:-1,
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
    username: '',
    email: "",
    website:"",
    starsComment:5,
    stars:'',
    content:'',
    page:1,
    pageSize:10,//传递参数分页展示条数 默认10 
    Emoji:["😀", "😃", "😄", "😁", "😆", "😅", "😂", "😊", "😇", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛", "😎", "😏", "😒", "😞", "😔", "😟", "😕", "😣", "😖", "😫", "😩", "😠", "😡", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "😭", "😓", "😪", "😴", "😷", "😈", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🐱", "🐭", "🐮", "🐵", "✋", "✊", "✌️", "👆", "👇", "👈", "👉", "👊", "👋", "👏", "👐", "👍", "👎", "👌", "🙏", "👂", "👀", "👃", "👄", "👅", "❤️", "💘", "💖", "⭐️", "✨", "⚡️", "☀️", "☁️", "❄️", "☔️", "☕️", "✈️", "⚓️","⌚️", "☎️", "⌛️", "✉️", "✂️", "✒️", "✏️", "❌", "♻️", "✅", "❎", "Ⓜ️", "ℹ️", "™️", "©️", "®️"],
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

  getStars: function(e){
     let stars = e.currentTarget.dataset.stars;
      this.setData({
        starsComment:stars
      })

  },

  replyTo: function(e){
     let username = e.currentTarget.dataset.username;
      this.setData({
        content:"@"+username
      })
  },

  getEmoji: function(e){
      let emoji = e.currentTarget.dataset.emoji;
      console.log(emoji)
      let newContent = this.data.content + emoji
      this.setData({
        content:newContent
      })
  },

  addComment: function(){
     const self = this;


        if(!self.data.username || !self.data.email || !self.data.website || !self.data.content){
           wx.showToast({
            title: '格式有误',
            icon: 'none',
            duration: 2000
          })

          return
        }

        const isEmail = (email) => {
          const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
          return email.match(emailRegex) ? true : false;
        }

        const isURL = (string) => {
            let protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
            let localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
            let nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;
            if (typeof string !== 'string') {
                return false;
            }

            let match = string.match(protocolAndDomainRE);
              if (!match) {
                return false;
            }

            let everythingAfterProtocol = match[1];
              if (!everythingAfterProtocol) {
                return false;
            }

            if (localhostDomainRE.test(everythingAfterProtocol) ||
                  nonLocalhostDomainRE.test(everythingAfterProtocol)) {
              return true;
            }
           return false;
      }

      if(!isEmail(self.data.email)){
          wx.showToast({
            title: '邮箱格式错误',
            icon: 'none',
            duration: 2000
          })

        return
      }
      if(!isURL(self.data.website)){
         wx.showToast({
            title: '网址格式错误',
            icon: 'none',
            duration: 2000
          })

        return
      }

     let data = {
          articleId:self.data.id,
          username: self.data.username,
          email: self.data.email,
          website:self.data.website,
          stars:self.data.starsComment,
          content:self.data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
        }

    request.addComment({
      data,
      success:(res)=>{
             if(res.data.code == 200){
                
                setTimeout(function(){
                   self.setData({
                      username: '',
                      email: '',
                      website:'',
                      starsComment:5,
                      content:''
                   })
                   self.getArticleDetailCommentList(self.data.id)

                },300)  
               
             }

      }
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
      title: decodeURIComponent(options.title) || '', //decodeURIComponent 解决乱码
      username:options.username
    })
    this.setData({
    	id:options.articleId || '5d287ad94fd6125d8b30efe0',
      stars:options.stars 
    })
    
    // this.getArticleDetail(options.articleId)
    // this.getArticleDetailCommentList(options.articleId)

    this.getArticleDetail(options.articleId || '5d287ad94fd6125d8b30efe0')
    this.getArticleDetailCommentList(options.articleId || '5d287ad94fd6125d8b30efe0')

  },

  onPullDownRefresh(e) {
     this.getArticleDetail(this.data.id)
     this.getArticleDetailCommentList(this.data.id)
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
            let conents = detailArticle.content;
             //处理富文本
         
             WxParse.wxParse('article', 'html',conents, self, 5);


            self.setData({
              detailArticle: res.data.data.content,
              title:res.data.data.title,
              comment_count:res.data.data.comment_count,
              creat_date:res.data.data.creat_date,
              pv:res.data.data.pv,
              type:res.data.data.type,
              placeholder_img:res.data.data.placeholder_img,
            })
      }
    })
  },

  getArticleDetailCommentList: function(id){
     const self = this;
     //清空富文本gif
     self.data.comment_content = []
     let data = {
          page:self.data.page,
          pageSize:self.data.pageSize,
          articleId:id 
      }

    request.getArticleDetailCommentList({
      data,
      success:(res)=>{
        if(res.data.code == 200){
             function getComments(data){
              var res = [];
              data.forEach(function(item,index,arr){
                 item.content = util.getFace(item.content) //先转为img 
                 
                 WxParse.wxParse('temContent', 'html', item.content, self, 5); //再转为<image> 注意是异步

                 self.data.comment_content.push(self.data.temContent);
                 res.push(item)
              })
              return res
            } 
            
            self.setData({
              commentTotal: res.data.data.totalRecords,
              commentList: getComments(res.data.data.list),
              comment_content: self.data.comment_content
            },function(){
               
            })
        }
           
      }
    })
     
  },
  
  changePage:function(e){
     console.log(e.detail)
     this.setData({
       page:e.detail.page
     })

     this.getArticleDetailCommentList(this.data.id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: (res) => {
    return {
      title: decodeURIComponent(this.data.title),
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