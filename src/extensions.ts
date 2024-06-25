import * as vscode from 'vscode';


const vscodeAnimationsTag = 'brandonkirbyson.vscode';
const apcCustomizeTag = 'drcika.apc-extension';
const customCssJsLoaderTag = 'be5invis.vscode-custom-css';

const INSTALL_BUTTON = 'Install';
const NOT_NOW_BUTTON = 'Not now';
const NO_PROMPT_BUTTON = 'Don\'t show again';
const GO_TO_PAGE_BUTTON = 'Go to page';

/**
 * This method is called when the extension is activated.
 * It initializes the core functionality of the extension.
 */
export async function activate() {

    // finding out if the wanted extensions are installed
    let isApcCustomizeInstalled = vscode.extensions.getExtension(apcCustomizeTag);
    let isVscodeAnimationsInstalled = vscode.extensions.getExtension(vscodeAnimationsTag);
    let isCustomCssJsLoaderInstalled = vscode.extensions.getExtension(customCssJsLoaderTag);


    if (isApcCustomizeInstalled && isVscodeAnimationsInstalled) {
        // do nothing
    } else if (isApcCustomizeInstalled && !isVscodeAnimationsInstalled) {
        installVSCodeAnimations();
    } else if (!isApcCustomizeInstalled && !isVscodeAnimationsInstalled) {
        installAPCCustomizeUI();
        installVSCodeAnimations();          
    }

    // Custom CSS and JS Loader is installed with APC Customize UI++
    if (isApcCustomizeInstalled && isCustomCssJsLoaderInstalled) {
        const messagePopupConflict = 'Both \'APC Customize UI++\' and \'Custom CSS and JS Loader\' are installed in VSCode. They could conflict with each other when using VSCode Animations. For more info, see the extension page.';
        const userChoiseConflict = await vscode.window.showInformationMessage(messagePopupConflict, GO_TO_PAGE_BUTTON, NOT_NOW_BUTTON);

        if (userChoiseConflict === GO_TO_PAGE_BUTTON) {
            await vscode.commands.executeCommand('extension.open', customCssJsLoaderTag); // open the extension page
        }
    }     
}

async function installAPCCustomizeUI() {
    const apcCustomize = vscode.extensions.getExtension(apcCustomizeTag);
    if (!apcCustomize) {
        const messagePopup = 'It is recommanded to use APC Customize UI++ for this theme to run smoothly. Would you like to install this extension now ?';
        const userChoise = await vscode.window.showInformationMessage(messagePopup, INSTALL_BUTTON, NOT_NOW_BUTTON, NO_PROMPT_BUTTON);

        if (userChoise === INSTALL_BUTTON) {
            await vscode.commands.executeCommand('workbench.extensions.installExtension', apcCustomizeTag); // programmatically install extension
        }
    }
}

async function installVSCodeAnimations() {
    const vscodeAnimations = vscode.extensions.getExtension(vscodeAnimationsTag);
    if (!vscodeAnimations) {
        const messagePopup = 'It is recommanded to use VSCode Animations for this theme to have the full experience. Would you like to install this extension now ?';
        const userChoise = await vscode.window.showInformationMessage(messagePopup, INSTALL_BUTTON, NOT_NOW_BUTTON, NO_PROMPT_BUTTON);

        if (userChoise === INSTALL_BUTTON) {
            await vscode.commands.executeCommand('workbench.extensions.installExtension', vscodeAnimationsTag); // programmatically install extension
        }
    } 
}