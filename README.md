# Talent Acquisition
Sistema de filtragem de currículos por meio de uma plataforma baseada em pontos, 
e através de Machine Learning e Processamento de Linguagem natural, os candidatos 
terão seus currículos avaliados de acordo com a vaga proposta.

<h2> Como Executar? </h2>
Para utilizar será necessário a instalação do Python3 
podendo ser baixado por meio deste <a href="https://www.python.org/downloads/">link</a>
Será necessário o microframework Flask, através do comando <i>pip install flask</i>
também será necessário a instalação do servidor de livereload para recarregamento automático com o comando <i>pip install livereload</i>
e o mysql tanto no SO como no python com o pip ou pip3 caso tenha o python2 e python3 instalados para execução das querys, instale utilizando <i>pip install mysql e pip install mysql-connector e utilize os scripts do repositório <a href="https://github.com/exceptionai/scriptsdb">scriptsdb</a>.</i> Além disso para poder criptografar o token de comunicação entre front-end e back-end será necessário instalar o jwt e pyjwt com o comando pip install pyjwt e pip install jwt.
<br> 
Para iniciar o sistema se dirija a pasta do repositório pelo terminal e digite o comando <i>python main.py</i> caso tenha apenas o python3 instalado, se tiver o python3 e python2 execude o comando  <i>python3 main.py</i>,
logo após será necessário abrir um navegador de sua preferência e ir até a URI http://localhost:5500/<br>
Com isto você já terá acesso às funcionalidades atualmente implementadas no sistema.
