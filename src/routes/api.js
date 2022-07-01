const express = require('express');
const { registration, UserLogin } = require('../controllers/ProfileController');
const { CreateBill,UpdateBill,DeleteBill,SelectBill, ReadById, AmountCount} = require('../controllers/BillListController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const router = express.Router()


// Profile Route 
router.post("/registration",registration)
router.post("/login",UserLogin)

// Bill route 
router.post('/add-billing',AuthVerifyMiddleware,CreateBill)
router.get('/billing-list',AuthVerifyMiddleware,SelectBill)
router.get('/bill-amount',AuthVerifyMiddleware,AmountCount)
router.get('/ReadById/:id',AuthVerifyMiddleware,ReadById)
router.post('/update-billing/:id',AuthVerifyMiddleware,UpdateBill)
router.get('/delete-billing/:id',AuthVerifyMiddleware,DeleteBill)



module.exports = router;