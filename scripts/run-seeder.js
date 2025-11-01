import { spawn } from 'child_process';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  white: '\x1b[37m',
  bgBlue: '\x1b[44m',
  bgGreen: '\x1b[42m',
  bgPurple: '\x1b[45m',
};

const c = (color, text) => `${color}${text}${colors.reset}`;
const bold = (text) => `${colors.bold}${text}${colors.reset}`;

const symbols = {
  success: '✅',
  error: '❌',
  info: '📊',
  key: '🔑',
  database: '🗄️',
  loading: '⏳',
  rocket: '🚀',
  user: '👥',
  person: '🧑',
  officer: '👮',
  doc: '📋',
  tag: '🏷️',
  file: '📄',
  clip: '📎',
  star: '⭐',
  lock: '🔐',
};

// Print header
console.log('\n');
console.log(c(colors.purple, bold('╔════════════════════════════════════════════════════════╗')));
console.log(c(colors.purple, bold('║         VISA MANAGEMENT SYSTEM - SEEDER TOOL          ║')));
console.log(c(colors.purple, bold('╚════════════════════════════════════════════════════════╝')));
console.log('\n');

console.log(c(colors.cyan, `${symbols.loading} Starting database seeder...\n`));

// Run the seeder
const seeder = spawn('node', ['server/utils/seeder.js'], {
  stdio: 'pipe',
  shell: true,
});

seeder.stdout.on('data', (data) => {
  const text = data.toString();

  // Format different types of output
  if (text.includes('MongoDB Connected')) {
    console.log(c(colors.green, `${symbols.database} MongoDB Connected Successfully!`));
    console.log('');
  } else if (text.includes('Existing data cleared')) {
    console.log(c(colors.yellow, `${symbols.loading} Clearing existing data...`));
  } else if (text.includes('Users created with hashed passwords')) {
    console.log(c(colors.blue, `${symbols.success} Users created with hashed passwords`));
  } else if (text.includes('Applicants created')) {
    console.log(c(colors.blue, `${symbols.success} Applicants created`));
  } else if (text.includes('Officers created')) {
    console.log(c(colors.blue, `${symbols.success} Officers created`));
  } else if (text.includes('Visa types created')) {
    console.log(c(colors.blue, `${symbols.success} Visa types created`));
  } else if (text.includes('Application statuses created')) {
    console.log(c(colors.blue, `${symbols.success} Application statuses created`));
  } else if (text.includes('Visa applications created')) {
    console.log(c(colors.blue, `${symbols.success} Visa applications created`));
  } else if (text.includes('Documents created')) {
    console.log(c(colors.blue, `${symbols.success} Documents created`));
  } else if (text.includes('Reviews created')) {
    console.log(c(colors.blue, `${symbols.success} Reviews created`));
  } else if (text.includes('Data Import Successful')) {
    console.log('');
    console.log(c(colors.green, bold(`${symbols.success} Data Import Successful!\n`)));
  } else if (text.includes('Summary:')) {
    console.log(c(colors.purple, bold(`${symbols.info} DATABASE SUMMARY:`)));
    console.log(c(colors.gray, '─────────────────────────────────────────'));
  } else if (text.includes('- Users:')) {
    const match = text.match(/Users: (\d+) \((\d+) applicants, (\d+) officers, (\d+) admin\)/);
    if (match) {
      console.log(c(colors.cyan, `   ${symbols.user} Users: ${bold(match[1])} (${match[2]} applicants, ${match[3]} officers, ${match[4]} admin)`));
    }
  } else if (text.includes('- Applicants:')) {
    const match = text.match(/Applicants: (\d+)/);
    if (match) {
      console.log(c(colors.cyan, `   ${symbols.person} Applicants: ${bold(match[1])}`));
    }
  } else if (text.includes('- Officers:')) {
    const match = text.match(/Officers: (\d+)/);
    if (match) {
      console.log(c(colors.cyan, `   ${symbols.officer} Officers: ${bold(match[1])}`));
    }
  } else if (text.includes('- Visa Types:')) {
    const match = text.match(/Visa Types: (\d+)/);
    if (match) {
      console.log(c(colors.cyan, `   ${symbols.doc} Visa Types: ${bold(match[1])}`));
    }
  } else if (text.includes('- Statuses:')) {
    const match = text.match(/Statuses: (\d+)/);
    if (match) {
      console.log(c(colors.cyan, `   ${symbols.tag} Statuses: ${bold(match[1])}`));
    }
  } else if (text.includes('- Applications:')) {
    const match = text.match(/Applications: (\d+)/);
    if (match) {
      console.log(c(colors.cyan, `   ${symbols.file} Applications: ${bold(match[1])}`));
    }
  } else if (text.includes('- Documents:')) {
    const match = text.match(/Documents: (\d+)/);
    if (match) {
      console.log(c(colors.cyan, `   ${symbols.clip} Documents: ${bold(match[1])}`));
    }
  } else if (text.includes('- Reviews:')) {
    const match = text.match(/Reviews: (\d+)/);
    if (match) {
      console.log(c(colors.cyan, `   ${symbols.star} Reviews: ${bold(match[1])}`));
    }
  } else if (text.includes('Login Credentials:')) {
    console.log('');
    console.log(c(colors.yellow, bold(`${symbols.key} LOGIN CREDENTIALS:`)));
    console.log(c(colors.gray, '─────────────────────────────────────────'));
  } else if (text.includes('Admin:')) {
    const match = text.match(/Admin:\s+(\S+)\s+\/\s+(\S+)/);
    if (match) {
      console.log(c(colors.purple, `   ${symbols.lock} Admin:     ${match[1]} / ${bold(match[2])}`));
    }
  } else if (text.includes('Officer:')) {
    const match = text.match(/Officer:\s+(\S+)\s+\/\s+(\S+)/);
    if (match) {
      console.log(c(colors.blue, `   ${symbols.lock} Officer:   ${match[1]} / ${bold(match[2])}`));
    }
  } else if (text.includes('Applicant:')) {
    const match = text.match(/Applicant:\s+(\S+)\s+\/\s+(\S+)/);
    if (match) {
      console.log(c(colors.green, `   ${symbols.lock} Applicant: ${match[1]} / ${bold(match[2])}`));
    }
  }
});

seeder.stderr.on('data', (data) => {
  const text = data.toString();
  
  // Suppress MongoDB deprecation warnings
  if (text.includes('DeprecationWarning') || 
      text.includes('useNewUrlParser') || 
      text.includes('useUnifiedTopology') ||
      text.includes('trace-warnings')) {
    return;
  }
  
  // Show actual errors
  if (text.includes('Error') || text.includes('error')) {
    console.log(c(colors.red, `${symbols.error} ${text.trim()}`));
  }
});

seeder.on('close', (code) => {
  if (code === 0) {
    console.log('');
    console.log(c(colors.gray, '─────────────────────────────────────────'));
    console.log(c(colors.green, bold(`${symbols.rocket} Ready to launch! Start your servers:\n`)));
    console.log(c(colors.cyan, `   Frontend: ${bold('npm run dev')}`));
    console.log(c(colors.cyan, `   Backend:  ${bold('npm run server')}`));
    console.log(c(colors.cyan, `   Both:     ${bold('npm run dev:all')}`));
    console.log('');
  } else {
    console.log('');
    console.log(c(colors.red, bold(`${symbols.error} Seeder failed with exit code ${code}`)));
    console.log('');
  }
});
