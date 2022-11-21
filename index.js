//Mongodb
//A record in MongoDB is a document, which is a data structure composed of field and value pairs. MongoDB documents are similar to JSON objects.
// The values of fields may include other documents, arrays, and arrays of documents.
//MongoDB stores documents in collections. Collections are analogous to tables in relational databases.
//mongod is the primary daemon process for the MongoDB system. It handles data requests, manages data access, and performs background management operations.

//From a terminal, issue the following command to import the MongoDB public GPG Key from https://www.mongodb.org/static/pgp/server-6.0.asc
//wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
//Create the list file /etc/apt/sources.list.d/mongodb-org-6.0.list for your version of Ubuntu.
//echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
//sudo apt-get update
//sudo apt-get install -y mongodb-org
//If you installed via the package manager, the data directory /var/lib/mongodb and the log directory /var/log/mongodb are created during the installation
//The official MongoDB package includes a configuration file (/etc/mongod.conf). These settings (such as the data directory and log directory specifications) take effect upon startup. That is, if you change the configuration file while the MongoDB instance is running, you must restart the instance for the changes to take effect.
//sudo systemctl start mongod
//sudo systemctl status mongod
//sudo systemctl stop mongod
//sudo systemctl restart mongod
//download and install compass
//mkdir mongo-demo
//cd mongdo-demo
//npm init --yes
//npm i mongoose