import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.changteezy.foodordering"!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "686d38340013f55fa709"!,
  bucketId: "687090c50007e63b62e0"!,
  userCollectionId: "686d3850000c3872de6e"!,
  categoriesCollectionId: "686fc32b001830d6164f"!,
  menuCollectionId: "686fc3cd00336381fe18"!,
  customizationCollectionId: "68708f5d003c3cf698d2"!,
  menuCustomizationCollectionId: "68708ff000106e6f346c"!,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password);

    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, name, avatar: avatarUrl },
    );

    return newUser;
  } catch (e) {
    throw new Error(e as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e) {
    throw new Error(e as string);
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current account found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser || currentUser.documents.length === 0) {
      throw new Error("User not found in the database");
    }

    return currentUser.documents[0];
  } catch (e: any) {
    console.log("Error getting current user:", e);
    throw new Error(e.message || "An error occurred while fetching the user.");
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries,
    );

    return menus.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
    );

    return categories.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};
