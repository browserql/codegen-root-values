import { readdir, stat } from 'fs/promises';
import { DocumentNode } from 'graphql';
import { join, relative } from 'path';

interface Schema {
  document: DocumentNode;
  arguments: {
    directory: string;
  };
}

async function findResolvers(dir: string) {
  console.log({dir})
  const files = await readdir(dir);
  const resolvers: string[] = [];

  await Promise.all(
    files.map(async (file) => {
      const source = join(dir, file);

      const link = await stat(source);

      if (link.isDirectory()) {
        resolvers.push(...(await findResolvers(source)));
      } else if (/\.ts$/.test(file)) {
        resolvers.push(source);
      }
    })
  );

  return resolvers;
}

function last(array: any[]) {
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

export async function handler({ arguments: args }: Schema) {
  const resolvers = await findResolvers(args.directory);

  return resolvers
    .map((resolver) => {
      const name = last(resolver.split('/'))?.replace(/\.ts$/, '');
      return `export { ${name} } from '${relative(process.cwd(), resolver.replace(/\.ts$/, ''))}'`;
    })
    .join('\n');
}
