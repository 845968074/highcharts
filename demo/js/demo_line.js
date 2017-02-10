/**
 * Created by 粉 on 2017/2/7.
 */

//按天算，小于30天
var  text = {data:[{time: "2017-1-1",count: "20"},{time: "2017-1-2",count: "10"},{time: "2017-1-3",count: "5"},
    {time: "2017-1-4",count: "3"},{time: "2017-1-5",count: "10"},{time: "2017-1-6",count: "5"},{time: "2017-1-1",count: "20"},{time: "2017-1-2",count: "10"},{time: "2017-1-3",count: "5"},
    {time: "2017-1-4",count: "3"},{time: "2017-1-5",count: "10"},{time: "2017-1-6",count: "5"},{time: "2017-1-1",count: "20"},{time: "2017-1-2",count: "10"},{time: "2017-1-3",count: "5"},
    {time: "2017-1-4",count: "3"},{time: "2017-1-5",count: "10"},{time: "2017-1-6",count: "5"},
    {time: "2017-1-4",count: "3"},{time: "2017-1-5",count: "10"},{time: "2017-1-6",count: "5"},{time: "2017-1-1",count: "20"},{time: "2017-1-2",count: "10"},{time: "2017-1-3",count: "5"},
    {time: "2017-1-1",count: "20"},{time: "2017-1-2",count: "10"},{time: "2017-1-3",count: "5"},
    {time: "2017-1-4",count: "3"},{time: "2017-1-5",count: "10"}],
    message: "查询成功",result_code: "102" };
/* var  text = '{"data":[' +
 '{"time": "2017-1-1","count": "20"},{"time":"2017-1-2","count":"15"},{"time":"2017-1-3","count":"10"}' +
 '{"time":"2017-1-4","count":"5"},{"time":"2017-1-5","count":"4"}], "message": "查询成功","result_code": "102" }';*/
//按月算
var  text_month=set_text(12);
//console.log(text_month);
//按年算
var text_year=set_text(7*12);
function set_text(time) {
    var t={data:[],message: "查询成功",result_code: "102" };
    var y=["2017"],m,d;
    var temp=0,x=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var my_data=[];
    if(time>12){y=["2017","2018","2019","2020","2021","2022","2023"]}
    for(var k=0;k<y.length;k++)
    {
        var  z=y[k];
        for(var i=1;i<=time;i++)
    {
        var count=0;
        for(var j=1;j<=x[i-1];j++)
        {
            var year_time={time:'',count:''};
            m=z+"-"+i+"-"+j;
            d=(count++).toString();
            year_time.time=m;
            year_time.count = d;
           // console.log(year_time);
           my_data[temp++]=(year_time);
        }
    }}
    t.data=my_data;
    return t;
}

/*var  text_month = '{"data":[' +
    '{"time": "2017-1-1","count": "20"},{"time":"2017-1-2","count":"15"},{"time":"2017-1-3","count":"10"}' +
    '{"time":"2017-1-4","count":"5"},{"time":"2017-1-5","count":"4"}], "message": "查询成功","result_code": "102" }';*/

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
    if(my_school!='')
    return my_school.toString();
    else return false;
}
function get_start_time() {
    var  start_time=[];
    var my_start_year=document.start_data.start_year.options[document.start_data.start_year.selectedIndex].value;
    var my_start_month=document.start_data.start_month.options[document.start_data.start_month.selectedIndex].value;
    var my_start_day=document.start_data.start_day.options[document.start_data.start_day.selectedIndex].value;
    start_time[0]=my_start_year;start_time[1]=my_start_month;start_time[2]=my_start_day;
    return (start_time);
}
function get_end_time() {
    var  end_time=[];
    var my_end_year=document.end_date.end_year.options[document.end_date.end_year.selectedIndex].value;
    var my_end_month=document.end_date.end_month.options[document.end_date.end_month.selectedIndex].value;
    var my_end_day=document.end_date.end_day.options[document.end_date.end_day.selectedIndex].value;
    end_time[0]=my_end_year;end_time[1]=my_end_month;end_time[2]=my_end_day;
    return (end_time);
}
function select_Data(start_time) {
    if (start_time[0] != '' && start_time[1] != '' && start_time[2] != '') {
        var data_time = start_time[0] + "-" + start_time[1] + "-" + start_time[2];
        return data_time;
    }
    /*    else  if(start_time[0]!=''&&start_time[1]!=''&&start_time[2]=='')
     {
     var month_data=start_time[0]+'-'+start_time[1]+'-'+'1';
     return month_data;
     }
     else  if(start_time[0]!=''&&start_time[1]==''&&start_time[2]=='')
     {
     var year_data=start_time[0]+'-1-1';
     return year_data;
     }*/
    else {
        return false;
    }
}
function select_Type() {
    var start_time=get_start_time();
    var end_time=get_end_time();
    var start_month=start_time[1]  +  '-'  +  start_time[2];
    var  end_month=end_time[1]  +  '-'  +  end_time[2];
    var  oDate1  =  new  Date(start_month+  '-'  + start_time[0]);    //转换为12-18-2006格式
    var oDate2  =  new  Date(end_month+ '-'+end_time[0]);
    var  iDays =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数
    console.log(oDate1+"  "+oDate2+"  间隔天数： "+iDays);
    if((iDays>=30*5&&iDays<=728)||(iDays>=31*5&&iDays<730))  //间隔天数大于5个月左右，小于两年，按月算
    {
        return "按月算"
    }
    else if(iDays<31)  //间隔天数小于30或者31（包括二月特例）按照天数算
    {
        return "按天算"
    }
    else if(iDays>=(364*5+1)||iDays>=(364*5+2))  //间隔天数大于等于五年按照年算
    {
        return "按年算"
    }
    else
    {
        false;
    }
    return  iDays
}

