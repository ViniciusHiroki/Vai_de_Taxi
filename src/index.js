import { iniciarCorrida } from './modulos/iniciarCorrida.js';
import { finalizarCorrida } from './modulos/finalizarCorrida.js';

import express from 'express'

const app = express();
const port = 3000;

app.use(express.json());

app.post('/iniciarCorrida', async (req, res) => {
    try{
        if (req.body) {
            if(req.body.CliId != undefined || req.body.MotId != undefined || req.body.CorOrigem != undefined || req.body.CorDestino != undefined){
                let corrida = await iniciarCorrida(req.body.CliId, req.body.MotId, req.body.CorOrigem, req.body.CorDestino)
                res.send(corrida)
            } else {
                res.send({
                    status: false,
                    msg: 'Preencha corretamente os campos!'
                })
            }
        } else {
            res.send({
                status: false,
                msg: "Ocorreu um erro inesperado!"
            })
        }
    } catch (error){
        res.send({
            status: false,
            msg: `Erro interno: ${error.message}`
        })
    }
});

app.post('/finalizarCorrida', async (req, res) => {
    try{
        if (req.body) {
            if(req.body.CorId != undefined || req.body.Tipo != undefined){
                if(req.body.Tipo != 'cancelado' && req.body.Tipo != 'concluido'){
                    res.send({
                        status: false,
                        msg: 'Preencha corretamente o campo Tipo com "concluido" ou "cancelado"!'
                    })
                }
                let corrida = await finalizarCorrida(req.body.CorId, req.body.Tipo)
                res.send(corrida)
            } else {
                res.send({
                    status: false,
                    msg: 'Preencha corretamente os campos!'
                })
            }
        } else {
            res.send({
                status: false,
                msg: "Ocorreu um erro inesperado!"
            })
        }
    } catch (error){
        res.send({
            status: false,
            msg: `Erro interno: ${error.message}`
        })
    }
});

app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});