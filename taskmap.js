// 定义每个月份的天数
const num_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 生成 X 轴标签数据（月份和日期）
function makeXAxis() {
  const axis = [];
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= num_day[i - 1]; j++) {
      const str = i + "月" + j + "号";
      axis.push(str);
    }
  }
  return axis;
}

// 定义任务类型和对应颜色
const types = ["任务一", "任务二", "任务三", "任务四"];
const colors = ["#4C8EC3", "#003366", "#E25E79", "#CBD570"];

// 渲染任务条目的函数
function renderItem(params, api) {
  const start = api.coord([api.value(1), params.seriesName]);
  const end = api.coord([api.value(2), params.seriesName]);
  const height = api.size([1, 1])[1];
  const width = end[0] - start[0];

  // 使用 echarts.graphic.clipRectByRect 创建矩形形状
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

// 获取 ECharts 图表的配置选项
function getOption(data) {
  // 构建数据系列
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

  // 配置 ECharts 图表的选项
  const task_option = {
    title: {
      text: "任务列表",
      textStyle: {
        color: 'white'
      }
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: function (params) {
        // 格式化工具提示内容
        var info = params.data[0];
        var leader = params.data[3];
        var members = params.data[4];
        var state = params.data[5];
        return '信息:' + info + '<br/>负责人：' + leader + '<br/>成员：' + members + '<br/>进度：' + state;
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
      color: "#fff",
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
        minValueSpan: 8,
      },
      {
        type: "slider",
        show: true,
        filterMode: "weakFilter",
        backgroundColor: "#fafafa",
        minValueSpan: 8,
      },
    ],
  };

  return task_option;
}
