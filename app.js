const fs = require('fs/promises');
const path = require('path');
// Завдання: Створити дві папки boys і girls.
// В них помістити json файли, які будуть містити опис наших хлопців та дівчат,
// які мають мати поле gender. Якшо в папці з дівчатами буде файл з хлопців,то
// ми цей файл додаємо в папку хлопців і наоборот.

const sort = async (folder, gender, putFolder) => {
    try{
        const folderPath = path.join(__dirname, folder);
        const files = await fs.readdir(folderPath, {withFileTypes: true});
        for (const file of files) {
            if (file.isFile()) {
                const filePath = path.join(__dirname, folder, `${file.name}`)
                const data = await fs.readFile(filePath);
                const user = JSON.parse(data);
                if (user.gender === gender) {
                    await fs.rename(filePath, path.join(__dirname, putFolder, `${file.name}`))
                }
            }
        }
    }catch (e) {
        console.error(e)
    }
};
sort('boys', "female", 'girls');
sort('girls','male','boys');