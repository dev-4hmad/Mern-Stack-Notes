### 1. Create a folder

- mkdir ts-project && cd ts-project

### 2. Install TypeScript

- npm install typescript --save-dev

### 3. Initialize Config Files

- npm init -y
- npx tsc --init

### 4. Set Output and Source Folders

Edit tsconfig.json:

"rootDir": "src",
"outDir": "dist",

> my preference <br>
- "noEmitOnError": true,
- "sourceMap": false,
- "declaration": false,
- "declarationMap": false

### 5. Create Source File

- src/index.ts

for (let i = 1; i <= 6; i++) console.log(i);

### 6. Watch and Compile

Run from root
- npx tsc -w

### 7. Run Compiled Code

- node dist/index.js