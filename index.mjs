import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";
const git = simpleGit();

const makeCommit = async (x, y) => {
  const DATE = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: DATE,
  };

  try {
    await jsonfile.writeFile(FILE_PATH, data);
    await git.add([FILE_PATH]);
    await git.commit(DATE, { "--date": DATE });
    console.log(`Commit created at ${DATE}`);
  } catch (error) {
    console.error(`Commit error: ${error}`);
  }
};

const generateCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    const x = random.int(0, 54);
    const y = random.int(0, 6);
    await makeCommit(x, y);
  }

  // Optional: Push to remote
  try {
    await git.push("origin", "main");
    console.log("Pushed to remote repository");
  } catch (pushError) {
    console.error("Push failed:", pushError);
  }
};

// Generate 100 commits
generateCommits(100).catch(console.error);
