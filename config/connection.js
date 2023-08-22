const {connect, connection} = require ('mongoose');

const connectionString = 
    process.env.MONGOB_URI || 'mongob://localhost:27017/socialDB';

connect(connectionString. {
    useNewURLparser: true,
    useUnifiedTopology: true,
});

module.exports = connection;