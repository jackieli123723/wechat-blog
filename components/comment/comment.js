Component({
 
  /**
   * 组件的属性列表
   */
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏Emoji
    hideEmoji: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    //展示Emoji
    showEmoji () {
      this.setData({
        flag: !this.data.flag
      })
    }
  }
})

