const express = require('express');
const router = express.Router();
const userControl = require('../controllers/userControllers');
const likeControl = require('../controllers/likeControllers');
const handleErrorAsync = require("../service/handleErrorAsync")

const { isAuth } = require('../service/auth')

/* GET users listing. */
router.get('/', handleErrorAsync(userControl.getAllUsers));

// 取得個人資料
router.get('/profile',isAuth, handleErrorAsync(userControl.getUserProfile));

// 取得個人追蹤者
router.get('/following',isAuth, handleErrorAsync(userControl.getUserFollowing));

// 取得個人喜愛貼文
router.get('/getLikeList',isAuth, handleErrorAsync(likeControl.getLikeList));

// 登入會員
router.post('/sign_in', handleErrorAsync(userControl.postUserSignIn));

// 註冊會員
router.post('/sign_up', handleErrorAsync(userControl.postUserSignUp));

// 新增追蹤
router.post('/:id/follow',isAuth, handleErrorAsync(userControl.postFollow));

// 變更密碼
router.patch('/updatePassword',isAuth, handleErrorAsync(userControl.patchUserPassword));

// 變更貼文
router.patch('/profile',isAuth, handleErrorAsync(userControl.patchUserProfile));

// 取消追蹤
router.delete('/:id/unfollow',isAuth,handleErrorAsync(userControl.deleteFollow));

module.exports = router;


// router.delete('/', handleErrorAsync(
//   async (req, res) => {
//     await User.deleteMany({});
//     res.status(200).json({status:"success", data:[]})
//   }
// ));

// router.delete('/:id', handleErrorAsync(
//   async (req, res, next) => {
//     const id = req.params.id;
//     const resultUser = await User.findByIdAndDelete(id);
//     if(resultUser == null){
//       return next(appError(400,"查無此id",next))
//     }
//     const users =await User.find({});
//     res.status(200).json({status:"success", data:users})
//   }
// ));
