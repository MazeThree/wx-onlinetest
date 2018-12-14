import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'Maze',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 35; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

const Users1 = [];
for (let i = 0; i < 35; i++) {
  Users1.push(Mock.mock({
    id: Mock.Random.id(),
    name: Mock.Random.cname(),
    sex: Mock.Random.integer(0, 1)
  }));
}

// const classinfo = [];
// for (let i = 0; i < 5; i++) {
//   classinfo.push(Mock.mock({
//     id: Mock.Random.id(),
//     'name|2-6': 测试一二三四班,
//     'desc|10-15': 奥术大师大所多啊
//   }));
// }


export {  Users, Users1 };
