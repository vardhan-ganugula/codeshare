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
                data : {textCode : record.textCode, textInfo : record.textInfo, createdAt : record.createdAt, shouldUpdate : record.shouldUpdate},
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
    const {textCode, textInfo, textName, expiryDate} = req.body;
    const shouldUpdate = req.body.shouldUpdate || false;
    if(!textCode || !textInfo || !textName || !expiryDate){
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
    if(new Date(expiryDate).getTime() < Date.now()){
        return res.json({
            status : 'error',
            msg : 'expiry date must be greater than today'   
        })
    }
    try {
        const response = await textModel.create({
            textCode : String(textCode),
            textInfo,
            textName,
            shouldUpdate,
            expiryDate
        })

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
        const result = await textModel.findOneAndUpdate({textCode, shouldUpdate: true}, {textInfo})
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

async function handleSearch(req, res){
    const {value} = req.query;
    if(!value){
        return res.json({
            status : 'error',
            msg : 'search value is required'
        })
    }
    const pileLine = [
        {
            $match : {
                $or : [
                    {
                        "textName" : {$regex : value,
                            $options : 'i'
                        }
                    },
                    {
                        "textInfo" : {$regex : value, $options: 'i'}
                    },
                    {
                        "textName" : {$regex : value, $options: 'i'}
                    }
                    
                ]   
            },
        },
        {
            $project : {
                "textName" : 1,
                "textInfo" : 1,
                "textCode" : 1,
                "shouldUpdate" : 1
            }
        }
    ]

    try {
        const record = await textModel.aggregate(pileLine)
        return res.json({
            status : 'success',
            data : record,
            msg : 'search completed',}).status(200)

    } catch (error) {
        console.log("Search record : " + error)
        return res.json({
            status : 'error',
            msg : error.toString()
        }).status(500)
    }

    return res.json({
        status : 'error',
        msg : 'error while searching'
    }).status(500)

}



module.exports = {
    handleGetCode,handlePutText,handleUpdateText,handleSearch
}