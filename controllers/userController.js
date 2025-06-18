const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  userModel.createUser(name, email, hashedPassword, (err, result, messageError) => {
    
    if (err) return res.status(500).json({ message: 'Error interno del servidor' });

    if (messageError) return res.status(400).json({ message: messageError });

    return res.status(201).json({ message: 'Usuario registrado correctamente' });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Faltan datos obligatorios' });

  userModel.findUserByEmail(email, (err, users, messageError) => {
    if (err) return res.status(500).json({ message: 'Error interno del servidor' });

    if (messageError) return res.status(404).json({ message: messageError });

    const user = users[0]; 

    if (!user || !user.password) return res.status(404).json({ message: 'Usuario no encontrado' });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    userModel.updateLastLogin(user.id, (errUpdate, _, messageErrorUpdate) => {
      if (errUpdate) return res.status(500).json({ message: 'Error interno del servidor' });

      if (messageErrorUpdate) return res.status(404).json({ message: messageErrorUpdate });

      return res.json({
        message: 'Inicio de sesión exitoso',
        user: { id: user.id, name: user.name, email: user.email }
      });
    });
  });
};

const listUsers = (req, res) => {
  userModel.getAllUsers((err, users, messageError) => {
    if (err) return res.status(500).json({ message: 'Error interno del servidor' });

    if (messageError) return res.status(404).json({ message: messageError });

    const filteredUsers = users.filter(u => u.email !== null);

    if (filteredUsers.length === 0) {
      return res.status(404).json({ message: 'No existen usuarios registrados' });
    }

    return res.json({ users: filteredUsers });
  });
};


module.exports = {
    loginUser,
    registerUser,
    listUsers,
};

