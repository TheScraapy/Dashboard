module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'dashboard',
        user: process.env.DB_USER || 'dashboard',
        password: process.env.DB_PASS || 'dashboard',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './dashboard.sqlite'
        }
    }
}
