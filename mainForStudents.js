const students = [
    {
        name: "Bob",
        age: 22,
        isMarried: true,
        scores: 85
    },
    {
        name: "Alex",
        age: 21,
        isMarried: true,
        scores: 90,
    },
    {
        name: "Nick",
        age: 20,
        isMarried: false,
        scores: 120
    },
    {
        name: "John",
        age: 19,
        isMarried: false,
        scores: 100
    },
    {
        name: "Helen",
        age: 20,
        isMarried: false,
        scores: 110
    },
    {
        name: "Ann",
        age: 20,
        isMarried: false,
        scores: 105
    },
];

const user = {
    name: "Bob",
    age: 23,
    friends: ["Alex", "Nick", "John"]
}

//1. Создайте поверхностную копию объекта user
let copyUser = {...user};
console.log(copyUser)
console.log(user===copyUser) //false
console.log(user.friends===copyUser.friends) //true т.к. содержат ссылки на один и тот же массив

//Проверка:
// console.log(user===copyUser)- что должно быть в консоли?
// console.log(user.friends===copyUser.friends)- что должно быть в консоли?

//2. Полная (глубокая) копия объекта user
//let deepCopyUser = Object.assign({}, user);
let deepCopyUser = {...user, friends: [...user.friends]};
console.log(deepCopyUser)
console.log(user===deepCopyUser) //false
console.log(user.friends===deepCopyUser.friends) //false т.к. содержат ссылки на разные массивы

//Проверка:
// console.log(user===deepCopyUser) - что должно быть в консоли?
// console.log(user.friends===deepCopyUser.friends) - что должно быть в консоли?

//3. Поверхностная копия массива students
let copyStudents = [...students];
console.log(copyStudents)
console.log(copyStudents===students) //false
console.log(copyStudents[0]===students[0]) //true

//Проверка:
// console.log(код проверки написать самостоятельно ) - что должно быть в консоли?
// console.log(код проверки написать самостоятельно) - что должно быть в консоли?

//4*. Полная (глубокая) копия массива students (map)
let deepCopyStudents = students.map(s => ({...s}));
console.log(deepCopyStudents)
console.log(deepCopyStudents===students) //false
console.log(deepCopyStudents[0]===students[0]) //false

//Проверка:
// console.log(код проверки написать самостоятельно) - что должно быть в консоли?
// console.log(код проверки написать самостоятельно) - что должно быть в консоли?

// NB!!! Далее все преобразования выполняем не модифицируя исходный массив students
// Вывод результатов - в консоль

//5. Отсортируйте deepCopyStudents по алфавиту (sort)
let deepCopyStudents2 = deepCopyStudents.map(s => ({...s}))
let sortByName = deepCopyStudents2.sort((a, b) => (a.name <= b.name ? -1 : 1))
//let sortByName = deepCopyStudents2.sort((a, b) => a.name.toLowerCase() <= b.name.toLocaleLowerCase() ? -1 : 1);
console.log(sortByName);


//5a. Отсортируйте deepCopyStudents по успеваемости(лучший идёт первым)(sort)
let deepCopyStudents3 = deepCopyStudents.map(s => ({...s}))
let sortByScores = deepCopyStudents3.sort((a,b) => (b.scores - a.scores))
//let sortByScores = deepCopyStudents3.sort((a, b) => b.scores - a.scores);
console.log(sortByScores);

//6. Сформируйте массив студентов, у которых 100 и более баллов (filter)
let  bestStudents = deepCopyStudents.filter(t => t.scores >= 100);
console.log(bestStudents)

//6a. Получите массив ("вырежьте") из трёх лучших студентов из массива deepCopyStudents (splice)
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

let topStudents = deepCopyStudents.splice(2,3);
console.log(topStudents)
console.log(deepCopyStudents)

//6b. Объедините массивы deepCopyStudents и topStudents так,
// чтоб сохранился порядок сортировки (spread-оператор)
let newDeepCopyStudents = [...deepCopyStudents, ...topStudents];
console.log(newDeepCopyStudents)

//7. Сформируйте массив холостых студентов (filter)
let notMarriedStudents = newDeepCopyStudents.filter(s => !s.isMarried);
console.log(notMarriedStudents)

//8. Сформируйте массив имён студентов (map)
let studentsNames = newDeepCopyStudents.map(s => s.name);
console.log(studentsNames)

//8a. Сформируйте строку из имён студентов, разделённых
// - пробелом (join)
// - запятой (join)
let nameWithSpace = studentsNames.join(' ');
console.log(nameWithSpace)
let namesWithComma = studentsNames.join();
console.log(namesWithComma)

//9. Добавьте всем студентам свойство "isStudent" со значением true (map)
let trueStudents = newDeepCopyStudents.map(s => ({...s, isStudent: true}));
console.log(trueStudents)

//10. Nick женился. Выполните выполните соответствующие преобразование массива students (map)
let studentsWithMarriedNick = newDeepCopyStudents.map(s => s.name==='Nick' ? {...s, isMarried: true} : s);
console.log(studentsWithMarriedNick)

//11. Найдите студента по имени Ann (find)
let ann = newDeepCopyStudents.find(t => t.name ==='Ann');
console.log(ann)

//12. Найдите студента с самым высоким баллом (reduce)
let bestStudent = newDeepCopyStudents.reduce((acc, el) => acc.scores > el.scores ? acc : el);
console.log(bestStudent)

//13. Найдите сумму баллов всех студентов (reduce)

// И поднимаем руку!!!!

let scoresSum = newDeepCopyStudents.reduce((acc, el) => acc + el.scores, 0);
console.log(scoresSum)


// 14. Д.З.:
// Напишите функцию addFriends, которая принимает параметром массив students
// и добавляет в каждому студенту свойство "friends",
// значением которого является массив имён всех остальных студентов из массива students,
// за исключением собственного имени студента. Т.е. в друзьях у Боба Боба быть не должно.
const addFriends = (students) => {
   let friensList = students.map( s => s.name )
    console.log(friensList)

    let studentsResult = students.map(s => ({...s, friends: [friensList.filter(friendName => friendName !== s.name)]}))
    return studentsResult
}
console.log(addFriends(students));












