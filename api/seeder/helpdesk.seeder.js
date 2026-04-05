const mongoose = require('mongoose');
const Helpdesk = require('../model/helpdesk.model');

const seedData = [
    {
        key: "BISHAN_01",
        value: "Connection issue at Bishan station",
        category: "it support",
        priority: "high",
        notes: "Distance to the next station is 1.7km",
        status: "open"
    },
    {
        key: "SERANGOON_02",
        value: "EZ-Link card payment error",
        category: "billing",
        priority: "medium",
        notes: "Need to check card reader at gate number 2",
        status: "in-progress"
    },
    {
        key: "PAYA_LEBAR_03",
        value: "Request to create new staff account",
        category: "account",
        priority: "low",
        notes: "Technical staff on Circle Line",
        status: "closed"
    }
];

const runSeeder = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Helpdesk');
        console.log("🌱 Connecting to Database...");

        await Helpdesk.deleteMany({});
        console.log("🧹 Old data cleared.");

        await Helpdesk.insertMany(seedData);
        console.log("✅ Sample data created successfully!");

        process.exit();
    } catch (error) {
        console.error("❌ Seeding Error:", error.message);
        process.exit(1);
    }
};

runSeeder();
