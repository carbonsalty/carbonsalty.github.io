const num_day=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function makeXAxis() {
    const axis = [];
    for (let i = 1; i <= 12; i++) {
      for (let j = 1; j <= num_day[i]; j++) {
        const str =i+ "月" + j+"号";
        axis.push(str);
      }
    }
    return axis;
  }
  const types = ["任务一", "任务二", "任务三", "任务四"];
  const series = [
    [
      ["互联网+：5月29号-6月4号：报名", "5月29号", "6月4号","曹晨曦","马哲超，钟如昕","正在修改文档"],
      ["互联网+：6月12号-6月15号：答辩", "6月12号", "6月15号","曹晨曦","马哲超，钟如昕","正在修改文档"],
    ],
    [
        ["ican：7月31号-11月1号：比赛", "7月31号", "11月1号","马哲超","曹晨曦，汪心芃","正在召集队员"],
    ],
    [
     
    ],
    [
     
    ],
  ];
  const colors = ["#4C8EC3", "#003366", "#E25E79", "#CBD570"];
  
  function renderItem(params, api) {
    const start = api.coord([api.value(1), params.seriesName]);
    const end = api.coord([api.value(2), params.seriesName]);
    const height = api.size([1, 1])[1];
    const width = end[0] - start[0];
  
    var rectShape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: width,
        height: height,
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      }
    );
  
    return (
      rectShape && {
        type: "rect",
        shape: rectShape,
        style: api.style(),
      }
    );
  }

 
  function getOption(data)
  {
    const dataSeries = types.map((item, index) => {
        return {
          type: "custom",
          name: item,
          label: {
            show: true,
          },
          encode: {
            x: [1, 2],
            label: [0],
          },
          itemStyle: {
            color: colors[index],
          },
          data: data[index],
          renderItem: renderItem,
        };
      });
  task_option = {
    title: {
      text: "任务列表",
   textStyle:{
    color: 'white'
   }
    },
    tooltip: {//显示标签提示
        show: true,
        trigger: 'item',
        formatter: function(params) {
            // params包含系列数据和系列索引两个参数
            var info=params.data[0];
            var leader=params.data[3];
            var members=params.data[4];
            var state=params.data[5];
            return'信息:'+info+'<br/>负责人：'+leader+'<br/>成员：'+members+'<br/>进度：'+state;
        }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: makeXAxis(),
      axisLine: {
        color: 'white'
      },
      axisLabel: {
        textStyle: {
          color: 'white'
        }
      }
    },
    yAxis: {
      type: "category",
      color:"#fff",
      splitLine: {
        show: true,
      },
      axisLabel: {
        textStyle: {
          color: 'white'
        }
      },
      data: types,
    },
    series: dataSeries,
    dataZoom: [
      {
        type: "inside",
        filterMode: "weakFilter",
        minValueSpan: 20,
      },
      {
        type: "slider",
        show: true,
        filterMode: "weakFilter",
        backgroundColor: "#fafafa",
        minValueSpan: 20,
      },
    ],
  };
  return task_option;
}