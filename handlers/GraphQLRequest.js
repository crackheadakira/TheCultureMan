// code made by the guys over at AniSuggest. Here is their repository. https://github.com/TibixDev/AniSuggest
const axios = require("axios");
const GraphQLQueries = require('./GraphQLQueries');

module.exports = function (query, vars = "", authToken = "", url = process.env.ANILIST_API || "https://graphql.anilist.co") {
    let Headers;
    if (query.length <= 20) {
        query = GraphQLQueries[query];
    }
    if (authToken.length > 750) {
        Headers = {
            'Authorization': `Bearer ${authToken}`
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(url, {
            query,
            variables: vars
        }, {
            headers: Headers
        }).then(res => {
            resolve(res.data.data, res.headers);
        }).catch(err => {
            reject("GraphQL Request Rejected\n\n" + err?.response?.data?.errors.map(e => `> ${e.message}\n`) || err);
        });
    });
};