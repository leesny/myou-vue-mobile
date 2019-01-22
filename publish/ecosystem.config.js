module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   * 多个服务，依次放到apps对应的数组里
   */
  apps: [
    // First application
    {
      name: 'myou-vue-mobile',
      script: './server.js',
      out_file: "./logs/myou-vue-mobile_out.log",
      error_file: "./logs/myou-vue-mobile_error.log",
      exec_mode: "cluster",
      instances: 2,
      max_memory_restart: "1024M",
      max_restarts: "2",
      env_production: {
        "PORT": 6666,
        "NODE_ENV": 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    dev: {
      user: 'node',
      host: '127.0.0.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};
