import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { uuidv7 } from 'uuidv7';
import { categories } from './schemas/categories.schema';
import { brands } from './schemas/brands.schema';
import { models } from './schemas/models.schema';
import { vehicles } from './schemas/vehicles.schema';
import * as schema from './schemas';
import { envs } from '../../env/env';

const pool = new Pool({
  host: envs.DATABASE_HOST,
  port: envs.DATABASE_PORT,
  user: envs.DATABASE_USER,
  password: envs.DATABASE_PASSWORD,
  database: envs.DATABASE_NAME,
});

const db = drizzle(pool, { schema });

async function seed() {
  console.log('Seeding database...');

  // Categories with UUIDv7
  const categoryNames = [
    'SUV',
    'Sedan',
    'Hatch',
    'Picape',
    'Crossover',
    'Minivan',
    'Esportivo',
    'Utilitario',
  ];
  const categoryMap = new Map<string, string>();

  const categoryData = categoryNames.map((name) => {
    const id = uuidv7();
    categoryMap.set(name, id);
    return { id, name, createdAt: new Date(), updatedAt: new Date() };
  });

  await db.insert(categories).values(categoryData);
  console.log(`Inserted ${categoryData.length} categories`);

  // Brands with UUIDv7
  const brandNames = [
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
    'Volkswagen',
    'Fiat',
    'Hyundai',
    'Renault',
    'Nissan',
    'Jeep',
  ];
  const brandMap = new Map<string, string>();

  const brandData = brandNames.map((name) => {
    const id = uuidv7();
    brandMap.set(name, id);
    return { id, name, createdAt: new Date(), updatedAt: new Date() };
  });

  await db.insert(brands).values(brandData);
  console.log(`Inserted ${brandData.length} brands`);

  // Models with UUIDv7 (referencing brand UUIDs)
  const modelDefs = [
    { name: 'Corolla', brand: 'Toyota' },
    { name: 'Hilux', brand: 'Toyota' },
    { name: 'RAV4', brand: 'Toyota' },
    { name: 'Civic', brand: 'Honda' },
    { name: 'HR-V', brand: 'Honda' },
    { name: 'Ranger', brand: 'Ford' },
    { name: 'EcoSport', brand: 'Ford' },
    { name: 'Onix', brand: 'Chevrolet' },
    { name: 'S10', brand: 'Chevrolet' },
    { name: 'Tracker', brand: 'Chevrolet' },
    { name: 'Golf', brand: 'Volkswagen' },
    { name: 'Amarok', brand: 'Volkswagen' },
    { name: 'T-Cross', brand: 'Volkswagen' },
    { name: 'Strada', brand: 'Fiat' },
    { name: 'Toro', brand: 'Fiat' },
    { name: 'Cronos', brand: 'Fiat' },
    { name: 'HB20', brand: 'Hyundai' },
    { name: 'Creta', brand: 'Hyundai' },
    { name: 'Kwid', brand: 'Renault' },
    { name: 'Duster', brand: 'Renault' },
  ];

  const modelMap = new Map<string, string>();

  const modelData = modelDefs.map((m) => {
    const id = uuidv7();
    modelMap.set(m.name, id);
    return {
      id,
      name: m.name,
      brandId: brandMap.get(m.brand)!,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  await db.insert(models).values(modelData);
  console.log(`Inserted ${modelData.length} models`);

  const vehicleDefs = [
    {
      plate: 'ABC1234',
      chassis: '9BWZZZ377VT004251',
      renavam: '12345678901',
      model: 'Corolla',
      category: 'Sedan',
      year: 2023,
    },
    {
      plate: 'ABC1235',
      chassis: '9BWZZZ377VT004252',
      renavam: '12345678902',
      model: 'Corolla',
      category: 'Sedan',
      year: 2022,
    },
    {
      plate: 'ABC1236',
      chassis: '9BWZZZ377VT004253',
      renavam: '12345678903',
      model: 'Hilux',
      category: 'Picape',
      year: 2023,
    },
    {
      plate: 'ABC1237',
      chassis: '9BWZZZ377VT004254',
      renavam: '12345678904',
      model: 'Hilux',
      category: 'Picape',
      year: 2021,
    },
    {
      plate: 'ABC1238',
      chassis: '9BWZZZ377VT004255',
      renavam: '12345678905',
      model: 'RAV4',
      category: 'SUV',
      year: 2023,
    },
    {
      plate: 'ABC1239',
      chassis: '9BWZZZ377VT004256',
      renavam: '12345678906',
      model: 'RAV4',
      category: 'Crossover',
      year: 2022,
    },
    {
      plate: 'ABC1240',
      chassis: '9BWZZZ377VT004257',
      renavam: '12345678907',
      model: 'Civic',
      category: 'Sedan',
      year: 2023,
    },
    {
      plate: 'ABC1241',
      chassis: '9BWZZZ377VT004258',
      renavam: '12345678908',
      model: 'Civic',
      category: 'Sedan',
      year: 2020,
    },
    {
      plate: 'ABC1242',
      chassis: '9BWZZZ377VT004259',
      renavam: '12345678909',
      model: 'HR-V',
      category: 'Crossover',
      year: 2023,
    },
    {
      plate: 'ABC1243',
      chassis: '9BWZZZ377VT004260',
      renavam: '12345678910',
      model: 'HR-V',
      category: 'SUV',
      year: 2021,
    },
    {
      plate: 'ABC1244',
      chassis: '9BWZZZ377VT004261',
      renavam: '12345678911',
      model: 'Ranger',
      category: 'Picape',
      year: 2023,
    },
    {
      plate: 'ABC1245',
      chassis: '9BWZZZ377VT004262',
      renavam: '12345678912',
      model: 'Ranger',
      category: 'Utilitario',
      year: 2022,
    },
    {
      plate: 'ABC1246',
      chassis: '9BWZZZ377VT004263',
      renavam: '12345678913',
      model: 'EcoSport',
      category: 'SUV',
      year: 2020,
    },
    {
      plate: 'ABC1247',
      chassis: '9BWZZZ377VT004264',
      renavam: '12345678914',
      model: 'Onix',
      category: 'Hatch',
      year: 2023,
    },
    {
      plate: 'ABC1248',
      chassis: '9BWZZZ377VT004265',
      renavam: '12345678915',
      model: 'Onix',
      category: 'Hatch',
      year: 2022,
    },
    {
      plate: 'ABC1249',
      chassis: '9BWZZZ377VT004266',
      renavam: '12345678916',
      model: 'S10',
      category: 'Picape',
      year: 2021,
    },
    {
      plate: 'ABC1250',
      chassis: '9BWZZZ377VT004267',
      renavam: '12345678917',
      model: 'S10',
      category: 'Utilitario',
      year: 2023,
    },
    {
      plate: 'ABC1251',
      chassis: '9BWZZZ377VT004268',
      renavam: '12345678918',
      model: 'Tracker',
      category: 'SUV',
      year: 2022,
    },
    {
      plate: 'ABC1252',
      chassis: '9BWZZZ377VT004269',
      renavam: '12345678919',
      model: 'Golf',
      category: 'Hatch',
      year: 2021,
    },
    {
      plate: 'ABC1253',
      chassis: '9BWZZZ377VT004270',
      renavam: '12345678920',
      model: 'Amarok',
      category: 'Picape',
      year: 2023,
    },
    {
      plate: 'ABC1254',
      chassis: '9BWZZZ377VT004271',
      renavam: '12345678921',
      model: 'Amarok',
      category: 'Utilitario',
      year: 2020,
    },
    {
      plate: 'ABC1255',
      chassis: '9BWZZZ377VT004272',
      renavam: '12345678922',
      model: 'T-Cross',
      category: 'Crossover',
      year: 2022,
    },
    {
      plate: 'ABC1256',
      chassis: '9BWZZZ377VT004273',
      renavam: '12345678923',
      model: 'Strada',
      category: 'Picape',
      year: 2023,
    },
    {
      plate: 'ABC1257',
      chassis: '9BWZZZ377VT004274',
      renavam: '12345678924',
      model: 'Strada',
      category: 'Picape',
      year: 2021,
    },
    {
      plate: 'ABC1258',
      chassis: '9BWZZZ377VT004275',
      renavam: '12345678925',
      model: 'Toro',
      category: 'Picape',
      year: 2022,
    },
    {
      plate: 'ABC1259',
      chassis: '9BWZZZ377VT004276',
      renavam: '12345678926',
      model: 'Cronos',
      category: 'Sedan',
      year: 2023,
    },
    {
      plate: 'ABC1260',
      chassis: '9BWZZZ377VT004277',
      renavam: '12345678927',
      model: 'Cronos',
      category: 'Sedan',
      year: 2021,
    },
    {
      plate: 'ABC1261',
      chassis: '9BWZZZ377VT004278',
      renavam: '12345678928',
      model: 'HB20',
      category: 'Hatch',
      year: 2022,
    },
    {
      plate: 'ABC1262',
      chassis: '9BWZZZ377VT004279',
      renavam: '12345678929',
      model: 'Creta',
      category: 'SUV',
      year: 2023,
    },
    {
      plate: 'ABC1263',
      chassis: '9BWZZZ377VT004280',
      renavam: '12345678930',
      model: 'Creta',
      category: 'Crossover',
      year: 2020,
    },
    {
      plate: 'ABC1264',
      chassis: '9BWZZZ377VT004281',
      renavam: '12345678931',
      model: 'Kwid',
      category: 'Hatch',
      year: 2023,
    },
    {
      plate: 'ABC1265',
      chassis: '9BWZZZ377VT004282',
      renavam: '12345678932',
      model: 'Kwid',
      category: 'Hatch',
      year: 2022,
    },
    {
      plate: 'ABC1266',
      chassis: '9BWZZZ377VT004283',
      renavam: '12345678933',
      model: 'Duster',
      category: 'SUV',
      year: 2021,
    },
    {
      plate: 'ABC1267',
      chassis: '9BWZZZ377VT004284',
      renavam: '12345678934',
      model: 'Corolla',
      category: 'Sedan',
      year: 2020,
    },
  ];

  const vehicleData = vehicleDefs.map((v) => ({
    id: uuidv7(),
    plate: v.plate,
    chassis: v.chassis,
    renavam: v.renavam,
    modelId: modelMap.get(v.model)!,
    categoryId: categoryMap.get(v.category)!,
    year: v.year,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await db.insert(vehicles).values(vehicleData);
  console.log(`Inserted ${vehicleData.length} vehicles`);

  console.log('Seeding completed!');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
