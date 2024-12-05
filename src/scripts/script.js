const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command-input');
const output = document.getElementById('output');
let suggestionBox; 


let commands = {};
let fileSystem = {}; 
let currentDir = 'root';


async function loadCommands() {
    try {
        const response = await fetch('../../JSON/donnees.json');
        commands = await response.json();
    } catch (error) {
        output.innerHTML += `<div>Erreur lors du chargement des commandes : ${error.message}</div>`;
    }
}

async function loadFileSystem() {
    try {
        const response = await fetch('../../JSON/roots.json');
        fileSystem = await response.json();
    } catch (error) {
        output.innerHTML += `<div>Erreur lors du chargement du système de fichiers : ${error.message}</div>`;
    }
}


function executeCommand(command) {
    const commandLine = `<span class="command">balint@linux:~${currentDir === 'root' ? '' : '/' + currentDir}$ ${command}</span>`;
    
    if (command === 'clear' || command === "cls") {
        output.innerHTML = ''; 
    } else if (command === 'date') {
        const currentDate = new Date().toString();
        output.innerHTML += `<div>${commandLine}<br>${currentDate}</div>`;
    } else if (command === 'rl') {
        const rickrollAudio = document.getElementById('rickroll-audio');
        
        if (rickrollAudio) {
            rickrollAudio.play();
            output.innerHTML += `<div>${commandLine}<br>🎵 Playing Rick Roll... 🎵</div>`;
            
            setTimeout(() => {
                rickrollAudio.pause();
                rickrollAudio.currentTime = 0;
            }, 5000);
        } else {
            output.innerHTML += `<div>${commandLine}<br>Erreur : Impossible de charger l'audio</div>`;
        }
    } else if (command === 'ls') {
        
        const currentFiles = Object.keys(fileSystem[currentDir]);
        if (currentFiles.length > 0) {
            output.innerHTML += `<div>${commandLine}<br>${currentFiles.join('<br>')}<br>[INFO] Directorys, en cours de developpement pas encore fonctionnel</div>`;
        } else {
            output.innerHTML += `<div>${commandLine}<br>Le répertoire est vide.<br>[INFO] En cours de developpement pas encore fonctionnel</div>`;
        }
    } else if (command.startsWith('cd ')) {
        
        const targetDir = command.substring(3).trim();
        
        if (targetDir === '..') {
            if (currentDir !== 'root') {
                const parentDir = currentDir.split('/').slice(0, -1).join('/');
                currentDir = parentDir || 'root';
                output.innerHTML += `<div>${commandLine}<br>Changement de répertoire vers ${currentDir}<br>[INFO] En cours de developpement pas encore fonctionnel</div>`;
            } else {
                output.innerHTML += `<div>${commandLine}<br>Vous êtes déjà dans le répertoire racine.<br>[INFO] En cours de developpement pas encore fonctionnel</div>`;
            }
        } else if (fileSystem[currentDir] && fileSystem[currentDir][targetDir] !== undefined) {
            currentDir = currentDir === 'root' ? targetDir : `${currentDir}/${targetDir}`;
            output.innerHTML += `<div>${commandLine}<br>Changement de répertoire vers ${currentDir}<br>[INFO] En cours de developpement pas encore fonctionnel</div>`;
        } else {
            output.innerHTML += `<div>${commandLine}<br>Répertoire introuvable : ${targetDir}<br>[INFO] En cours de developpement pas encore fonctionnel</div>`;
        }
    } else if (command in commands) {
        const commandOutput = commands[command];
        
        if (typeof commandOutput === 'object') {
            const formattedOutput = Object.values(commandOutput).join('<br>');
            output.innerHTML += `<div>${commandLine}<br>${formattedOutput}</div>`;
        } else {
            output.innerHTML += `<div>${commandLine}<br>${commandOutput}</div>`;
        }
    } else {
        output.innerHTML += `<div>${commandLine}<br>Command not found: ${command}</div>`;
    }
    
    terminal.scrollTop = terminal.scrollHeight;
}

function showSuggestions(input) {
    if (!suggestionBox) {
        suggestionBox = document.createElement('ul');
        suggestionBox.className = 'suggestion-box';
        terminal.appendChild(suggestionBox);
    }
    
    suggestionBox.innerHTML = '';
    
    if (input.trim() === '') {
        suggestionBox.style.display = 'none';
        return;
    }
    
    const suggestions = Object.keys(commands).filter(cmd => cmd.startsWith(input));
    if (suggestions.length === 0) {
        suggestionBox.style.display = 'none';
        return;
    }
    
    suggestions.forEach(suggestion => {
        const item = document.createElement('li');
        item.textContent = suggestion;
        item.addEventListener('click', () => {
            commandInput.value = suggestion;
            suggestionBox.style.display = 'none';
            commandInput.focus();
        });
        suggestionBox.appendChild(item);
    });
    
    suggestionBox.style.display = 'block';
}

commandInput.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        const command = commandInput.value.trim();
        executeCommand(command);
        commandInput.value = '';
        if (suggestionBox) suggestionBox.style.display = 'none';
    } else if (event.key === "Tab") {
        event.preventDefault();
        
        const input = commandInput.value.trim();
        const suggestions = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        
        if (suggestions.length === 1) {
            commandInput.value = suggestions[0];
            if (suggestionBox) suggestionBox.style.display = 'none';
        } else if (suggestions.length > 1) {
            showSuggestions(input);
        }
    }
});

terminal.addEventListener('click', function () {
    commandInput.focus();
});


window.onload = async function () {
    await loadCommands();
    await loadFileSystem();
    displayWelcomeMessage();
};

function displayWelcomeMessage() {
    const welcomeMessage = `
Bienvenue sur mon portfolio.
L'utilisation se fait comme dans une invite de commande shell/bash.
Merci, KIS BALINT.

[INFO] : version plein écran conseiller pour cause, bug d'affichage terminal.

Veuillez effectuer la commande : help
    `;
    output.innerHTML += `<div>${welcomeMessage}</div>`;
};
