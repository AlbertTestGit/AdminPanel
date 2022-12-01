import { Plugin } from '../db.js';

class PluginController {
    async create(req, res) {
        const { name, developerKey, petrelVersion } = req.body;
        
        res.send(await Plugin.create({
            name,
            developerKey,
            petrelVersion
        }));
    }
}

export default new PluginController();
