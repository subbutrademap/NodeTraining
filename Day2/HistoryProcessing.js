const utility = require("./utility");

class HistoryProcessing {

    
    constructor(data) {
        this.historyData = data;
    }

    mapTrend() {
        const trends = this.historyData.map((stock) => {
            const trend = utility.getTrend(stock);
            return {
                ...stock,
                trend
            }
        });
        return trends;
    }

    trendCount() {
        const output = {"UP" : 0 , "DOWN" : 0};

        this.historyData.forEach((stock) => {
            const trend = utility.getTrend(stock);
            output[trend] = output[trend] +1;

        });
        return output;
    }
}

module.exports = HistoryProcessing;