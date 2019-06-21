class CurriculoView{

    constructor(){
        this._contadorIdiomas = 0;
        this._contadorCampo = 0;
        this._contadorCursos = 0;
        this._contadorFormacao = 0;
        this._contadorExperiencias = 0;
    }

    adicionarCampo(campo, template){
        this._contadorCampo++
        campo.append(template);
        return  this._contadorCampo;
    }

    botao(botaoID){
        return $(`#${botaoID}`);
    }

    campo(campoID){
        return $(`#${campoID}`);
    }

    removerCampo(campo, id){
        const campoARemover = $("#"+campo+id);
        campoARemover.fadeOut(500);
        setTimeout(()=> campoARemover.remove(),500);
    }


    botaoRemover(campoID,contador){
        console.log(`#${campoID}Remover${contador}`)
        return $(`#${campoID}Remover${contador}`)
    }

    cursosComplementares(){
        this._contadorCursos++;
        return $(`
            <div id="cursosComplementares${this._contadorCursos}">
                <br>
                <div>
                    <label>Nome do curso *</label>
                    <input type="text" name="nomeCurso${this._contadorCursos}" id="nomeCurso${this._contadorCursos}" placeholder="Ex: Excel" required>
                    <label>Nome da instituição *</label>
                    <input type="text" id="respostaInstituicao" name="instituicao${this._contadorCursos}" placeholder="Ex: Alura" required>
                </div>
                <br>
                <div><label for="dataCursoInicio${this._contadorCursos}">Data Inicial *</label>
                    <input type="date" data-date="" data-date-format="DD MM YYYY"  name="dataCursoInicio${this._contadorCursos}" id="dataCursoInicio${this._contadorCursos}" max="today" required>

                    <label>Duração</label>
                    <select name="duracao${this._contadorCursos}">
                        <option value="curta">Curta (até 40 horas)</option>
                        <option value="media">Média (de 41 a 360 horas)</option>
                        <option value="longa">Longa (acima de 360 horas</option>
                    </select>
                </div>
                <br>
                <div>
                    <label for="cursando">Situação:</label>
                    <select id="situacao" name="situacao${this._contadorCursos}"> 
                        <option value="cursando">Cursando</option>
                        <option value="concluido">Concluído</option>
                        <option value="interrompido">Interrompido</option>
                    </select>
                </div>
                <br>
                <br>
                    <label for="descricaoCursoExtraCurricular${this._contadorCursos}">Descrição do curso</label><br>
                    <textarea id="descricaoCursoExtraCurricular${this._contadorCursos}" name="descricaoCursoExtraCurricular${this._contadorCursos}" cols="76" rows="8"></textarea>
                <br>
                <button type="button" id="cursosComplementaresRemover${this._contadorCursos}">Remover Curso Extra Curricular</button>
                <hr>
                <br>
            </div>
        `);
    }

    idioma(){
        this._contadorIdiomas++;
        return $(`
            <div class="campoIdiomaAdicional" id="campoIdiomaAdicional${this._contadorIdiomas}">
                <select id="idioma${this._contadorIdiomas}" name="idioma${this._contadorIdiomas}">
                    <option value="">Idioma</option>
                    <option value="ingles">Inglês</option>
                    <option value="espanhol">Espanhol</option>
                    <option value="frances">Francês</option>
                    <option value="mandarim">Mandarim</option>
                    <option value="japones">Japonês</option>
                    <option value="alemao">Alemão</option>
                    <option value="russo">Russo</option>
                </select>
                <label for="nivelIdioma">Nível de proficiência</label>
                <select id="nivelIdioma${this._contadorIdiomas}" name="nivelIdioma${this._contadorIdiomas}">
                    <option value="">Nível</option>
                    <option value="basico">Básico</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avançado">Avançado</option>
                    <option value="tecnico">Técnico</option>
                    <option value="fluente">Fluente</option>
                </select>
                <button type="button" id="campoIdiomaAdicionalRemover${this._contadorIdiomas}">remover</a>
            </div>
        `);
    }

    experienciaAnterior(){
        this._contadorExperiencias++;
        return $(`
            <div id="experienciaAnterior${this._contadorExperiencias}">
                <label>Cargo *</label>
                <br>
                <input type="text" id="resposta6" name="cargo${this._contadorExperiencias}" placeholder="Ex: Engenheiro Elétrico" required>
            
                <br><br>
                <div>
                    <label>Nome da empresa *</label>
                    <br>
                    <input type="text" id="resposta7" name="nomeEmpresa${this._contadorExperiencias}" placeholder="Ex: Bayer" required>
                </div>
                <br><br>
                <div>
                    <label>É meu trabalho atual?</label>
                    <input type="checkbox" name="trabalhoAtual${this._contadorExperiencias}" value="resposta8">
                </div>
                <br><br>
                <div>
                    <label>Data de entrada *</label>
                    <input type="date" name="dataEntrada1" id="dataEntrada${this._contadorExperiencias}"  required>
                    <label>Data de saída *</label>
                    <input type="date" name="dataSaida1" id="dataSaida${this._contadorExperiencias}" required>
                </div>
                <br><br>
                <div>
                    <label>Principais atividades</label>
                    <br>
                    <textarea id="story" name="principaisAtividades${this._contadorExperiencias}" rows="15" cols="70"></textarea>
                    <label>3000</label>
                </div>
                <br><br>
                <div>
                    <label>Salário</label>
                    <br>
                    <input type="text" step="any" min="0" name="salario${this._contadorExperiencias}" data-thousands="." data-decimal="," data-prefix="R$ "  id="salario${this._contadorCampo}" class="experiencias" placeholder="Ex: R$ 1500,00">
                </div>
                <br>
                <button type="button" id="experienciaAnteriorRemover${this._contadorExperiencias}">Remover Experiencia Anterior</button>
                <hr>
                <br>
            </div>
        `);
    }

    formacao(){
        this._contadorFormacao++;
        return $(`
            <div id="formacao${this._contadorFormacao}">
                <label for="nivelCurso${this._contadorFormacao}">Nível *</label>
                <select id="nivelCurso${this._contadorFormacao}" name="nivelCurso${this._contadorFormacao}">
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
                <br>
                <label for="nomeCurso${this._contadorFormacao}">Nome do Curso*</label>
                <input type="text" id="nomeFormacao${this._contadorFormacao}" name="nomeFormacao${this._contadorFormacao}" placeholder="Ex: Analista de Sistemas" required>
                    
                <br>
                <label for="nomeCurso${this._contadorFormacao}">Nome da Instituição*</label>
                <input type="text" id="nomeInstituicao${this._contadorFormacao}" name="nomeInstituicao${this._contadorFormacao}" placeholder="Ex: Faculdade Bayer" required>
                    
                <br>
                <label for="cursando">Situação da Formação*:</label>
                <select id="situacaoFormacao${this._contadorFormacao}" name="situacaoFormacao${this._contadorFormacao}">
                    <option value="cursando">Cursando</option>
                    <option value="concluido">Concluído</option>
                    <option value="interrompido">Interrompido</option>
                </select>
                <br>
                <button type="button" id="formacaoRemover${this._contadorFormacao}">Remover Formação Acadêmica</button>
                <hr>
                <br>
                <br>
            </div>
        `)
    }

   
}