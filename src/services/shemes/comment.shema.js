import { schema } from 'normalizr';

export const commentSchema = new schema.Entity('comments');
export const commentListSchema = [commentSchema]
