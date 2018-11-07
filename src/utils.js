const PIXI = require('pixi.js')
var utils = {}


utils.style1 = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 'white',
  stroke: '#ff3300',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6
})

module.exports = utils
