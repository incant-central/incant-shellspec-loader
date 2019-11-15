'use strict';


const ShellSpec = require('shellspec');
const { spawn } = require('child_process');

function ShellLoader({ spec }) {
    const loader = ShellSpec(spec);

    async function shellTask(config = {}, { Resource:cmdPath, onCancel }) {
        cmdPath = Array.isArray(cmdPath)
            ? cmdPath.slice(1)
            : cmdPath.split('.').slice(1);
        const [ command, ...args ] = await loader.promptedArgv(config, cmdPath);
        const spawned = spawn(command, args, { stdio: 'pipe', maxBuffer: 100000000 });
        onCancel(() => spawned.kill());
        return spawned;
    }

    return shellTask;
}

module.exports = ShellLoader;
module.exports.study = (task, { subtask } = {}) => ShellSpec(task.spec).getConfigPaths(subtask);
