import { Client, Databases, Storage, Account} from 'appwrite';

export const PROJECT_ID = '6501f589749b017b3146';
export const DATABASE_ID = '6501f718922d5e24e536'
export const USERDOUBTS_COLLECTION_ID = '6501f7240d068a07c4d1'
export const DOUBT_STORAGE_BUCKET_ID = '6501fb7388c3afe58df4'

const client = new Client();
export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client)

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6501f589749b017b3146');

export default client;