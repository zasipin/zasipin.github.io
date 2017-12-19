export class AnnuitetMonthlyPayment {
    static ToPercents = 100;
    static MonthsInYear = 12;

    constructor(sum = 0, percents = 0, months = 0, extraPay = 0){
        this.state = {
            sum,
            months,
            percents,
            annuitetCoefficient: 0,
            monthlyPay: 0,
            extraPay,
            paymentForCredit: 0,
            paymentForPercents: 0,
            leftToPay: 0
        };
        return this.recalculate(this.state.sum, this.state.percents, this.state.extraPay);
    }

    recalculate(sum, percents, extraPay = 0) {
            var monthlyPercent = percents / AnnuitetMonthlyPayment.MonthsInYear / AnnuitetMonthlyPayment.ToPercents;
            var power = Math.pow((1 + monthlyPercent), this.state.months);
            var state = this.state;
            state.sum = sum;
            state.percents = percents;
            state.annuitetCoefficient = monthlyPercent * power / (power - 1);
            state.monthlyPay = parseInt(sum * state.annuitetCoefficient);
            state.paymentForPercents = parseInt(sum * monthlyPercent);
            state.paymentForCredit = state.monthlyPay - state.paymentForPercents;
            state.leftToPay = parseInt(state.sum - state.paymentForCredit - state.extraPay);
        return this;
    }

    getData(){
        return this.state;
    }

}