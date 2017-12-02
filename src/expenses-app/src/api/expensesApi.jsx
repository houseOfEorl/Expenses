var axios = require('axios');
var ExpensesData = require('./expensesData.jsx');


// function getRepos(username) {
//     return axios.get('https://api.github.com/users/' + username + '/repos');
// }

// var webApiurl = 'http://api.almendro.com.br/api/Expenses/';
var webApiurl = 'http://localhost:64307/api/Expenses/';


function getAllExpenses(period) {
   return axios.get(webApiurl + period);
    // console.log(ExpensesData);
    // return ExpensesData;
}

function post(data) {
    return axios({
        method: 'post',
        url: webApiurl,
        data: data
    });
}

function put(data) {
    return axios({
        method: 'put',
        url: webApiurl,
        data: data
    });
}


var helpers = {
    getExpenses: function (period) {
        // return ExpensesData.expenses;
        return axios.all([getAllExpenses(period)])
            .then(function (arr) {
                return {
                    repos: arr[0].data
                }
            })
    },

    postExpenses: function(expense) {
        return axios.all([post(expense)])
            .then(function (arr) {
                return {
                    id: arr[0].data
                }
            }
        )
    },

    putExpenses: function(expense) {
        return axios.all([put(expense)])
            .then(function (arr) {
                return {
                    id: arr[0].data
                }
            }
        )
    },

    removeExpenses: function(expense) {
        return axios({
            method: 'delete',
            url: webApiurl + expense.ExpensesID,
            data: expense
        });
    }
}


module.exports = helpers;