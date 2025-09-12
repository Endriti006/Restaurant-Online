const Syslog = require('../models/Syslog');

const createSyslog = async (userId, fullName, controllerName, action) => {
    try {
        const newLog = new Syslog({
            userId,
            fullName,
            controllerName,
            action,
        });

        await newLog.save();
        console.log('Syslog entry created successfully');
    } catch (error) {
        console.error('Failed to create syslog entry:', error);
    }
};

const getSyslogs = async (req, res) => {
    try {
        const syslogs = await Syslog.find();
        res.status(200).json(syslogs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch syslogs', error });
    }
};

module.exports = {
    createSyslog,
    getSyslogs,
};
