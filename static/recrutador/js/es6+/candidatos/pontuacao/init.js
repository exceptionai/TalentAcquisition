$("#confimaRemoverVerificacao").click(function() {
    const medal = $(".tituloDetalhesCandidato .fa-medal");
    if (medal.hasClass('text-warning')) {
        medal.removeClass('text-warning');
    }
    medal.removeAttr('data-toggle');
    medal.removeAttr('data-target');
    medal.click(() => {
        medal.toggleClass('text-primary');
        medal.toggleClass('text-dark')
    })
})

const salvaHTML = function() {
    window.conteudoOriginal = $(".stars").html();
}

salvaHTML();

$(".stars").mouseleave(function() {
    $(".stars").html(window.conteudoOriginal);
    $(".stars .selecionavel-icone").hover(estrelaSelecionavel);
    $(".stars .selecionavel-icone").click(salvaHTMLRecrutador);
})

const estrelaSelecionavel = function() {
    const maioresQueAtual = $(`.selecionavel-icone:nth-child(n+${$(this).index()+2})`);
    const atual = $(`.selecionavel-icone:nth-child(n-${$(this).index()+2})`);
    atual.addClass("fas");
    atual.addClass("far");
    maioresQueAtual.removeClass("fas")
    maioresQueAtual.addClass("far")
}

const salvaHTMLRecrutador = function() {
    $(".stars .selecionavel-icone").addClass('text-primary');
    salvaHTML();
}

$(".stars .selecionavel-icone").hover(estrelaSelecionavel);

$(".stars .selecionavel-icone").click(salvaHTMLRecrutador);

const progressiveOptions = {
    title: {
        text: 'Evolução do Candidato',
        style: {
            fontSize: '18px',
            color: "#89229b"
        }
    },
    chart: {

        foreColor: '#333',
        height: 350,
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
    },
    colors: ["#4caf50"],
    series: [{
        name: "Pontos",
        data: [72, 102, 80, 225, 300, 203, 90, 233, 245, 180, 200, 320]

    }],
    markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
            size: 9
        },
        colors: ['#38823b']
    },
    grid: {
        strokeDashArray: 2,
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
            opacity: 0.15
        },
        style: {
            colors: ["#333"]
        }
    },
    labels: ['17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08', '24/08', '25/08', '26/08', '27/08', '28/08'],
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
const clone = {
    title: {
        text: 'Conhecimentos Gerais',
        style: {
            fontSize: '18px',
            color: "#89229b"
        }
    },
    chart: {

        foreColor: '#333',
        height: 350,
        type: 'bar',
        zoom: {
            enabled: false
        },

        toolbar: {
            show: false
        }
    },
    stroke: {
        curve: 'straight',
    },
    series: [{
        name: "Matemática",
        data: [44, 55]
    }, {
        name: "Português",
        data: [53, 32]
    }, {
        name: "Informática",
        data: [33, 42]
    }],
    markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
            size: 9
        },
        colors: ['#38823b']
    },
    colors: ["#89229b", "#F86624", "#F9C80E", "#EA3546", "#43BCCD"],

    grid: {
        strokeDashArray: 2,
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
            opacity: 0.65
        },
        style: {
            colors: ["#fff"]
        }
    },
    labels: ['Pontuação Necessária', 'Pontuação Atingida'],
    xaxis: {
        tooltip: {
            enabled: false
        }
    },
    tooltip: {
        theme: 'dark'
    },
    yaxis: {
        max: 180,
        show: true,
        showAlways: true,
        seriesName: undefined,
        opposite: false,
        reversed: false,
        logarithmic: false,
        tickAmount: 4
    }
}

const clone2 = {
    title: {
        text: 'Conhecimentos Específicos',
        style: {
            fontSize: '18px',
            color: "#89229b"
        }
    },
    chart: {

        foreColor: '#333',
        height: 350,
        type: 'bar',
        zoom: {
            enabled: false
        },

        toolbar: {
            show: false
        }
    },
    stroke: {
        curve: 'straight'
    },
    colors: ["#03A9F4", "#4CAF50", "#FEB019", "#546E7A"],
    series: [{
        name: "HTML",
        data: [72, 102]

    }, {
        name: "CSS3",
        data: [80, 112]

    }, {
        name: "Javascript",
        data: [110, 180]

    }, {
        name: "Testes Automatizados",
        data: [100, 110]

    }],
    markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
            size: 9
        },
        colors: ['#38823b']
    },
    grid: {
        strokeDashArray: 4,
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
            opacity: 0.65
        },
        style: {
            colors: ["#fff"]
        }
    },
    labels: ['Pontuação Necessária', 'Pontuação Atingida'],
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

const chart2 = new ApexCharts(document.querySelector('#chart'), progressiveOptions)
chart2.render()
const chart3 = new ApexCharts(document.querySelector('#evolucaoChart1'), clone)
chart3.render()
const chart4 = new ApexCharts(document.querySelector('#evolucaoChart2'), clone2)
chart4.render()