import pkg from 'pg';
const { Client } = pkg;
const cliente = new Client({
    user : "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "MTeamsParaguai"
})

// Conectar ao PostgreSQL
cliente.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao PostgreSQL', err.stack);
    } else {
        console.log('Conectado ao PostgreSQL');
    }
});

export { cliente };