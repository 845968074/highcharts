/**
 * Created by 粉 on 2017/2/6.
 */
//省市县数据格式
var province_city_county_data=[
    {
        province:"四川",
        city:[
            {
                cityName:"成都",
                county:["成都市","崇州市","金堂县"]
            },
            {
                cityName:"南充",
                county:["仪陇县","南部县","营山县"]
            }
        ]
    },
    {
        province:"北京",
        city:[
            {  cityName:"北京市",
                county:["东城区","朝阳区"]
            }
        ]
    },
    {
        province:"安徽",
        city:[
            {  cityName:"安庆",
                county:["安庆市","怀宁县","潜山县"]
            },
            {  cityName:"蚌埠",
                county:["蚌埠市","固镇县","怀远县"]
            }
        ]
    }
]
var opt0 = ["省份","地级市","市、县级市、县"];
var selectID_arr2=["provinceid","cityid","countyid"];
var province_index;
window.onload = function(){
    init_select()
};
//初始化下拉框
function init_select(){
    init_title();
    init_province();
    bind_province();
}
//初始化提示标题
function init_title(){
    for(var k = 0;k<selectID_arr2.length;k++){
        var select_obj= document.getElementById(selectID_arr2[k]);
        select_obj.options[0]=new Option(opt0[k],opt0[k]);
    }
}
//初始化省份
function init_province(){
    var province_select_obj = document.getElementById(selectID_arr2[0]);
    var province_len = province_city_county_data.length;
    for(var i = 0;i<province_len;i++){
        province_select_obj.options[i+1] = new Option(province_city_county_data[i].province,province_city_county_data[i].province);
    }
}
//给省份绑定onchange事件
function bind_province(){
    var province_select_obj = document.getElementById(selectID_arr2[0]);
    console.log(province_select_obj);
    province_select_obj.onchange=function(){
        var opt_index =province_select_obj.selectedIndex;
        alert(opt_index);
        if(opt_index!=0){
            province_index = opt_index-1;  //每个省份的序号比 option 的下标要小1
            init_city(province_index);
            bind_city();
            init_county(province_index,0);
        }else{
            clear_city();
            clear_county();
        }
    }
}
//选择一个省份才能初始化地级市
function init_city(index){
    clear_city();
    var city_len = province_city_county_data[index].city.length;
    for(var i = 0;i<city_len;i++){
        document.getElementById(selectID_arr2[1]).options[i+1] = new Option(province_city_county_data[index].city[i].cityName,province_city_county_data[index].city[i].cityName);
    }
    document.getElementById(selectID_arr2[1]).options[1].selected = true;
}
//清除地级市信息
function clear_city(){
    var city_select_obj = document.getElementById(selectID_arr2[1]);
    city_select_obj.options.length=0; //每次选中一个新的省份 都重新删除地级市的信息
    init_title();   //重新初始化标题
}
//给地级市绑定onchange事件
function bind_city(){
    var city_select_obj = document.getElementById(selectID_arr2[1]);
    city_select_obj.onchange=function(){
        var opt_index =city_select_obj.selectedIndex;
        if(opt_index!=0){
            init_county(province_index,opt_index-1);
        }else{
            clear_county();
        }
    }
}
//选择一个地级市后才能初始化县
function init_county(index,city_index){
    clear_county();
    var county_len = province_city_county_data[index].city[city_index].county.length;
    for(var i = 0;i<county_len;i++){
        document.getElementById(selectID_arr2[2]).options[i+1] = new Option(province_city_county_data[index].city[city_index].county[i],province_city_county_data[index].city[city_index].county[i]);
    }
    document.getElementById(selectID_arr2[2]).options[1].selected = true;
}
//清除县城信息
function clear_county(){
    var county_select_obj = document.getElementById(selectID_arr2[2]);
    county_select_obj.options.length=0; //每次选中一个新的地级市 都重新删除县的信息
    init_title();   //重新初始化标题
}
/*var user_data=[
    {
        school:"西安邮电大学",
        time:[
            {
                type:"星期",
                time_start:["星期一"]
            },
            {
                type:"月份",
                time_start:["一月,二月，三月，四月，五月，六月，七月，八月，九月，十月，十一月，十二月"]
            }
        ]
    },
    {
        province:"北京",
        city:[
            {  cityName:"北京市",
                county:["东城区","朝阳区"]
            }
        ]
    },
    {
        province:"安徽",
        city:[
            {  cityName:"安庆",
                county:["安庆市","怀宁县","潜山县"]
            },
            {  cityName:"蚌埠",
                county:["蚌埠市","固镇县","怀远县"]
            }
        ]
    }
]*/
