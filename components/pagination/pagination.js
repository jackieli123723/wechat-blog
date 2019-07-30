// 计算显示的第一个和最后一个的页码按钮
// 该函数会计算两次，第一次是没有得到currentPage和totalPage的，因此如不给默认值的话计算为 NaN
 function count_start_and_end_page(currentPage=1, totalPage=1, howMuchPageButtons, baseOnCurrentPageButtonOffset) {
  let startPage, endPage, result = [];
  // 当前页码大于偏移量，则起始按钮为 当前页码 - 偏移量
  if (currentPage > baseOnCurrentPageButtonOffset) {
    startPage = currentPage - baseOnCurrentPageButtonOffset;
    endPage = ( totalPage > (currentPage + baseOnCurrentPageButtonOffset) )
              ? (currentPage + baseOnCurrentPageButtonOffset)
              : totalPage;
  }
  // 当前页码小于偏移量
  else {
    startPage = 1;
    endPage = (totalPage > howMuchPageButtons)
              ? howMuchPageButtons
              : totalPage;
  }
  if ( (currentPage + baseOnCurrentPageButtonOffset) > totalPage ) {
    startPage = startPage - (currentPage + baseOnCurrentPageButtonOffset - endPage);
  }

  if (startPage <= 0) startPage = 1
  for (let i = startPage; i <= endPage; i++) {
    result.push(i);
  }
  return result; // 返回一个区间数组，供生成区间页码按钮
}



Component({
	behaviors: [],
	properties:{
		currentPage: { type: Number, required: true }, // 当前所在页数
	    totalPage:   { type: Number, required: true }, // 一共有多少页
	    pageSize:            { type: Number, value: 10 },     // 会显示几个页码按钮
	    howMuchPageButtons:            { type: Number, value: 5 },     // 会显示几个页码按钮
	    baseOnCurrentPageButtonOffset: { type: Number, value: 2 },     // 当前页码前后会展示几个页码按钮
	    chagePageSizeDefault: { type: Number, value: 10 }, // 改变每页显示条数
	},
	data:{
       // defaultPageSize:3,
       showBunNum:[],

	},
	observers: {
	    '**': function() {
	      // 每次 setData 都触发
	    },
	},
	// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
   attached: function () { },
   moved: function () { },
   detached: function () { },
   lifetimes:{
   	   ready: function(e) {
	       console.log(this.data) //初始化 拿到 properties 传递过来的参数和 component自身参数的合集
	       this.setData({
	       	//不传参数 就用默认的properties 可以不用传递 默认值属性 写了反而计算错误 注意
	       	showBunNum:count_start_and_end_page(this.data.currentPage,Math.ceil(this.data.totalPage/this.data.pageSize))
	       })
	       console.log(this.data)
	    }
   },
   methods: {
	  
	    created: function(){

	    },
	    //首页
	    toHeadPage: function(){
           console.log(this.data) //可以拿到 properties 传递过来的参数和 component自身参数的合集
	    },
	    //尾页
	    toTailPage: function(){
           console.log(2222)
	    },
	    //下一页
	    toNextPage: function(e){
          var self = this;
          var page = self.data.currentPage;
          console.log('toNextPage',page) //这里的参数不起效果 why? 始终为1
          self.triggerEvent('changePage', {
		      page: self.data.currentPage++
		  })
		  console.log(this.data)
	    },

	    //上一页
	    toPrevPage:function(){
          console.log('toPrevPage')
	    },
	    //分页跳转 传递page 到父节点
	    changePage: function(e) {
	    	var page = e.currentTarget.dataset.page;
		    this.triggerEvent('changePage', {
		      page: page
		    })
		    console.log(this.data)
		}
   }
})