var myChart = echarts.init(document.getElementById('main'));
var  colors=['#d53a35','#2f4455','#639fa9'];
var i = 0;
option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title :
    {
        text: '本月受理:100次'
    },
    legend: {
        orient: 'horizontal',
        x: 'left',
        y:'bottom',
        data:['已回复','正在处理','未回复'],

    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap:false,
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
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    },
                    //自定义颜色数组
                    color:function(){
                        return colors[i++];
                    }
                }
            },

            labelLine: {
                normal: {
                    show: true
                }
            },
            data:[
                {value:160, name:'已回复'},
                {value:60, name:'正在处理'},
                {value:30, name:'未回复'}
            ]
        }
    ]
};
myChart.setOption(option);

