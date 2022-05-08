const Power = require("../models/power");
const Data = require("../models/data");
const path = require('path');
module.exports.home = async (req, res)=>{
    try{
        const power = await Power.find({}).sort('year').sort('month');
        const x = [];
        const y = [];
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        power.forEach((element)=>{
            const xvalue = path.join(month[element.month]+' '+element.year);
            x.push(xvalue);
            y.push(element.value);
        });
        return res.render('home',{
            title: "Workurious | Electricity Bill",
            xaxis: x,
            yaxis: y
        });
    }catch(err){
        console.log(err);
        return;
    }
}
module.exports.createData = async (req, res)=>{
    try{
        await Data.create(req.body);
        const sd = req.body.sDate;
        const ed = req.body.eDate;
        Data.create(req.body);
        // To set two dates to two variables
        const date1 = new Date(sd);
        const date2 = new Date(ed);
        // To calculate the time difference of two dates
        const Difference_In_Time = date2.getTime() - date1.getTime();
        if(Difference_In_Time<0){
            return res.redirect('back');
        }
        // To calculate the no. of days between two dates
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)+1;
        // per day consumption
        const perDay = (req.body.power/Difference_In_Days).toFixed(2);
        let d = date1;
        while(d<=date2){
            let endOfMonth = new Date(d.getFullYear(), d.getMonth()+1, 0);
            // if date2 is less than the end of the month.
            if(date2<endOfMonth){
                endOfMonth = date2;
            }
            // Find the number of days that is in the range of start of month and end of month 
            const days_diff = Math.ceil((endOfMonth.getTime() - d.getTime())/(1000 * 3600 * 24))+1;
            const filter = {
                year: endOfMonth.getFullYear(),
                month: endOfMonth.getMonth()
            }
            // Finds whether the respective month and year entry exists.
            const pow = await Power.findOne(filter);
            if(!pow){
                const power = await Power.create({
                    year: endOfMonth.getFullYear(),
                    month: endOfMonth.getMonth(),
                    // add the (number of days)*perdayPower in the power value of that month
                    value: days_diff*perDay
                });
            }else{
                // add the (number of days)*perdayPower in the power value of that month
                pow.value = pow.value+(days_diff*perDay);
                pow.save();
            }
            let tempDate = new Date(endOfMonth);
            d.setDate(tempDate.getDate()+1);
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
    
}