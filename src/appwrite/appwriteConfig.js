import { Client, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("http://localhost/v1") 
  .setProject("67ae1c7100036cbcbd3e"); 

const account = new Account(client);

export { account };
