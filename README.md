Para inicilizar este projeto:

# No Windows

Abra o PowerShell ou o Prompt de Comando e execute:

`docker --version`

Se o Docker estiver instalado, você verá a versão do Docker. Caso contrário, você precisará instalar o Docker Desktop aqui.

Execute:

`docker-compose --version`

Se o Docker Compose estiver instalado, você verá a versão do Docker Compose. 

# No Linux
Verificar Docker

Abra um terminal e execute:

`docker --version`
Se o Docker estiver instalado, você verá a versão do Docker.  Se não tiver instalado, voce deve instalar.

Verificar Docker Compose

Execute:

`docker-compose --version`
Se o Docker Compose estiver instalado, você verá a versão do Docker Compose. Se não estiver instalado, você deve instalar o Docker Compose;

Se o Docker e o Docker Compose não estiverem instalados ou se houver problemas com a instalação, você deve resolvê-los antes de tentar iniciar seu projeto. Certificar-se de que ambos estão instalados e configurados corretamente garante que o docker-compose up funcione conforme esperado.

# Para os dois casos

`docker-compose build`

Iniciar os containers (após a construção):

`docker-compose up`