export function setCreditSum(sum) {
    sum = sum >= 0 ? sum : 0;
    return {
        type: 'SET_CREDIT_SUM',
        sum
    }
}

export function setPrice(price, downPayment) {
    price = price >= 0 ? price : 0;
    return {
        type: 'SET_PRICE',
        price,
        downPayment
    }
}


export function setDownPayment(downPayment, price) {
    downPayment = downPayment >= 0 ? downPayment : 0;
    return {
        type: 'SET_DOWN_PAYMENT',
        downPayment,
        price
    }
}

export function setPercents(percents) {
    percents = percents >= 0 ? percents : 0;
    return {
        type: 'SET_PERCENTS',
        percents
    }
}

export function addMonthsItem(sum, percents, months) {
    months = months > 0 ? months : 12;
    return {
        type: 'ADD_MONTHS',
        sum, 
        percents,
        months
    }
}

export function removeMonthsItem(months) {
    // months = months > 0 ? months : 12;
    return {
        type: 'REMOVE_MONTHS',
        months
    }
}

export function setActiveCreditMonths(months) {
    return {
        type: 'SET_ACTIVE_CREDIT_MONTHS',
        months
        // ,
        // sum,
        // percents
    }
}

export function addMonthsButtonPushed()
{
    return {
        type: 'ADD_MONTHS_BUTTON_PUSHED'
    }
}