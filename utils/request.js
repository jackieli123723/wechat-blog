const apiURL = 'https://textnuxt.lilidong.cn';

import toast from './toast'

const wxRequest = (params, url) => {
  toast.loading();

  wx.request({
    url,
    method: params.method || 'POST',
    data: params.data || {},
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
      toast.loaded();
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
      toast.loaded();
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
      toast.loaded();
    },
  });
};

const getArticleList = (params) => {
  wxRequest(params, `${apiURL}/api/article/front/list`);
};

const getArticleDetail = (params) => {
  wxRequest(params, `${apiURL}/api/article/detail`);
};

const getArticleDetailCommentList = (params) => {
  wxRequest(params, `${apiURL}/api/comment/front/list`);
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
  getSitemapList,
  getArticleDetailCommentList
};
