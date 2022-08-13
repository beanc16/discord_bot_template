class CommandNode
{
    constructor({
        abbreviations = [],
        data,
    } = {})
    {
        this.abbreviations = abbreviations;     // To store other TrieNodes
        this.data = data;                       // To store data about a word
    }
}



module.exports = CommandNode;
