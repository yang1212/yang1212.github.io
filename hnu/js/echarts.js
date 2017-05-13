$(document).ready(function(){
    var chart3 = document.getElementById('main');
    var chartData3 = echarts.init(chart3);
    chartData3.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient:'vertical',
            left:'left',
            data:['已处理','正处理','未处理']
        },
        title:{
            text:'当月总数：100',
            bottom:'1%'
        },
        series: [
            {
                name:'总数',
                type:'pie',
                radius: ['50%', '80%'],
                avoidLabelOverlap: false,
                color:['#FF6666','#0099CC','#CCCCCC'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:50, name:'已处理'},
                    {value:30, name:'正处理'},
                    {value:20, name:'未处理'}

                ]
            }
        ]
    });


    var chart2 = document.getElementById('year');
    var chartData2 = echarts.init(chart2);
    chartData2.setOption({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['受理统计', '满意度']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '受理统计',
                type: 'line',
                stack: '总量',
                data: []
            },
            {
                name: '满意度',
                type: 'line',
                stack: '总量',
                data: []
            }
        ]
    });

    var chart = document.getElementById('count');
    var chartData = echarts.init(chart);
    chartData.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: []
        },
        title: {
            text: [],
            bottom: '0%'
        },
        series: [
            {
                name: '总数',
                type: 'pie',
                radius: ['50%', '80%'],
                avoidLabelOverlap: false,
                color: ['#FF6666', '#0099CC', '#CCCCCC'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: []
            }
        ]
    });


});
