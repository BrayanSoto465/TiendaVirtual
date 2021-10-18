var Config = require('../models/config');

const configController = {};


configController.obtener_config = async(req, res) => {

    if (req.user) {
        if (req.user.role == 'administrador') {

            let reg = await Config.findById({_id:"6151a7a74037f9b72147ca87"});
            res.status(200).send({data:reg});
              
        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}


configController.actualizar_config = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {

            let data = req.body;

            if(res.files){

                var img_path = req.files.logo.path;
                var name = img_path.split('/');
                var portada_name = name[2];

                let reg = await Config.findByIdAndUpdate({_id:"6151a7a74037f9b72147ca87"},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie:data.serie,
                    logo: logo_name,
                    correlativo: data.correlativo, 
                });

                fs.stat('uploads/configuraciones/' + reg.logo, function(err) {
                    if (!err) {
                        fs.unlink('uploads/configuraciones/' + reg.logo, (err) => {
                            if (err) throw err;
                        });
                    }
                })
                res.status(200).send({data:reg});
            }else{
                let reg = await Config.findByIdAndUpdate({_id:"6151a7a74037f9b72147ca87"},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie:data.serie,
                    correlativo: data.correlativo, 
                });
                res.status(200).send({data:reg});
            }

            

                      
        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

module.exports = configController;