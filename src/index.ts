import 'dotenv/config'; // Carrega as variáveis de ambiente
import { AppDataSource } from './config/data-source'; // Importa a configuração do DataSource
import app from './app'; // Importa a aplicação Express

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
