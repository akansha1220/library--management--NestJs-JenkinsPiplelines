import { DataSource } from "typeorm";

    
const AppDataSource = new DataSource({
    type: 'postgres',
    database: 'dev_database',
    host: 'localhost',
    username: 'nishi@gmail.com',
    password: 'Nishi@123',
    port: 5432,
    schema: 'public',
    synchronize: false,
    poolSize: 30,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*.ts'],
    ssl: undefined,
})
console.log(AppDataSource)

AppDataSource.initialize()

export default AppDataSource;
   

