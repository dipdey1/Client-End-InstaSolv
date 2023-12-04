import { Client, Databases, Storage, Account, Functions} from 'appwrite';
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID
export const USERDOUBTS_COLLECTION_ID = import.meta.env.VITE_USERDOUBTS_COLLECTION_ID
export const DOUBT_STORAGE_BUCKET_ID = import.meta.env.VITE_DOUBT_STORAGE_BUCKET_ID
export const USERTABLE_ID = import.meta.env.VITE_USERTABLE_ID
export const API_AUTH_KEY = import.meta.env.VITE_API_AUTH_KEY
export const ROUTINGFUNCTION_ID = import.meta.env.VITE_ROUTINGFUNCTION_ID
export const FUNCTION_EXECUTION_API_KEY = import.meta.env.VITE_FUNCTION_EXECUTION_API_KEY
export const DELETEROUTINGFUNCTION_ID = import.meta.env.VITE_DELETEROUTINGFUNCTION_ID

const client = new Client();
export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export const functions = new Functions(client)


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

export default client;
