const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command-input');
const output = document.getElementById('output');

// Available commands and their responses
const commands = {
    "help": "Commandes disponible :\n- help\t- date\n- pwd\t- whoami\n- clear\t- etudes\n- cls\t- projets\n- ls\t- contact\n- maitrises\t-langues\n- ProjetPro\t- ",
    "date": new Date().toString(),
    "pwd": "/home/balint/portfolio",
    "whoami": "KIS Balint@linux",
    "ProjetPro": "...",
    "clear": "clear",
    "langues" : "- Hongroie (natif)\n- Francais (natif)\n- Anglais (B2/C1)\n- Espagnol A1/A2",
    "competences" : `Language de programation : 
- Python confirmé    - Node JS confirmé  - Shell avancé      
- C débutant         - Java débutant     - Html débutant
- CSS débutant       - SQL avancé        - Latex intermédiaire    
- Uscript intermidiaire - Docker intermédiaire
    `,
    
    "etudes": "Lycée :\n\tBaccalauréat général :\n\t\tTerminal : \n\t\t\t- Mathématique\n\t\t\t- Numérique et science de l'informatique\n\t\tPremiere :\n\t\t\t- Science de l'ingénieur\n\nPost-Bac : \n\tLicence à Paul Sabatier : \n\t\t- Licence Flex Informatique L1",
    "cls": "clear",
    "projets": `Date début | Description | Nom du projet | Url et Images | Statuts<br>
10/02/2024 | Solution logiciele pour l'achat et la revente vinted | Retools | <a id="liens" href="https://discord.gg/8yxWK8yNC2" target="_blank">Le support de déploiement</a>              | Fini
           | interface Client-Server via Api Discord,             |         | <a id="liens" href="https://imgur.com/xgH7hEt" target="_blank">Image App Tendances</a>                    |
           | A but lucratif.                                      |         | <a id="liens" href="https://imgur.com/kwmfUPT" target="_blank">Alerte Automatique Vinted</a>              |
           |                                                      |         | <a id="liens" href="https://imgur.com/VECz4k1" target="_blank">Alerte Automatique Grossistes Vinted</a>   |
           | Le projet comporte plusieurs parties logiciels :     |         | <a id="liens" href="https://imgur.com/ktSgyOY" target="_blank">Estimations de niche</a>                   |
           | - estimations, - facturation, - tendances, - crawler |
           | - scraper web, -scraper api, - Alerte Vinted,        |
           | - Alerte Grossite, - Vérificateur REGEX numéro série |
           | - Crawler Vinted pour les niches, - Comptabilité     |
           |                                                      |
           | Technologies utilisées :                             |
           | Python, Node JS, PILLOW, MongoGB, Shell, CSV, FFMEG  |
           | FastApi, Whop API                                    |

29/09/2024 | Solution web de Retools X Vintzen                    | Retools X Vintzen | <a id="liens" href="https://vintzen.fr/" target="_blank">Vintzen (Maintenance Possible)</a> | en cours

`,
    "ls": "",
    "contact": `\nNuméro de téléphone : 06 95 77 05 65\nAdresse email : balint.kis@outlook.fr\nGithub : <a id="liens" href="https://github.com/Rakou-FR/" target="_blank">https://github.com/Rakou-FR/</a>`,
};


function executeCommand(command) {
    const commandLine = `<span class="command">balint@linux:~$ ${command}</span>`;
    
    if (command === 'clear' || command === "cls") {
        output.innerHTML = ''
    } else if (command in commands) {
        output.innerHTML += `<div>${commandLine}<br>${commands[command]}</div>`;
    } else {
        output.innerHTML += `<div>${commandLine}<br>Command not found: ${command}</div>`;
    }
    terminal.scrollTop = terminal.scrollHeight;
}

function displayWelcomeMessage() {
    const welcomeMessage = "Bienvenue sur mon portfolio.\nL'utilisation se fait comme dans un invite de commande.\nMerci, KIS BALINT.\n\nVeuillez effectuer la commande : help";
    output.innerHTML += `<div>${welcomeMessage}</div>`;
}

// Event listener for handling the Enter key press
commandInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        const command = commandInput.value.trim();
        executeCommand(command);
        commandInput.value = ''; // Clear the input field after each command
    }
});


terminal.addEventListener('click', function() {
    commandInput.focus();
});

// Display the welcome message when the page loads
window.onload = displayWelcomeMessage;
