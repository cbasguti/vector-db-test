import * as dotenv from "dotenv";
import * as readline from 'node:readline/promises';
import { Milvus } from "langchain/vectorstores/milvus";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { stdin as input, stdout as output } from 'node:process';

dotenv.config();

// Just run ONCE to create a collection
// text sample from Godel, Escher, Bach
/* const storeVectors = await Milvus.fromTexts(
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
); */

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
console.log(`A: ${response[0].pageContent}`);

rl.close();