const Power = require("../models/power");
const Data = require("../models/data");
module.exports.home = (req, res)=>{
    return res.render('home',{
        title: "Workurious | Electricity Bill"
    });
}
module.exports.createData = async (req, res)=>{
    console.log(req.body);
    const sd = req.body.sDate;
    const ed = req.body.eDate;
    Data.create(req.body);
    // To set two dates to two variables
    const date1 = new Date(sd);
    const date2 = new Date(ed);
    
    // To calculate the time difference of two dates
    const Difference_In_Time = date2.getTime() - date1.getTime();
    
    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Days);
    // per day consumption
    console.log('This is power '+req.body.power);
    const perDay = (req.body.power/Difference_In_Days).toPrecision(15);
    let d = date1;
    while(d<=date2){
        console.log("I am inside for loop");
        let endOfMonth = new Date(d.getFullYear(), d.getMonth()+1, 0);
        // if date2 is less than the end of the month.
        if(date2<endOfMonth){
            endOfMonth = date2;
        }
        console.log("endofMonth "+endOfMonth);
        // Find the number of days that is in the range of start of month and end of month 
        const days_diff = Math.ceil((endOfMonth.getTime() - d.getTime())/(1000 * 3600 * 24));
        const filter = {
            year: endOfMonth.getFullYear(),
            month: endOfMonth.getMonth()
        }
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
        }
        let tempDate = new Date(endOfMonth);
        d.setDate(tempDate.getDate()+1);
    }
    console.log('this is perday '+perDay);
    return res.redirect('back');
}