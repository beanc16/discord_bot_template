/*
 * What is a Trie?
 * A type of search tree used to store strings of words.
 */

class Trie
{	
	constructor()
	{
		this._root = new TrieNode();
		this._commands = [];
		this._abbreviations = [];
	}
	
	
	
	/*
	 * GETTERS
	 */
	
	getData(str)
	{
		let curLetter;
		let curNode = this._root;
		
		// Loop over str one letter at a time
		for (let i = 0; i < str.length; i++)
        {
            curLetter = str[i];
			
			// There IS NOT a child with that letter
            if (curNode.children[curLetter] == null)
			{
                return null;
			}
			
			// There IS a child with that letter
            curNode = curNode.children[curLetter];
        }
		
		// The final letter marked the end of a word
		if (curNode != null && curNode.isEndOfWord)
		{
			return curNode.data;
		}
	}
	
	getCommands()
	{
		return this._commands;
	}
	
	getAbbreviations()
	{
		return this._abbreviations;
	}
	
	
	
	/*
	 * INSERTING
	 */
	
	addData(str, data)
	{
		let curLetter;
		let curNode = this._root;
		
		for (let i = 0; i < str.length; i++)
		{
            curLetter = str[i];
			
			// Create a node if there are no children with that letter
            if (curNode.children[curLetter] == null)
			{
				curNode.children[curLetter] = new TrieNode();
			}
			
			// Crawl to the next letter in the tree
            curNode = curNode.children[curLetter]; 
		}
		
		// Mark last node as the end of a word with data
		curNode.isEndOfWord = true;
		curNode.data = data;
	}
	
	addCommand(str, data)
	{
		this.addData(str, data);
		this._commands.push(str);
	}
	
	addAbbreviation(str, data)
	{
		this.addData(str, data);
		this._abbreviations.push(str);
	}
	
	
	
	/*
	 * BOOLEAN
	 */
	
	hasWord(str)
	{
		let curLetter;
		let curNode = this._root;
		
		for (let i = 0; i < str.length; i++)
        {
            curLetter = str[i];
			
			// There are currently no children with that letter
            if (curNode.children[curLetter] == null)
			{
                return false;
			}
			
            curNode = curNode.children[curLetter];
        }
		
		// The final word was a leaf node
        return (curNode != null && curNode.isEndOfWord);
	}
}



class TrieNode
{
	constructor()
	{
		this.children = [];				// To store other TrieNodes
		this.isEndOfWord = false;		// To mark the end of a word
		this.data = null;				// To store data about a word
	}
}



module.exports = Trie;