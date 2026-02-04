const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/products.json");
function readData() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAll = (req, res) => {
    const products = readData();
    res.json(products);
};

exports.getOne = (req, res) => {
    const products = readData();
    const product = products.find(p => p.id == req.params.id);

    if (!product) return res.status(404).json({ message: "Topilmadi" });

    res.json(product);
};


exports.create = (req, res) => {
    const products = readData();

    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);
    writeData(products);

    res.json(newProduct);
};

exports.update = (req, res) => {
    let products = readData();

    products = products.map(p => {
        if (p.id == req.params.id) {
            return { ...p, ...req.body };
        }
        return p;
    });

    writeData(products);
    res.json({ message: "Yangilandi" });
};


exports.remove = (req, res) => {
    let products = readData();

    products = products.filter(p => p.id != req.params.id);

    writeData(products);
    res.json({ message: "O'chirildi" });
};
