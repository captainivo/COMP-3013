const squareRoot = (x) => Math.sqrt(x);
    

const square = (n) => n * n;

export const distance = (x1, y1, x2, y2) => {
    let x = x2 - x1
    let y = y2 - y1

    x = square(x)
    y = square(y)

    let solution = x + y
    
    return squareRoot(solution)
}

