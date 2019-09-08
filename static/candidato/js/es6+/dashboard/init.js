const optionsLine = {
    chart: {
        foreColor: '#fff',
        height: 170,
        type: 'line',
        zoom: {
            enabled: false
        },

        toolbar: {
            show: false
        }
    },
    stroke: {
        curve: 'straight',
        width: 4
    },
    colors: ["#FFF"],
    series: [{
        name: "Pontos",
        data: [1, 15, 26, 20, 33, 27]

    }],
    markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
            size: 9
        }
    },
    grid: {
        strokeDashArray: 3,
        show: true,
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        },
    },
    dataLabels: {
        enabled: true,
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            opacity: 0.45
        },
        style: {
            colors: ["#fff"]
        }
    },
    labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    xaxis: {
        tooltip: {
            enabled: false
        }
    },
    tooltip: {
        theme: 'dark'
    },
    yaxis: {
        show: true,
        showAlways: true,
        seriesName: undefined,
        opposite: false,
        reversed: false,
        logarithmic: false,
        tickAmount: 4
    }
}

const progressiveOptions = {
    chart: {
        foreColor: '#fff',
        height: 170,
        type: 'line',
        zoom: {
            enabled: false
        },

        toolbar: {
            show: false
        }
    },
    stroke: {
        curve: 'straight',
        width: 4
    },
    colors: ["#FFF"],
    series: [{
        name: "Pontos",
        data: [0, 72, 72]

    }],
    markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
            size: 9
        }
    },
    grid: {
        strokeDashArray: 3,
        show: true,
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        },
    },
    dataLabels: {
        enabled: true,
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            opacity: 0.45
        },
        style: {
            colors: ["#fff"]
        }
    },
    labels: ['04/08', '05/08', '06/08'],
    xaxis: {
        tooltip: {
            enabled: false
        }
    },
    tooltip: {
        theme: 'dark'
    },
    yaxis: {
        show: true,
        showAlways: true,
        seriesName: undefined,
        opposite: false,
        reversed: false,
        logarithmic: false,
        tickAmount: 4
    }
}

var chartLine = new ApexCharts(document.querySelector('#desempenhoSemanal'), optionsLine);
const chart2 = new ApexCharts(document.querySelector('#evolucaoProgressiva'), progressiveOptions)
chartLine.render();
chart2.render()