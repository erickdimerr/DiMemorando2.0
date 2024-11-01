const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'work.0102',
    database: 'projeto_documentos'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.code);
        console.error('Detalhes do erro:', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

// Rota para obter o último documento
app.get('/ultimo-documento', async (req, res) => {
    try {
        const query = 'SELECT documento_numero, documento_tipo, usuario_email FROM usuarios_documentos ORDER BY data_insercao DESC LIMIT 1';
        db.query(query, (error, results) => {
            if (error) {
                console.error('Erro ao buscar o último documento:', error);
                return res.status(500).json({ error: 'Erro ao buscar o documento' });
            }
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Nenhum documento encontrado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o documento' });
    }
});

// Inicie o servidor escutando em todas as interfaces de rede
app.listen(3000, '0.0.0.0', function () {
    console.log('Listening to port:  ' + 3000);
});

app.post('/cadastro', (req, res) => {
    const { nome, sobrenome, setor, email, senha } = req.body;
    const checkEmailQuery = 'SELECT * FROM usuarios WHERE email = ?';

    // Verifique se o e-mail já existe
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            // Se o e-mail já existir, retorne uma resposta adequada
            res.status(400).send('E-mail já cadastrado');
        } else {
            const insertQuery = 'INSERT INTO usuarios (nome, sobrenome, setor, email, senha) VALUES (?, ?, ?, ?, ?)';
            // Se o e-mail não existir, insira o novo usuário
            db.query(insertQuery, [nome, sobrenome, setor, email, senha], (err, result) => {
                if (err) throw err;
                res.send('Usuário cadastrado com sucesso');
            });
        }
    });
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

    // Execute a consulta SQL
    db.query(query, [email, senha], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            // Retorne também o nome e sobrenome do usuário
            res.json({
                message: 'Login bem-sucedido',
                nome: results[0].nome,
                sobrenome: results[0].sobrenome,
                setor: results[0].setor
            });
        } else {
            res.status(401).send('Email ou senha inválidos');
        }
    });
});

app.get('/getMemorando', (req, res) => {
    db.query('SELECT memorando FROM documentos', (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.get('/getMemorandoCircular', (req, res) => {
    db.query('SELECT memorandoCircular FROM documentos', (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.get('/getOficio', (req, res) => {
    db.query('SELECT oficio FROM documentos', (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.get('/getOficioCircular', (req, res) => {
    db.query('SELECT oficioCircular FROM documentos', (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.get('/getAtestado', (req, res) => {
    db.query('SELECT atestado FROM documentos', (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.get('/getdeclaracao', (req, res) => {
    db.query('SELECT declaracao FROM documentos', (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.post('/adquirirMemorando', (req, res) => { 
    // Incrementa o valor do memorando
    let sql = 'UPDATE documentos SET memorando = memorando + 1'; 
    db.query(sql, (err, result) => {
        if (err) throw err;

        // Verifica se a atualização foi bem-sucedida
        db.query('SELECT memorando FROM documentos', (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                // Retorna o valor atualizado do memorando
                res.json({ memorando: results[0].memorando });
            } else {
                // Se não houver resultados, insere um novo registro
                db.query('INSERT INTO documentos (memorando) VALUES (1)', (err, result) => { 
                    if (err) throw err;
                    res.json({ memorando: 1 });
                });
            }
        });
    });
});


app.post('/adquirirMemorandoCircular', (req, res) => {
    let sql = 'UPDATE documentos SET memorandoCircular = memorandoCircular + 1';
    db.query(sql, (err, result) => {
        if (err) throw err;
        db.query('SELECT memorandoCircular FROM documentos', (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                db.query('INSERT INTO documentos (memorandoCircular) VALUES (1)', (err, result) => {
                    if (err) throw err;
                    res.json({ memorandoCircular: 1 });
                });
            }
        });
    });
});

app.post('/adquirirOficio', (req, res) => {
    let sql = 'UPDATE documentos SET oficio = oficio + 1';
    db.query(sql, (err, result) => {
        if (err) throw err;
        db.query('SELECT oficio FROM documentos', (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                db.query('INSERT INTO documentos (oficio) VALUES (1)', (err, result) => {
                    if (err) throw err;
                    res.json({ oficio: 1 });
                });
            }
        });
    });
});

app.post('/adquirirOficioCircular', (req, res) => {
    let sql = 'UPDATE documentos SET oficioCircular = oficioCircular + 1';
    db.query(sql, (err, result) => {
        if (err) throw err;
        db.query('SELECT oficioCircular FROM documentos', (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                db.query('INSERT INTO documentos (oficioCircular) VALUES (1)', (err, result) => {
                    if (err) throw err;
                    res.json({ oficioCircular: 1 });
                });
            }
        });
    });
});

app.post('/adquiriratestado', (req, res) => {
    let sql = 'UPDATE documentos SET atestado = atestado + 1';
    db.query(sql, (err, result) => {
        if (err) throw err;
        db.query('SELECT atestado FROM documentos', (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                db.query('INSERT INTO documentos (atestado) VALUES (1)', (err, result) => {
                    if (err) throw err;
                    res.json({ atestado: 1 });
                });
            }
        });
    });
});

app.post('/adquirirdeclaracao', (req, res) => {
    let sql = 'UPDATE documentos SET declaracao = declaracao + 1';
    db.query(sql, (err, result) => {
        if (err) throw err;
        db.query('SELECT declaracao FROM documentos', (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                db.query('INSERT INTO documentos (declaracao) VALUES (1)', (err, result) => {
                    if (err) throw err;
                    res.json({ declaracao: 1 });
                });
            }
        });
    });
});

app.get('/getUsers', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/storeDocumentoUsuario', (req, res) => {
    const { email, documentoTipo, documentoNumero } = req.body;
    const query = 'INSERT INTO usuarios_documentos (usuario_email, documento_tipo, documento_numero) VALUES (?, ?, ?)';
    db.query(query, [email, documentoTipo, documentoNumero], (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados no banco de dados:', err);
        res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
        return;
      }
    });
});

app.get('/usuarios', (req, res) => {
    const query = 'SELECT usuario_email, documento_tipo, documento_numero FROM usuarios_documentos ORDER BY data_insercao DESC LIMIT 5';
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
        return;
      }
      res.json(results);
    });
});

app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));