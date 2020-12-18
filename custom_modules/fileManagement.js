const fs = require("fs");



/*********
 * FILES *
 *********/

/**
 * readFileAsync
 * Summary. Read a file asynchronously.
 * @param {String}   fileName
 * @param {String}   encodingType
 * @param {function} callback
 */
exports.readFileAsync = function (fileName, encodingType, callback)
{
    if (encodingType == null)
    {
        encodingType = "utf8";
    }

    // Read a file (asynchronous)
    fs.readFile(fileName, encodingType, function(err, data)
    {
        if (err) throw err;

        if (callback != null)
        {
            callback(data);
        }
    });
};

/**
 * readFileSync
 * Summary. Read a file synchronously.
 * @param {String}   fileName
 * @param {String}   encodingType
 * @param {function} callback
 * @return {*}
 */
exports.readFileSync = function (fileName, encodingType, callback)
{
    if (encodingType == null)
    {
        encodingType = "utf8";
    }

    // Read a file (synchronous)
    let content = fs.readFileSync(fileName, encodingType);

    // Return the contents of the given file if there's no callback
    if (callback == null)
    {
        return content;
    }

    // Run the callback with the content of the file as a parameter
    else
    {
        callback(content);
    }
};

/**
 * createFile
 * Summary. Create/Open a file.
 * @param {String}   fileName
 * @param {String}   flag
 * @param {function} callback
 */
exports.createFile = function (fileName, flag, callback)
{
    exports.openFile(fileName, flag, callback);
};

/**
 * openFile
 * Summary. Create/Open a file.
 * @param {String}   fileName
 * @param {String}   flag
 * @param {function} callback
 */
exports.openFile = function (fileName, flag, callback)
{
    /*
     * Different flag values:
     * 'a' - Open file for appending. The file is created if it does
     *       not exist.
     * 'ax' - Like 'a' but fails if the path exists.
     * 'a+' - Open file for reading and appending. The file is created
     *        if it does not exist.
     * 'ax+' - Like 'a+' but fails if the path exists.
     * 'as' - Open file for appending in synchronous mode. The file is
     *        created if it does not exist.
     * 'as+' - Open file for reading and appending in synchronous mode.
     *         The file is created if it does not exist.
     * 'r' - Open file for reading. An exception occurs if the file
     *       does not exist.
     * 'r+' - Open file for reading and writing. An exception occurs
     *        if the file does not exist.
     * 'rs+' - Open file for reading and writing in synchronous mode.
     *         Instructs the operating system to bypass the local file
     *         system cache. This is primarily useful for opening files
     *         on NFS mounts as it allows skipping the potentially 
	 * 		   stale local cache. It has a very real impact on I/O 
	 * 		   performance so using this flag is not recommended 
	 * 		   unless it is needed. This doesn't turn fs.open() or 
	 * 		   fsPromises.open() into a synchronous blocking call. 
	 * 		   If synchronous operation is desired, something like 
	 * 		   fs.openSync() should be used.
     * 'w' - Open file for writing. The file is created (if it does not
     *       exist) or truncated (if it exists).
     * 'wx' - Like 'w' but fails if the path exists.
     * 'w+' - Open file for reading and writing. The file is created
     *        (if it does not exist) or truncated (if it exists).
     * 'wx+' - Like 'w+' but fails if the path exists.
     */

    // Create/Open a files
    fs.open(fileName, flag, function (err, file)
    {
        if (err) throw err;
		
        if (callback != null)
        {
            callback(file);
        }
    });
};

/**
 * writeFile
 * Summary. Write/Overwrite a file.
 * @param {String}   fileName
 * @param            content
 * @param {function} callback
 */
exports.writeFile = function (fileName, content, callback)
{
    // Write/Overwrite a files
    fs.writeFile(fileName, content, function (err)
    {
        if (err) throw err;

        if (callback != null)
        {
            callback();
        }
    });
};

/**
 * appendFile
 * Summary. Append to a file.
 * @param {String}   fileName
 * @param {String}   content
 * @param {function} callback
 */
exports.appendFile = function (fileName, content, callback)
{
    // Append to a file
    fs.appendFile(fileName, content, function (err)
    {
        if (err) throw err;

        if (callback != null)
        {
            callback();
        }
    });
};

/**
 * renameFile
 * Summary. Rename a file.
 * @param {String}   oldFileName
 * @param {String}   newFileName
 * @param {function} callback
 */
exports.renameFile = function (oldFileName, newFileName, callback)
{
    // Rename a files
    fs.rename(oldFileName, newFileName, function (err)
    {
        if (err) throw err;

        if (callback != null)
        {
            callback();
        }
    });
};

/**
 * deleteFile
 * Summary. Delete a file.
 * @param {String}   fileName
 * @param {function} callback
 */
exports.deleteFile = function (fileName, callback)
{
    // Delete a files
    fs.unlink(fileName, function (err)
    {
        if (err) throw err;

        if (callback != null)
        {
            callback();
        }
    });
};





/***************
 * DIRECTORIES *
 ***************/

/**
 * readDirectory
 * Summary. Read all files in a given directory.
 * @param {String}   path
 * @param {function} callback
 */
exports.readDirectory = function(path, callback)
{
    fs.readdir(path, function (err, files)
    {
        if (err) throw err;

        if (callback != null)
        {
            callback(files);
        }
    });
};
