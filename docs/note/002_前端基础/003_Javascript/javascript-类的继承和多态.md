---
slug: /note/javascript-class-inheritance-and-polymorphism
title: javascript-类的继承和多态
---
```js
const output = console.log
class Vehicle {
  engines = 1

  ignition() {
    output("Turning on my engine.");
  }

  drive() {
    this.ignition();
    output("Steering and moving forward! ")
  }
}

class Car extends Vehicle {
  constructor() {
    super()
    this.wheels = 4
  }

  drive() {
    super.drive()
    output("Rolling on all ", this.wheels, " wheels! ")
  }
}

class SpeedBoat extends Vehicle {
  constructor() {
    super()
    this.engines = 2
  }

  ignition() {
    output("Turning on my ", this.engines, " engines.")
  }

  pilot() {
    super.drive()
    output("Speeding through the water with ease! ")
  }
}

const car = new Car()
car.drive()
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!

const boat = new SpeedBoat()
boat.pilot()
// Turning on my 2 engines.
// Steering and moving forward!
//Speeding through the water with ease!
```

继承关系：
- Car 和 SpeedBoat子类都继承于Vehicle父类


多态：
- 在子类 `Car`中实现了与父类 `Vehicle` 同名方法 `drive`，且子类的 `drive`方法调用了父类的`drive`方法
- 在子类 `SpeedBoat` 中定义了单独的 `pilot`方法，子类的`pilot`方法调用了父类的 `drive`方法；
- 在父类中`Vehicle` 的 `drive` 方法中，调用了 `ignition`方法；在子类中调用父类的 `drive`方法时，若子类没有实现自己的 `ignition` 方法，则会调用父类的`ignition`方法，若子类实现了自己的 `ignition` 方法，则会调用子类的 `ignition` 方法；`ignition` 方法定义的多态性取决于你是在哪个类的实例中引用它。


相对多态总结：
- 在子类中，任何方法都可以引用父类（在继承层次里，层次比较高的类）的方法，无论子类和父类都方法名是否相同；
- 在子类中，可以定义与父类中相同的方法，在调用时会自动选择合适的定义




- 参考地址：《你不知道的Javascript上卷》4.3 类的继承
