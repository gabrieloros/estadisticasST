/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
	href: '//fonts.googleapis.com/css?family=Unica+One',
	rel: 'stylesheet',
	type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);


Highcharts.theme = {
	colors: ["#C45339" , "#7CAF6B" , "#6F99CE" , "#DDA000" , "#E7C900" , "#52544F" , "#97B733" , "#72629F" , "#74AA51"],
	chart: {
		backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			stops: [
				[0, 'rgb(90, 89, 102)'],
				[1, 'rgb(90, 89, 102)']
			]
		},

	},

	title: {
		style: {
			color: '#AAA7AD',
			textTransform: 'uppercase'
		}

		},
	subtitle: {
		style: {
			color: '#AAA7AD',
			textTransform: 'uppercase'
		}
	},
	xAxis: {
		gridLineColor: '#707073',
		labels: {
			style: {
				color: '#AAA7AD'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#5A5966',
		tickColor: '#707073',
		title: {
			style: {
				color: '#AAA7AD'
			}
		}
	},

	yAxis: {
		gridLineColor: '#5A5966',
		labels: {
			style: {
				color: '#5A5966'
			}
		},
		lineColor: '#5A5966',
		minorGridLineColor: '#5A5966',
		tickColor: '#5A5966',
		tickWidth: 1,
		title: {
			style: {
				color: '#AAA7AD'
			}
		}
	},
	tooltip: {
		backgroundColor: '#5A5966',
		style: {
			color: '#AAA7AD'
		}
	},
	plotOptions: {
		series: {
			dataLabels: {
				color: '#AAA7AD'
			},
			marker: {
				lineColor: '#333'
			}
		},
		boxplot: {
			fillColor: '#5A5966'
		},
		candlestick: {
			lineColor: 'white'
		},
		errorbar: {
			color: 'AAA7AD'
		}
	},
	legend: {
		itemStyle: {
			color: '#AAA7AD'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#AAA7AD'
		}
	},

	labels: {
		style: {
			color: '#AAA7AD'
		}
	},

	drilldown: {
		activeAxisLabelStyle: {
			color: '#AAA7AD'
		},
		activeDataLabelStyle: {
			color: '#AAA7AD'
		}
	},

	navigation: {
		buttonOptions: {
			symbolStroke: '#DDDDDD',
			theme: {
				fill: '#5A5966'
			}
		}
	},

	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: '#FF0000',
			stroke: '#000000',
			style: {
				color: '#AAA7AD'
			},
			states: {
				hover: {
					fill: '#707073',
					stroke: '#000000',
					style: {
						color: 'AAA7AD'
					}
				},
				select: {
					fill: '#000003',
					stroke: '#000000',
					style: {
						color: 'AAA7AD'
					}
				}
			}
		},
		inputBoxBorderColor: '#5A5966',
		inputStyle: {
			backgroundColor: '#333',
			color: 'AAA7AD'
		},
		labelStyle: {
			color: 'silver'
		}
	},

	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(255,255,255,0.1)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		},
		xAxis: {
			gridLineColor: '#5A5966'
		}
	},

	scrollbar: {
		barBackgroundColor: '#808083',
		barBorderColor: '#808083',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: '#606063',
		buttonBorderColor: '#606063',
		rifleColor: '#FFF',
		trackBackgroundColor: '#404043',
		trackBorderColor: '#404043'
	},

	// special colors for some of the
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	background2: '#5A5966',
	dataLabelsColor: '#B0B0B3',
	textColor: '#C0C0C0',
	contrastTextColor: '#F0F0F3',
	maskColor: 'rgba(255,255,255,0.3)'
};


// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
