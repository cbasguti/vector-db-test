# Vector DB Test

A brief description of the project.

## Getting Started

To get started with the project, you'll need to install the required dependencies first:

### Start
``` bash 
npm install
```

After that, you can run the application using the following command:

``` bash 
node index.js
```


## Adding Documents

You can add documents to the Pinecone collection using the following JavaScript code:

```js
const docs = [
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
```

## Adding Documents

You can query the collection using the following JavaScript code, **answer** would be the entry query or anything else:

```js
const model = new OpenAI();
const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
  k: 1,
  returnSourceDocuments: true,
});
const response = await chain.call({ query: answer });
```