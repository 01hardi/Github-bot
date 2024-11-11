const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const path = require("path");

const FILE_PATH = path.join(__dirname, "data.json");
const git = simpleGit();

const makeCommit = (n) => {
  if (n === 0) return git.push();

  const x = Math.floor(Math.random() * 7);
  const y = Math.floor(Math.random() * 52);

  const date = new Date();
  date.setFullYear(2023);
  date.setMonth(0); // January
  date.setDate(1 + y * 7 + x); // Random day in the year

  jsonfile.writeFile(FILE_PATH, { date }, () => {
    git
      .add([FILE_PATH])
      .commit(date.toISOString(), { "--date": date.toISOString() })
      .then(() => makeCommit(n - 1));
  });
};

makeCommit(100); // Number of commits to generate
