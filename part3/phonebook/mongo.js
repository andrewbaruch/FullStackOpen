const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log(
        "use this as follows: node mongo.js <password> <optional: name> <optional: number>. Name and number is only for adding."
    );
    process.exit(1);
}

const password = process.argv[2];

console.log(password);

const url = `mongodb+srv://fullstack:${password}@cluster0.1lcmqfi.mongodb.net/personsApp?retryWrites=true&w=majority&appName=Cluster0`;

console.log(url);

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const PersonSchema = new mongoose.Schema({ name: String, number: String });

const Person = mongoose.model("Person", PersonSchema);

if (process.argv.length == 3) {
    console.log("fetching all entries from the database:");
    Person.find({}).then((result) => {
        console.log("phonebook:");
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length == 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({ name: name, number: number });

    person.save().then((result) => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    console.log(
        "use this as follows: node mongo.js <password> <optional: name> <optional: number>. Name and number is only for adding."
    );
    process.exit(1);
}
