const fs = require("node:fs/promises");

function MenuItem(mealTime, meal, quantity, price) {
    
    const tax = 1.5;

    this.mealTime = mealTime;
    this.meal = meal;
    this.quantity = quantity;
    this.price = price;
}


// TODO: Read CSV

async function readMenu(csvFile) {
    try {
        console.log(":: File Found.")
        return fs.readFile(csvFile, 'utf8');        
    } catch (e) {
        console.error(e);    
    }
}
// TODO: Parse CSV
function parseMenu(stringData) {
    console.log(":: Data Parsed.");
    return stringData.split('\n');
}

// TODO: Group CSV
function groupMenu(parsedData) {
    let items = [];
    
    parsedData.forEach(item => {
        let itemElements = item.split(',');

        items.push(
            new MenuItem(
                itemElements[0],
                itemElements[1],
                itemElements[2],
                itemElements[3]
            )
        )
    });
    console.log(`:: ${items.length} Menu Items Grouped.`);
    return items;
}
// TODO: Build Menu
function buildMenuString(groupedMenuItems) {

    let menuString = "";


    let breakfast = [];
    let lunch = [];
    let dinner = [];
    let dessert = [];

    groupedMenuItems.forEach((item) => {
    switch (String(item.mealTime).toLowerCase().trim()) {
        case "breakfast":
        breakfast.push(item);
        break;
        case "lunch":
        lunch.push(item);
        break;
        case "dinner":
        dinner.push(item);
        break;
        case "dessert":
        dessert.push(item);
        break;
        default:
    
        break;
    }
    });

    let orderedMenuItems = [];

    breakfast.forEach(element => {
        orderedMenuItems.push(element);
    });
    lunch.forEach(element => {
        orderedMenuItems.push(element);
    });
    dinner.forEach(element => {
        orderedMenuItems.push(element);
    });
    dessert.forEach(element => {
        orderedMenuItems.push(element);
    });

    console.log(':: Items Ordered.')

    let currentMeal = orderedMenuItems[0].mealTime;

    menuTitle(currentMeal);
    orderedMenuItems.forEach(item => {
        if (currentMeal === item.mealTime) {
            menuString += `\t${item.price}  ${item.meal}, ${item.quantity}\n`
        } else {
            currentMeal = item.mealTime;
            menuTitle(item.mealTime);
            menuString += `\t${item.price}  ${item.meal}, ${item.quantity}\n`

        }
    });
    
    function menuTitle(string) {
            menuString += `** ${string} **\n`;
        }

    console.log(':: Items Added To Memory.');
    return menuString;
    
    
}


// TODO: Write Menu
function writeMenu(menuString) {
    try {

        console.log(`:: Wrote To File!`)
        return fs.writeFile("menu.txt", menuString);
    
    } catch (e) {
        console.error(e);
    }
}



async function buildMenu() {

    try {
          const cvsStringData = await readMenu("menu.csv");
        const parsedData = parseMenu(cvsStringData);
        const groupedData = groupMenu(parsedData);
        const menuString = buildMenuString(groupedData);
        await writeMenu(menuString);
    } catch (e) {
        console.error(e);
    }

      
        
    
        
  
}

buildMenu();