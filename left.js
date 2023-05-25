//最左边的PCP图
function pcp_whole(wholelist, match_list, wholename_list, prov){

	const yearlist = ['2013','2014','2015','2016','2017','2018'];

    var data_list = [];
    for (var i=0; i<wholelist.length; i++) {
    	var yeardata = wholelist[i];

    	for (var k=0; k<wholename_list.length; k++) {

    		var cityvalue = yeardata.filter(function(event){ return event.province==wholename_list[k]});

    		var small_list = [];
    		const province = match_list[k];
    		const year = yearlist[i];

    		var count_aqi = 0;
    		var count_pm10 = 0;
    		var count_pm25 = 0;
    		var count_so2 = 0;
    		var count_no2 = 0;
    		var count_co = 0;
    		var count_o3 = 0;
    		var count_temp = 0;
    		var count_velo = 0;

    		for (var j=0; j<cityvalue.length; j++) {
    			count_aqi = count_aqi + cityvalue[j]['AQI'];
    			count_pm10 = count_pm10 + cityvalue[j]['PM10(微克每立方米)'];
    			count_pm25 = count_pm25 + cityvalue[j]['PM2.5(微克每立方米)'];
    			count_so2 = count_so2 + cityvalue[j]['SO2(微克每立方米)'];
    			count_no2 = count_no2 + cityvalue[j]['NO2(微克每立方米)'];
    			count_co = count_co + cityvalue[j]['CO(毫克每立方米)'];
    			count_o3 = count_o3 + cityvalue[j]['O3(微克每立方米)'];
    			count_temp = count_temp + (cityvalue[j]['TEMP(K)']-273.15);
    			var velo = Math.sqrt(Math.pow(cityvalue[j]['U(m/s)'],2) + Math.pow(cityvalue[j]['V(m/s)'],2))
    			count_velo = count_velo + velo;
    		}

    		if (count_aqi/12 <= 50) {
    			var level = 'Good';
    		}else if (count_aqi/12 <= 100){
    			var level = 'Moderate';
    		}else if (count_aqi/12 <= 150) {
    			var level = 'Lightly\nPolluted';
    		}else if (count_aqi/12 <= 200) {
    			var level = 'Moderately\nPolluted';
    		}else if (count_aqi/12 <= 300) {
    			var level = 'Heavily\nPolluted';
    		}else{
    			var level = 'Serverly\nPolluted';
    		}

    		small_list.push(province);
	    	small_list.push(year);
	    	small_list.push(count_aqi/12);
	    	small_list.push(count_pm10/12);
	    	small_list.push(count_pm25/12);
	    	small_list.push(count_so2/12);
	    	small_list.push(count_no2/12);
	    	small_list.push(count_co/12);
	    	small_list.push(count_o3/12);
	    	small_list.push(count_temp/12);
	    	small_list.push(count_velo/12);
	    	small_list.push(level);
	    	data_list.push(small_list);
    	}

    }

    const axislab = {
    			show:true,               
		        interval:"auto",
		        inside:true,             
		        color: 'rgb(253,253,254)', // 中间文字
		        rotate:0, 
		        fontWeight: 'normal'
    }

	var mytextStyle={
	    color:"rgb(253,253,254)", // 左侧文字
	    fontStyle:"normal",        
	    fontWeight:'normal',        
	    fontFamily:"Times New Roman",    
	    fontSize:12,               
	};

	if (prov=='whole'){
		var provlist = match_list;
	}else{
		var provlist = [];
		for (var i=0; i<match_list.length; i++) {
			if (match_list[i]==prov){
				var change = {value:prov, textStyle:{color:'rgb(243,243,246)'}};
				provlist.push(change);
			}else{
				provlist.push(match_list[i]);
			}
		}
	}


	var pcp_gene = {
		parallel:[{width:700, layout: "vertical"}],
	    parallelAxis: [
	        {
	        	dim: 0, name: 'Prov', type: 'category', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle,
				axisLabel:{
					show:true,
					interval:"auto",
					inside:true,
					color: "rgb(253,253,254)",
					fontWeight: 'normal',
					fontSize:10,
					rotate:90,
				},
				areaSelectStyle:{
		            borderWidth:1,
		            borderColor:"rgb(253,253,254)",
		            color: "rgb(253,253,254)",
		            opacity:0.4,
		        },
		        axisTick :{
		            show:true,
		            alignWithLabel:false,
		            inside:true
		        },
	        	data: provlist
	        },
	        {dim: 1, name: 'Year', type: 'category', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab, data: yearlist},
	        {dim: 2, name: 'AQI', nameRotate:0, nameLocation:"start",nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 3, name: 'PM10\n(μg/m³)', nameRotate:0, nameLocation:"start",nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 4, name: 'PM2.5\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 5, name: 'SO2\n(μg/m³)', nameRotate:0, nameLocation:"start",nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 6, name: 'NO2\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 7, name: 'CO\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 8, name: 'O3\n(mg/m³)', nameRotate:0, nameLocation:"start",nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 9, name: 'Temp\n(°C)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 10, name: 'Wind\nSpeed', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {
	            dim: 11,
	            name: 'Level',
	            type: 'category',
	            nameRotate:0,
	            nameLocation:"start",
	            nameTextStyle:mytextStyle,
	            axisLabel:{ 
		            show:true, 
		            interval:0,       
		            inside:true,    
		            color: "rgb(253,253,254)",
		            fontWeight: 'normal',
		            fontSize:12, 
		            rotate:0,     
		        },
	            data: ['Good', 'Moderate', 'Lightly\nPolluted', 'Moderately\nPolluted','Heavily\nPolluted','Serverly\nPolluted']
	        }
	    ],

	    series: {
	        type: 'parallel',
	        lineStyle: {
	            width: 1,
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 1,
					y2: 1,
					colorStops: [{
						offset: 0, color: "#63d877"}, {
						offset: 0.1, color: "#63d877"}, {
						offset: 0.2, color: "#f7e058"}, {
						offset: 0.3, color: "#f2ad42"}, {
						offset: 0.4, color: "#df4840"}, {
						offset: 0.5, color: "#c0308b"}, {
						offset: 0.6, color: "#9a20e7"}, {
						offset: 0.7, color: "#891c9b"}, {
						offset: 0.8, color: "#7c2144"}, {
						offset: 0.9, color: "#73202a"}, {
						offset: 1, color: "#73202a"
					}],
					globalCoord: false // 缺省为 false
				}
	        },
	        data: data_list
	    	}
	};
	return pcp_gene;
}


