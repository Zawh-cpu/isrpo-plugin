// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as fs from "fs";
import * as path from "path";

function copyFolderRecursiveSync(src: string, dest: string) {
    if (!fs.existsSync(src))  {
		return;
	}

    fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyFolderRecursiveSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "simple-vscode-ext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('simple-vscode-ext.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from simple-vscode-ext!');
	});

	const trailer_psj = vscode.commands.registerCommand('simple-vscode-ext.trailerPSJ', () => {
		vscode.env.openExternal(vscode.Uri.parse("https://t.me/itmoushen/11567"));
		vscode.window.showInformationMessage('ЕЕЕ ITMO ПСЖ FLOW!');
	});

	const write_psj = vscode.commands.registerCommand('simple-vscode-ext.writePSJ', () => {
		vscode.env.openExternal(vscode.Uri.parse("https://псж.онлайн"));
	});

	const init_cpp_project = vscode.commands.registerCommand('simple-vscode-ext.initBlackCppProject', () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			vscode.window.showErrorMessage("Откройте папку проекта перед использованием Init.");
			return;
		}

		const rootPath = workspaceFolders[0].uri.fsPath;
		const templatesFolder = context.asAbsolutePath("templates");
		
		copyFolderRecursiveSync(path.join(templatesFolder, "blank_cpp"), rootPath);

	});

	const test = vscode.commands.registerCommand('simple-vscode-ext.slotSpin', () => {
        const panel = vscode.window.createWebviewPanel(
            'slotMachine',
            'Депаем состояние...',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

		const gifs = {
			jokes_over: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "jokes_over.jpg")
			).toString(),
			let_day_be_ligther: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "let_day_be_ligther.jpeg")
			).toString(),
			rip: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "rip.gif")
			).toString(),
			smert_v_nishete: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "smert_v_nishete.jpg")
			).toString(),
			apples: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "apples.gif")
			).toString()
		};
		
		const places = {
			kronva: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "kronva.jpeg")
			).toString(),
			lomo: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "lomo.jpg")
			).toString(),
			pesochka: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "pesochka.jpeg")
			).toString(),
			birja: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "birja.jpg")
			).toString(),
			vyazma: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "vyazma.jpeg")
			).toString(),
			politeh: panel.webview.asWebviewUri(
				vscode.Uri.joinPath(context.extensionUri, "media", "politeh.jpeg")
			).toString(),
		};


        panel.webview.html = getWebviewContent(gifs, places);
    });

	context.subscriptions.push(disposable);
	context.subscriptions.push(trailer_psj);
	context.subscriptions.push(write_psj);
	
	context.subscriptions.push(init_cpp_project);
	context.subscriptions.push(test);
}

function getWebviewContent(gifs: Record<string, string>, places: Record<string, string>) {
    return `
        <html>
        <body style="background: #111; color: #0f0; font-family: monospace; font-size: 24px; text-align: center; padding-top: 20px;">
            
            <div style="display: flex; flex-direction: column; align-items: center;">
				<h2>🎰 Депаем</h2>
				<pre id="slot">[ 🍒 | ⭐ | 💎 ]</pre>

				<button id="retryBtn" 
					style="
						margin-top: 20px; 
						padding: 10px 20px; 
						font-size: 16px; 
						font-family: monospace; 
						background: #222; 
						color: #0f0; 
						border: 1px solid #0f0;
						cursor: pointer;
					">
					Retry
				</button>

				<div id="winBorder" style="width: fit-content; display: flex; flex-direction: column; flex-content: center; align-items: center; margin-top: 20px;">
					<img id="winGif" 
					style="margin-top: 20px; width: 200px; border-radius: 12px;" />

					<label id="winLabel" style="margin-top: 10px;"></label>
				</div>
			</div>

            <script>
                const symbols = [" 🍒 ", " ⭐ ", " 🍋 ", " 💎 ", " 🔔 ", " 🍉 ", "ПСЖ"];
                const slot = document.getElementById("slot");
                const retryBtn = document.getElementById("retryBtn");
				const winGif = document.getElementById("winGif");
				const winLabel = document.getElementById("winLabel");
				const gifs = ${JSON.stringify(gifs)};
				const places = ${JSON.stringify(places)};

                function spin() {
					winGif.style.display = "none";
					winLabel.textContent = "";

                    let spins = 20;
                    let i = 0;

                    let lastA, lastB, lastC;

                    const interval = setInterval(() => {
                        const a = symbols[Math.floor(Math.random()*symbols.length)];
                        const b = symbols[Math.floor(Math.random()*symbols.length)];
                        const c = symbols[Math.floor(Math.random()*symbols.length)];

                        slot.textContent = \`[ \${a} | \${b} | \${c} ]\`;

                        lastA = a;
                        lastB = b;
                        lastC = c;

                        i++;
                        if (i > spins) {
                            clearInterval(interval);
							
                            if (lastA === "ПСЖ" && lastB === "ПСЖ" && lastC === "ПСЖ") {
                                alert("ВЫ ВЫИГРАЛИ В ЛОТЕРЕЕ НА ОТЧИСЛЕНИЕ!!");
								winGif.src = gifs.rip;
                            } else if (lastA === " 💎 " && lastB === " 💎 " && lastC === " 💎 ") {
								winGif.src = gifs.let_day_be_ligther;
							} else if (lastA === lastB && lastB === lastC) {
								winGif.src = gifs.apples;
							} else if (lastA === lastB || lastA === lastC || lastB === lastC) {
								winGif.src = gifs.jokes_over;
							} else {
								const randomBool = Math.random() < 0.2;
								if (randomBool) {
									winGif.src = gifs.smert_v_nishete;
								} else {
									const placeKeys = Object.keys(places);
									const key = placeKeys[Math.floor(Math.random() * placeKeys.length)];

									const labels = {
										kronva: "ВЫ ДЕПНУЛИ КРОНВУ",
										lomo: "ВЫ ДЕПНУЛИ ЛОМО",
										pesochka: "ВЫ ДЕПНУЛИ ПЕСОЧКУ",
										birja: "ВЫ ДЕПНУЛИ БИРЖУ",
										vyazma: "ВЫ ДЕПНУЛИ ВЯЗЬМУ",
										politeh: "ВЫ ДЕПНУЛИ ПОЛИТЕХ"
									};
									
									winGif.src = places[key];
									winLabel.textContent = labels[key] ?? "";
								}
							}

							winGif.style.display = "block";
                        }
                    }, 100);
                }

                spin();

                retryBtn.addEventListener("click", () => {
                    spin();
                });
            </script>
        </body>
        </html>
    `;
}


// This method is called when your extension is deactivated
export function deactivate() {}
