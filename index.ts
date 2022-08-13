import axios from "axios";

const validWords = new Set<string>();

const checkWord = (word: string) => {
  if (word.length < 2) return;
  axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(() => {
      console.log(word);
      validWords.add(word);
    })
    .catch(() => {
      word;
    });
};

const stringPermutations = (str: string): string[] => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split("")
    .reduce(
      (acc: string[], letter: string, i: number) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            (val) => letter + val
          )
        ),
      []
    );
};

const stringCombination = (val: string, i = 0, tmp = "") => {
  if (i == val.length) {
    checkWord(tmp);
    return;
  }
  stringCombination(val, i + 1, tmp);
  stringCombination(val, i + 1, tmp + val[i]);
};

const run = async (word: string) => {
  console.log("valid words are...");
  const perm = stringPermutations(word);
  perm.forEach((val: string) => {
    stringCombination(val);
  });
  console.log([...validWords].join(" "));
};

run("blahpones");
