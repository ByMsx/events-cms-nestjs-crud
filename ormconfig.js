module.exports = {
  migrations: ['dist/migration/**/*.js'],
  entities: ['dist/**/entities/*.entity.js'],
  factories: ['dist/seeders/factories/*.factory.js'],
  seeds: ['dist/seeders/**/*.seed.js'],
  cli: {
    migrationsDir: 'src/migration',
  },
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  username: process.env.DB_USER ?? 'example',
  password: process.env.DB_PASSWORD ?? 'example',
  database: process.env.DB_NAME ?? 'example',
  autoLoadEntities: true,
  synchronize: true,
  logger: 'simple-console',
  logging: 'all',
};
