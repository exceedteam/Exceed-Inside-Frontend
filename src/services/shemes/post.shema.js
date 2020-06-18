import { schema } from 'normalizr';

export const postSchema = new schema.Entity('posts');
export const postListSchema = [postSchema]
