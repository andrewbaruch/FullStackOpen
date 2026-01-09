const express = require("express");
let data = require("./data.json");
const morgan = require('morgan')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

morgan.token('body', function getBody (req) {
    if(req.body) {
        return JSON.stringify(req.body);
    } else {
        return '';
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get("/", (request, response) => {
    response.send("<h1>Persons API</h1>");
});

app.get("/api/persons", (request, response) => {
    console.log(request.body);
    response.json(data);
});

app.get("/info", (request, response) => {
    const entryCount = data.length;
    const date = Date().toLocaleString();
    const reply = "<h2>Phonebook has info for " + entryCount + " people</h2><br/><h3>" + date + "</h3>";
    response.send(reply);
});

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = data.find((entry) => entry.id === id);
    if (person) {
        response.json(person);
    } else {
        response.statusMessage = `Whoops, the person with ID ${id} doesnt exist in the phonebook.`;
        response.status(404).end();
    }
});

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = data.find((entry) => entry.id === id);
    if (person) {
        data = data.filter((entry) => entry.id !== id);
        response.statusMessage = `Person ${person.name} with ID ${id} has been deleted.`;
        response.status(204).end();
    } else {
        response.statusMessage = `Whoops, the person with ID ${id} doesnt exist in the phonebook.`;
        response.status(404).end();
    }
});


const generateId = () => {
    const id =
        Math.floor(Math.random() * 10000)
    return String(id);
};

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({error: "name missing"});
    }

    if (!body.number) {
        return response.status(400).json({error: "number missing"});
    }

    const nameExists = data.find((entry) => entry.name === body.name);

    if(nameExists) {
        return response.status(400).json({error: "Person Already Exists"});
    }


    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId()
    };

    data = data.concat(newPerson);

    response.json(newPerson);
});



const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});