/**
 * Created by 粉 on 2017/2/7.
 */
//下拉框
MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var  shchool=["西安邮电大学","陕西科技大学","西安工业大学","陕西师范大学","西安科技大学"];
function init_start() {
    //先给年下拉框赋内容
    var y = new Date().getFullYear();
    for (var i = (y - 10); i < (y + 10); i++) //以今年为准，前10年，后10年
    {
        document.start_data.start_year.options.add(new Option(" " + i + " 年", i));
        document.end_date.end_year.options.add(new Option(" " + i + " 年", i));
    }
    //赋月份的下拉框
    for (var i = 1; i < 13; i++) {
        document.start_data.start_month.options.add(new Option(" " + i + " 月", i));
        document.end_date.end_month.options.add(new Option(" " + i + " 月", i));
    }
    for(var j=1;j<shchool.length;j++)
    {
        document.school.select_school.options.add(new Option(shchool[j],shchool[j]))
    }
    line_chart();
}
if (document.attachEvent)
    window.attachEvent("onload", init_start);
else
    window.addEventListener('load', init_start, false);
function YYYYDD(str) //年发生变化时日期发生变化(主要是判断闰平年)
{
    var MMvalue = document.start_data.start_month.options[document.start_data.start_month.selectedIndex].value;
    if (MMvalue == "") {
        var e = document.start_data.start_day;
        optionsClear(e);
        return;
    }
    var n = MonHead[MMvalue - 1];
    if (MMvalue == 2 && IsPinYear(str)) n++;
    writeDay(n)
}

function MMDD(str) //月发生变化时日期联动
{
    var YYYYvalue = document.start_data.start_year.options[document.start_data.start_year.selectedIndex].value;
    if (YYYYvalue == "") {
        var e = document.start_data.start_day;
        optionsClear(e);
        return;
    }
    var n = MonHead[str - 1];
    if (str == 2 && IsPinYear(YYYYvalue)) n++;
    writeDay(n)
}

function writeDay(n) //据条件写日期的下拉框
{
    var e = document.start_data.start_day;
    optionsClear(e);
    for (var i = 1; i < (n + 1); i++)
        e.options.add(new Option(" " + i + " 日", i));
}

function IsPinYear(year) //判断是否闰平年
{
    return (0 == year % 4 && (year % 100 != 0 || year % 400 == 0));
}

function optionsClear(e) {
    e.options.length = 1;
}


function end_Year(str) //年发生变化时日期发生变化(主要是判断闰平年)
{
    var month_value = document.end_date.end_month.options[document.end_date.end_month.selectedIndex].value;
    if (month_value == "") {
        var e = document.end_date.end_day;
        optionsClear(e);
        return;
    }
    var n = MonHead[month_value - 1];
    if (month_value == 2 && IsPinYear(str)) n++;
    write_end_Day(n)
}

function end_Month(str) //月发生变化时日期联动
{
    var year_value = document.end_date.end_year.options[document.end_date.end_year.selectedIndex].value;
    if (year_value == "") {
        var e = document.end_date.end_day;
        optionsClear(e);
        return;
    }
    var n = MonHead[str - 1];
    if (str == 2 && IsPinYear(year_value)) n++;
    write_end_Day(n)
}

function write_end_Day(n) //据条件写日期的下拉框
{
    var e = document.end_date.end_day;
    optionsClear(e);
    for (var i = 1; i < (n + 1); i++)
        e.options.add(new Option(" " + i + " 日", i));
}

//折线图
function get_School() {
    var my_school=document.school.select_school.options[document.school.select_school.selectedIndex].value;
    return my_school;
}
function get_start_time() {
    var  start_time=[];
    var my_start_year=document.start_data.start_year.options[document.start_data.start_year.selectedIndex].value;
    var my_start_month=document.start_data.start_month.options[document.start_data.start_month.selectedIndex].value;
    var my_start_day=document.start_data.start_day.options[document.start_data.start_day.selectedIndex].value;
    start_time[0]=my_start_year;start_time[1]=my_start_month;start_time[1]=my_start_day;
    return (start_time);
}
function get_end_time() {
    var  end_time=[];
    var my_end_year=document.end_date.end_year.options[document.end_date.end_year.selectedIndex].value;
    var my_end_month=document.end_date.end_month.options[document.end_date.end_month.selectedIndex].value;
    var my_end_day=document.end_date.end_day.options[document.end_date.end_day.selectedIndex].value;
    end_time[0]=my_end_year;end_time[1]=my_end_month;end_time[1]=my_end_day;
    return (end_time);
}
var  line;
function line_chart() {
    line=Highcharts.chart('container', {
        title: {
            text: '用户分析表',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: '用户数量（个）'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: "西安邮电大学",
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });
}
function analyse() {
    var school=get_School();
    var start_time=get_start_time();
    var end_time=get_end_time();
    var data = [129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4];
    console.log(line);
    line.series[0].setData(data);
    line.series[0].name="陕西可加大学"
}
