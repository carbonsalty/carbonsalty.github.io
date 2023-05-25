// function each_pollute(datalist, pollute_name, label_name, match_list, wholename_list){  //pollutant
//     var value_data = [];
  
//     if (datalist.length == 6) {
//       //for overview (2013 - 2018)
//       for (var k=0; k<wholename_list.length; k++) {
//       var countlist = [];
      
//       for (var i=0; i<datalist.length; i++) {
//           var yeardata = datalist[i];
//           var cityvalue = yeardata.filter(function(event){ return event.province==wholename_list[k]});
//           for (var j=0; j<cityvalue.length; j++) {
//               countlist.push(cityvalue[j]['AQI']);
//           }
//       }
//       //console.log(countlist);
//       var count = 0;
//       for (var p=0; p<countlist.length; p++) {
//           count = count + countlist[p];
//       }
//       var aqi_avg = count/countlist.length;
//       value_data.push(aqi_avg);
//       }
  
//     }else{
//       //if specific year
//         for (var i=0; i<wholename_list.length; i++) {
//           var cityvalue = datalist.filter(function(event){ return event.province==wholename_list[i]});
//           var count = 0;
//           for (var k=0; k<cityvalue.length; k++) {    
//             count = count + cityvalue[k][pollute_name]
//           }
//           value_data.push(count/cityvalue.length);  //calulate the average
//       }
//     }
  
//     var sortlist = []
//     for (var i=0; i<value_data.length; i++) {
//       var newjson = {};
//       newjson['city'] = match_list[i];
//       newjson['value'] = value_data[i];
//       sortlist.push(newjson);
//     }
//     console.log(sortlist.sort(function(a, b){return b.value - a.value}));
  
//     var valuelist = []
//     var citylist = []
//     for (var i=0; i<sortlist.length; i++) {
//       valuelist.push(sortlist[i]['value'])
//       citylist.push(sortlist[i]['city'])
//     }
  
  
//     const labelname = 'Average ' + label_name;
//     const data = {
//       labels: citylist,
//       datasets: [
//         {
//           label: labelname,
//           data: valuelist,
//           backgroundColor: 'rgba(255, 205, 86, 0.4)'
//         },
//       ]
//     };
  
//     const config = {
//       type: 'bar',
//       data: data,
//       options: {
  
//         indexAxis: 'y',
//         scales: {
//            y:{
//             display: true,
//             position: 'left',
//             reverse: false,
//             labels: citylist,
//             ticks: { color:'white' },
            
//            },
//            x:{
//             display: true,
//             reverse: false,
//             ticks: { color:'white' },
//            }
//          },
//         elements: {
//           bar: {
//             borderWidth: 2,
//           }
//         },
  
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'none',
//           }
//         }
//       },
//     };
  
//     return config;
//   }


//肖
function each_pollute(datalist,pollute_name,label_name,match_list,wholename_list) {
  var value_data = [];
  if (datalist.length == 6) {
      //for overview (2013 - 2018)
      wholename_list.forEach(each_city => {
          var countlist = [];
          datalist.forEach(yeardata => {
              var cityvalue = yeardata.filter( function (event) {
                  return event.province == each_city;
              });
              cityvalue.forEach(each_city_value => {
                  countlist.push(each_city_value['AQI']);
              });
          });
          value_data.push(countlist.reduce((a,b) => a + b)/countlist.length);
      });
    }else{
        for (var i=0; i<wholename_list.length; i++) {
          var cityvalue = datalist.filter(function(event){ return event.province==wholename_list[i]});
          var count = 0;
          for (var k=0; k<cityvalue.length; k++) {    
            count = count + cityvalue[k][pollute_name]
          }
          value_data.push(count/cityvalue.length);  //calulate the average
        }
    }
  //sort
  var sortlist = []
  for (var i = 0; i < value_data.length; i++) {
      sortlist.push([value_data[i],match_list[i]]);
  }
  sortlist.sort(function(a, b){return a[0] - b[0]});

  //construct  echarts list
  var valuelist = []
  var citylist = []
  sortlist.forEach(each_sort_list => {
      valuelist.push(each_sort_list['value']);
      citylist.push(each_sort_list['city']);
  });

  var label_graph = 'average ' + label_name;

  // config
  const option = {
      title : {
          // text : label_graph + '\n\nfrom 2013 to 2018',
          text : '',
          show : false,
          textStyle: {
            //文字颜色
            color:'#ccc',
            //字体风格,'normal','italic','oblique'
            fontStyle:'normal',
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight:'bold',
            //字体系列
            fontFamily:'sans-serif',
            //字体大小
            fontSize:14
          },
          left:'center',
        },
     
      
      dataset:{
          source : sortlist
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '0%',
          containLabel: true
      },
      xAxis: {
         name: label_graph,
      },
      yAxis: {
         type: 'category' ,
         axisLabel:{
          textStyle:{
            color:'#fff'
          }
      }},
      visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 60,
          max: 170,
          text: ['High', 'Low'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
          },
          textStyle: {
            //文字颜色
            color:'#ccc',
            //字体风格,'normal','italic','oblique'
            fontStyle:'normal',
            // //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            // fontWeight:'bold',
            // //字体系列
            // fontFamily:'sans-serif',
            //字体大小
            fontSize:10
          },
      },
      series: [
          {
            name : label_graph,
            type: 'bar',
            encode: {
              x: label_graph,
              y: 'city'
            }
          }
      ]
  };
  return option;
}