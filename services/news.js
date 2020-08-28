import NewsApi from 'newsapi';

import config from '../config/config.js';

const newsApi = new NewsApi(config.newsAPIKey);

function getNewsForKeyword(keyword) {
    return new Promise((resolve, _) => {
        newsApi.v2.topHeadlines({
            q: keyword,
            language: 'en',
        }).then(response => resolve(response));
    });
};

export default { getNewsForKeyword };
