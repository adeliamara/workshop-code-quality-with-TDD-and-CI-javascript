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

`docker-compose up -build`



# Testes

Para um projeto Express, você pode usar o Jest e a biblioteca supertest para testar os controladores e serviços. Vou mostrar como criar testes para o UserService e o UserController em um projeto Express.

Certifique-se de ter as seguintes dependências instaladas:

npm install --save-dev jest ts-jest @types/jest

E para testes de integração com o banco de dados (se necessário):


npm install --save-dev supertest

npm install --save-dev supertest

# Levantando DB

docker-compose -f docker-compose.test.yml up

# Rodando testes indivualemente 

 npx jest src/users/tests/user.service.spec.ts

# Rodando todos 

npm test

 npm run one_test src/users/tests/user.service.spec.ts

 # com dpeendencia de banco