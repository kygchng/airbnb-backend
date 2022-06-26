const express = require("express");
const router = express.Router();

const Owner = require("../../models/Owner");
const Listing = require("../../models/Listing");

var ObjectId = require("mongodb").ObjectId;

router.post("/register/owner", async(req, res) => { //api requests must be async so it does not get congested w/ requests(don't process one by one)
    //console.log("i am in the register owner endpoint");
    const user = await Owner.findOne({email: req.body.email});
    if(user) {
        return res.status(400).send({});
    } else {
        const newOwner = new Owner(req.body);
        newOwner.save().catch(err => console.log(err));
        return res.status(200).send(newOwner);
    }
})

router.post("/create/listing", async(req, res) => {
    const ownerId = ObjectId(req.body.owner);
    const owner = await Owner.findById(ownerId);

    if(owner) {
        const newListing = new Listing(req.body);
        const ownerListings = owner.listings;
        ownerListings.push(newListing._id);

        const updatedOwner = {
            name: owner.name,
            email: owner.email,
            phone_number: owner.phone_number,
            listings: ownerListings
        }

        await Owner.findOneAndUpdate({_id: ownerId}, updatedOwner);

        newListing.save().catch(err => console.log(err));
        return res.status(200).send(newListing);
    } else {
        return res.status(404).send({});
    }
})

router.get("/fetch/listings/:name", async(req, res) => {
    const owner = await Owner.findOne({name: req.params.name});
    var response = [];
    if(owner) {
        for(var i = 0; i < owner.listings.length; i++) {
            const listingID = owner.listings[i];
            const listingId = ObjectId(listingID);
            const listing = await Listing.findById(listingId);

            response.push(listing);
        }

        return res.status(200).send(response);
    } else {
        return res.status(404).send({});
    }
})


module.exports = router;