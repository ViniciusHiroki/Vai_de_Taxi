import { executarSelect, executarQuery } from '../config.js';

export async function finalizarCorrida(CorId, Tipo) {
    let selectCor = await executarSelect(`SELECT Mot.UsuId AS MotUsuId, Cor.MotId, MotQtdViagens, Cli.UsuId AS CliUsuId, Cor.CliId, CliQtdViagens FROM tblCorrida Cor LEFT JOIN tblCliente Cli ON Cli.CliId = Cor.CliId LEFT JOIN tblMotorista Mot ON Mot.MotId = Cor.MotId WHERE CorId = ${CorId} AND CorFinal IS NULL`)
    if(!selectCor.status){
        return {
            status: false,
            msg: 'Corrida inexistente ou já finalizada, verifique se o Id está correto!'
        }
    }

    //atualiza status de corrida
    if(Tipo == 'cancelado'){
        let updateCor = await executarQuery(`UPDATE tblCorrida SET CorFinal = DATETIME('now', 'localtime'), CorCancelada = 1 WHERE CorId = ${CorId}`)
        if(!updateCor.status){
            return updateCor
        }
    } else {
        let updateCor = await executarQuery(`UPDATE tblCorrida SET CorFinal = DATETIME('now', 'localtime') WHERE CorId = ${CorId}`)
        if(!updateCor.status){
            return updateCor
        }
    }

    //atualiza status dos usuários
    let updateCli = await executarQuery(`UPDATE tblUsuario SET UsuEmCorrida = 0 WHERE UsuId = ${selectCor.resultadoQuery[0].CliUsuId}`)
    if(!updateCli.status){
        return updateCli
    }
    let updateMot = await executarQuery(`UPDATE tblUsuario SET UsuEmCorrida = 0 WHERE UsuId = ${selectCor.resultadoQuery[0].MotUsuId}`)
    if(!updateMot.status){
        return updateMot
    }
    if(Tipo != 'cancelado'){
        let updateCli = await executarQuery(`UPDATE tblCliente SET CliQtdViagens = ${selectCor.resultadoQuery[0].CliQtdViagens + 1} WHERE UsuId = ${selectCor.resultadoQuery[0].CliId}`)
        if(!updateCli.status){
            return updateCli
        }
        let updateMot = await executarQuery(`UPDATE tblMotorista SET MotQtdViagens = ${selectCor.resultadoQuery[0].MotQtdViagens + 1} WHERE UsuId = ${selectCor.resultadoQuery[0].MotId}`)
        if(!updateMot.status){
            return updateMot
        }
    }

    return {
        status: true,
        msg: 'A corrida foi finalizada com sucesso!'
    }
}