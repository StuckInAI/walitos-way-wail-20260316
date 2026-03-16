import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Item } from '../entities/Item';
import path from 'path';

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.resolve('./data/curated.sqlite');

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    entities: [Item],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();
  await seedIfEmpty(dataSource);
  return dataSource;
}

async function seedIfEmpty(ds: DataSource) {
  const repo = ds.getRepository(Item);
  const count = await repo.count();
  if (count > 0) return;

  const { seedData } = await import('./seed');
  await repo.save(seedData);
  console.log('Database seeded with example items.');
}
