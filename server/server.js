import * as path from "path";
import * as fs from "fs/promises";


// To create user's data
export const createUser = async (req, res) => {
  try {
    const {name, phone, tariff} = req.body;

    if (!name?.length || phone?.length !== 12 || !tariff) {
      return res.status(400).send({
        ok: false,
        message: 'Malumotlar xato'
      });
    }
    
    const users = JSON.parse(await fs.readFile(path.join('db', 'db.json'), {encoding: 'utf-8'})) || [];

    users.push({
      id: users.length + 1,
      name,
      phone,
      tariff,
      date: new Date().toLocaleString()
    })

    await fs.writeFile(path.join('db', 'db.json'), JSON.stringify(users, null, 2))

    return res.status(200).send({
      ok: true,
      message: 'User created successfully'
    });
  } catch (e) {

  }
};

// To get user's data
export const getUsers = async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(path.join('db', 'db.json'), {encoding: 'utf-8'}));

    return res.status(200).send(JSON.stringify({
      ok: true,
      users
    }));
  } catch (e) {

  }
};
// To delete user's data
export const deleteUsers = async (req, res) => {
  try {
    const {id} = req.body;

    const users = JSON.parse(await fs.readFile(path.join('db', 'db.json'), {encoding: 'utf-8'}))

    const filteredUser = users.filter(user => +user.id !== +id);

    await fs.writeFile(path.join('db', 'db.json'), JSON.stringify(filteredUser, null, 2))

    return res.status(200).send({
      ok: true,
      message: 'User deleted successfully'
    })
  } catch (e) {
  }
}


// To update user's data
export const updateUsers = async (req, res) => {
  try {
    const {id, name, phone, tariff} = req.body;

    if (!id || !name?.length || phone?.length !== 12 || !tariff) {
      return res.status(400).send({
        ok: false,
        message: 'Information is not complete'
      });
    }
    let currentUsers = JSON.parse(await fs.readFile(path.join('db', 'db.json'), {encoding: 'utf-8'}) || []);
    const toUptadeIndex =  currentUsers.findIndex(user => user.id === id);

    if (toUptadeIndex === -1) {
      return res.status(404).send({
        ok:false,
        message:'User not found'
      })
    }

    const userToUpdate = currentUsers[toUptadeIndex];
    userToUpdate.name = name
    userToUpdate.phone = phone
    userToUpdate.tariff = tariff

    try {
      await fs.writeFile(path.join('db', 'db.json'), JSON.stringify(currentUsers, null, 2));
      res.status(200).json({
        ok: true,
        message: 'User updated successfully'
      });
    } catch (error) {
      console.error('Error writing file:', error);
      res.status(500).json({
        ok: false,
        message: 'Failed to update user data'
      });
    }

  } catch (e) {
    console.error(e);
    res.status(500).send({
      ok: false,
      message: 'Some error'
    });
  }
};