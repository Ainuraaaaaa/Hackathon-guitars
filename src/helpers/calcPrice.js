export const calcSubPrice = (product) => {
    return product.count * product.guitar.price;
}


export const calcTotalPrice = (cart) => {
    let sum = 0;
    cart.guitars.forEach(item => {
        sum += item.subPrice;

    });
    return sum
}