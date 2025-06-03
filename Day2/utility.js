function getTrend(stock) {
    let trend = "";
    if (stock.close > stock.open) {
        trend = 'UP'
    } else if (stock.close < stock.open) {
       trend = 'DOWN'
    } else {
        trend = "NEUTRAL"
    }
    return trend;
}

module.exports = {
    getTrend
};