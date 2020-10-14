const mongoose = require ('mongoose');
const MongoAtlasUri = 'mongodb+srv://AdminCitas:1234@cluster0.x3nrp.mongodb.net/clinicaDental?retryWrites=true&w=majority'


mongoose.connect(MongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then( () => {
    console.log( "    ---> Connected to mongoDB" );
}).catch( (err) => {
    console.log( err );
});