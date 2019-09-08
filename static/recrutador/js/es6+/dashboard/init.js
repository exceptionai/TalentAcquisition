var optionsLine = {
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
        data: [15, 15, 20, 21, 33, 34]

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
        data: [72, 102, 80, 225, 300, 203, 90, 233, 245, 180, 200, 320]

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
    labels: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
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

const chartLine = new ApexCharts(document.querySelector('#graficoCandidatosAltaPerformance'), optionsLine);
const chart2 = new ApexCharts(document.querySelector('#graficoCandidatosUltimoAno'), progressiveOptions)
chartLine.render();
chart2.render()