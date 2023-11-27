import { executarSelect, executarQuery } from '../config.js';

export async function iniciarCorrida(CliId, MotId, CorOrigem, CorDestino) {
    let selectCli = await executarSelect(`SELECT * FROM tblCliente Cli LEFT JOIN tblUsuario Usu ON Usu.UsuId = Cli.UsuId WHERE CliId = ${CliId}`)
    if(!selectCli.status){
        return selectCli
    }
    let selectMot = await executarSelect(`SELECT * FROM tblMotorista Mot LEFT JOIN tblUsuario Usu ON Usu.UsuId = Mot.UsuId WHERE MotId = ${MotId}`)
    if(!selectMot.status){
        return selectMot
    }

    //verificar duplicidade de usuário
    if(selectCli.resultadoQuery[0].UsuId == selectMot.resultadoQuery[0].UsuId){
        return{
            status: false,
            msg: `Cliente e motorista são o mesmo usuário, não é possível realizar a corrida!`
        }
    }

    //verificar se já está em corrida
    if(selectCli.resultadoQuery[0].UsuEmCorrida != 0){
        return{
            status: false,
            msg: `Cliente já está em uma corrida no momento`
        }
    }
    if(selectMot.resultadoQuery[0].UsuEmCorrida != 0){
        return{
            status: false,
            msg: `Motorista já está em uma corrida no momento`
        }
    }

    //atualiza status de corrida
    let updateCli = await executarQuery(`UPDATE tblUsuario SET UsuEmCorrida = 1 WHERE UsuId = ${selectCli.resultadoQuery[0].UsuId}`)
    if(!updateCli.status){
        return updateCli
    }
    let updateMot = await executarQuery(`UPDATE tblUsuario SET UsuEmCorrida = 2 WHERE UsuId = ${selectMot.resultadoQuery[0].UsuId}`)
    if(!updateMot.status){
        return updateMot
    }

    //cria uma corrida
    let corrida = await executarQuery(`INSERT INTO tblCorrida(CliId, MotId, CorInicio, CorOrigem, CorDestino) VALUES(${selectCli.resultadoQuery[0].CliId}, ${selectMot.resultadoQuery[0].MotId}, DATETIME('now', 'localtime') , '${CorOrigem}', '${CorDestino}')`)
    if(!corrida.status){
        return corrida
    }

    //select ultimo Id inserido
    let ultimoId = await executarSelect('SELECT * FROM tblCorrida ORDER BY CorId DESC LIMIT 1')
    if(!ultimoId.status){
        return ultimoId
    }

    return {
        status: true,
        msg: 'A corrida está em andamento',
        info: {
            CorId: ultimoId.resultadoQuery[0].CorId,
            dadosCliente: {
                Nome: selectCli.resultadoQuery[0].UsuNome,
                Idade: selectCli.resultadoQuery[0].UsuIdade,
                CPF: selectCli.resultadoQuery[0].UsuCpf
            },
            dadosMotorista: {
                Nome: selectMot.resultadoQuery[0].UsuNome,
                Idade: selectMot.resultadoQuery[0].UsuIdade,
                CPF: selectMot.resultadoQuery[0].UsuCpf
            }
        }
    }
}