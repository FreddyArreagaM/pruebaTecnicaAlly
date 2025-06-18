const express = require('express');
const setupSwagger = require('./swagger/swagger');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
}));

const APIRESTNAME = 'api';
const APIRESTVERSION = 'v1';

const userRoutes = require('./routes/userRoutes');
const countryRoutes = require('./routes/countryRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(`/${APIRESTNAME}/${APIRESTVERSION}/auth`, userRoutes);
app.use(`/${APIRESTNAME}/${APIRESTVERSION}/country`, countryRoutes);
app.use(`/${APIRESTNAME}/${APIRESTVERSION}/tasks`, taskRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
