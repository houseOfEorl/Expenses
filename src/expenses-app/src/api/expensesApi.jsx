var axios = require('axios');
var ExpensesData = require('./expensesData.jsx');

// function getRepos(username) {
//     return axios.get('https://api.github.com/users/' + username + '/repos');
// }

function getAllExpenses(period) {
    return axios.get('http://localhost:5050/api/Expenses/' + period);
    // return axios.get('http://localhost:5050/api/Expenses/' + period);
    console.log(ExpensesData);
    return ExpensesData;
}

function post(data) {
    return axios({
        method: 'post',
        url: 'http://localhost:5050/api/Expenses',
        data: data
    });
}

function put(data) {
    return axios({
        method: 'put',
        url: 'http://localhost:5050/api/Expenses',
        data: data
    });
}


var helpers = {
    getExpenses: function (period) {
=======
    getGithubInfo: function (period) {
        // return ExpensesData.expenses;
>>>>>>> 55a769cd68d30db42a49ace978eaf13adb100704
        return axios.all([getAllExpenses(period)])
            .then(function (arr) {
                return {
                    repos: arr[0].data
                    repos: arr[0].expenses
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
            url: 'http://localhost:5050/api/Expenses/' + expense.ExpensesID,
            data: expense
        });
    }
}


module.exports = helpers;