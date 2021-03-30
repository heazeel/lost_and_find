/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-03-10 21:14:03
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-11 01:12:00
 */
let position = [
  {
    title: 'A区',
    value: 'A区',
    key: 'A区',
    pid: 0,
    selectable: false,
    children: [
      {
        title: '寝室区',
        value: 'A寝室区',
        key: 'A寝室区',
        pid: 1,
        selectable: false,
        children: [],
      },
      {
        title: '教学区',
        value: 'A教学区',
        key: 'A教学区',
        pid: 1,
        selectable: false,
        children: [],
      },
    ],
  },
  {
    title: 'B区',
    value: 'B区',
    key: 'B区',
    pid: 0,
    selectable: false,
    children: [
      {
        title: '寝室区',
        value: 'B寝室区',
        key: 'B寝室区',
        pid: 1,
        selectable: false,
        children: [],
      },
      {
        title: '教学区',
        value: 'B教学区',
        key: 'B教学区',
        pid: 1,
        selectable: false,
        children: [],
      },
    ],
  },
  {
    title: 'C区',
    value: 'C区',
    key: 'C区',
    pid: 0,
    selectable: false,
    children: [
      {
        title: '寝室区',
        value: 'C寝室区',
        key: 'C寝室区',
        pid: 1,
        selectable: false,
        children: [],
      },
      {
        title: '教学区',
        value: 'C教学区',
        key: 'C教学区',
        pid: 1,
        selectable: false,
        children: [],
      },
    ],
  },
  {
    title: 'D区',
    value: 'D区',
    key: 'D区',
    pid: 0,
    selectable: false,
    children: [
      {
        title: '寝室区',
        value: 'D寝室区',
        key: 'D寝室区',
        pid: 1,
        selectable: false,
        children: [],
      },
      {
        title: '教学区',
        value: 'D教学区',
        key: 'D教学区',
        pid: 1,
        selectable: false,
        children: [],
      },
    ],
  },
];

// A区寝室
let bedroomA = [];
for (let i = 1; i < 13; i++) {
  let obj = {
    title: `博文苑${i}号楼`,
    value: `博文苑${i}号楼`,
    key: `博文苑${i}号楼`,
    pid: 2,
  };
  bedroomA.push(obj);
}
position[0].children[0].children = JSON.parse(JSON.stringify(bedroomA));

// A区教学楼
let teachBuildingA = [];
for (let i = 1; i < 38; i++) {
  let obj = {
    title: `恕园${i}号楼`,
    value: `恕园${i}号楼`,
    key: `恕园${i}号楼`,
    pid: 2,
  };
  teachBuildingA.push(obj);
}
position[0].children[1].children = JSON.parse(JSON.stringify(teachBuildingA));

// B区寝室
let bedroomB = [];
for (let i = 1; i < 13; i++) {
  let obj = {
    title: `精思苑${i}号楼`,
    value: `精思苑${i}号楼`,
    key: `精思苑${i}号楼`,
    pid: 2,
  };
  bedroomB.push(obj);
}
position[1].children[0].children = JSON.parse(JSON.stringify(bedroomB));

// B区教学楼
let teachBuildingB = [];
for (let i = 1; i < 38; i++) {
  let obj = {
    title: `勤园${i}号楼`,
    value: `勤园${i}号楼`,
    key: `勤园${i}号楼`,
    pid: 2,
  };
  teachBuildingB.push(obj);
}
position[1].children[1].children = JSON.parse(JSON.stringify(teachBuildingB));

// C区寝室
let bedroomC = [];
for (let i = 1; i < 13; i++) {
  let obj = {
    title: `进学苑${i}号楼`,
    value: `进学苑${i}号楼`,
    key: `进学苑${i}号楼`,
    pid: 2,
  };
  bedroomC.push(obj);
}
position[2].children[0].children = JSON.parse(JSON.stringify(bedroomC));

// C区教学楼
let teachBuildingC = [];
for (let i = 1; i < 38; i++) {
  let obj = {
    title: `诚园${i}号楼`,
    value: `诚园${i}号楼`,
    key: `诚园${i}号楼`,
    pid: 2,
  };
  teachBuildingC.push(obj);
}
position[2].children[1].children = JSON.parse(JSON.stringify(teachBuildingC));

// D区寝室
// let bedroomD = [];
// for (let i = 1; i < 13; i++) {
//   let obj = {
//     title: `博文苑${i}号楼`,
//     value: `博文苑${i}号楼`,
//     key: `博文苑${i}号楼`,
//   };
//   bedroomD.push(obj);
// }
// position[3].children[0].children = JSON.parse(JSON.stringify(bedroomD));

// D区教学楼
let teachBuildingD = [];
for (let i = 1; i < 38; i++) {
  let obj = {
    title: `慎园${i}号楼`,
    value: `慎园${i}号楼`,
    key: `慎园${i}号楼`,
    pid: 2,
  };
  teachBuildingD.push(obj);
}
position[3].children[1].children = JSON.parse(JSON.stringify(teachBuildingD));

export default position;
