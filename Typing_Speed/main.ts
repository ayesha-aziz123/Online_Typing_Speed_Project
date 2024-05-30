#! /usr/bin/env/node

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

console.log(chalk.yellow(figlet.textSync("Welcome  Online Typing Speed Tester!")));

interface User {
  name: string;
  password: number;
  email: any;
}

class names {
  private users: User[] = [];

  async signUp() {
    const { name, email, password } = await inquirer.prompt([
      { name: "name", type: "input", message: "Enter your name :" },
      { name: "email", type: "input", message: "Enter your email:" },
      { name: "password", type: "password", message: "Enter your password:" },
    ]);
    const signUp = this.users.find(
      (find) =>
        find.name === name && find.password === password && find.email === email
    );
    if (signUp) {
      console.log(chalk.italic.red("User have Already Exist !"));
    } else {
      this.users.push({ name, email, password });
      console.log(chalk.italic.magentaBright("User signed Up Successfully!"));
    }
  }

  async logIn() {
    const { email1, password1 } = await inquirer.prompt([
      { name: "email1", type: "input", message: "Enter your email:" },
      { name: "password1", type: "password", message: "Enter your Password:" },
    ]);
    const exist1 = this.users.find(
      (use) => use.password === password1 && use.email === email1
    );
    if (exist1) {
      console.log(chalk.italic.bold.redBright(`Welcome back ${exist1.name}!`));
    } else {
      console.log(chalk.italic.red("Invalid password!"));
      process.exit();
    }
  }
}

const sampleText = "The quick brown fox jumps over the lazy dog";

async function main() {
  console.log(
    chalk.italic.bold.blueBright(
      "\n\t<<====== Welcome to the Online Typing Speed Tester! ======>>\n"
    )
  );
  console.log(
    chalk.italic.rgb(
      2,
      5,
      7
    )(
      "You will be given a text to type. Your typing speed will be measured in words per minute (WPM)."
    )
  );

  // Display pre-test instructions ( create a separate class for this)
  console.log(
    chalk.italic.bold.magenta(
      "\n\tBefore you begin, follow these instructions:\n"
    )
  );
  console.log(chalk.bold.yellow("1. Sit comfortably with proper posture."));
  console.log(chalk.bold.yellow("2. Place your fingers on the home row keys."));
  console.log(
    chalk.bold.yellow("3. Keep your eyes on the screen and focus on the text.")
  );
  console.log(
    chalk.bold.yellow(
      "4. Type the given text as accurately and quickly as possible."
    )
  );
  console.log(chalk.bold.yellow("5. Press Enter when you finish."));
  console.log(chalk.bold.yellow("Now you are ready to start! Good luck!\n"));

  const { startTest } = await inquirer.prompt([
    {
      name: "startTest",
      message: "Do you want to start the typing test?",
      type: "confirm",
    },
  ]);

  if (startTest) {
    console.log(
      chalk.italic.bold.green(
        "<<====== Type the following text as fast as you can: ======>>"
      )
    );
    console.log(chalk.blueBright(sampleText));

    const startTime = Date.now();

    const { typedText } = await inquirer.prompt([
      {
        name: "typedText",
        message: "Start typing:",
        type: "input",
      },
    ]);

    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000 / 60; // Time in minutes

    const wordsTyped = typedText.split(" ").length;

    const wpm = wordsTyped / timeTaken;

    const errors = calculateErrors(typedText, sampleText);

    console.log(chalk.green.italic.bold("\n\t<<======= Result ==========>>"));

    console.log(
      chalk.italic.bold.magentaBright.underline(
        `\nWords per minute: ${wpm.toFixed(2)}`
      )
    );
    console.log(chalk.italic.bold.red.underline(`Errors: ${errors}`)); 
    console.log(
      chalk.italic.bold.magentaBright.underline(
        `Accuracy: ${(100 - (errors / sampleText.length) * 100).toFixed(2)}%\n`
      )
    );
  } else {
    console.log("Goodbye!");
  }
}

function calculateErrors(typedText: string, originalText: string): number {
  const typedChars = typedText.split("");
  const originalChars = originalText.split("");
  let errors = 0;

  for (let i = 0; i < originalChars.length; i++) {
    if (typedChars[i] !== originalChars[i]) {
      errors++;
    }
  }

  return errors;
}

const add = new names();

async function mains() {
  do {
    const { action } = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "Welcome to the Typing Speed Tester!",
      choices: ["Sign Up", "Login", "Exit"],
    });
    if (action === "Sign Up") {
      await add.signUp();
    }
     else if (action === "Login") {
      await add.logIn();
      await main();
    }
     else if (action === "Exit") {
      console.log(chalk.italic.red("Exiting..."));
      process.exit();
    }
  } while (true);
}
mains();
