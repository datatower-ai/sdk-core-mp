import inquirer from 'inquirer';

export async function command<P extends string, F extends string>(
  options: Record<P, F[]>,
  selectableAll: boolean,
): Promise<{ platform: P | 'all'; format: F | 'all' }> {
  const platforms = Object.keys(options) as P[];
  const { platform } = await inquirer.prompt<{ platform: P }>([
    {
      type: 'list',
      name: 'platform',
      message: 'Select a platform to build',
      choices: selectableAll ? ['all', ...platforms] : platforms,
    },
  ]);
  const formats = platform === 'all' ? [...new Set(Object.values(options).flat())] : options[platform];
  const { format } = await inquirer.prompt([
    {
      type: 'list',
      name: 'format',
      message: 'Select a format to build',
      choices: selectableAll ? ['all', ...formats] : formats,
    },
  ]);
  return { platform, format };
}
