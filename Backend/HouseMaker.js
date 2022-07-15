const fs = require('fs');

class House {
    constructor(city, state, street, zip, sqrft, type, listing, imgL, imgM, cost, stnum){
        this.location = {
            city: city,
            state: state,
            street: street,
            postcode: zip,
            streetnumber: stnum
        },
        this.houseType = {
            sqrft: sqrft,
            type: type
        },
        this.Listing = {
            listing: listing,
            cost: cost
        },
        this.picture = {
            large: imgL,
            medium: imgM
        }
    }
}

exports.generator = {
    lasts: JSON.parse(fs.readFileSync('./json/lastnames.json')),
    femalefirsts: JSON.parse(fs.readFileSync('./json/female.json')),
    strees: JSON.parse(fs.readFileSync('./json/streets.json')),
    citye: JSON.parse(fs.readFileSync('./json/city.json')),
    states: JSON.parse(fs.readFileSync('./json/states.json')),

    getMultHouse: function(count) {
        var returns = [];
        for(var i = 0; i < count; i++){
            returns.push(this.getHouse());
        }
        console.log(returns);
        return returns;
    },

    getHouse: function() {
        var street = `${this.getRandomEntry(this.lasts)} ${this.getRandomEntry(this.strees)}.`
        var city = `${this.getRandomEntry(this.femalefirsts)} ${this.getRandomEntry(this.citye)}`
        var state = this.getRandomEntry(this.states);
        var zip = this.getRandomzipNum(5)
        var sqrft = this.getrandNUm(1000, 10000)
        var type = "Large"
        var cost = 50000
        if(sqrft < 5000){
            type = "Small"
            cost = this.getrandNUm(10000, 50000)
        }else if(sqrft >= 5000){
            type = "Large"
            cost = this.getrandNUm(50000, 100000)
        }
        var sold = this.getSoldListing()

        var imgL = `http://localhost:4200/Large/L.jpg`
        var imgM = `http://localhost:4200/Largethmb/Lt.jpg`
        switch(type){
            case "Large":
                var imgL = `http://localhost:4200/Large/L.jpg`
                var imgM = `http://localhost:4200/Largethmb/Lt.jpg`
                break;
            case "Small":
                var imgL = `http://localhost:4200/Small/S.jpg`
                var imgM = `http://localhost:4200/Smallthmb/St.jpg`
                break;
        }

        var stnum = this.getrandNUm(1, 200)

        return new House(city, state, street, zip, sqrft, type, sold, imgL, imgM, cost, stnum)
    },

    getSoldListing: function() {
        var numbeer  = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        var listing = "Sold"
        //console.log(numbeer)
        switch(numbeer){
            case 1:
                listing = "Sold"
                break;
            case 2:
                listing = "Up for sale"
                break;
        }

        return listing;
    },

    getRandomzipNum: function(length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
    },

    getrandNUm: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    
    },

    getRandomEntry: function(items){
        return items[Math.floor(Math.random() * items.length)];
    }

}