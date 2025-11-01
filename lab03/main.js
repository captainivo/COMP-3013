const fs = require("node:fs/promises");
const path = require("node:path");

const readPath = "./menu.csv";
const writePath = "./menu.txt";

function Item(mealType, mealName, mealQuantity, price) {
  this.mealType = mealType;
  this.mealName = mealName;
  this.mealQuantity = mealQuantity;
  this.price = price;
}



const MEAL_ORDER = { breakfast: 1, lunch: 2, dinner: 3, dessert: 4 };

async function readFile() {
  const fileData = await fs.readFile(readPath, "utf-8");
  const orders = processCSV(fileData);

  orders.sort((a, b) => {
    const aKey = a.mealType.toLowerCase().trim();
    const bKey = b.mealType.toLowerCase().trim();
    return (MEAL_ORDER[aKey] ?? 999) - (MEAL_ORDER[bKey] ?? 999)
      || a.mealName.localeCompare(b.mealName);
  });

  return orders;
}

async function writeToFile(orders) {
  await printer(orders);
}

function processCSV(fileData) {
  return fileData
    .split(/\r?\n/)
    .filter(l => l.trim() !== "")
    .map(line => {
      const [t, name, qty, price] = line.split(",").map(s => s.trim());
      return new Item(capWords(t), name, qty, applyTax(price));
    });
}

function capWords(str = "") {
  return str.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase());
}

function applyTax(price) {
  const M = 1.8; 
  const number = Number(String(price).replace(/[^0-9.-]/g, "")) * M;
  return "$" + number.toFixed(2);
}

async function ensureFile() {
  await fs.mkdir(path.dirname(writePath), { recursive: true });
}

async function printer(orders) {
  if (!orders?.length) return;
  await ensureFile();
  await fs.writeFile(writePath, ""); 

  let currentType = null;
  fs.appendFile(writePath, `Created: ${Date.now()}\n\n`);
  for (const order of orders) {
    if (order.mealType !== currentType) {
      currentType = order.mealType;
      await fs.appendFile(writePath, `\n* ${currentType} Items *\n`);
    }
    await fs.appendFile(
      writePath,
      `${order.price}  ${order.mealName}, ${order.mealQuantity}\n`
    );
  }
}

async function main() {
  try {
    const orders = await readFile();
    await writeToFile(orders);   
    console.log("Program is finished\n");
  } catch (err) {
    console.error(err);
  }
};

main();
