import { Client, Databases, Storage, Account} from 'appwrite';
export const PROJECT_ID = '6501f589749b017b3146';
export const DATABASE_ID = '6501f718922d5e24e536'
export const USERDOUBTS_COLLECTION_ID = '6501f7240d068a07c4d1'
export const DOUBT_STORAGE_BUCKET_ID = '6501fb7388c3afe58df4'
export const USERTABLE_ID = '6506a9864a5089d03bc2'
export const API_AUTH_KEY ='04c2b88096be952254e1c268ff0ea7b69ec2ca3da5a3f12c41594166f2cf3a7ca6f5e4fea073ad181140aeb6ebd75d0e517ffa01117bda2830824a6fcff2827e71eeeafb07db57c9f5d609bee4c7f6969b94f7130b1aa2712ee136c8785e3d29ebda56b16b152265bc0e30d0873171a620342dfa5ad85fcdf5112f68aacfaa4e'

const client = new Client();
export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6501f589749b017b3146');

export default client;
