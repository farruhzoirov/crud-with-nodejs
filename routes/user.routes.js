import {Router} from 'express';
import { getUsers, createUser, deleteUsers,updateUsers} from "../server/server.js";
const router = Router();

router.post('/create-user', createUser);

router.get('/get-users', getUsers);

router.post('/delete-user', deleteUsers);

router.post('/update-user', updateUsers);

export default { route: '/', router };


