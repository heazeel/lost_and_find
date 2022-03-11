/*
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-03-10 21:14:03
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-09 17:36:57
 */
let position = [
  {
    label: 'A区',
    value: 'A区',
    children: [
      {
        label: '寝室区',
        value: '寝室区',
        children: [],
      },
      {
        label: '教学区',
        value: '教学区',
        children: [],
      },
    ],
  },
  {
    label: 'B区',
    value: 'B区',
    children: [
      {
        label: '寝室区',
        value: '寝室区',
        children: [],
      },
      {
        label: '教学区',
        value: '教学区',
        children: [],
      },
    ],
  },
  {
    label: 'C区',
    value: 'C区',
    children: [
      {
        label: '寝室区',
        value: '寝室区',
        children: [],
      },
      {
        label: '教学区',
        value: '教学区',
        children: [],
      },
    ],
  },
  {
    label: 'D区',
    value: 'D区',
    children: [
      {
        label: '寝室区',
        value: '寝室区',
        children: [],
      },
      {
        label: '教学区',
        value: '教学区',
        children: [],
      },
    ],
  },
];

// A区寝室
let bedroomA = [];
for (let i = 1; i < 13; i++) {
  let obj = {
    label: `博文苑${i}号楼`,
    value: `博文苑${i}号楼`,
  };
  bedroomA.push(obj);
}
position[0].children[0].children = JSON.parse(JSON.stringify(bedroomA));

// A区教学楼
let teachBuildingA = [];
for (let i = 1; i < 38; i++) {
  let obj = {
    label: `恕园${i}号楼`,
    value: `恕园${i}号楼`,
  };
  teachBuildingA.push(obj);
}
position[0].children[1].children = JSON.parse(JSON.stringify(teachBuildingA));

// B区寝室
let bedroomB = [];
for (let i = 1; i < 5; i++) {
  let obj = {
    label: `精思苑${i}号楼`,
    value: `精思苑${i}号楼`,
  };
  bedroomB.push(obj);
}
position[1].children[0].children = JSON.parse(JSON.stringify(bedroomB));

// B区教学楼
let teachBuildingB = [];
for (let i = 1; i < 14; i++) {
  let obj = {
    label: `勤园${i}号楼`,
    value: `勤园${i}号楼`,
  };
  teachBuildingB.push(obj);
}
position[1].children[1].children = JSON.parse(JSON.stringify(teachBuildingB));

// C区寝室
let bedroomC = [];
for (let i = 1; i < 13; i++) {
  let obj = {
    label: `进学苑${i}号楼`,
    value: `进学苑${i}号楼`,
  };
  bedroomC.push(obj);
}
position[2].children[0].children = JSON.parse(JSON.stringify(bedroomC));

// C区教学楼
let teachBuildingC = [];
for (let i = 1; i < 38; i++) {
  let obj = {
    label: `诚园${i}号楼`,
    value: `诚园${i}号楼`,
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
    label: `慎园${i}号楼`,
    value: `慎园${i}号楼`,
  };
  teachBuildingD.push(obj);
}
position[3].children[1].children = JSON.parse(JSON.stringify(teachBuildingD));

export default position;
