let products = [
    {"item": "apple", "type": "Fuji", "weight": 10, "pricePerKilo": "$3"},
    {"item": "orange", "type": "Clementine", "weight": 6, "pricePerKilo": "$7"},
    {"item": "watermelon", "type": "Nova", "quantity": 1, "pricePerItem": "$5"},
    {"item": "orange", "type": "Navel", "weight": 6, "pricePerKilo": "$7"},
    {"item": "pineapple", "type": "Queen", "quantity": 4, "pricePerItem": "$15"},
    {"item": "pineapple", "type": "Pernambuco", "quantity": 3, "pricePerItem": "$12"},
    {"item": "apple", "type": "Cameo", "weight": 6, "pricePerKilo": "$7"},
    {"item": "watermelon", "type": "Trio", "quantity": 2, "pricePerItem": "$9"},
    {"item": "pineapple", "type": "Red Spanish", "quantity": 3, "pricePerItem": "$9,99"},
    {"item": "watermelon", "type": "Millionaire", "quantity": 2, "pricePerItem": "$7"},
    {"item": "orange", "type": "Tangerine", "weight": 4, "pricePerKilo": "$4,99"},
    {"item": "apple", "type": "Jazz", "weight": 4, "pricePerKilo": "$5"},
];

showValidatedObjects(products);
showTotalQuantityOfWatermelons(products);
showTotalWeightOfAllApples(products);
showProductsSortedByItem(products);
showProductsSortedByCost(products);
showTypeOfOrangesWithLeastPrice(products);
showCoastByItem(products);

function showValidatedObjects(items) {
    items.forEach(item => showMessage(`Item ${item.item} with type ${item.type} valid: ` + validateObject(item)));
}

function showTotalQuantityOfWatermelons(items) {
    const quantity = getTotalByItemAndField(items, 'watermelon', 'quantity');
    showMessage(`Total quantity of watermelons - ${quantity}`)
}

function showTotalWeightOfAllApples(items) {
    const weight = getTotalByItemAndField(items, 'apple', 'weight');
    showMessage(`Total weight of apples - ${weight}`)
}

function showProductsSortedByItem(items) {
    items.sort((a, b) => a.item.localeCompare(b.item));
    showMessage('Sorted products be item: ');
    showMessage(items);
}

function showProductsSortedByCost(items) {
    items.sort((a, b) =>getRecordTotalCoast(a) - getRecordTotalCoast(b));

    showMessage('Sorted products be coast of record: ');
    showMessage(items);
}

function showTypeOfOrangesWithLeastPrice(items) {
    const oranges = items.filter(element => element.item === 'orange')

    const maxPrice = Math.max.apply(Math, oranges.map(function (element) {
        return element.pricePerKilo
            .substr(1)
            .replace(',', '.');
    }));

    const orangesWithMaxPrice = oranges
        .filter(element => +element.pricePerKilo
            .substr(1)
            .replace(',', '.') === maxPrice
        );

    showMessage("Oranges with the least price:");

    orangesWithMaxPrice.forEach(element => showMessage(element.type));
}

function validateObject(object) {
    if (object.hasOwnProperty('item') && typeof object.item !== 'string') return false;
    if (object.hasOwnProperty('type') && typeof object.type !== 'string') return false;
    if (object.hasOwnProperty('weight') && typeof object.weight !== 'number') return false;
    if (object.hasOwnProperty('quantity') && typeof object.quantity !== "number") return false;
    if (object.hasOwnProperty('pricePerKilo') && !validatePrice(object.pricePerKilo)) return false;
    if (object.hasOwnProperty('pricePerItem') && !validatePrice(object.pricePerItem)) return false;

    return true;
}

function showCoastByItem(items) {
    let productsByItems = new Map();

    items.forEach(element => {
        const key = element.item.charAt(0).toUpperCase() + element.item.substr(1);

        const cost = getRecordTotalCoast(element);

        if (productsByItems.has(key)) {
            const value = productsByItems.get(key);
            productsByItems.set(key, value + cost);
        } else {
            productsByItems.set(key, cost);
        }
    });

    productsByItems.forEach((key, value) => showMessage(`${value} - ${key}`));
}

function validatePrice(value) {
    return typeof value === 'string'
        && value.startsWith('$')
        && !isNaN(Number(value.substr(1).replace(',', '.')))
    ;
}

function showMessage(value) {
    console.log(value);
}

function getTotalByItemAndField(array, itemName, field) {
    let total = 0;

    array.forEach(element => {
        if (element.item === itemName) {
            total += +element[field];
        }
    })

    return total;
}

function getRecordTotalCoast(item) {
    if (item.hasOwnProperty('weight') && item.hasOwnProperty('pricePerKilo')) {
        return +item.weight * item.pricePerKilo.substr(1).replace(',', '.')
    }

    if (item.hasOwnProperty('quantity') && item.hasOwnProperty('pricePerItem')) {
        return +item.quantity * item.pricePerItem.substr(1).replace(',', '.')
    }

    return 0;
}
