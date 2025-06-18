const countryModel = require('../models/countryModel');

const getAllCountries = (req, res) => {
    countryModel.getAllCountries((err, countries, messageError) => {
        if (err) return res.status(500).json({ message: 'Error interno del servidor' });

        if (messageError) return res.status(404).json({ message: messageError });

        const filteredCountries = countries.filter(c => c.name !== null);

        if (filteredCountries.length === 0) {
            return res.status(404).json({ message: 'No existen países registrados' });
        }

        return res.json({ countries: filteredCountries });
    });
};

const getCountryById = (req, res) => {
    const id = parseInt(req.params.id);
    countryModel.getCountryById(id, (err, country, messageError) => {
        if (err) {
            console.error('Error al obtener país por ID:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (messageError) {
            console.warn('Mensaje desde SP en getCountryById:', messageError);
            return res.status(404).json({ message: messageError });
        }

        return res.status(200).json(country);
    });
};

const createCountry = (req, res) => {
    const { name, addressIp, flag_code } = req.body;

    if (!name || !addressIp || !flag_code) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    countryModel.createCountry(name, addressIp, flag_code, (err, messageError) => {
        if (err) {
            console.error('Error al crear país:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (messageError) {
            console.warn('Mensaje desde SP en createCountry:', messageError);
            return res.status(400).json({ message: messageError });
        }

        return res.status(201).json({ message: 'País creado correctamente' });
    });
};

const updateCountry = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, addressIp, flag_code } = req.body;

    if (!name || !addressIp || !flag_code) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    countryModel.updateCountry(id, name, addressIp, flag_code, (err, messageError) => {
        if (err) {
            console.error('Error al actualizar país:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (messageError) {
            console.warn('Mensaje desde SP en updateCountry:', messageError);
            return res.status(400).json({ message: messageError });
        }

        return res.status(200).json({ message: 'País actualizado correctamente' });
    });
};

const deleteCountry = (req, res) => {
    const id = parseInt(req.params.id);

    countryModel.deleteCountry(id, (err, messageError) => {
        if (err) {
            console.error('Error al eliminar país:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (messageError) {
            console.warn('Mensaje desde SP en deleteCountry:', messageError);
            return res.status(404).json({ message: messageError });
        }

        return res.status(200).json({ message: 'País eliminado correctamente' });
    });
};

module.exports = {
    getAllCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry
};