const stockHistory = [
    {date : "06-11-2024" , stock:"TCS" , open : 4084 , high :4078 , low : 3960 , close : 3968 },
    {date : "05-11-2024" , stock:"TCS" , open : 4090 , high :4107 , low : 4060 , close : 4084 },
    {date : "04-11-2024" , stock:"TCS" , open : 4095 , high :4103 , low : 4051 , close : 4090   },
    {date : "03-11-2024" , stock:"TCS" , open : 3800 , high :4095 , low : 3800 , close : 4095 },
    {date : "02-11-2024" , stock:"TCS" , open : 3751 , high :3850 , low : 3740 , close : 3800 },
    {date : "01-11-2024" , stock:"TCS" , open : 3612, high :3758 , low : 3612 , close : 3751   }
]


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

function canTrade() {
    const todayTrend = getTrend(stockHistory[0]);
    const previousTrend = getTrend(stockHistory[1]);
    if (todayTrend == "UP" && previousTrend == "UP") {
        console.log(`Good for Trade`)
    } else {
        console.log("Not Good for Trade");
    }
}

function getBudget(){
    const todayTrend = getTrend(stockHistory[0]);
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
    return budget;
}

canTrade();


const trendSummary = () => {
    let trendSummary = {
        "UP" : 0 , 
        "DOWN" : 0 ,
        "NEUTRAL" : 0
    };
    stockHistory.forEach(stock => {

        const trend = getTrend(stock);
        trendSummary[trend] = trendSummary[trend] +1;
    });
    console.log(trendSummary);
}

//trendSummary();

module.exports = trendSummary;
