async function loadCommands(client, activateArray=[], deactivateArray=[]) {
    const { loadFiles } = require('../Functions/fileLoader');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading('Commands', 'Status');

    await client.commands.clear();
    await client.subCommands.clear();

    let commandsArray = [];

    const Files = await loadFiles('Commands');

    Files.forEach((file) => {
        const command = require(file);
        try {
            if (command.subCommand)
            return client.subCommands.set(command.subCommand, command);
            
            if (activateArray.length) {
                if (activateArray.includes(command.data.name)) command.active = true
            }

            if (deactivateArray.length) {
                if (deactivateArray.includes(command.data.name)) command.active = false
            }

            if (command.active) {
                client.commands.set(command.data.name, command);
                commandsArray.push(command.data.toJSON());

                table.addRow(command.data.name, "🟩");
            } else table.addRow(command.data.name, "🟥");
        } catch (err) {
            console.log(`Application Error Detected when loading ${command.data.name}\nError: ${err}`);
        }
    });

    client.application.commands.set(commandsArray);

    return console.log(table.toString(), '\nCommands Loaded');
}

module.exports = { loadCommands };