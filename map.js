//我的任务就是将这个东西修改成一个三维的玩意，但是我还得导入一些新的库，试试看！！！
function map_make(datalist, match_list, wholename_list) {//输入的三个参数分别是数据列表，省份的列表，省份的全名的列表。

    var data_list = [];//用于存放最后需要用到的数据，这些数据不同于输入的数据，是通过处理后的数据

    if (datalist.length == 6) {//这个对应于我们刚进来的时候的总览图，这个时候展示的6年来的所有省份的平均情况
        //for overview (2013-2018)
        for (var k = 0; k < wholename_list.length; k++) {
            var countlist = [];
            var newjson = {};

            for (var i = 0; i < datalist.length; i++) {
                var yeardata = datalist[i];
                var cityvalue = yeardata.filter(function (event) {
                    return event.province == wholename_list[k]
                });
                for (var j = 0; j < cityvalue.length; j++) {
                    countlist.push(cityvalue[j]['AQI']);
                }
            }
            //console.log(countlist);
            var count = 0;
            for (var p = 0; p < countlist.length; p++) {
                count = count + countlist[p];
            }
            var aqi_avg = count / countlist.length;

            newjson["name"] = match_list[k];
            newjson["value"] = Math.round(aqi_avg);
            data_list.push(newjson);
        }
    } else {
        //if specific year
        for (var i = 0; i < wholename_list.length; i++) {
            var cityvalue = datalist.filter(function (event) {
                return event.province == wholename_list[i]
            });
            var newjson = {};
            var count = 0;
            for (var k = 0; k < cityvalue.length; k++) {
                count = count + cityvalue[k]['AQI']
            }
            //这个就是一个省份名字和对应的值组成的列表，但是这个列表
            newjson["name"] = match_list[i];
            newjson["value"] = Math.round(count / cityvalue.length);
            data_list.push(newjson);
        }
    }

//working space


    data_list.forEach((item) => {//得到每个省份对应的柱状图的高度

        // item.value=item.value/20;
        item.height = item.value / 20;
        return item;
    });
    console.log(data_list);

    let geoCoordMap = {//这个是维度信息，有些地址不对。。。
        海南: [118.73, 36.86],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4129],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.78, 32.04],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [115.27, 28.09],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],


    };
    var convertData = function (data) {//这个是纬度信息的处理，将地理位置的值放到拼接到纬度后面
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        console.log(res);
        return res;
    };

//这边的似乎是设置地图左边的标签
    var year_average = [];
    for (var a = 0; a < data_list.length; a++) {
        year_average.push(data_list[a]['value']);
    }

    //console.log(year_average);

    function getMaximin(arr, maximin) {
        if (maximin == "max") {
            return Math.max.apply(Math, arr);
        } else if (maximin == "min") {
            return Math.min.apply(Math, arr);
        }
    }

    var max_year = getMaximin(year_average, "max");
    var min_year = getMaximin(year_average, "min")
    //console.log(max_year);
    //console.log(min_year);

    var piece_data = [];
    var gte1 = {};
    gte1["value"] = 0;
    gte1["label"] = "No value";
    gte1["color"] = 'rgb(206,205,207)';

    piece_data.push(gte1);

    for (var b = 0; b < 11; b++) {
        var gte_piece = {};
        var r = Math.pow((max_year / min_year), 0.25);
        var color = [
            "#63d877",
            "#f7e058",
            "#f2ad42",
            "#df4840",
            "#c0308b",
            "#9a20e7",
            "#891c9b",
            "#7c2144",
            "#73202a",
            "#73202a",
            "#761e2a"];

        gte_piece["gte"] = min_year * Math.pow(r, b);
        gte_piece["lt"] = min_year * Math.pow(r, b + 1);
        gte_piece["color"] = color[b];


        piece_data.push(gte_piece);
    }
    console.log(piece_data);


    //console.log(data_list);


    // var map = {
    //     tooltip:
    //         {
    //             trigger: 'item',
    //             backgroundColor: 'white',
    //             formatter: 'Region:{b}<br/>AQI:{c}'
    //         },
    //     visualMap:
    //         {
    //             show:true,
    //             top: 'center',
    //             left: 'left',
    //             textStyle: {
    //                 color: '#fff',
    //                 fontSize: 15
    //             },
    //             pieces:piece_data,
    //         },
    //     series: [{
    //         type: 'map',
    //         mapType: 'china',
    //         roam: false,
    //         itemStyle: {
    //             normal: {
    //                 label: {
    //                     show: true,
    //                     textStyle:
    //                         {color: "black"}
    //                 }
    //             },
    //             zoom: 1.5,
    //             emphasis: {
    //                 borderWidth: 2,
    //                 borderColor:'black',
    //                 areaColor: 'white',
    //                 label: {show: true}
    //             }
    //         },
    //         top: "3%",
    //         data: data_list
    //     }]
    // };
    map = {
        tooltip: {//显示标签提示
            show: true,
            trigger: 'item',
            formatter: 'Region:{b}<br/>AQI:{c}'
        },
        visualMap:
            {
                show: true,
                top: 'center',
                left: 'left',
                textStyle: {
                    color: '#fff',
                    fontSize: 15
                },
                pieces: piece_data,
            },
        geo3D: {
            map: 'china',
            roam: true,
            regionHeight: 0,
            shading: 'lambert',
            light: { //光照阴影
                main: {
                    color: '#fff', //光照颜色
                    intensity: 1.2, //光照强度
                    shadowQuality: 'high', //阴影亮度
                    shadow: true, //是否显示阴影
                    alpha: 55,
                    beta: 10

                },
                ambient: {
                    intensity: 0.3
                }
            }
        },
        series: [
            //柱状图,算了，还是不要了
            // {
            //     name: 'AQI',
            //     type: 'bar3D',
            //     coordinateSystem: 'geo3D',
            //     barSize: 1, //柱子粗细
            //     shading: 'lambert',
            //     opacity: 1,
            //     bevelSize: 0.2,
            //     label: {
            //         show: false,
            //         formatter: '{b}',
            //     },
            //     data:convertData(data_list),
            // },
            {
                type: 'map3D',
                map: 'china',
                itemStyle: {
                    // areaColor: '#ff0000',// 地图配色
                    // areaColor: 'rgb(253,224,68)',
                    opacity: 1,
                    borderWidth: 0.5,
                    borderColor: '#725b4a', // 地图边配色
                },

                data: data_list,
            },
        ],
    };

    return map;
}