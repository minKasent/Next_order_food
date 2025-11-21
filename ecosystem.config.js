module.exports = {
  apps: [
    {
      name: 'next-order-food-web',
      cwd: '/home/prod/Next_Pro/Next_order_food',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        PORT: '3000'
      }
    }
  ]
}
