import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Document } from "langchain/document";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

dotenv.config();

const client = new PineconeClient();
await client.init({
  apiKey: `${process.env.PINECONE_API_KEY}`,
  environment: `${process.env.PINECONE_ENVIRONMENT}`,
});
const pineconeIndex = client.Index(`${process.env.PINECONE_INDEX}`);

// RUN THIS CODE ONCE //

/* You can write definitions in pageContent, or an answer to a question 
you want to ask, these are embedded via the langchain api and stored as a
vector in one of their pinecone collections. Everytime you run it stores
again, so you should run it once for every new entry */

/* const docs = [
    new Document({
      metadata: { foo: "bar" },
      pageContent: "pinecone is a vector db",
    }),
    new Document({
      metadata: { foo: "bar" },
      pageContent: "the quick brown fox jumped over the lazy dog",
    }),
    new Document({
      metadata: { baz: "qux" },
      pageContent: "lorem ipsum dolor sit amet",
    }),
    new Document({
      metadata: { baz: "qux" },
      pageContent: "pinecones are the woody fruiting body and of a pine tree",
    }),
  ];
  
  await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    pineconeIndex,
  });
*/

const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex }
); 

/* Search the vector DB independently with meta filters */
const results = await vectorStore.similaritySearch("pinecone", 1, {
  foo: "bar",
});

const rl = readline.createInterface({ input, output });
console.log("(Try asking 'What is pinecone?')")
const answer = await rl.question('Enter some query: ');

/* Use as part of a chain (currently no metadata filters) */
const model = new OpenAI();
const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
  k: 1,
  returnSourceDocuments: true,
});
const response = await chain.call({ query: answer });

console.log(`A: ${response.text}`);

rl.close();