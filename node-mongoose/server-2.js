var mongoose = require('mongoose'), assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected correctly to server');
    Dishes.create({
        name: "UthaPizza",
        description: "Test"
    }, function (err, dish) {
        if (err) throw err;
        console.log(dish);
        // CAPTURE ID OF THE DISH
        var id = dish._id;
        //DELAY
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: "Updated Test"
                }
            }, {
                new: true
            })
                .exec(function (err, dish) {
                    if(err) throw err;
                    console.log("Updated Dish!!");
                    console.log(dish);

                    db.collection('dishes').drop(function () {
                        db.close();;
                    });
                });
        }, 3000);


    });

});