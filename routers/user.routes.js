var Auth = require('../controllers/user.controller');

// defined routing for auth module.
module.exports = function(router) {
    router.post('/userBill', Auth.userBill);
    router.post('/updateUserOrders', Auth.updateUserOrders);
   
    }