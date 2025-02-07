```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script>
    /**
     * 1. 执行10000次及以下时，switch和map的性能差距不大
     * 2. 执行100000000次时，map的性能要比switch和if-else好很多
     * 3. 执行1000000000次时，switch和if-else的性能差距不大
     */ 
    const loopCount = 100000000;

    // 测试switch和map的性能
    function testSwitch() {
      let start = Date.now();
      for (let i = 0; i < loopCount; i++) {
        switch (i % 20) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          case 6:
            break;
          case 7:
            break;
          case 8:
            break;
          case 9:
            break;
          case 10:
            break;
          case 11:
            break;
          case 12:
            break;
          case 13:
            break;
          case 14:
            break;
          case 15:
            break;
          case 16:
            break;
          case 17:
            break;
          case 18:
            break;
          case 19:
            break;
        }
      }
      // 计算结果以毫秒为单位
      console.log('switch:', Date.now() - start);
    }
    // testSwitch()

    function testMap() {
      let start = Date.now();
      let map = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 12,
        13: 13,
        14: 14,
        15: 15,
        16: 16,
        17: 17,
        18: 18,
        19: 19,
      };
      for (let i = 0; i < loopCount; i++) {
        map[i % 20];
        // map.get(i % 3);
      }
      console.log('map:', Date.now() - start);
    }

    function testIfElse() {
      let start = Date.now();
      for (let i = 0; i < loopCount; i++) {
        if (i % 20 === 0) {
          // do nothing
        } else if (i % 20 === 1) {
          // do nothing
        } else if (i % 20 === 2) {
          // do nothing
        } else if (i % 20 === 3) {
          // do nothing
        } else if (i % 20 === 4) {
          // do nothing
        } else if (i % 20 === 5) {
          // do nothing
        } else if (i % 20 === 6) {
          // do nothing
        } else if (i % 20 === 7) {
          // do nothing
        } else if (i % 20 === 8) {
          // do nothing
        } else if (i % 20 === 9) {
          // do nothing
        } else if (i % 20 === 10) {
          // do nothing
        } else if (i % 20 === 11) {
          // do nothing
        } else if (i % 20 === 12) {
          // do nothing
        } else if (i % 20 === 13) {
          // do nothing
        } else if (i % 20 === 14) {
          // do nothing
        } else if (i % 20 === 15) {
          // do nothing
        } else if (i % 20 === 16) {
          // do nothing
        } else if (i % 20 === 17) {
          // do nothing
        } else if (i % 20 === 18) {
          // do nothing
        } else if (i % 20 === 19) {
          // do nothing
        }
      }
      console.log('if-else:', Date.now() - start);
    }
    Promise.resolve().then(() => {
      console.log('start-switch========')
      testSwitch()
    }).then(() => {
      console.log('start-map========')
      testMap()
    }).then(() => {
      console.log('start-if-else========')
      testIfElse()
    })
  </script>
</body>
</html>
```


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script>
    /**
     * 1. 执行10000次及以下时，switch和map的性能差距不大
     * 2. 执行100000000次时，map的性能要比switch和if-else好很多
     * 3. 执行1000000000次时，switch和if-else的性能差距不大
     * 4. 在switch和if-else中，case的数量越多，性能越差
     * 5. 在map中，key的数量越多，性能越好
     * 6. 如果案例非常多，而且值是非连续的，对象字面量可能是更好的选择
     */ 
    const loopCount = 100000000;

    // 测试switch和map的性能
    function testSwitch() {
      let start = Date.now();
      for (let i = 0; i < loopCount; i++) {
        switch (i % 3) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          
        }
      }
      // 计算结果以毫秒为单位
      console.log('switch:', Date.now() - start);
    }

    function testMap() {
      let start = Date.now();
      let map = {
        0: 0,
        1: 1,
        2: 2,
      };
      for (let i = 0; i < loopCount; i++) {
        map[i % 3];
      }
      console.log('map:', Date.now() - start);
    }

    function testIfElse() {
      let start = Date.now();
      for (let i = 0; i < loopCount; i++) {
        if (i % 3 === 0) {
          // do nothing
        } else if (i % 3 === 1) {
          // do nothing
        } else if (i % 3 === 2) {
          // do nothing
        }
      }
      console.log('if-else:', Date.now() - start);
    }
    Promise.resolve().then(() => {
      console.log('start-switch========')
      testSwitch()
    }).then(() => {
      console.log('start-map========')
      testMap()
    }).then(() => {
      console.log('start-if-else========')
      testIfElse()
    })
  </script>
</body>
</html>
```