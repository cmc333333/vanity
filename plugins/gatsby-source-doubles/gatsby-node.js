const faker = require('faker');
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const pIter = require('p-iteration');

const createRandomImage = async (sourceNodesArgs) => {
  const {
    actions: { createNode },
    cache,
    createNodeId,
    store,
  } = sourceNodesArgs;
  const fileNode = await createRemoteFileNode({
    createNode,
    createNodeId,
    store,
    cache,
    url: `https://picsum.photos/640/480/?image=${faker.random.number(1084)}`,
  });
  return fileNode.id;
};

const createDouble = async (schema, sourceNodesArgs) => {
  if (!schema) {
    return schema;
  } else if (typeof schema === 'string') {
    const [nameSpace, methodName] = schema.split('.');
    return faker[nameSpace][methodName]();
  } else if (Array.isArray(schema)) {
    return pIter.map(schema, s => createDouble(s, sourceNodesArgs));
  }

  const result = {};
  await pIter.forEach(Object.entries(schema), async ([fieldName, fieldType]) => {
    if (fieldType === 'image') {
      result[`${fieldName}___NODE`] = await createRandomImage(sourceNodesArgs);
    } else {
      result[fieldName] = await createDouble(fieldType, sourceNodesArgs);
    }
  });
  return result;
};

exports.sourceNodes = async (sourceNodesArgs, pluginOptions) => {
  const { actions: { createNode }, createContentDigest, createNodeId } = sourceNodesArgs;
  const { schema, count, type } = pluginOptions;
  await pIter.forEach(Array.from(Array(count).keys()), async () => {
    const double = await createDouble(schema, sourceNodesArgs);
    await createNode({
      ...double,
      id: createNodeId(faker.random.uuid()),
      parent: null,
      internal: {
        type,
        contentDigest: createContentDigest(double),
      },
    });
  });
};
