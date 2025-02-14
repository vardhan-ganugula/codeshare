const textModel = require('../models/Text')

async function handleGetCode(req, res){
    const textCode = req.query?.code
    if(!textCode){
        return res.json({
            status : 'error',
            msg : 'text code is required'
        })
    }

    
    try{
        const record = await textModel.findOne({textCode})
        if(record){
            return res.json({
                status : 'success',
                data : {textCode : record.textCode, textInfo : record.textInfo, createdAt : record.createdAt}
            })
        }
    }catch(er){
        console.log(er);
        
        return res.json({
            status : 'failed',
            msg : JSON.stringify(er)
        })
    }
    return res.json({
        status : 'failed',
        msg : 'invalid code try another code'
    })
    
}

async function handlePutText(req, res) {
    const {textCode, textInfo, textName} = req.body;
    const shouldUpdate = req.body.shouldUpdate || false;
    if(!textCode || !textInfo || !textName){
        return res.json({
            status : 'error',
            msg : 'insufficient data'
        })
    }
    if((String(textCode).length != 4) || isNaN(textCode)){
        return res.json({
            status : 'error',
            msg : 'not a valid text code'
        })
    } 
    try {
        const response = await textModel.create({
            textCode : String(textCode),
            textInfo,
            textName,
            shouldUpdate
        })
        // console.log(response)
        res.json({
            status : 'success',
            msg : 'record added successfully',
            data : response
        })
    } catch (error) {
        return res.json({
            status: 'error',
            msg : 'error while saving the text, try another code'
        })
    }
}

async function handleUpdateText(req, res){
    const {textCode, textInfo} = req.body;
    if(!textCode || !textInfo){
        return res.json({
            status : 'error',
            msg : 'insufficient data'
        })
    }
    if((String(textCode).length != 4) || isNaN(textCode)){
        return res.json({
            status : 'error',
            msg : 'not a valid text code'
        })
    }
    try{

        const record = await textModel.findOne({textCode})
        if(!record){
            return res.json({
                status : 'error',
                msg : 'not a valid text code'
            })
        }
    }
    catch(e){
        return res.json({
            status : 'error',
            msg : e.toString()
        })
    }
    try{
        const result = await textModel.findOneAndUpdate({textCode}, {textInfo})
        if(result){
            return res.json({
                status : 'success',
                msg : 'successfully updated'
            })
        }
    }catch(e){
        return res.json({
            status : 'error',
            msg : e.toString()
        })
    }

}
module.exports = {
    handleGetCode,handlePutText,handleUpdateText
}