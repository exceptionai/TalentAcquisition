export class TableFactory{
    constructor(seletorTabela){
        this.tabela = $(seletorTabela);
        this._init();
    }

    _init(){
        DevExpress.localization.locale('pt');
    }

    create(optionsDados,columns){
        if(arguments.lenght == 1){
            this.tabela.dxDataGrid(optionsDados);
        }else{
            this.tabela.dxDataGrid({
                filterRow: {
                    visible: true
                },
                dataSource: optionsDados,
                paging: {
                    pageSize: 10
                },
                pager: {
                    showPageSizeSelector: true,
                    allowedPageSizes: [10, optionsDados.lenght]
                },
                remoteOperations: false,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: true
                },
                groupPanel: {
                    visible: true
                },
                grouping: {
                    autoExpandAll: true
                },
                allowColumnReordering: true,
                rowAlternationEnabled: true,
                showBorders: true,
                headerFilter: {
                    visible: true
                },
                columns:columns,
                onEditorPrepared: function(e) {
                    $(".loader").hide();
                }
            })
        }

        
    }
}