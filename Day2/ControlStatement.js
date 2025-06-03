const stockHistory = [
    {date : "06-11-2024" , stock:"TCS" , open : 4084 , high :4078 , low : 3960 , close : 3968 },
    {date : "05-11-2024" , stock:"TCS" , open : 4090 , high :4107 , low : 4060 , close : 4084 },
    {date : "04-11-2024" , stock:"TCS" , open : 4095 , high :4103 , low : 4051 , close : 4090   },
    {date : "03-11-2024" , stock:"TCS" , open : 3800 , high :4095 , low : 3800 , close : 4095 },
    {date : "02-11-2024" , stock:"TCS" , open : 3751 , high :3850 , low : 3740 , close : 3800 },
    {date : "01-11-2024" , stock:"TCS" , open : 3612, high :3758 , low : 3612 , close : 3751   }
]


//If Example.

   const current = stockHistory[0];
   const previous = stockHistory[1];
   let previousTrend = "" ;
   let currentTrend = "";
   if (previous.close >= previous.open) {
    previousTrend = "UP"
   } else {
    previousTrend = "DOWN"
   }
   currentTrend = current.close > current.open ? "UP" : "DOWN";

   if (currentTrend == "UP" && previousTrend == "UP") {
    console.log("Good to Trade");
   } else {
    console.log("Not Good for Trade");
   }


//forExample
let upTrandCount = 0;
let downTrendCount = 0;
let neutralCount = 0;
for (let i =0 ;i< stockHistory.length ; i++) {
    if (stockHistory[i].close > stockHistory[i].open) {
        upTrandCount = upTrandCount +1 ;
    } else if (stockHistory[i].close < stockHistory[i].open) {
        downTrendCount = downTrendCount +1;
    } else {
        neutralCount = neutralCount +1;
    }
}

console.log({upTrandCount , downTrendCount , neutralCount});


//While Example

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

const todayTrend = getTrend(stockHistory[0]);
let trendCount = 1;
let counter =1;
while(getTrend(stockHistory[counter]) == todayTrend) {
    trendCount = trendCount +1;
    counter++;
}

console.log({todayTrend , trendCount});


//switch exmple 
let budget = 0;

switch(todayTrend) {
    case  "UP" : 
        budget = 10000;
        break;
    case "DOWN" : 
        budget = 0;
        break;
    case "NEUTRAL" :
        budget = 5000;
}

console.log({budget});






