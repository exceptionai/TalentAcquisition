import { CurriculoView } from './CurriculoView.js';

export class IdiomasView extends CurriculoView {

    template() {
        this._dinamicoCampoContador++;
        return $(`
            <div class="campoIdiomaAdicional" id="campoIdiomaAdicional${this._dinamicoCampoContador}">
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Idioma*</label>
                            <select required class="form-control" data-style="btn btn-link" name="idioma" data-parent="idiomas">
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
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nível Fala*</label>
                            <select required class="form-control" data-style="btn btn-link" name="nivelFala" data-parent="idiomas" >
                                <option value="" selected disabled>Nível</option>
                                <option value="basico">Básico</option>
                                <option value="intermediario">Intermediário</option>
                                <option value="avançado">Avançado</option>
                                <option value="tecnico">Técnico</option>
                                <option value="fluente">Fluente</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nível Leitura*</label>
                            <select required class="form-control" data-style="btn btn-link" name="nivelLeitura" data-parent="idiomas" >
                                <option value="" selected disabled>Nível</option>
                                <option value="basico">Básico</option>
                                <option value="intermediario">Intermediário</option>
                                <option value="avançado">Avançado</option>
                                <option value="tecnico">Técnico</option>
                                <option value="fluente">Fluente</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nível Escrita*</label>
                            <select required class="form-control" data-style="btn btn-link" name="nivelEscrita" data-parent="idiomas" >
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

                <button type="button" class="btn btn-high-danger" id="campoIdiomaAdicionalRemover${this._dinamicoCampoContador}">remover idioma</button>
                <hr>
            </div>
        `);
    }
}