let age: number = 24;

age = 12;

let userName: string | string[];

userName = 'Woong';

let isInstructor: boolean;

isInstructor = true;

let hobbies: string[];

hobbies = ['Sports', 'Cooking'];

type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: 'Woong',
  age: 27,
};

let people: Person[];

let course: string | number = 'React - The Complete Guide';

course = 12341;

const add = (a: number, b: number) => {
  return a + b;
};

const printOutput = (value: any) => {
  console.log(value);
};

const insertAtBeginning = <T>(array: T[], value: T) => {
  const newArray = [value, ...array];
  return newArray;
};

const demoArray = [1, 2, 3];
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
