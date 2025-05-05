const config = {
  env: {
    secret: process.env.AUTH_SECRET,
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    email: {
      host: process.env.EMAIL_HOST!,
      port: process.env.EMAIL_PORT!,
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      apiKey: process.env.CLOUDINARY_API_KEY!,
      apiSecret: process.env.CLOUDINARY_API_SECRET!,
    },
    resendToken: process.env.RESEND_TOKEN!,
  },
};

export default config;
