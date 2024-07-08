/*
 * cal.js
 * Copyright (C) 2024 sakakibara <sakakibara@organon>
 *
 * Distributed under terms of the MIT license.
 */

args = process.argv.slice(2);

const help_msg = 
  `Usage: node cal.js -m [month]

  Options: 
    -m  Display the specified month.
        month must be between 1 and 12.\n`

try {

  if (args.length !== 0 && args.length !== 2) {
    throw new Error(help_msg + `\nError: Invalid arguments.`);
  }

  if (args.length == 2) {
    if (args[0] != "-m" && args[1].isInteger()) {
      throw new Error(help_msg + `\nError: Invalid arguments. You can use only "-m" option.`);
    }
    if (args[1] < 0 || 12 < args[1]) {
      throw new Error(help_msg + `\nError: Invalid month. Month must be between 1 and 12. Got ${args[1]}`);
    }
  }
} catch (error) {
  console.log(error.message);
  process.exit(1);
}


const showCal = (arg) => {
  const date = new Date();
  // arg && date.setMonth(arg - 1); //これでもできるが、読みにくいので却下
  if (arg) {
    date.setMonth(arg - 1);
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const firstDate = new Date(year, month - 1);
  const lastDate = new Date(year, month - 1);

  firstDate.setDate(1);
  lastDate.setDate(31);
  lastDate.setDate(31 - lastDate.getDate());

  console.log(`     ${year}年${month}月`);
  console.log(`日 月 火 水 木 金 土`);
  weeks = ['日', '月', '火', '水', '木', '金', '土'];

  const days = Array.from({ length: lastDate.getDate()}, (_, i) => i + 1);
  const calender = Array.from({ length: firstDate.getDay() }, (_, i) => '  ')
                      .concat(days.map(day => day.toString().padStart(2, ' ')));

  calender.forEach((day, i) => {
    process.stdout.write(day + ' ');
    if (i % 7 == 6) {
      process.stdout.write('\n');
    }
  });

}

showCal(args[1]);
