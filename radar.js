/**
 * echarts_option_each_pollute
 * @param data list 某一年份的数据，一个年份是一个list，这个list里面有很多个object，每一个object都是某一个城市/省份在某一个月份的数据.
 * @param pollute_name string 污染物名称表（包括单位）
 * @param label_name string 污染物名称表 （不包括单位）
 * @param match_list list 所有省份的简称
 * @param wholename_list list 所有省份的全称
 * @return  echarts的配置文件
 */
function construct_aradar(data,wholename_list) {

    var data_with_city = {};

    var myindicator = []

    var my_color =   [
        "#7c2144",
        "#9a20e7",
        "#df4840",
        "#f2ad42",
        "#f7e058",
        "#63d877",
    ].reverse()


    map_month = {
        'April' : 4,
        'August' : 8,
        'December' : 12,
        'February' : 2,
        'January' : 1,
        'July' : 7,
        'June' : 6,
        'March' : 3,
        'May' : 5,
        'November' : 11,
        'October' : 10,
        'September' : 9
    }


    var sortKey = []


    wholename_list.forEach(each_city =>{
        data_with_city[each_city] = [];
    })

    wholename_list.forEach(each_city => {

        var row_data_with_month = [];
        var data_with_months = [];
        

        data.forEach(data_with_city_month => {
            if(data_with_city_month['province'] == each_city){
                row_data_with_month.push(data_with_city_month);
            }
        });

        //根据月份对数据进行排序
        row_data_with_month.sort(function(a, b){return map_month[a['month']] - map_month[b['month']]});
        // console.log(row_data_with_month);
        //考察每个月份的数据，然后变成一个数组
        
        row_data_with_month.forEach(obj_data => {
            var data_with_month = [];
            //遍历这个对象，提取数据
            sortKey = Object.keys(obj_data).sort(); 
            // console.log(sortKey);
            sortKey.forEach(key => {
                if(key != 'month' && key != 'province'){
                    data_with_month.push(obj_data[key]);
                    var flag = 0
                    myindicator.forEach(each_indicator => {
                        if (each_indicator.name == key) {
                            flag = 1
                        }
                    });
                    if(!flag)
                    myindicator.push(
                        {
                            name : key,
                            max : 1
                        }
                    );
                }
                if (key == 'month') {
                    data_with_month.push(map_month[obj_data[key]]);
                }
               
                
                for (let index = 0; index < myindicator.length; index++) {
                    if (myindicator[index]['name'] == key && obj_data[key] > myindicator[index]['max']) {
                        myindicator[index]['max'] = obj_data[key];
                    } 
                }
           
            });
            data_with_months.push(data_with_month);

        });
        data_with_city[each_city].push(data_with_months);

    });
    // console.log(data_with_city);
    console.log(myindicator);


    const lineStyle = {
        width: 1,
        opacity: 1
    };

    var data_with_city_series = []
    wholename_list.forEach( each_city => { 
        data_with_city_series.push(
            {
                name : each_city,
                type : 'radar',
                lineStyle : lineStyle,
                data : data_with_city[each_city][0],
                Symbol : 'none',
                itemStyle : {
                    color: 'rgb(210,222,226)'
                },
            }
        );
    });

    console.log(data_with_city_series);

    var option = {
        // backgroundColor: '#161627',
        title: {
          text: 'AQI - Radar',
          left: 'center',
        //   textStyle: {
        //     color: '#eee'
        //   }
        },
        legend: {
          bottom: 5,
          data: wholename_list,
          itemGap: 20,
          type:'scroll',
          textStyle: {
            // color: '#fff',
            fontSize: 14
          },
          selectedMode: 'single'
        },

        radar: {
          indicator: myindicator,
          shape: 'circle',
          splitNumber: 5,
        //   axisName: {
        //     color: 'rgb(238, 197, 102)'
        //   },
          splitLine: {
            lineStyle: {
              color: [
                  "#63d877",
                  "#63d877",
                  "#f7e058",
                  "#f2ad42",
                  "#df4840",
                  "#891c9b",
                  "#73202a"
              ],
                width: 3
            }
          },
          splitArea: {
            show: false
          },
        },
        series: data_with_city_series,
      };
      
    return option;
}