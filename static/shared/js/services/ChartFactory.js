export class ChartFactory {

    create(chartContainerID, series, labels, options) {
        const chartContainer = document.querySelector(chartContainerID);
        const configuracoesChart = Object.assign(this._defaultOptions(series, labels), options);
        this.instance = new ApexCharts(chartContainer, configuracoesChart);
        this.instance.render();
        return this.instance;
    }

    _defaultOptions(series, labels) {
        return {
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
            series: series,
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
            labels: labels,
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
    }


}