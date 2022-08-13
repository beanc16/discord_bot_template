class CommandNode
{
    constructor({
        abbreviations = [],
        data,
    } = {})
    {
        this.abbreviations = abbreviations;
        this.data = data;
    }
}



module.exports = CommandNode;
