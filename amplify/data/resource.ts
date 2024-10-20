import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  PostTag: a.model({
    postId: a.id().required(),
    tagId: a.id().required(),
    post: a.belongsTo('Post', 'postId'),
    tag: a.belongsTo('Tag', 'tagId'),
  })
    .authorization(allow => [
      allow.guest().to(['read']),
      allow.owner(),
    ]),
  PostCategory: a.model({
    postId: a.id().required(),
    categoryId: a.id().required(),
    post: a.belongsTo('Post', 'postId'),
    category: a.belongsTo('Category', 'categoryId'),
  })
    .authorization(allow => [
      allow.guest().to(['read']),
      allow.owner(),
    ]),
  Post: a
    .model({
      title: a.string().required(),
      content: a.string().required(),
      author: a.string().required(),
      tags: a.hasMany('PostTag', 'postId'),
      category: a.hasMany('PostCategory', 'postId'),
      status: a.enum(['Draft', 'Published', 'Archived']),
      featuredImage: a.string(),
      comments: a.hasMany('Comment', 'postId'),
    })
    .authorization(allow => [
      allow.guest().to(['read']),
      allow.owner(),
    ]),
  Category: a
    .model({
      title: a.string().required(),
      posts: a.hasMany('PostCategory', 'categoryId')
    })
    .authorization(allow => [
      allow.guest().to(['read']),
      allow.owner()
    ]),
  Tag: a
    .model({
      title: a.string().required(),
      posts: a.hasMany('PostTag', 'tagId')
    })
    .authorization(allow => [
      allow.guest().to(['read']),
      allow.owner()
    ]),
  Comment: a
    .model({
      content: a.string().required(),
      author: a.string().required(),
      postId: a.id().required(),
      post: a.belongsTo('Post', 'postId'),
    })
    .authorization(allow => [
      allow.guest().to(['read']),
      allow.owner(),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});