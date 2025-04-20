<h1>🚀 Como Rodar o Projeto</h1>

<h3>1. 🧑‍💻 <strong>Clonar o Repositório</strong></h3>
<p>Clone o repositório para sua máquina local:</p>
<pre><code>git clone https://github.com/joaopedropicolo/chatbot-NodeNLP.git</code></pre>

<h3>2. 📂 <strong>Acessar o Diretório do Projeto</strong></h3>
<p>Entre na pasta do projeto:</p>
<pre><code>cd chatbot-NodeNLP</code></pre>

<h3>3. 📦 <strong>Instalar as Dependências</strong></h3>
<p>Instale as dependências necessárias com o <strong>npm</strong>:</p>
<pre><code>npm install</code></pre>

<h3>4. ⚙️ <strong>Configuração das Variáveis de Ambiente</strong></h3>
<p>Crie um arquivo <code>.env</code> na raiz do projeto e adicione as variáveis de configuração do <strong>Dialogflow</strong>. Exemplo:</p>
<pre><code>
DIALOGFLOW_PROJECT_ID=seu_project_id_do_dialogflow
DIALOGFLOW_PRIVATE_KEY=seu_private_key_do_dialogflow
DIALOGFLOW_CLIENT_EMAIL=seu_email_client_do_dialogflow
</code></pre>
<p>Não se esqueça de colocar a token do seu bot no script.js! A token é gerada pelo <a href="https://telegram.me/BotFather">BotFather do Telegram</a>.</p>

<p><strong>Nota:</strong> Para obter essas credenciais, crie um projeto no <a href="https://dialogflow.cloud.google.com/" target="_blank">Dialogflow</a>, gere as credenciais de API e adicione as informações no arquivo <code>.env</code>.</p>

<h3>5. 🚀 <strong>Rodar o Projeto</strong></h3>
<p>Com as dependências instaladas e as variáveis de ambiente configuradas, inicie o servidor com:</p>
<pre><code>node .\script.js</code></pre>

<p>Isso deve iniciar o servidor do chatbot. Agora, você pode testar o chatbot e interagir com ele!</p>
