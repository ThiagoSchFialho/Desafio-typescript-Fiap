"use strict";
// npm i --save-dev @types/express
// Instale essa dependência para usar o express com typescript
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm install @supabase/supabase-js
// Instale essa dependência caso seu DB esteja na Supabase
// Cross-Origin Resource Sharing
// npm install cors
// npm install --save-dev @types/cors
var supabase_js_1 = require("@supabase/supabase-js");
var express_1 = require("express");
var cors_1 = require("cors");
var env = require('./env.js');
var supabaseUrl = env.supabase;
var supabaseKey = env.supabaseKey;
var supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
var app = (0, express_1.default)();
app.use(express_1.default.json()); // Adiciona o middleware para fazer o parsing do corpo da requisição como JSON
app.use((0, cors_1.default)());
// Rota de teste
app.get('/', function (req, res) {
    res.send('API de gerenciamento de biblioteca');
});
// ==============================================================
// ========================= GET Livros =========================
// ==============================================================
function getLivros() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, livros, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase.from('livros').select('*')];
                case 1:
                    _a = _b.sent(), livros = _a.data, error = _a.error;
                    if (error) {
                        console.error('Erro ao buscar livros:', error.message);
                        return [2 /*return*/, []];
                    }
                    return [2 /*return*/, livros];
            }
        });
    });
}
app.get('/livros', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var livros, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getLivros()];
            case 1:
                livros = _a.sent();
                if ('error' in livros) {
                    res.status(500).json({ error: livros.error });
                }
                else {
                    console.log('Livros:', livros);
                    res.json(livros);
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Erro ao buscar livros:', error_1.message);
                res.status(500).json({ error: 'Erro ao buscar livros' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ==============================================================
// ========================= GET Livro ==========================
// ==============================================================
function getLivro(id) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, livro, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase.from('livros').select('*').eq('id', id)];
                case 1:
                    _a = _b.sent(), livro = _a.data, error = _a.error;
                    if (error) {
                        console.error('Erro ao buscar livro:', error.message);
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, livro];
            }
        });
    });
}
app.get('/livros/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var livroID, livro, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                livroID = req.params.id;
                return [4 /*yield*/, getLivro(Number(livroID))];
            case 1:
                livro = _a.sent();
                if (!livro) {
                    throw new Error("Livro não encontrado");
                }
                else if ('error' in livro) {
                    res.status(500).json({ error: livro.error });
                }
                else {
                    console.log('Livro:', livro);
                    res.json(livro);
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Erro ao buscar livro:', error_2.message);
                res.status(500).json({ error: 'Erro ao buscar livro' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ==============================================================
// ========================= POST Livro =========================
// ==============================================================
function postLivro(titulo, autor, isbn, ano_publicacao) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, livros, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase.from('livros').insert([
                        { titulo: titulo, autor: autor, isbn: isbn, ano_publicacao: ano_publicacao }
                    ]).select()];
                case 1:
                    _a = _b.sent(), livros = _a.data, error = _a.error;
                    if (error) {
                        console.error('Erro ao adicionar livro:', error.message);
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
app.post('/livros', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, titulo, autor, isbn, ano_publicacao, livroCriado, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, titulo = _a.titulo, autor = _a.autor, isbn = _a.isbn, ano_publicacao = _a.ano_publicacao;
                if (!titulo || !autor || !isbn || !ano_publicacao) {
                    return [2 /*return*/, res.status(400).json({ error: "Todos os campos são obrigatórios." })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, postLivro(titulo, autor, isbn, ano_publicacao)];
            case 2:
                livroCriado = _b.sent();
                if (livroCriado) {
                    res.status(201).send('Livro criado com sucesso');
                }
                else {
                    res.status(500).send('Erro ao criar livro');
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.error('Erro ao criar livro:', error_3.message);
                res.status(500).json({ error: 'Erro ao criar livro' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// ==============================================================
// ========================= PUT Livro ==========================
// ==============================================================
function putLivro(id, titulo, autor, isbn, ano_publicacao) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, livro, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase
                        .from('livros')
                        .update({ titulo: titulo, autor: autor, isbn: isbn, ano_publicacao: ano_publicacao })
                        .eq('id', id)
                        .select()];
                case 1:
                    _a = _b.sent(), livro = _a.data, error = _a.error;
                    if (error) {
                        console.error('Erro ao atualizar livro:', error.message);
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
app.put('/livros/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, titulo, autor, isbn, ano_publicacao, livroID;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, titulo = _a.titulo, autor = _a.autor, isbn = _a.isbn, ano_publicacao = _a.ano_publicacao;
                livroID = req.params.id;
                if (!titulo || !autor || !isbn || !ano_publicacao) {
                    return [2 /*return*/, res.status(400).json({ error: "Todos os campos são obrigatórios." })];
                }
                return [4 /*yield*/, putLivro(Number(livroID), titulo, autor, isbn, ano_publicacao)];
            case 1:
                _b.sent();
                res.status(201).send("Livro com ID ".concat(livroID, " atualizado com sucesso"));
                return [2 /*return*/];
        }
    });
}); });
// ==============================================================
// ======================== DELETE Livro ========================
// ==============================================================
function deleteLivro(id) {
    return __awaiter(this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supabase.from('livros').delete().eq('id', id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error('Erro ao remover livro:', error.message);
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
app.delete('/livros/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var livroID;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                livroID = req.params.id;
                return [4 /*yield*/, deleteLivro(Number(livroID))];
            case 1:
                _a.sent();
                res.status(201).send("Livro com ID ".concat(livroID, " exclu\u00EDdo com sucesso"));
                return [2 /*return*/];
        }
    });
}); });
// =========================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Servidor rodando na porta ".concat(PORT));
});
// Para rodar o servidor
// npm start
