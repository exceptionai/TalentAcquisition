import { CurriculoView } from './CurriculoView.js';

export class CursosComplementaresView extends CurriculoView {

    template() {
        this._dinamicoCampoContador++;
        return $(`
            <div id="cursosComplementares${this._dinamicoCampoContador}">
               
                <hr>
                Cursos Complementares
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome do curso* </label>
                            <input required type="text" class="form-control" name="nome" data-parent="cursosComplementares" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome da instituição*</label>
                            <input type="text" class="form-control" name="instituicao" required data-parent="cursosComplementares">
                        </div>
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="bmd-label-floating">Data inicial</label>
                            <input type="date"  min="1900-01-01" name="dataInicial" class="form-control" data-parent="cursosComplementares" id="dataInicialCurso${this._dinamicoCampoContador}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="bmd-label-floating">Duração</label>
                            <select class="form-control" data-parent="cursosComplementares" data-style="btn btn-link" name="duracao" id="duracaoCurso${this._dinamicoCampoContador}">
                                <option value="" disabled>Duração</option>
                                <option value="curta">Curta (até 40 horas)</option>
                                <option value="media">Média (de 41 a 360 horas)</option>
                                <option value="longa">Longa (acima de 360 horas</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="bmd-label-floating">Situação*</label>
                            <select class="form-control" required name="situacao" data-parent="cursosComplementares" data-style="btn btn-link" >
                                <option selected disabled >Situação</option> 
                                <option value="cursando" >Cursando</option>
                                <option value="concluido">Concluído</option>
                                <option value="interrompido">Interrompido</option>
                            </select>
                        </div>
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="form-group">
                                <label class="bmd-label-floating">Descrição do curso</label>
                                <textarea id="descricaoCurso${this._dinamicoCampoContador  }" name="descricao" data-parent="cursosComplementares" class="form-control" rows="5" maxlength="1000" data-valida="caracteres"></textarea>
                                <p class="text-muted"><small><span class="caracteres" name="txtArea">1000</span></small> caracteres restantes</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type="button" class="btn btn-danger" id="cursosComplementaresRemover${this._dinamicoCampoContador}">Remover Curso Extra Curricular</button>
                <hr>
                <br>
            </div>
        `);
    }

}