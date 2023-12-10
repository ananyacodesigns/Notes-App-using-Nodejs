const fs = require('fs');
const chalk =  require('chalk'); 


const addNote= (title, body)=>{
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title );
    /* const duplicateNotes = notes.filter((note)=>{
        return note.title === title
    }) */
    
    debugger

    if (duplicateNotes.length===0){
        notes.push({
            title: title,
            body: body,
        })
    saveNotes(notes)
    console.log(chalk.bgGreen('Note added successfully'));
}
    else{
        console.log(chalk.bgRed('Note title already in use'));
    }
}

const listNotes = ()=>{
    const notes = loadNotes()

    console.log(chalk.bgBlue("Your notes..."));
    
    notes.forEach((note) => {
        console.log(note);
        })
    }
const readNote = (title)=>{
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if(note){
        console.log(chalk.bgGreen("Reading notes..."));
        console.log(chalk.inverse(note.title));
        console.log(chalk.inverse(note.body));
    }
    else{
        console.log(chalk.bgRed("note not found"));
    }
    
}
const saveNotes = (notes)=>{
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}
const removeNote = (title)=>{
    const notes = loadNotes()
    const toKeepNotes = notes.filter((note)=> note.title !== title
)  
    if(notes.length > toKeepNotes.length){
        console.log(chalk.bgGreen('Note removed'));
        saveNotes(toKeepNotes);
        }
    else{
        console.log(chalk.bgRed('No Note found'));
        }
}
    

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson);
    }
    catch(e){
        return [];

    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
