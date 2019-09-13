$(function () {
    var chart1 = echarts.init(document.getElementsByClassName("echarts1")[0]);
    var chart2 = echarts.init(document.getElementsByClassName("echarts2")[0]);

    // 柱状图
    var option1= {
        title: {
            text: '2017年注册人数'
        },
        tooltip:{},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '销量',
            data: [120, 200, 150, 80, 70, 110],
            type: 'bar'
        }]
    };
    chart1.setOption(option1);

    //饼状图
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'right'
        },
        tooltip : {
            //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
            data: ['阿迪王','耐克','阿迪','新百伦','李宁']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'阿迪王'},
                    {value:310, name:'耐克'},
                    {value:234, name:'阿迪'},
                    {value:135, name:'新百伦'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    chart2.setOption(option2);

});