# Vector DB Test

This is a small program that allows you to store documents or text snippets and analyze their similarity to a question input to offer the appropriate answer.

## Getting Started

To get started with the project, you'll need to install the required dependencies first:

### Start
``` bash 
npm install
```

After that, you can choose to try the Pinecone DB implementation:

``` bash 
node pinecone.js
```

Or you can run the milvus implementation:

``` bash 
node pinecone.js
```


## Adding Documents

You can add documents to the Pinecone collection using the following JavaScript code:

```js
// pinecone.js

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

Or you can add documents to the Milvus collection using the following JavaScript code:

```js
// milvus.js

const storeVectors = await Milvus.fromTexts(
[
  "Tortoise: Labyrinth? Labyrinth? Could it Are we in the notorious Little\
          Harmonic Labyrinth of the dreaded Majotaur?",
  "Achilles: Yiikes! What is that?",
  "Tortoise: They say-although I person never believed it myself-that an I\
          Majotaur has created a tiny labyrinth sits in a pit in the middle of\
          it, waiting innocent victims to get lost in its fears complexity.\
          Then, when they wander and dazed into the center, he laughs and\
          laughs at them-so hard, that he laughs them to death!",
  "Achilles: Oh, no!",
  "Tortoise: But it's only a myth. Courage, Achilles.",
  "Minecraft is a sandbox game developed by Mojang. Written in Java and C++.",
  "Milvus is a vector database developed by Zilliz. Written in C++.",
  "The life is meaningful. The world is beautiful.",
  "My god! What is that?",
  "The sky is blue.",
],
[{ id: 2 }, { id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 2 }, { id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }],
new OpenAIEmbeddings(),
{
  collectionName: "goldel_escher_bach",
}
```

## Query Documents

You can query the Pinecone collection using the following JavaScript code, **answer** would be the entry query or anything else:

```js
// pinecone.js

const model = new OpenAI();
const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
  k: 1,
  returnSourceDocuments: true,
});
const response = await chain.call({ query: answer });
```

Or you can query the Milvus collection using the following JavaScript code, **answer** would be the entry query or anything else:

```js
// milvus.js

const vectorStore = await Milvus.fromExistingCollection(
    new OpenAIEmbeddings(),
    {
        collectionName: "goldel_escher_bach",
    }
);

const rl = readline.createInterface({ input, output });
console.log("(Try asking 'What is minecraft?')")
const answer = await rl.question('Enter some query: ');

const response = await vectorStore.similaritySearch(answer, 1);
```
