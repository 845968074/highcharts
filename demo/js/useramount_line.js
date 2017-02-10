/**
 * Created by 粉 on 2017/2/6.
 */
/**
 * Created by 粉 on 2017/2/6.
 */
$(function () {
    Highcharts.chart('container', {
        title: {
            text: '用户量分析折线图',
            x: -20 //center
        },
        subtitle: {
            text: '小蓝公司',
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
            valueSuffix: '个'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '西安邮电大学',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });
});