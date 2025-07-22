import express from 'express'
import { addUser, claimPoints, createHistory, getAllHistory, getAllUsers } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post('/add-user',addUser)
userRouter.get('/all-users', getAllUsers)
userRouter.post('/claim-points', claimPoints);
userRouter.post('/create-history',createHistory)
userRouter.get('/list-history',getAllHistory)

export default  userRouter