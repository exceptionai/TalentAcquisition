import { CurriculoView } from './CurriculoView.js';

export class FormacoesAcademicasView extends CurriculoView {

    template() {
        this._dinamicoCampoContador++;
        return $(`
            <div id="formacao${this._dinamicoCampoContador}">
                <hr>
                Formação acadêmica
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome do curso*</label>
                            <input type="text" required data-parent="formacaoAcademica" class="form-control" id="nomeFormacao${this._dinamicoCampoContador}" name="curso">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nível*</label>
                            <select required class="form-control" data-parent="formacaoAcademica" data-style="btn btn-link" name="nivelCurso" >
                                <option value="" selected disabled>Nível</option>
                                <option value="ensinoMedio">Ensino Médio</option>
                                <option value="tecnico">Técnico</option>
                                <option value="graduacao">Graduação</option>
                                <option value="posGraduacao">Pós Graduação</option>
                                <option value="mba">MBA</option>
                                <option value="mestrado">Mestrado</option>
                                <option value="doutorado">Doutorado</option>
                                <option value="posDoutorado">Pós Doutorado</option>
                                <option value="livreDocencia">Livre Docência</option>
                            </select>
                        </div>
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome da instituição*</label>
                            <input type="text" required data-parent="formacaoAcademica" class="form-control" id="nomeInstituicao" name="nomeInstituicao">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Situação*</label>
                            <select class="form-control" required data-parent="formacaoAcademica" data-style="btn btn-link" id="situacaoFormacao${this._dinamicoCampoContador}" name="situacaoFormacao">
                                <option value="" disabled>Situação</option>
                                <option value="cursando">Cursando</option>
                                <option value="concluido">Concluído</option>
                                <option value="interrompido">Interrompido</option>
                            </select>
                        </div>
                    </div>
                </div>  
                
                <button type="button" class="btn btn-danger" id="formacaoRemover${this._dinamicoCampoContador}">Remover formação acadêmica</button>
                <hr>
            </div>
        `)
    }

}