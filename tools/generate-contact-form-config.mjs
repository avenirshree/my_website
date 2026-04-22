import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const workspaceRoot = process.cwd();
const outputPath = path.join(
  workspaceRoot,
  'src',
  'app',
  'config',
  'contact-form-config.generated.ts'
);

const accessKey =
  process.env.NG_APP_WEB3FORMS_ACCESS_KEY || 'REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY';

const fileContents = `import { ContactFormConfig } from './contact-form-config.model';

export const CONTACT_FORM_CONFIG: ContactFormConfig = {
  provider: 'Web3Forms',
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '${accessKey}',
  subject: 'New Portfolio Contact Form Submission',
  fromName: 'Anil Jadhav Portfolio',
};
`;

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, fileContents, 'utf8');

console.log(
  accessKey === 'REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY'
    ? 'Generated contact form config with placeholder access key.'
    : 'Generated contact form config from NG_APP_WEB3FORMS_ACCESS_KEY.'
);
