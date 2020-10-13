const mongoose = require('mongoose');
const MongoAtlasUri = 'mongodb+srv://AdminCitas:1234@cluster0.x3nrp.mongodb.net/Cluster0?retryWrites=true&w=majority'


try {

    mongoose.connect(
        MongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose está conectado.")
    );

} catch (error) {
    console.log("No se ha podido conectar con Mongoose: ", error);
}