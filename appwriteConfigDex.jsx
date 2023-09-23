import { Client, Databases, Storage, Account} from 'appwrite';
export const PROJECT_ID_DEX = '65080044efaf92f3e711';
export const DATABASE_ID_DEX = '650800e170158d5110ee'
export const ACTIVE_DEX_COLLECTION_ID = '65084e7779c7240edda7'

const client2 = new Client();
export const databases_2 = new Databases(client2);
export const storage_2 = new Storage(client2);
export const account_2 = new Account(client2);

client2
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID_DEX);

export default client2;