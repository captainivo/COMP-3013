const fs = require("node:fs/promises");

const addPathToList = (fileName, array) => array.push(fileName);

async function readFilesSequentially() {
        try {

            let path = [];

            const fileTwo = await fs.readFile("file1.txt", "utf8");
            addPathToList(fileTwo, path);

            const fileThree = await fs.readFile(fileTwo, "utf8");
            addPathToList(fileThree, path);

            const fileFour = await fs.readFile(fileThree, "utf8");
            addPathToList(fileFour, path);

            const res = await fs.readFile(fileFour, "utf8");

            let resultPath = '';

            path.forEach(element => {

                resultPath += element;

                if (element !== path.at(-1)) {
                    resultPath += ' -> ';
                }
            });

            console.log(resultPath);
            console.log(res);
  
        } catch (err) {

            console.log(err);
        
        }
    }

readFilesSequentially();

    
   

