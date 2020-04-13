const router = require('express').Router();

let Restaurant = require('../models/restaurants.model');
let Orders = require('../models/orders.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    Restaurant.find()
        .then(Restaurant => res.json(Restaurant))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/check').get((req, res) => {
    Restaurant.findOne({RestaurantID: req.body.RestaurantID})
        .then(ResResp => {
            Orders.findOne({RestaurantID: ResResp.RestaurantID})
                .then(OrderResp => {
                    User.findOne({userID: OrderResp.userID})
                        .then(UserResp => res.json(UserResp))
                })
            .catch(err => console.log("Can't get order"))
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
    Restaurant.findById(req.params.id)
        .then(Restaurant => res.json(Restaurant))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const RestaurantID = req.body.RestaurantID;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const number = req.body.number;
    const category = req.body.category;
    const description  = req.body.description;
    const openingtime = req.body.openingtime;
    const closingtime = req.body.closingtime;
    
    const newRestaurant = new Restaurant({
        RestaurantID,
        name,
        email,
        address,
        number,
        category,
        description,
        openingtime,
        closingtime
    });

    newRestaurant.save()
        .then(() => res.json('Restaurant added!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})

router.route('/:id').delete((req, res) => {
    Restaurant.findByIdAndDelete(req.params.id)
        .then(() => res.json("Restuarant deleted"))
        .catch((err) => res.status(400).json(`Error: ${err}`))
})

router.route('/update/:id').post((req, res) => {
    Restaurant.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, useFindAndModify: false})
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json(`Error: ${err}`))
})

module.exports = router;