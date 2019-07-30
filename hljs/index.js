var hljs = require('./highlight');

hljs.registerLanguage('xml', require('./languages/xml'));
hljs.registerLanguage('java', require('./languages/java'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('php', require('./languages/php'));
hljs.registerLanguage('css', require('./languages/css'));

module.exports = hljs;