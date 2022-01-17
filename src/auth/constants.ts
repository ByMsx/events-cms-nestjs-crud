export const jwtSettings = {
  // REVIEW: только из env. Здесь никакого хардкода не должно быть
  secret: process.env.JWT_SECRET ?? 'supersecret',
};
