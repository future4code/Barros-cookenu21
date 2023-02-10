import { Migration } from "./TableDataBase"
const migration = new Migration();

const queryMigrations = ()=>{
    migration.createTables();
    console.log("Tabelas criadas!!");
    
}

queryMigrations();