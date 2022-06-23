const { Db } = require('mongodb');

module.exports = function(app, db) {
   
    require('./server/service/user')(app, db);
    require('./server/service/services')(app, db);
    require('./server/service/booking')(app, db);
    require('./server/service/course')(app, db);

    require('./server/service/upload/upload')(app, db);

};