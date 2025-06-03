const orderBook = require("./Data/OrderBook");

function getTotalProfit() {
    return orderBook.reduce((totalProfit , row) => {
        totalProfit = totalProfit + row.saleValue - row.buyValue;
        return totalProfit;
    },0)
};

function groupOrderBook() {
    const profitTrades = orderBook.filter(row => row.saleValue > row.buyValue);
    const lossTrades = orderBook.filter(row => row.saleValue < row.buyValue);
    return {profitTrades, lossTrades};
   

}

module.exports = {getTotalProfit , groupOrderBook}