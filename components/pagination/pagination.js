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
	    howMuchPageButtons:            { type: Number, default: 5 },     // 会显示几个页码按钮
	    baseOnCurrentPageButtonOffset: { type: Number, default: 2 },     // 当前页码前后会展示几个页码按钮
	    chagePageSizeDefault: { type: Number, default: 10 }, // 改变每页显示条数
	},
	data:{
       
	},
    methods: {
	    onLoad: function() {
	      console.log(this.data.totalPage) // 页面参数 paramA 的值
	     
	    }
   }
})