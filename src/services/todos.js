import {fetchDoc,fetchJson} from './xFetch';

export async function getAll() {
  return fetchJson('/docs/data.json');
}
