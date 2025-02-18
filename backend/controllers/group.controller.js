const groupModel = require('../models/group.model.js');


// Create and Save a new group
const handleCreateGroup = async (req, res) => {
    console.log('create group called')
    const {name, description, groupCode, textCodes} = req.body;
    // Validate request
    if (!name || !groupCode || !textCodes || textCodes.length === 0) {

        return res.status(400).send({
            status: 'error',
            message: "group contents can not be empty"
        });
    }
    // Create a group
    const validGroupCodes = textCodes.every(code => typeof code === 'number');
    if (!validGroupCodes) {
        return res.status(400).json({
            status: 'error',
            message: "groupCodes must be an array of numbers"
        });
    }


    try {
        const group = await groupModel.create({name, description, groupCode, textCodes});

        return res.status(201).json({
            status: 'success',
            data: group
        });
    } catch (error) {
        console.log('group creation error : ', error)
        return res.status(500).json({
            status: 'error',
            message: error.message || "Some error occurred while creating the group."
        });
        
    }
}


// add textCode to a group 
const handleAddTextToGroup = async (req, res) => {
    const {groupCode, textCode} = req.body;
    if (!groupCode || !textCode) {
        return res.status(400).send({
            message: "groupCode and textCode can not be empty"
        });
    }
    try {
        const group = await groupModel.findOne({groupCode});
        if (!group) {
            return res.status(404).send({
                message: "group not found"
            });
        }
        if(group.textCodes.includes(textCode)) {
            return res.status(400).send({
                message: "textCode already exists in the group"
            });
        }
        group.textCodes.push(textCode);
        await group.save();
        return res.status(200).json(group);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Some error occurred while adding text to the group."
        });
    }
}



module.exports = {handleCreateGroup, handleAddTextToGroup}