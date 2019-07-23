Page({
	data:{

	},
	goHome: function(e){
		  // console.log(e)
	      // wx.navigateTo({
	      //   url: '../home/home'
	      // })

         wx.switchTab({
		  url: '../home/home'
		})
  },
})