function multiplier(number1, number2) {
    return new Promise((resolve, reject) => {
        if (typeof number1 !== 'number' || typeof number2 !== 'number') {
            reject(new Error('Parameters are not numbers!'));

        } else {
            const result = parseInt(number1) * parseInt(number2);
            resolve(result);
        }
    })
    
}

multiplier(1, 2)
    .then(data => {
        
    })