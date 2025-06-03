const History = require("./HistoryProcessing");
const ashokHistory =require("./Data/AshokLey");

// const historyObj = new History(ashokHistory);
// const result = historyObj.trendCount();
// console.log(result);

const orderProcessing = require("./OrderProcessing");

const totalProfit = orderProcessing.getTotalProfit();
console.log({totalProfit});
console.log(orderProcessing.groupOrderBook());
