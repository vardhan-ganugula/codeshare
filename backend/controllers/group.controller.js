const groupModel = require('../models/group.model.js');
const textModel = require('../models/Text.js');

// Create and Save a new group
const handleCreateGroup = async (req, res) => {
    const {name, description, groupCode, textCodes} = req.body;
    // Validate request
    if (!name || !groupCode || !textCodes || textCodes.length === 0) {

        return res.status(400).send({
            status: 'error',
            message: "group contents can not be empty"
        });
    }
    // Create a group 
    console.log(groupCode)
    const validGroupCodes = textCodes.every(code => code.length === 4);
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

// search group by name and description and id 

const handleSearchGroup = async (req, res) => {
    const {search} = req.query;
    if (!search) {
        return res.status(400).send({
            status: 'error',
            message: "search query can not be empty"
        });
    }

    try {
        const pipeline = [
            {
                $match : {
                    $or: [
                        {name: {$regex: search, $options: 'i'}},
                        {description: {$regex: search, $options: 'i'}},
                        {groupCode: {$regex: search, $options: 'i'}}
                    ]
                }
            }
        ]
        const results = await groupModel.aggregate(pipeline);
        for(const group of results) {
            const textTitles = [];
            for(const textCode of group.textCodes) {
                const text = await textModel.findOne({textCode: textCode});
                if(text) {
                    textTitles.push(text.textName);
                }else{
                    textTitles.push("No title");
                }
            } 
            group.textTitles = textTitles;
        }
        return res.status(200).json({
            status: 'success',
            groups: results
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || "Some error occurred while searching the group."
        });
        
    }

    return res.status(200).json({
        status: 'error',
        message: "something went wrong"
    });

}

module.exports = {handleCreateGroup, handleAddTextToGroup, handleSearchGroup}