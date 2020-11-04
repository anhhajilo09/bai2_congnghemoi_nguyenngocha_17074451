const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-southeast-1"
})

const docClient = new aws.DynamoDB.DocumentClient();

module.exports = {
    getAll() {
        return new Promise((resolve, reject) => {
            docClient.scan({
                TableName: "products"
            }, (err, data) => {
                if (err)
                    reject(err);
                else {
                    const { Items } = data;
                    resolve(Items);
                }
            });
        })
    },
    getOneById(id) {
        return new Promise((resolve, reject) => {
            docClient.get({
                TableName: "products",
                Key: {
                    "id": Number.parseInt(id)
                }
            }, (err, data) => {
                if (err)
                    reject(err);
                else {
                    const { Item } = data;
                    resolve(Item);
                }
            });
        })
    }
}