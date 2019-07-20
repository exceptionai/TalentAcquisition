class CurriculoView {

    constructor() {
        this._contadorIdiomas = 0;
        this._contadorCampo = 0;
        this._contadorCursos = 0;
        this._contadorFormacao = 0;
        this._contadorExperiencias = 0;
    }

    adicionarCampo(campo, template) {
        this._contadorCampo++
            campo.append(template);
        return this._contadorCampo;
    }

    botao(botaoID) {
        return $(`#${botaoID}`);
    }

    campo(campoID) {
        return $(`#${campoID}`);
    }

    removerCampo(campo, id) {
        const campoARemover = $("#" + campo + id);
        campoARemover.fadeOut(500);
        setTimeout(() => campoARemover.remove(), 500);
    }


    botaoRemover(campoID, contador) {
        return $(`#${campoID}Remover${contador}`)
    }

    cursosComplementares() {
        this._contadorCursos++;
        return $(`
            <div id="cursosComplementares${this._contadorCursos}">
               
                <hr>
                Cursos Complementares
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome do Curso</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome da Instituição</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="bmd-label-floating">Data Inicial</label>
                            <input type="date" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="bmd-label-floating">Duração</label>
                            <select class="form-control" data-style="btn btn-link" name="duracao${this._contadorCursos}">
                                <option value="curta">Curta (até 40 horas)</option>
                                <option value="media">Média (de 41 a 360 horas)</option>
                                <option value="longa">Longa (acima de 360 horas</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="bmd-label-floating">Situação</label>
                            <select class="form-control" data-style="btn btn-link">
                                    
                                <option selected disabled>Cursando</option> 
                                <option value="cursando">Cursando</option>
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
                                <textarea class="form-control" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type="button" class="btn btn-danger" id="cursosComplementaresRemover${this._contadorCursos}">Remover Curso Extra Curricular</button>
                <hr>
                <br>
            </div>
        `);
    }

    idioma() {
        this._contadorIdiomas++;
        return $(`
            <div class="campoIdiomaAdicional" id="campoIdiomaAdicional${this._contadorIdiomas}">
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Idioma</label>
                            <select class="form-control" data-style="btn btn-link" name="idioma" data-parent="idiomas">
                                <option value="" selected disabled>Idioma</option>
                                <option value="ingles">Inglês</option>
                                <option value="espanhol">Espanhol</option>
                                <option value="frances">Francês</option>
                                <option value="mandarim">Mandarim</option>
                                <option value="japones">Japonês</option>
                                <option value="alemao">Alemão</option>
                                <option value="russo">Russo</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nível</label>
                            <select class="form-control" data-style="btn btn-link" name="nivelIdioma" data-parent="idiomas" >
                                <option value="" selected disabled>Nível</option>
                                <option value="basico">Básico</option>
                                <option value="intermediario">Intermediário</option>
                                <option value="avançado">Avançado</option>
                                <option value="tecnico">Técnico</option>
                                <option value="fluente">Fluente</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type="button" class="btn btn-danger" id="campoIdiomaAdicionalRemover${this._contadorIdiomas}">remover idioma</button>
                <hr>
            </div>
        `);
    }

    experienciaAnterior() {
        this._contadorExperiencias++;
        const campoExperienciaAnterior = $(`
        <div id="experienciaAnterior${this._contadorExperiencias}" data-group="true">
            <hr>
            Experiências Anteriores
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Nome da empresa</label>
                        <input type="text" data-parent="experienciasAnteriores" class="form-control" name="nomeEmpresa${this._contadorExperiencias}" placeholder="Ex: Bayer" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Cargo</label>
                        <input type="number" data-parent="experienciasAnteriores" class="form-control"  name="cargo${this._contadorExperiencias}"  placeholder="Ex: Engenheiro Elétrico" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Salário</label>
                        <input type="text" data-parent="experienciasAnteriores" class="form-control" name="salario${this._contadorExperiencias}" id="salario${this._contadorExperiencias}">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Data de entrada *</label>
                        <input type="date" data-parent="experienciasAnteriores" class="form-control" name="dataEntrada${this._contadorExperiencias}" id="dataEntrada${this._contadorExperiencias}"  required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Data de saída *</label>
                        <input type="date" data-parent="experienciasAnteriores" class="form-control" name="dataSaida${this._contadorExperiencias}" id="dataSaida${this._contadorExperiencias}" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" data-parent="experienciasAnteriores" type="radio" name="trabalhoAtual${this._contadorExperiencias}" value="teste1">
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
                            <textarea  data-parent="experienciasAnteriores" class="form-control" name="principaisAtividades${this._contadorExperiencias}" rows="5"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="button" class="btn btn-danger" id="experienciaAnteriorRemover${this._contadorExperiencias}">Remover Experiencia Anterior</button>
            <hr>
        </div>
        `);
        ValidacaoFormulario.mascara_salarios(`salario${this._contadorExperiencias}`);
        return campoExperienciaAnterior;
    }

    formacao() {
        this._contadorFormacao++;
        return $(`
            <div id="formacao${this._contadorFormacao}">
                <hr>
                Formação Acadêmica
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome do Curso</label>
                            <input type="text" data-parent="formacaoAcademica" class="form-control" id="nomeFormacao${this._contadorFormacao}" name="curso">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nível</label>
                            <select class="form-control" data-parent="formacaoAcademica" data-style="btn btn-link" name="nivelCurso" >
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
                            <label class="bmd-label-floating">Nome da Instituição</label>
                            <input type="text" data-parent="formacaoAcademica" class="form-control" id="nomeInstituicao" name="nomeInstituicao${this._contadorFormacao}">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Situação</label>
                            <select class="form-control" data-parent="formacaoAcademica" data-style="btn btn-link" id="situacaoFormacao${this._contadorFormacao}" name="situacaoFormacao">
                                <option>Cursando</option>
                                <option>Concluído</option>
                                <option>Interrompido</option>
                            </select>
                        </div>
                    </div>
                </div>  
                
                <button type="button" class="btn btn-danger" id="formacaoRemover${this._contadorFormacao}">Remover Formação Acadêmica</button>
                <hr>
            </div>
        `)
    }


}