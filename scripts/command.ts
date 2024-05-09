import inquirer from 'inquirer';

export async function command(platforms: string[]) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Select a platform to build',
      choices: ['all', ...platforms],
    },
  ]);
}
