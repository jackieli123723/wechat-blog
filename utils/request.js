const apiURL = 'https://textnuxt.lilidong.cn';

const wxRequest = (params, url) => {
  wx.request({
    url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

const getArticleList = (params) => {
  wxRequest(params, `${apiURL}/api/article/front/list`);
};

const getArticleDetail = (params) => {
  wxRequest(params, `${apiURL}/api/article/detail`);
};

const getCommentList = (params) => {
  wxRequest(params,`${apiURL}/api/comment/list`)
}

const postComment = (params) => {
  wxRequest(params,`${apiURL}/api/comment/add`)
}


const getSitemapList = (params) => {
  wxRequest(params,`${apiURL}/api/article/archives`)
}


module.exports = {
  getArticleList,
  getArticleDetail,
  getCommentList,
  postComment,
  getSitemapList
};
