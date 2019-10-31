'use strict';

module.exports = ShellLoader;

const ShellSpec = require('shellspec');
const { spawn } = require('child_process');

function ShellLoader({ spec }) {
    const loader = ShellSpec(spec);

    async function shellTarget(config = {}, { Resource:cmdPath }) {
        cmdPath = Array.isArray(cmdPath)
            ? cmdPath.slice(1)
            : cmdPath.split('.').slice(1);
        const [ command, ...args ] = await loader.promptedArgv(config, cmdPath);
        return spawn(command, args);
    }

    return shellTarget;
}
