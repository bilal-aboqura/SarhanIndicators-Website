module.exports = {
  apps: [
    {
      name: 'sarhan-api',
      script: './server/server.js',
      cwd: '/var/www/sarhanindicators',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      error_file: '/var/log/pm2/sarhan-api-error.log',
      out_file: '/var/log/pm2/sarhan-api-out.log',
      log_file: '/var/log/pm2/sarhan-api-combined.log',
      time: true,
    },
  ],
};