function getData(callback) {
    var categories=[],series_data=[];
    var start_time=select_Data(get_start_time());
    var end_time=select_Data(get_end_time());
    var my_school=get_School();
    if(start_time!=false&&end_time!=false&&my_school!=false) {
        //alert(start_time+end_time+my_school);
       /* $.ajax({
            type: "POST",
            url: "http://www.yangjing1007.cn/BlueCar/manager/analyse/" + my_school,
            async: true,
            data: {school:my_school,start_time:start_time,end_time:end_time},
            success: function (data, textStatus) {
                var  data_time = eval("(" + data + ")");
                console.log("aaaaaaaaa: " +data_time);
                return callback(data_time)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("用户数据请求失败");
            }
        })*/
      //  var  data_time = eval("(" + text + ")");
    var time_data,start_categories=get_start_time(),end_categories=get_end_time();;
        var  type=select_Type();
        console.log("类型: "+type);
        if(type=='按年算')
        {
            var t=0,j=0;
            time_data=text_year.data;
          //  console.log(time_data);
            var  get_time,y;
            for(var i=parseInt(start_categories[0]);i<=parseInt(end_categories[0]);i++)
            {
                categories.push(i.toString()+"年");
                var  count_year=0;
                get_time=time_data[t].time;
                y=parseInt(get_time.split("-")[0]);
                console.log("first:  y: "+y+"i: "+i+"  t: "+t+" is "+(t!=time_data.length));
                while (y==i&&(t!=time_data.length)){

                    console.log("按年算："+get_time+ " j:  "+j+"  t:"+t);
                    console.log(time_data[t]);
                    console.log("y: "+y+" i:"+i+" time_data length "+time_data.length+"  t: "+t+"is: "+(t!=time_data.length));
                    count_year+=parseFloat(time_data[t].count);
                     t++;
                    if(t==time_data.length) break;
                     get_time=time_data[t].time;
                     y=parseInt(get_time.split("-")[0]);
                }
                series_data.push(count_year);
                console.log(i.toString()+"ccccccccccccccccccccccccccccccc: "+series_data);
            }
        }
        else if(type=="按月算")
        {
            time_data=text_month.data;
            console.log(time_data);
            var k=0;
            for(var i=parseInt(start_categories[1]);i<=parseInt(end_categories[1]);i++)
            {
                console.log(time_data[k].time);
                categories.push(start_categories[0]+"年"+i.toString()+"月");
                var count_data=0;
                for(var j=1;j<=MonHead[i-1];j++)
                {
                    count_data+=parseFloat(time_data[k++].count);
                }
                series_data.push(count_data);
                console.log(series_data);
            }
        }
        else if(type=="按天算")
        {
            time_data=text.data;
            for(var i=0;i<time_data.length;i++)
            {
                categories[i]=time_data[i].time;
                series_data[i]=parseFloat(time_data[i].count);
            }
        }
        else
        {
            alert("小主请规范操作");
        }

        return callback(categories,series_data)
    }
    else {
        alert("小主请规范操作");
    }
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
        credits: {
            text: '小蓝科技',
            href: 'https://www.baidu.com/'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]

    });
    console.log(line)
}
$(function () {
    $('#analyse').click(function() {
        getData(function (categories,series_data)
        {
            if(categories!='') {
                console.log(categories);
                line.series[0].setData(series_data);
               line.xAxis[0].setCategories(categories);
            }
            });

    });
});

