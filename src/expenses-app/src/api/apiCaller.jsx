var axios = require('axios');
var ExpensesData = require('./expensesData.jsx');
var appConfig = require('../configurations/app.json');

var action = '';
var apiUrl = appConfig.apiServerAdress;


function callApiWithToken(action, data, method) {
    return axios({
        method: method,
        url: apiUrl + action,
        data: data,
        headers: { Authorization: "Bearer " + localStorage.ApiExpToken }

    })
    .then(function (response) {
        return(response);
    })
    .catch(function (error) {

        var errorMsg = "Error: ";
        if(error.response) {
            //invalid token, try to log in again
            if(error.status = "401") {

            }

            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            errorMsg += error.response.data == "" ? error.response.status : error.response.data ;
        }
        else
        {
                // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            errorMsg += error.message;
        }
        //flush the token if there's one
        localStorage.removeItem("ApiExpToken")
        return(errorMsg);
        //return(ExpensesData);
    });
 }

var helpers = {

    get: function(action, parameters) {
        return axios.get(apiUrl + action + '/' + parameters)
            .then(function (response) {
                return(response);
            })
            .catch(function (error) {
                var errorMsg = "Error: ";
                if(error.response) {
                    // The request was made, but the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    errorMsg += error.response.data;
                }
                else
                {
                     // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    errorMsg += error.message;
                }
                return(errorMsg);
            });
     },

    //  getWithToken: function(action, parameters) {
    //     return axios.get(apiUrl + action + '/' + parameters, { headers: { Authorization: "Bearer " + localStorage.ApiExpToken } })
    //         .then(function (response) {
    //             return(response);
    //         })
    //         .catch(function (error) {
    //             var errorMsg = "Error: ";
    //             if(error.response) {
    //                 // The request was made, but the server responded with a status code
    //                 // that falls out of the range of 2xx
    //                 console.log(error.response.data);
    //                 console.log(error.response.status);
    //                 console.log(error.response.headers);
    //                 errorMsg += error.response.data;
    //             }
    //             else
    //             {
    //                  // Something happened in setting up the request that triggered an Error
    //                 console.log('Error', error.message);
    //                 errorMsg += error.message;
    //             }
    //             //flush the token if there's one
    //             localStorage.removeItem("ApiExpToken")

    //             return(errorMsg);
    //         });
    //  },
     
     post: function(action, data) {

        return axios({

            method: 'post',
            url: apiUrl + action,
            data: data

        })
        .then(function (response) {
            return(response);
        })
        .catch(function (error) {
            var errorMsg = "Error: ";
            if(error.response) {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                errorMsg += error.response.data == "" ? error.response.status : error.response.data ;
            }
            else
            {
                    // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                errorMsg += error.message;
            }
            return(errorMsg);
        });
     },

    getWithToken: function(action, data) {
        // return ExpensesData
        return callApiWithToken(action + "/" + data, data, "get") 
    },
    
    deleteWithToken: function(action, data) {
        return callApiWithToken(action, data, "delete") 
    },

    postWithToken: function(action, data) {
        return callApiWithToken(action, data, "post") 
    },

     putWithToken: function(action, data) {
         return callApiWithToken(action, data, "put") 
     },

    // getExpenses: function (period) {
    //     // return ExpensesData.expenses;
    //     return axios.all([getAllExpenses(period)])
    //         .then(function (arr) {
    //             return {
    //                 repos: arr[0].data
    //             }
    //         })
    // },

    // postExpenses: function(expense) {
    //     return axios.all([post(expense)])
    //         .then(function (arr) {
    //             return {
    //                 id: arr[0].data
    //             }
    //         }
    //     )
    // },

    // putExpenses: function(expense) {
    //     return axios.all([put(expense)])
    //         .then(function (arr) {
    //             return {
    //                 id: arr[0].data
    //             }
    //         }
    //     )
    // },

    // removeExpenses: function(expense) {
    //     return axios({
    //         method: 'delete',
    //         url: webApiurl + expense.ExpensesID,
    //         data: expense
    //     });
    // }
}


module.exports = helpers;