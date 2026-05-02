// lib/sanityFetch.ts

import { client } from "./client";


export async function sanityFetch(query: string) {
  return client.fetch(query);
}