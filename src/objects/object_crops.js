import { GameObject } from 'rpgbaker'
export default class ObjectCrops extends GameObject {
  Init () {
    super.Init()

    // this.tomato = 0
    // this.potato = 1
    // this.carrot = 2
    // this.artichoke = 3
    // this.chilli = 4
    // this.gourd = 5
    // this.corn = 6

    this.cropsTypes = {}

    this.cropsTypes['tomato'] = { duration: 4, cost: 40 }
    this.cropsTypes['potato'] = { duration: 3, cost: 35 }
    this.cropsTypes['carrot'] = { duration: 2, cost: 25 }
    this.cropsTypes['artichoke'] = { duration: 4, cost: 45 }
    this.cropsTypes['chilli'] = { duration: 3, cost: 30 }
    this.cropsTypes['gourd'] = { duration: 2, cost: 20 }
    this.cropsTypes['corn'] = { duration: 5, cost: 50 }
  }
}
