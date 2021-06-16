const mongoose = require('mongoose');


const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('Base de datos corriendo');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos');
    }
}

module.exports = {
    dbConnection,
}