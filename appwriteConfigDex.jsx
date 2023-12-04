import { Client, Databases, Storage, Account, Functions} from 'appwrite';
export const PROJECT_ID_DEX = import.meta.env.VITE_PROJECT_ID_DEX
export const DATABASE_ID_DEX = import.meta.env.VITE_DATABASE_ID_DEX
export const ACTIVE_DEX_COLLECTION_ID = import.meta.env.ACTIVE_DEX_COLLECTION_ID
export const TOKEN_SERVER = import.meta.env.TOKEN_SERVER

const client2 = new Client();
export const databases_2 = new Databases(client2);
export const storage_2 = new Storage(client2);
export const account_2 = new Account(client2);
export const functions_dex = new Functions(client2)

client2
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID_DEX);

export default client2;