import { BaseDatabase } from "./BaseDatabase";

export class Migration extends BaseDatabase {
  createTables = async () => {
    try {
      await Migration.connection
      .raw(`
        CREATE TABLE IF NOT EXISTS cookenu_users(
           id VARCHAR(255) PRIMARY KEY NOT NULL, 
           name VARCHAR(255) NOT NULL,
           email VARCHAR(255) UNIQUE NOT NULL,
           password VARCHAR(255) NOT NULL,
           role enum('NORMAL', 'ADMIN') NOT NULL DEFAULT 'NORMAL'
        );     
        CREATE TABLE IF NOT EXISTS cookenu_recipe(
           id VARCHAR(255) PRIMARY KEY NOT NULL,
           description VARCHAR(255) NOT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           author_id VARCHAR(255) NOT NULL,
           FOREIGN KEY (author_id) REFERENCES cookenu_users (id)
        );     
        CREATE TABLE IF NOT EXISTS cookenu_follow(
           id VARCHAR(255) PRIMARY KEY NOT NULL,
           friend_id VARCHAR(255) NOT NULL,
           author_id VARCHAR(255) NOT NULL,
           FOREIGN KEY (author_id) REFERENCES cookenu_users (id),
           FOREIGN KEY (friend_id) REFERENCES cookenu_users (id)
        );     
      `)
      } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

const printError = (error: any) => {
  console.log(error.sqlMessage || error.message);
};
