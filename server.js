const express = require('express');
const { MongoClient } = require('mongodb');

const service = express();
const port = 6969;

service.use(express.json());

// POST, Insert dans la base de données
service.post('/insert', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb+srv://ibrahim:ibrahim@cluster0.uhijttw.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db('poolDatabase');

    const collection = db.collection('pool');
    const result = await collection.insertOne(req.body);

    client.close();

    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET, Récupère les données de la base de données
service.get('/get', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb+srv://ibrahimkr:ibrahimkr@cluster0.uhijttw.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db('poolDatabase');
    const collection = db.collection('pool');
    const documents = await collection.find().toArray();

    client.close();

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Lancement du serveur
service.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
