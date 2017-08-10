var axios = require('axios');

// function getRepos(username) {
//     return axios.get('https://api.github.com/users/' + username + '/repos');
// }

function getAllExpenses(period) {
    return axios.get('http://localhost:5050/api/Expenses/' + period);
}

function post(expense) {

    return axios.post('http://localhost:5050/api/Expenses', {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    // return axios.post('http://localhost:5050/api/Expenses', {
    //     data: { value: 'expense' }
    // })
    // .then(function (response){
    //     console.log(response);
    // })
}

var helpers = {
    getGithubInfo: function (period) {
        return axios.all([getAllExpenses(period)])
            .then(function (arr) {
                return {
                    repos: arr[0].data
                }
            })
    },

    postExpenses: function(expense) {

        //axios.defaults.headers.post['Content-Type'] = 'application/json';
        //axios.defaults.headers.post['Content-Type'] = 'application/json';


        ///return axios.post('http://localhost:5050/api/Expenses', qs.stringify({ 'bar': 123 }));
        return axios({
            method: 'post',
            url: 'http://localhost:5050/api/Expenses',
            data: expense
        });

        // return axios.post('http://localhost:5050/api/Expenses', {
        // firstName: 'Fred',
        // lastName: 'Flintstone'
        // })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }
}


module.exports = helpers;