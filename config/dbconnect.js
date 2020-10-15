const mongoose = require('mongoose');
const uri = 'mongodb+srv://AdminCitas:1234@cluster0.x3nrp.mongodb.net/clinicaDental?retryWrites=true&w=majority'


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("    ---> Connected to mongoDB");
}).catch((err) => {
    console.log(err);
});

// module.exports = mongoose.connect;