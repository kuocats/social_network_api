const {connect, connection} = require ('mongoose');

const connectionString = 
    process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connectionString, {
    useNewURLparser: true,
    useUnifiedTopology: true
});

module.exports = connection;