function pcp_make(data, match_list, wholename_list,prov){

	var cal_list = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	const calendar = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

    console.log(data);

    var data_list = [];
    for (var i=0; i<data.length; i++) {
    	var small_list = [];
    	const month = cal_list[calendar.indexOf(data[i]['month'])];
    	const province = match_list[wholename_list.indexOf(data[i]['province'])];
    	const AQI = data[i]['AQI'];
    	const pm25 = data[i]['PM2.5(微克每立方米)'];
    	const pm10 = data[i]['PM10(微克每立方米)'];
    	const so2 = data[i]['SO2(微克每立方米)'];
    	const no2 = data[i]['NO2(微克每立方米)'];
    	const co = data[i]['CO(毫克每立方米)'];
    	const o3 = data[i]['O3(微克每立方米)'];
    	const temp = data[i]['TEMP(K)']-273.15;
    	var velo = Math.sqrt(Math.pow(data[i]['U(m/s)'],2) + Math.pow(data[i]['V(m/s)'],2))

	    if (AQI <= 50) {
			var level = 'Good';
		}else if (AQI <= 100){
			var level = 'Moderate';
		}else if (AQI <= 150) {
			var level = 'Lightly\nPolluted';
		}else if (AQI <= 200) {
			var level = 'Moderately\nPolluted';
		}else if (AQI <= 300) {
			var level = 'Heavily\nPolluted';
		}else{
			var level = 'Serverly\nPolluted';
		}

    	small_list.push(province);
    	small_list.push(month);
    	small_list.push(AQI);
    	small_list.push(pm10);
    	small_list.push(pm25);
    	small_list.push(so2);
    	small_list.push(no2);
    	small_list.push(co);
    	small_list.push(o3);
    	small_list.push(temp);
    	small_list.push(velo);
    	small_list.push(level);

    	data_list.push(small_list);
    }

    const axislab = {
    			show:true,        
		        interval:"auto",
		        inside:true,           
		        color: "rgb(253,253,254)",
		        rotate:0, 
		        fontWeight: 'normal'
    }

	var mytextStyle={
	    color:"rgb(253,253,254)",
	    fontStyle:"normal",        
	    fontWeight:'normal',        
	    fontFamily:"Times New Roman",    
	    fontSize:12,               
	};

	if (prov=='whole'){
		var provlist = match_list;
	}else{
		var provlist = [];
		for (var i=0; i<match_list.length; i++) {
			if (match_list[i]==prov){
				var change = {value:prov, textStyle:{color:"rgb(253,253,254)"}};
				provlist.push(change);
			}else{
				provlist.push(match_list[i]);
			}
		}
	}


	var pcp = {
		parallel:[{width:700, layout: "vertical"}],

	    parallelAxis: [
	        {
	        	dim: 0, 

	        	areaSelectStyle:{       
		            borderWidth:1,        
		            borderColor:'rgba(160,197,232)',  
		            color: 'rgba(160,197,232)',       
		            opacity:0.4,             
		        },

	        	name: 'Prov',
	        	type: 'category',
	        	nameRotate:0,
	        	nameLocation:"start", 
	        	nameTextStyle:mytextStyle,
	        	axisLabel:{ 
		            show:true,   
		            interval:"auto",        
		            inside:true,          
		            color: "rgb(153,153,153)",  // 候选城市
		            fontWeight: 'normal',
		            fontSize:10, 
		            rotate:90   
		        },
	        	data: provlist
	        },
	        {
	        	dim: 1, 
	        	name: 'Month',
	        	type: 'category',
	        	nameRotate:0,
	        	nameLocation:"start",
	        	nameTextStyle:mytextStyle,
	            axisLabel:{ 
		            show:true, 
		            interval:"auto",
		            inside:true,   
		            color: "rgb(253,253,254)",
		            fontWeight: 'normal',
		            rotate:0,     
		        },
	        	data: cal_list
	        },
	        {dim: 2, name: 'AQI',nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 3, name: 'PM10\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 4, name: 'PM2.5\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 5, name: 'SO2\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 6, name: 'NO2\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 7, name: 'CO\n(μg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 8, name: 'O3\n(mg/m³)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 9, name: 'Temp\n(°C)', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {dim: 10, name: 'Wind\nSpeed', nameRotate:0, nameLocation:"start", nameTextStyle:mytextStyle, axisLabel:axislab},
	        {
	            dim: 11,
	            name: 'Level',
	            type: 'category',
	            nameRotate:0,
	            nameLocation:"start",
	            nameTextStyle:mytextStyle,
	            axisLabel:{ 
		            show:true, 
		            interval:0,        
		            inside:true,            
		            color: ["rgb(253,253,254)"],
		            fontWeight: 'normal',
		            fontSize:12,
		            rotate:0,     
		        },
	            data: ['Good', 'Moderate', 'Lightly\nPolluted', 'Moderately\nPolluted','Heavily\nPolluted','Serverly\nPolluted']
	        }
	    ],

		series: {
			type: 'parallel',
			lineStyle: {
				width: 1,
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 1,
					y2: 1,
					colorStops: [{
						offset: 0, color: "#63d877"}, {
						offset: 0.1, color: "#63d877"}, {
						offset: 0.2, color: "#f7e058"}, {
						offset: 0.3, color: "#f2ad42"}, {
						offset: 0.4, color: "#df4840"}, {
						offset: 0.5, color: "#c0308b"}, {
						offset: 0.6, color: "#9a20e7"}, {
						offset: 0.7, color: "#891c9b"}, {
						offset: 0.8, color: "#7c2144"}, {
						offset: 0.9, color: "#73202a"}, {
						offset: 1, color: "#73202a"
					}],
					globalCoord: false // 缺省为 false
				}
			},
			data: data_list
		}
	};
	return pcp;
}
