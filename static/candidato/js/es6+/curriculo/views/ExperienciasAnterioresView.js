import { CurriculoView } from './CurriculoView.js';
import { ValidacaoFormularioView } from './ValidacaoFormularioView.js';

export class ExperienciasAnterioresView extends CurriculoView {

    template() {
        this._dinamicoCampoContador++;
        const campoExperienciaAnterior = $(`
        <div id="experienciaAnterior${this._dinamicoCampoContador}" data-group="true">
            <hr>
            Experiências Anteriores
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Nome da empresa*</label>
                        <input type="text" data-parent="experienciasAnteriores" class="form-control" name="nomeEmpresa" placeholder="Ex: Bayer" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Cargo*</label>
                        <input type="text" data-parent="experienciasAnteriores" class="form-control"  name="cargo"  placeholder="Ex: Engenheiro Elétrico" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Salário</label>
                        <input type="text" data-parent="experienciasAnteriores" class="form-control" name="salario" id="salario${this._dinamicoCampoContador}" data-valida="salario" inputmode="numeric">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Data de entrada*</label>
                        <input type="date" min="1900-01-01" data-parent="experienciasAnteriores" class="form-control" name="dataEntrada" id="dataEntrada${this._dinamicoCampoContador}" data-valida="data" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Data de saída*</label>
                        <input type="date" min="1900-01-01" data-parent="experienciasAnteriores" class="form-control" name="dataSaida" id="dataSaida${this._dinamicoCampoContador}" data-valida="data" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" id="empregoAtual${this._dinamicoCampoContador}" data-parent="experienciasAnteriores" type="checkbox" name="trabalhoAtual" data-valida="bloquear,unico" data-eventBloquear="click" data-idBloquear="dataSaida${this._dinamicoCampoContador}">
                                É meu emprego atual
                                <span class="form-check-sign">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="form-group">
                            <label class="bmd-label-floating">Principais atividades</label>
                            <textarea id="descricaoExperiencia${this._dinamicoCampoContador}" data-parent="experienciasAnteriores" class="form-control" name="principais_atividades" rows="5"  data-valida="caracteres" maxlength="1000" ></textarea>
                            <p class="text-muted"><small><span name="txtArea">1000</span></small> caracteres restantes</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="button" class="btn btn-high-danger mb-4" id="experienciaAnteriorRemover${this._dinamicoCampoContador}">Remover Experiência Anterior</button>
            
        </div>
        `);
        ValidacaoFormularioView.mascara_salarios(`salario${this._dinamicoCampoContador}`);
        return campoExperienciaAnterior;
    }
}